"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/lib/pusher";
import { Message, User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

type MessageWithUser = Message & {
  sender: User;
  receiver: User;
};

type ChatUser = {
  id: string;
  name: string;
  unreadCount: number;
  lastMessage?: MessageWithUser;
};

export default function AdminChatPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageWithUser[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!session?.user?.id) return;

    const channel = pusherClient.subscribe(`chat-${session.user.id}`);
    channel.bind("new-message", (message: MessageWithUser) => {
      setMessages((prev) => [...prev, message]);
      updateUserList();
    });

    updateUserList();

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [session?.user?.id]);

  useEffect(() => {
    if (selectedUser) {
      fetch(`/api/messages?userId=${selectedUser}`)
        .then((res) => res.json())
        .then((data) => setMessages(data));
    }
  }, [selectedUser]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const updateUserList = async () => {
    const response = await fetch("/api/chat/users");
    const data = await response.json();
    setUsers(data);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !session?.user?.id || !selectedUser) return;

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newMessage,
          receiverId: selectedUser,
        }),
      });

      if (!response.ok) throw new Error("Failed to send message");
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="grid h-[calc(100vh-4rem)] grid-cols-4 gap-4">
      <Card className="col-span-1 flex flex-col">
        <div className="border-b p-4">
          <h2 className="font-semibold">Conversations</h2>
        </div>
        <ScrollArea className="flex-1">
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => setSelectedUser(user.id)}
              className={`w-full border-b p-4 text-left hover:bg-accent ${
                selectedUser === user.id ? "bg-accent" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{user.name}</span>
                {user.unreadCount > 0 && (
                  <span className="rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
                    {user.unreadCount}
                  </span>
                )}
              </div>
              {user.lastMessage && (
                <p className="mt-1 truncate text-sm text-muted-foreground">
                  {user.lastMessage.content}
                </p>
              )}
            </button>
          ))}
        </ScrollArea>
      </Card>

      <Card className="col-span-3 flex flex-col">
        {selectedUser ? (
          <>
            <div className="border-b p-4">
              <h2 className="font-semibold">
                {users.find((u) => u.id === selectedUser)?.name}
              </h2>
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
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Select a conversation to start chatting
          </div>
        )}
      </Card>
    </div>
  );
}