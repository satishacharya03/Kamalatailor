"use client";

import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { ProductColumns } from "./columns";
import { useSearchParams } from "next/navigation";

  
export default async function ProductsPage() {
  const searchParams = useSearchParams();
  const query = searchParams?.get("query") || "";

  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Products</h2>
        <Link href="/admin/products/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>
      <DataTable columns={ProductColumns} data={products} />
    </div>
  );
}