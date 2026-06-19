"use server";

import dbConnect from "@/lib/mongodb";
import { Event } from "@/models/Event";
import { startOfDay, subDays, format } from "date-fns";

export async function getAnalyticsDashboard() {
  await dbConnect();

  const thirtyDaysAgo = subDays(startOfDay(new Date()), 30);

  // 1. Total Page Views
  const totalViews = await Event.countDocuments({ eventType: "page_view" });

  // 2. Total Resume Downloads
  const resumeDownloads = await Event.countDocuments({ eventType: "resume_download" });

  // 3. Page Views over the last 30 days
  const dailyViewsRaw = await Event.aggregate([
    {
      $match: {
        eventType: "page_view",
        createdAt: { $gte: thirtyDaysAgo }
      }
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" }
        },
        views: { $sum: 1 }
      }
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 }
    }
  ]);

  // Format daily views to fill in empty days
  const dailyViews = [];
  for (let i = 29; i >= 0; i--) {
    const d = subDays(new Date(), i);
    const formattedDate = format(d, "MMM dd");
    
    const found = dailyViewsRaw.find(r => 
      r._id.year === d.getFullYear() && 
      r._id.month === d.getMonth() + 1 && 
      r._id.day === d.getDate()
    );

    dailyViews.push({
      date: formattedDate,
      views: found ? found.views : 0
    });
  }

  // 4. Most clicked projects
  const topProjectsRaw = await Event.aggregate([
    {
      $match: { eventType: "project_click" }
    },
    {
      $group: {
        _id: "$metadata.projectTitle",
        clicks: { $sum: 1 }
      }
    },
    {
      $sort: { clicks: -1 }
    },
    {
      $limit: 5
    }
  ]);

  const topProjects = topProjectsRaw.map(p => ({
    name: p._id || "Unknown",
    clicks: p.clicks
  }));

  return {
    totalViews,
    resumeDownloads,
    dailyViews,
    topProjects
  };
}
