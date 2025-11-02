"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { renderStars } from "@/helpers/renderStars";
import { Loader2, ShoppingCart, Trash2 } from "lucide-react";
import { formatCurrency } from "@/helpers/formatCurrency";
import { Button } from "@/components/ui";
import Link from "next/link";
import { Product } from "@/interfaces";

interface CartProductProps {
  item: Product;
  handleRemoveItem: (id: string, setLoading: (x: boolean) => void) => void;
  // handleUpdateCount: (id: string, newCount: number) => void;
  handleMoveToCart: (id: string, setLoading: (x: boolean) => void) => void;
}

export default function WishlistProductCard({
  item,
  handleMoveToCart,
  handleRemoveItem,
}: CartProductProps) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isMovingToCart, setIsMovingToCart] = useState<boolean>(false);

  return (
    <Card
      key={item._id}
      className="overflow-hidden hover:shadow-lg transition-all duration-300 py-0"
    >
      <CardContent className="p-4 flex flex-col justify-between gap-3 h-full">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="shrink-0">
            <div className="relative">
              <Link href={`/products/${item._id}`}>
                <Image
                  src={item.imageCover}
                  alt={item.title}
                  width={200}
                  height={200}
                  className="w-full sm:w-24 lg:w-28 h-48 sm:h-24 lg:h-28 object-cover rounded-lg bg-muted"
                />
              </Link>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-grow min-w-0">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {item.category.name}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {item.brand.name}
                  </Badge>
                </div>

                <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                  <Link href={`/products/${item._id}`}>{item.title}</Link>
                </h3>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {renderStars(item.ratingsAverage)}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {item.ratingsAverage}
                  </span>
                </div>

                <h3 className="text-2xl font-bold">
                  {formatCurrency(item.price)}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            disabled={isMovingToCart}
            size="sm"
            onClick={() => {
              handleMoveToCart(item._id, setIsMovingToCart);
            }}
            className="flex items-center gap-1 hover:text-green-600 hover:border-green-300"
          >
            {isMovingToCart ? (
              <Loader2 className="animate-spin size-4" />
            ) : (
              <ShoppingCart className="w-3 h-3" />
            )}
            <span className="hidden sm:inline">Add to Cart</span>
          </Button>
          <Button
            variant="outline"
            disabled={isDeleting}
            size="sm"
            onClick={() => {
              handleRemoveItem(item._id, setIsDeleting);
            }}
            className="flex items-center text-red-400 gap-1 hover:text-red-600 hover:border-red-300"
          >
            {isDeleting ? (
              <Loader2 className="animate-spin size-4" />
            ) : (
              <Trash2 className="w-3 h-3" />
            )}
            <span className="hidden sm:inline">Remove</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
