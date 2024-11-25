import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateOrderSchema = z.object({
  status: z.enum(["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"]),
});

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await request.json();
    const body = updateOrderSchema.parse(json);

    const order = await prisma.order.update({
      where: { id: params.id },
      data: { status: body.status },
    });

    return NextResponse.json(order);
  } catch (error) {
    return new NextResponse(
      error instanceof Error ? error.message : "Internal Server Error",
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        user: true,
        products: true,
      },
    });

    if (!order) {
      return new NextResponse("Order not found", { status: 404 });
    }

    // Only allow admin or the order's owner to access the details
    if (session.user.role !== "ADMIN" && order.userId !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    return NextResponse.json(order);
  } catch (error) {
    return new NextResponse(
      error instanceof Error ? error.message : "Internal Server Error",
      { status: 500 }
    );
  }
}