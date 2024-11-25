import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/ui/data-table";
import { CustomerColumns } from "./columns";

export default async function CustomersPage() {
  const customers = await prisma.user.findMany({
    where: {
      role: "USER",
    },
    include: {
      orders: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const customersWithStats = customers.map(customer => ({
    ...customer,
    totalOrders: customer.orders.length,
    totalSpent: customer.orders.reduce((sum, order) => sum + order.total, 0),
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Customers</h2>
      </div>
      <DataTable columns={CustomerColumns} data={customersWithStats} />
    </div>
  );
}