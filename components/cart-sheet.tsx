"use client";

import { ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function CartSheet() {
  const cart = useCart();
  const router = useRouter();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {cart.items.length > 0 && (
            <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground">
              {cart.items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        {cart.items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center space-y-4">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-medium">Your cart is empty</p>
            <Button
              variant="secondary"
              onClick={() => router.push("/products")}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-y-auto py-4">
              {cart.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 py-2">
                  <div className="relative h-16 w-16 overflow-hidden rounded">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => cart.removeItem(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4 border-t pt-4">
              <div className="flex items-center justify-between text-lg font-medium">
                <span>Total</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
              <Button
                className="w-full"
                onClick={() => router.push("/checkout")}
              >
                Checkout
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}