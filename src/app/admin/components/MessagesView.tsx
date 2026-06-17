"use client";

import { useState, useEffect } from "react";
import { getMessages } from "@/app/actions/portfolio";
import { Loader2, Mail, Clock } from "lucide-react";

export default function MessagesView() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessages();
        setMessages(data);
      } catch (e) {
        console.error("Error fetching messages", e);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <Mail className="mr-2 text-primary" /> Inbox ({messages.length})
        </h3>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20">
          <Mail size={48} className="mx-auto text-zinc-600 mb-4" />
          <p className="text-zinc-400">Your inbox is empty. No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl hover:border-primary/30 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 pb-4 border-b border-zinc-800/50">
                <div>
                  <h4 className="text-lg font-semibold text-white">{msg.name}</h4>
                  <a href={`mailto:${msg.email}`} className="text-primary hover:underline text-sm">{msg.email}</a>
                </div>
                <div className="text-left md:text-right mt-4 md:mt-0">
                  <span className="inline-block bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-medium mb-2">
                    {msg.reason}
                  </span>
                  <div className="flex items-center text-zinc-500 text-xs md:justify-end">
                    <Clock size={12} className="mr-1" />
                    {new Date(msg.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
              <p className="text-zinc-300 leading-relaxed whitespace-pre-line text-sm md:text-base">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
