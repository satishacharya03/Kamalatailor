import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      user: true,
      products: true,
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Order #{order.id.slice(0, 8)}
        </h2>
        <Select defaultValue={order.status}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(OrderStatus).map((status) => (
              <SelectItem key={status} value={status}>
                {status.charAt(0) + status.slice(1).toLowerCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Customer Information</h3>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Name:</span> {order.user.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {order.user.email}
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Order Information</h3>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Date:</span>{" "}
              {format(new Date(order.createdAt), "PPP")}
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              <Badge>{order.status}</Badge>
            </p>
            <p>
              <span className="font-medium">Total:</span>{" "}
              ${order.total.toFixed(2)}
            </p>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold">Products</h3>
        <div className="space-y-4">
          {order.products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
              </div>
              <p className="font-medium">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}