"use server";

import { createSession, deleteSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  // Default fallback for development. 
  // In production, these should be set securely in .env.local
  const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  if (email === adminEmail && password === adminPassword) {
    await createSession();
    redirect("/admin");
  } else {
    return { error: "Invalid credentials" };
  }
}

export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}
