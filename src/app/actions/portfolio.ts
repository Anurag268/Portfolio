"use server";

import dbConnect from "@/lib/mongodb";
import { Portfolio } from "@/models/Portfolio";
import { Message } from "@/models/Message";
import { portfolioData as initialStaticData } from "@/data/portfolio";
import { revalidatePath } from "next/cache";

export async function getPortfolio() {
  if (!process.env.MONGODB_URI) {
    console.warn("MONGODB_URI not found. Falling back to static data for build.");
    return initialStaticData;
  }

  await dbConnect();
  
  let portfolio = await Portfolio.findOne().lean();
  
  if (!portfolio) {
    const doc = await Portfolio.create(initialStaticData);
    portfolio = doc.toObject();
  }
  
  return JSON.parse(JSON.stringify(portfolio));
}

export async function updatePortfolioSection(section: string, data: any) {
  try {
    await dbConnect();
    const portfolio = await Portfolio.findOne();
    if (!portfolio) return { error: "Portfolio not found" };

    portfolio[section] = data;
    await portfolio.save();
    
    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating portfolio section:", error);
    return { error: error.message || "Failed to update portfolio section" };
  }
}

export async function submitContactForm(formData: FormData) {
  try {
    await dbConnect();
    
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const reason = formData.get("reason") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !reason || !message) {
      return { error: "All fields are required" };
    }

    await Message.create({ name, email, reason, message });
    
    return { success: true };
  } catch (error) {
    return { error: "Failed to submit message" };
  }
}

export async function getMessages() {
  await dbConnect();
  const messages = await Message.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(messages));
}
