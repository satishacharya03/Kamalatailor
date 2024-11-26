"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Order, User, Product } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@prisma/client";
import { format } from "date-fns";

type OrderWithDetails = Order & {
  user: User;
  products: Product[];
};

const statusColors = {
  PENDING: "bg-yellow-500",
  PROCESSING: "bg-blue-500",
  SHIPPED: "bg-purple-500",
  DELIVERED: "bg-green-500",
  CANCELLED: "bg-red-500",
};

export const OrderColumns: ColumnDef<OrderWithDetails>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => {
      return <span className="font-medium">#{(row.getValue("id") as string).slice(0, 8)}</span>;
    },
  },
  {
    accessorKey: "user.name",
    header: "Customer",
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"));
      return `$${amount.toFixed(2)}`;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as OrderStatus;
      return (
        <Badge className={statusColors[status]}>
          {status.charAt(0) + status.slice(1).toLowerCase()}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      return format(new Date(row.getValue("createdAt")), "MMM d, yyyy");
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DialogTrigger asChild>
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Customer Information</h3>
                  <p>{order.user.name}</p>
                  <p>{order.user.email}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Order Information</h3>
                  <p>Order #{order.id.slice(0, 8)}</p>
                  <p>Status: {order.status}</p>
                  <p>Date: {format(new Date(order.createdAt), "PPP")}</p>
                </div>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Products</h3>
                <div className="space-y-2">
                  {order.products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between rounded-lg border p-2"
                    >
                      <span>{product.name}</span>
                      <span>${product.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-end text-lg font-semibold">
                  Total: ${order.total.toFixed(2)}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
];