"use client";

// import Autoplay from "embla-carousel-autoplay";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui";
import { Product } from "@/interfaces";
import { ProductsApiResponse } from "@/Types";
import { apiServices } from "@/services";
import ProductCard2 from "./ProductCard2";

interface ProductsSliderProps {
  sortValue: string;
  sectionTitle: string;
  setCurrentProduct: (product: Product) => void;
  setIsOpenDialog: (x: boolean) => void;
  // handleAddToCart: (Product: Product) => void;
  // handleAddToWishlist: (Product: Product) => void;
}

export default function ProductsSlider({
  sortValue,
  sectionTitle,
  setCurrentProduct,
  setIsOpenDialog,
}: ProductsSliderProps) {
  const [products, setProducts] = useState<Product[]>([]);

  // Motion guide
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-20% 0px",
  });

  // Carousel Auto play
  // const plugin = useRef(Autoplay({ delay: 1500, stopOnInteraction: true }));

  async function getAllProducts(): Promise<void> {
    const response: ProductsApiResponse = await apiServices.getAllProducts([
      { key: "sort", value: sortValue },
      { key: "limit", value: "10" },
    ]);
    setProducts(response.data);
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  // const handleAddToCart = (product: Product) => {
  //   console.log("Added to cart:", product);
  //   // Add your cart logic here
  // };

  // const handleAddToWishlist = (product: Product) => {
  //   console.log("Added to wishlist:", product);
  //   // Add your wishlist logic here
  // };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="container py-6 px-4 md:px-0!"
    >
      {/*  Categories Section */}
      <Carousel
        opts={{
          align: "end",
        }}
        className="w-full p-5 group relative before:absolute bg-gradient-to-b from-60% from-blue-400 dark:from-blue-900 to-70% rounded-2xl overflow-hidden before:rounded-2xl before:w-full before:h-full"
        // plugins={[plugin.current]}
        // onMouseEnter={plugin.current.stop}
        // onMouseLeave={() => plugin.current.play(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="13.26 379.45 1032.42 317.09"
          className="lg:w-[400px] w-[250px] rotate-180 fill-white dark:fill-background absolute -top-8 lg:-top-12 left-1/2 -translate-x-1/2"
        >
          <path d="M1045.68,632.84h-59.01c-67.9,0-122.94-55.04-122.94-122.94h0c0-69.84-56.61-126.45-126.45-126.45h-389.89c-69.84,0-126.45,56.61-126.45,126.45h0c0,67.9-55.04,122.94-122.94,122.94h-63.69v63.7h1011.36v-63.7Z"></path>
        </svg>
        <h2 className="absolute top-2 lg:top-5 left-1/2 -translate-x-1/2 z-10 text-lg md:text-2xl font-extrabold font-mono text-blue-800 dark:text-white">
          {sectionTitle}
        </h2>
        <CarouselContent className="pt-10 md:pt-20 relative">
          {products?.map(
            (product) =>
              product.sold != null && (
                <CarouselItem
                  key={product._id}
                  className="shadow-none basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <div className="shadow-none h-full">
                    <ProductCard2
                      key={product._id}
                      product={product}
                      setIsOpenDialog={setIsOpenDialog}
                      setCurrentProduct={setCurrentProduct}
                      // onAddToWishlist={AddToWishlist}
                    />
                  </div>
                </CarouselItem>
              )
          )}
        </CarouselContent>
        <CarouselPrevious className="absolute hidden group-hover:flex left-2 bg-white/50 text-blue-500 hover:text-blue-700" />
        <CarouselNext className="absolute hidden group-hover:flex right-2 bg-white/50 text-blue-500 hover:text-blue-700" />
      </Carousel>
    </motion.div>
  );
}
