"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "Elastic package",
    price: 180,
    image: "data:image/jpeg;base64,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",
  },
  {
    id: 2,
    name: "Button package",
    price: 150,
    image: "https://pacifictrimming.com/cdn/shop/products/Standard-Polyester-4-Hole-Shirt-Button-2_pacifictrimming1.jpg?v=1621473472&width=713",
  },
  {
    id: 3,
    name: "Thread package",
    price: 340,
    image: "https://scontent.fkep4-1.fna.fbcdn.net/v/t1.6435-9/200692475_155725953275006_3744788278163728153_n.jpg?stp=dst-jpg_s960x960&_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=6OVW37aoMBwQ7kNvgF6Vi8M&_nc_zt=23&_nc_ht=scontent.fkep4-1.fna&_nc_gid=A6Rjme0BdnWEJOqM3p0xB6c&oh=00_AYCpiz6LnU2qvd-EP5YtzLXrkTzx65u_xE6hKfdoj_KZCg&oe=676C0247",
  },
];

export function FeaturedProducts() {
  return (
    <section className="py-16">
      <div className="container">
        <h2 className="mb-8 text-3xl font-bold">Featured Products</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_PRODUCTS.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="mb-4 text-xl font-bold">Rs. {product.price}</p>
                <Button className="w-full">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}