"use server";

import dbConnect from "@/lib/mongodb";
import { Resume } from "@/models/Resume";
import { revalidatePath } from "next/cache";

export async function uploadResume(formData: FormData) {
  try {
    await dbConnect();
    
    const file = formData.get("resume") as File;
    if (!file) {
      return { error: "No file provided" };
    }

    if (file.type !== "application/pdf") {
      return { error: "Only PDF files are allowed" };
    }

    // Limit to 5MB
    if (file.size > 5 * 1024 * 1024) {
      return { error: "File is too large. Maximum size is 5MB." };
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // We only want to keep one resume. We can clear the old one.
    await Resume.deleteMany({});

    await Resume.create({
      data: buffer,
      contentType: file.type,
      fileName: file.name
    });

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    console.error("Error uploading resume:", error);
    return { error: "Failed to upload resume. Please try again." };
  }
}

export async function checkResumeExists() {
  try {
    await dbConnect();
    const resume = await Resume.findOne().select('updatedAt fileName').lean();
    if (resume) {
      return { exists: true, updatedAt: resume.updatedAt, fileName: resume.fileName };
    }
    return { exists: false };
  } catch (error) {
    return { exists: false };
  }
}
