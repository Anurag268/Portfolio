"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function trackEvent(eventType: string, metadata?: any) {
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventType,
      path: window.location.pathname,
      metadata
    })
  }).catch(() => {});
}

export default function Tracker() {
  const pathname = usePathname();

  // Track page views
  useEffect(() => {
    if (pathname && !pathname.startsWith('/admin')) {
      trackEvent("page_view");
    }
  }, [pathname]);

  // Track resume downloads via global click listener
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href === "/api/resume") {
          trackEvent("resume_download");
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
