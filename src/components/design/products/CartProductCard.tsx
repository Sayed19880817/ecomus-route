"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GetCartProduct } from "@/interfaces";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { renderStars } from "@/helpers/renderStars";
import { Heart, Loader2, Minus, Plus, Trash2, Truck } from "lucide-react";
import { formatCurrency } from "@/helpers/formatCurrency";
import { Button } from "@/components/ui";
import Link from "next/link";

interface CartProductProps {
  item: GetCartProduct;
  handleRemoveItem: (id: string, setLoading: (x: boolean) => void) => void;
  handleUpdateCount: (id: string, newCount: number) => void;
  handleMoveToWishList: (id: string, setLoading: (x: boolean) => void) => void;
}

export default function CartProductCard({
  item,
  handleMoveToWishList,
  handleRemoveItem,
  handleUpdateCount,
}: CartProductProps) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isMovingToWish, setIsMovingToWish] = useState<boolean>(false);
  const [productCount, setProductCount] = useState<number>(item.count);

  function updateCount(count: number) {
    setProductCount(count);
    handleUpdateCount(item.product._id, count);
  }

  return (
    <Card
      key={item._id}
      className="overflow-hidden hover:shadow-lg transition-all duration-300 py-0"
    >
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <div className="relative">
              <Link href={`/products/${item.product._id}`}>
                <Image
                  src={item.product.imageCover}
                  alt={item.product.title}
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
                    {item.product.category.name}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {item.product.brand.name}
                  </Badge>
                </div>

                <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                  <Link href={`/products/${item.product._id}`}>
                    {item.product.title}
                  </Link>
                </h3>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {renderStars(item.product.ratingsAverage)}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {item.product.ratingsAverage}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <span className="text-blue-600 font-medium flex items-center gap-1">
                    <Truck className="w-3 h-3" />
                    Free Shipping
                  </span>
                </div>
              </div>

              {/* Price and Controls */}
              <div className="flex flex-col items-end space-y-4">
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">
                      {formatCurrency(item.price)}
                    </span>
                  </div>
                  {item.product.quantity > 1 && (
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(item.price * productCount)} total
                    </p>
                  )}
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        updateCount(productCount - 1);
                      }}
                      disabled={productCount == 1}
                      className="h-8 w-8 p-0 hover:bg-muted"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                      {productCount}
                    </span>
                    <Button
                      variant="ghost"
                      disabled={productCount == item.product.quantity}
                      size="sm"
                      onClick={() => {
                        updateCount(productCount + 1);
                      }}
                      className="h-8 w-8 p-0 hover:bg-muted"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    disabled={isMovingToWish}
                    size="sm"
                    onClick={() => {
                      handleMoveToWishList(item.product._id, setIsMovingToWish);
                    }}
                    className="flex items-center gap-1 hover:text-red-600 hover:border-red-300"
                  >
                    {isMovingToWish ? (
                      <Loader2 className="animate-spin size-4" />
                    ) : (
                      <Heart className="w-3 h-3" />
                    )}
                    <span className="hidden sm:inline">Wishlist</span>
                  </Button>
                  <Button
                    variant="outline"
                    disabled={isDeleting}
                    size="sm"
                    onClick={() => {
                      handleRemoveItem(item.product._id, setIsDeleting);
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
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
