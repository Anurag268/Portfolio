import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Event } from "@/models/Event";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventType, path, metadata } = body;

    if (!eventType || !path) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Do not block the request for database connection if it takes too long
    // We can run this async
    dbConnect().then(() => {
      Event.create({ eventType, path, metadata }).catch(console.error);
    }).catch(console.error);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to track event:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
