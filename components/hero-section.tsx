"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <div className="relative h-[600px] w-full rounded-lg">
      <Image
        src="https://media.istockphoto.com/id/525061117/photo/sewing-accessories.webp?a=1&b=1&s=612x612&w=0&k=20&c=ljuSj5WDskNErnVDB8wpH8BUC2XOxadsB__hL10uSlU="
        alt="Hero Image"
        fill
        className="rounded-lg"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50">
        <div className="container mx-auto h-full px-4">
          <div className="flex h-full max-w-xl flex-col justify-center space-y-6 text-white">
            <h1 className="text-5xl font-bold leading-tight">
              Discover Your Perfect Style
            </h1>
            <p className="text-lg">
              Explore our curated collection of premium fashion items designed to make you stand out.
            </p>
            <Button size="lg" className="w-fit">
              <ShoppingBag className="mr-2 h-5 w-5" />
              <Link href="/#categories">Shop Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}