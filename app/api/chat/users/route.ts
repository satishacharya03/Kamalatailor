import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const users = await prisma.user.findMany({
      where: {
        role: "USER",
      },
      include: {
        receivedMessages: {
          where: {
            read: false,
            senderId: session.user.id,
          },
        },
        sentMessages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
          include: {
            sender: true,
            receiver: true,
          },
        },
      },
    });

    const formattedUsers = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      unreadCount: user.receivedMessages.length,
      lastMessage: user.sentMessages[0] || null,
    }));

    return NextResponse.json(formattedUsers);
  } catch (error) {
    return new NextResponse(
      error instanceof Error ? error.message : "Internal Server Error",
      { status: 500 }
    );
  }
}