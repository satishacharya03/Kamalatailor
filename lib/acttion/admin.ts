"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createAdmin(email: string) {
  const session = await auth();
  
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({ where: { email } });
  
  if (!user) {
    throw new Error("User not found");
  }

  await prisma.user.update({
    where: { email },
    data: { role: "ADMIN" },
  });

  revalidatePath("/admin/users");
}

export async function removeAdmin(email: string) {
  const session = await auth();
  
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({ where: { email } });
  
  if (!user) {
    throw new Error("User not found");
  }

  await prisma.user.update({
    where: { email },
    data: { role: "USER" },
  });

  revalidatePath("/admin/users");
}