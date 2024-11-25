import { prisma } from "@/lib/prisma";
import { ProductGrid } from "@/components/product-grid";
import { ProductFilters } from "@/components/product-filters";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
  });

  const categories = await prisma.category.findMany();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-4 gap-8">
        <div className="col-span-1">
          <ProductFilters categories={categories} />
        </div>
        <div className="col-span-3">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}