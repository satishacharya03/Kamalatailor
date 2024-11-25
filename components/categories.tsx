"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  {
    id: 1,
    name: "Men's Fashion",
    image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=500&h=300&fit=crop",
    count: 248,
  },
  {
    id: 2,
    name: "Women's Fashion",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&h=300&fit=crop",
    count: 325,
  },
  {
    id: 3,
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=500&h=300&fit=crop",
    count: 156,
  },
];

export function Categories() {
  return (
    <section className="py-16">
      <div className="container">
        <h2 className="mb-8 text-3xl font-bold">Shop by Category</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            <Link key={category.id} href={`/categories/${category.id}`}>
              <Card className="group overflow-hidden">
                <div className="relative aspect-[5/3]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40">
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center text-white">
                        <h3 className="text-xl font-bold">{category.name}</h3>
                        <p className="mt-2">{category.count} Products</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}