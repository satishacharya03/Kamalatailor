"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/lib/pusher";
import { Message } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

export default function ChatPage() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!session?.user?.id) return;

    const channel = pusherClient.subscribe(`chat-${session.user.id}`);
    channel.bind("new-message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    fetch("/api/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data));

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [session?.user?.id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !session?.user?.id) return;

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newMessage,
          receiverId: "ADMIN_USER_ID", // Replace with actual admin ID
        }),
      });

      if (!response.ok) throw new Error("Failed to send message");
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Card className="flex h-[600px] flex-col">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold">Customer Support</h2>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.senderId === session?.user?.id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg px-4 py-2 ${
                    message.senderId === session?.user?.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p>{message.content}</p>
                  <span className="text-xs opacity-70">
                    {format(new Date(message.createdAt), "HH:mm")}
                  </span>
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        <form onSubmit={sendMessage} className="border-t p-4">
          <div className="flex space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button type="submit">Send</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}