"use server";

import dbConnect from "@/lib/mongodb";
import { Portfolio } from "@/models/Portfolio";
import { Message } from "@/models/Message";
import { portfolioData as initialStaticData } from "@/data/portfolio";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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
    
    // Send email notification if API key is configured
    if (process.env.RESEND_API_KEY && resend) {
      try {
        await resend.emails.send({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: process.env.CONTACT_EMAIL || 'anu@gmail.com', // Change this or use env variable
          subject: `New Portfolio Message: ${reason}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; max-width: 600px;">
              <h2 style="color: #333;">New Message from your Portfolio</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Reason:</strong> ${reason}</p>
              <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
              <p><strong>Message:</strong></p>
              <p style="background: #f9f9f9; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${message}</p>
            </div>
          `
        });
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
      }
    }
    
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
