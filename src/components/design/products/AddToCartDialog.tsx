"use client";
import React, { useState } from "react";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Product } from "@/interfaces";
import { AddToCart } from "@/helpers/cart/addToCart";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { storeDispatch } from "@/redux/store";
import { getCartData, setCartDate } from "@/redux/slices/cartSlice";
import { updateProductCountInCart } from "@/helpers/cart/updateProductCountInCart";

interface AddToCartDialogProps {
  product: Product;
  isOpenDialog: boolean;
  setIsOpenDialog: (a: boolean) => void;
  // onAddToCart: (productId: string, quantity: number) => void;
}

export function AddToCartDialog({
  product,
  isOpenDialog,
  setIsOpenDialog,
}: // onAddToCart,
AddToCartDialogProps) {
  const [quantity, setQuantity] = useState(1);

  const [isAdding, setIsAdding] = useState(false);
  const dispatch = useDispatch<storeDispatch>();
  // const {} = useSelector((store:storeState)=>store.cart)

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.quantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    // Simulate API call
    const data = await AddToCart(product.id);
    if (quantity > 1) {
      await updateProductCountInCart(product._id, quantity);
      await dispatch(getCartData());
    } else {
      dispatch(setCartDate(data));
    }
    setTimeout(() => {
      setIsAdding(false);
      setIsOpenDialog(false);
      setQuantity(1); // Reset quantity
    }, 800);
  };

  const totalPrice = product.price * quantity;

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogContent
        aria-describedby={undefined}
        className="max-w-4xl max-h-[90vh] overflow-hidden overflow-y-auto p-0 gap-0"
      >
        <div className="grid grid-cols-3 h-full">
          {/* Left Side - Product Images */}
          <div className="relative p-6 col-span-1">
            {/* Main Image */}
            <div className="aspect-square mb-4 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={product.imageCover}
                alt={product.title}
                width={100}
                height={100}
                className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
              />
            </div>
          </div>

          <div className="flex flex-col p-3 pt-10 overflow-y-auto col-span-2">
            <DialogHeader className="text-left pb-4">
              <DialogTitle className="text-2xl font-bold leading-tight mb-2">
                {product.title}
              </DialogTitle>
            </DialogHeader>

            {/* Price Section */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-bold text-primary">
                  {product.price.toFixed(2)}
                  <sub className="ms-2">EGP</sub>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="p-5 flex justify-center flex-col">
          <div className="flex items-center justify-between mb-3">
            <Label className="font-medium">Quantity:</Label>
            <span className="text-sm text-muted-foreground">
              Max: {product.quantity}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center border-2 border-border rounded-lg overflow-hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="h-10 w-10 hover:bg-muted rounded-none"
              >
                <Minus size={16} />
              </Button>
              <div className="flex items-center justify-center min-w-10 h-10 text-lg font-semibold bg-muted/50">
                {quantity}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= product.quantity}
                className="h-10 w-10 hover:bg-muted rounded-none"
              >
                <Plus size={16} />
              </Button>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold">
                {totalPrice.toFixed(2)}
                <sub className="ms-1">EGP</sub>
              </p>
              {quantity > 1 && (
                <p className="text-sm text-muted-foreground">
                  {product.price.toFixed(2)} <sub className="">EGP</sub> Each
                </p>
              )}
            </div>
          </div>
        </div>

        <Separator className="mb-2" />

        {/* Action Buttons */}
        <DialogFooter className="flex justify-center! items-center! p-3">
          <Button
            onClick={handleAddToCart}
            disabled={!product.quantity || isAdding}
            className="flex items-center gap-2 h-12 max-w-52 flex-1 bg-gradient-to-r text-white from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            {isAdding ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Adding to Cart...
              </>
            ) : (
              <>
                <ShoppingCart size={16} />
                Add ( {quantity} ) to Cart
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
