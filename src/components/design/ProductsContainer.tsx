// app/page.tsx (example usage)
"use client";

import { useState } from "react";
import { AddToCartDialog } from "./products/AddToCartDialog";
// import ProductCard, { Product } from "./ProductCard";
// import ProductCard2 from "./ProductCard2";
import ProductsSlider from "./ProductsSlider";
import { Product } from "@/interfaces";

// import ProductCard, { Product } from "@/components/product-card"

export default function ProductsContainer() {
  // const [currentPage, setCurrentPage] = useState<number>(1);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product>();
  return (
    <>
      <ProductsSlider
        sortValue="-sold"
        sectionTitle="Best Seller"
        setCurrentProduct={setCurrentProduct}
        setIsOpenDialog={setIsOpenDialog}
        // handleAddToCart={handleAddToCart}
        // handleAddToWishlist={handleAddToWishlist}
      />
      <ProductsSlider
        sortValue="-ratingsAverage"
        sectionTitle="Best Rating"
        setCurrentProduct={setCurrentProduct}
        setIsOpenDialog={setIsOpenDialog}
        // handleAddToCart={handleAddToCart}
        // handleAddToWishlist={handleAddToWishlist}
      />
      <ProductsSlider
        sortValue="quantity"
        sectionTitle="Last Items"
        setCurrentProduct={setCurrentProduct}
        setIsOpenDialog={setIsOpenDialog}
        // handleAddToCart={handleAddToCart}
        // handleAddToWishlist={handleAddToWishlist}
      />
      {currentProduct && (
        <AddToCartDialog
          isOpenDialog={isOpenDialog}
          setIsOpenDialog={setIsOpenDialog}
          product={currentProduct!}
        />
      )}
    </>
  );
}
