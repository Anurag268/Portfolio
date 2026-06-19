import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Resume } from "@/models/Resume";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const resume = await Resume.findOne();

    if (!resume || !resume.data) {
      return new NextResponse("Resume not found", { status: 404 });
    }

    // Set appropriate headers so it displays in browser or downloads
    const headers = new Headers();
    headers.set("Content-Type", resume.contentType || "application/pdf");
    headers.set("Content-Disposition", `inline; filename="${resume.fileName || 'resume.pdf'}"`);

    return new NextResponse(resume.data, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Error fetching resume:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
