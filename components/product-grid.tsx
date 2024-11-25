"use client";

import { Product, Category } from "@prisma/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ProductWithCategory = Product & {
  category: Category;
};

interface ProductGridProps {
  products: ProductWithCategory[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <Card className="group overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <div className="mb-2 text-sm text-muted-foreground">
                {product.category.name}
              </div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="mb-4 text-xl font-bold">
                ${product.price.toFixed(2)}
              </p>
              <Button className="w-full">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}