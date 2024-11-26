
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export default async function AccountPage() {
  const session = await auth();
  
  if (!session) {
    redirect("/auth/login");
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { products: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">My Account</h1>
      
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">Profile Information</h2>
                <p className="text-muted-foreground">
                  Manage your account details and preferences.
                </p>
              </div>
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <p>{session.user.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p>{session.user.email}</p>
                </div>
              </div>
              <Button>Edit Profile</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card className="p-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Order History</h2>
              {orders.length === 0 ? (
                <p className="text-muted-foreground">No orders found.</p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Order #{order.id.slice(0, 8)}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${order.total.toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.status}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="p-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Account Settings</h2>
              <div className="space-y-2">
                <h3 className="font-medium">Email Preferences</h3>
                <div className="space-y-1">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span>Receive order updates</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span>Receive promotional emails</span>
                  </label>
                </div>
              </div>
              <Button>Save Settings</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}