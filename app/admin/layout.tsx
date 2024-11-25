import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Settings,
  Package,
  FileText,
  MessageCircle
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: FileText,
  },
  {
    title: "Support Chat",
    href: "/admin/chat",
    icon: MessageCircle,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/login");
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-muted/40">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px]">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <Package className="h-6 w-6" />
            <span>Admin Panel</span>
          </Link>
        </div>
        <nav className="space-y-1 p-4">
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
      </aside>
      <div className="flex-1">
        <header className="border-b">
          <div className="flex h-14 items-center gap-4 px-4 lg:h-[60px]">
            <div className="flex-1">
              <h1 className="text-lg font-semibold">Admin Dashboard</h1>
            </div>
          </div>
        </header>
        <main className="flex-1 space-y-4 p-8">{children}</main>
      </div>
    </div>
  );
}