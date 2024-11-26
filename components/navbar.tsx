"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { User, ShoppingBag, MessageCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { CartSheet } from "@/components/cart-sheet";
import { User as NextAuthUser } from "next-auth";
import { ThemeToggle } from "@/components/theme-toggle";

// Extend the User type to include the role
interface User extends NextAuthUser {
  role: "ADMIN" | "USER";
}

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession() as { data: { user: User } | null };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              Kamal Tailoritems
            </span>
          </Link>
          <NavigationMenu>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link
                href="/products"
                className={pathname === "/products" ? "text-foreground" : "text-foreground/60"}
              >
                Products
              </Link>
              <Link
                href="/categories"
                className={pathname === "/categories" ? "text-foreground" : "text-foreground/60"}
              >
                Categories
              </Link>
              <Link
                href="/about"
                className={pathname === "/about" ? "text-foreground" : "text-foreground/60"}
              >
                About
              </Link>
            </nav>
          </NavigationMenu>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CartSheet />
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/orders">Orders</Link>
                  </DropdownMenuItem>
                  {session?.user?.role === "ADMIN" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin">Admin Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/chat">Support Chat</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  {session?.user?.role === "USER" && (
                    <DropdownMenuItem asChild>
                      <Link href="/chat">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Support Chat
                      </Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}