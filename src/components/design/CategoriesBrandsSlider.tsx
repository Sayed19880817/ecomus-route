// "use client";
// "use cache";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { apiServices } from "@/services";
import { CategoriesApiResponse } from "@/Types";
import Image from "next/image";
// import { useEffect, useState } from "react";
import { Button } from "../ui";
import Link from "next/link";
// import * as React from "react";

export async function CategoriesBrandsSlider() {
  // const [categories, setCategories] = useState<CategoryAndBrand[]>([]);
  // const [brands, setBrands] = useState<CategoryAndBrand[]>([]);

  // const plugin = React.useRef(
  //     Autoplay({ delay: 2000, stopOnInteraction: false })
  //   );

  async function getAllCategories(): Promise<CategoriesApiResponse> {
    // "use cache";
    const response: CategoriesApiResponse =
      await apiServices.getAllCategories();
    // setCategories(response.data);
    console.log(response);

    return response;
  }

  const categories = (await getAllCategories()).data;
  // async function getAllBrands(): Promise<void> {
  //   const response: BrandsApiResponse = await apiServices.getAllBrands();
  //   setBrands(response.data);
  // }

  // useEffect(() => {
  //   getAllCategories();
  //   // getAllBrands();
  // }, []);

  return (
    <div className="container py-6 px-4 md:px-0!">
      {/*  Categories Section */}
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full relative before:absolute rounded-2xl shadow-[-3px_-3px_#09c] overflow-hidden before:rounded-2xl before:w-full before:h-full before:bg-gray-100 dark:before:bg-slate-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="13.26 379.45 1032.42 317.09"
          // fill="white"
          className="lg:w-[400px] w-[300px] rotate-180 fill-white dark:fill-slate-950 absolute -top-10 lg:-top-12 left-1/2 -translate-x-1/2"
        >
          <path d="M1045.68,632.84h-59.01c-67.9,0-122.94-55.04-122.94-122.94h0c0-69.84-56.61-126.45-126.45-126.45h-389.89c-69.84,0-126.45,56.61-126.45,126.45h0c0,67.9-55.04,122.94-122.94,122.94h-63.69v63.7h1011.36v-63.7Z"></path>
        </svg>
        <h2 className="absolute top-2 lg:top-5 left-1/2 -translate-x-1/2 z-10 text-2xl font-extrabold font-mono tracking-widest text-blue-800">
          Categories
        </h2>
        <CarouselContent className="pl-2 pt-20 relative">
          {categories?.map((category) => (
            <CarouselItem
              key={category._id}
              className="shadow-none p-2 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
            >
              <div className="p-1 shadow-none">
                <Card className="border-0 shadow-none p-0">
                  <CardContent className="relative flex aspect-square items-center justify-center p-0 h-40 rounded-2xl overflow-hidden border-0 shadow-[-2px_-2px_3px_#09c] w-full">
                    <Button asChild>
                      <Link
                        href={`categories/${category._id}`}
                        className="w-full h-full p-0!"
                      >
                        <Image
                          width={500}
                          height={500}
                          src={category.image}
                          alt={category.name}
                          className="h-full w-full"
                          loading="lazy"
                        />
                        <p className="absolute line-clamp-1 break-all bottom-0.5 font-bold font-albert-sans text-blue-800 shadow-[-2px_-2px_3px_#09c] bg-white/50 dark:bg-slate-900/50 backdrop-blur-lg px-4 py-1 rounded-xl">
                          {category.name}
                        </p>
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 bg-white/50 text-blue-500 hover:text-blue-700" />
        <CarouselNext className="absolute right-2 bg-white/50 text-blue-500 hover:text-blue-700" />
      </Carousel>
    </div>
  );
}
