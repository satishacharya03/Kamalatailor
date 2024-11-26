"use client";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  User,
  ShoppingBag,
  Heart,
  Settings,
  MessageCircle,
} from "lucide-react";

export const dynamic = "force-dynamic";

const sidebarItems = [
  {
    title: "Profile",
    href: "/account",
    icon: User,
  },
  {
    title: "Orders",
    href: "/account/orders",
    icon: ShoppingBag,
  },
  {
    title: "Wishlist",
    href: "/account/wishlist",
    icon: Heart,
  },
  {
    title: "Support Chat",
    href: "/chat",
    icon: MessageCircle,
  },
  {
    title: "Settings",
    href: "/account/settings",
    icon: Settings,
  },
];

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-[240px_1fr]">
        <Card className="h-fit p-4">
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  "transition-colors"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </nav>
        </Card>
        <main>{children}</main>
      </div>
    </div>
  );
}