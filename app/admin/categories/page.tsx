import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/ui/data-table";
import { CategoryColumns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateCategory } from "./create-category";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Categories</h2>
        <CreateCategory />
      </div>
      <DataTable columns={CategoryColumns} data={categories} />
    </div>
  );
}