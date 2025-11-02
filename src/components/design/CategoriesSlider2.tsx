"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CategoryAndBrand } from "@/interfaces";
import { apiServices } from "@/services";
import { CategoriesApiResponse } from "@/Types";
import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { motion, useInView } from "framer-motion";
import CategoryCard from "./CategoryCard";

export function CategoriesSlider2() {
  const [categories, setCategories] = useState<CategoryAndBrand[]>([]);

  // Motion guide
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-20% 0px",
  });

  // Carousel Auto play
  const plugin = useRef(Autoplay({ delay: 1500, stopOnInteraction: false }));

  async function getAllCategories(): Promise<void> {
    const response: CategoriesApiResponse =
      await apiServices.getAllCategories();
    setCategories(response.data);
  }

  useEffect(() => {
    getAllCategories();
  }, []);

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
          align: "start",
        }}
        className="w-full group relative before:absolute rounded-2xl shadow-[-3px_-3px_#09c] overflow-hidden before:rounded-2xl before:w-full before:h-full before:bg-gray-200 dark:before:bg-slate-900"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={() => plugin.current.play(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="13.26 379.45 1032.42 317.09"
          className="lg:w-[400px] w-[300px] rotate-180 fill-white dark:fill-slate-950 absolute -top-10 lg:-top-12 left-1/2 -translate-x-1/2"
        >
          <path d="M1045.68,632.84h-59.01c-67.9,0-122.94-55.04-122.94-122.94h0c0-69.84-56.61-126.45-126.45-126.45h-389.89c-69.84,0-126.45,56.61-126.45,126.45h0c0,67.9-55.04,122.94-122.94,122.94h-63.69v63.7h1011.36v-63.7Z"></path>
        </svg>
        <h2 className="absolute top-2 lg:top-5 left-1/2 -translate-x-1/2 z-10 text-2xl font-extrabold font-mono tracking-widest text-blue-800 dark:text-white">
          Categories
        </h2>
        <CarouselContent className="pl-2 pt-20 relative">
          {categories?.map((category) => (
            <CarouselItem
              key={category._id}
              className="shadow-none p-2 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
            >
              <div className="p-1 shadow-none">
                <CategoryCard item={category} hrefPath="categories" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute hidden group-hover:flex left-2 bg-white/50 text-blue-500 hover:text-blue-700" />
        <CarouselNext className="absolute hidden group-hover:flex right-2 bg-white/50 text-blue-500 hover:text-blue-700" />
      </Carousel>
    </motion.div>
  );
}
