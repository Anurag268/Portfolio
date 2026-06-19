"use server";

import dbConnect from "@/lib/mongodb";
import { ProjectImage } from "@/models/ProjectImage";
import { revalidatePath } from "next/cache";

export async function uploadProjectImage(formData: FormData) {
  try {
    await dbConnect();
    
    const file = formData.get("image") as File;
    if (!file) {
      return { error: "No file provided" };
    }

    if (!file.type.startsWith("image/")) {
      return { error: "Only image files are allowed" };
    }

    // Limit to 2MB to keep db performant
    if (file.size > 2 * 1024 * 1024) {
      return { error: "File is too large. Maximum size is 2MB." };
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const newImage = await ProjectImage.create({
      data: buffer,
      contentType: file.type,
    });

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true, imageId: newImage._id.toString() };
  } catch (error: any) {
    console.error("Error uploading project image:", error);
    return { error: "Failed to upload image. Please try again." };
  }
}
