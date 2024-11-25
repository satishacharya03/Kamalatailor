import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/ui/data-table";
import { OrderColumns } from "./columns";

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: true,
      products: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Orders</h2>
      </div>
      <DataTable columns={OrderColumns} data={orders} />
    </div>
  );
}