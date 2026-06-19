import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { ProjectImage } from "@/models/ProjectImage";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id || id === 'undefined' || id === 'null') {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    await dbConnect();

    const image = await ProjectImage.findById(id);

    if (!image || !image.data) {
      return new NextResponse("Image not found", { status: 404 });
    }

    const headers = new Headers();
    headers.set("Content-Type", image.contentType || "image/jpeg");
    headers.set("Cache-Control", "public, max-age=31536000, immutable"); // Cache for 1 year

    return new NextResponse(image.data, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Error fetching project image:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
