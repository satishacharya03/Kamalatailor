import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true },
      },
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Shop by Category</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.id} href={`/categories/${category.id}`}>
            <Card className="group overflow-hidden">
              <div className="relative aspect-[5/3]">
                <Image
                  src={`https://source.unsplash.com/featured/?${category.name}`}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-xl font-bold">{category.name}</h3>
                      <p className="mt-2">{category._count.products} Products</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}