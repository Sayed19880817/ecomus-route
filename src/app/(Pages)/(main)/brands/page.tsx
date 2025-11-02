"use client";

import { useState, useEffect } from "react";
import { CategoryAndBrand } from "@/interfaces";
import { CategoriesApiResponse } from "@/Types";
import { apiServices } from "@/services";
import LoadingComponent from "@/app/loading";
import CategoryCard from "@/components/design/CategoryCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components";

export default function Brands() {
  const [brands, setBrands] = useState<CategoryAndBrand[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchAllBrands(): Promise<void> {
    setLoading(true);
    const allBrands: CategoryAndBrand[] = [];
    const brands = await apiServices.getAllBrands();
    allBrands.push(...brands.data);
    let currentPage: number = Number(brands.metadata.currentPage);
    while (currentPage != brands.metadata.numberOfPages) {
      allBrands.push(
        ...(await apiServices.getAllBrands(Number(brands.metadata.nextPage)))
          .data
      );
      currentPage++;
    }
    setBrands(allBrands);
    setLoading(false);
  }

  function letterBrands(char: string) {
    const newArr = brands.filter((brand) => brand.name.startsWith(char));
    return newArr;
  }

  useEffect(() => {
    document.title = "Brands - Ecomus";
    fetchAllBrands();
    window.scroll(0, 0);
  }, []);

  if (loading && brands.length === 0) {
    return <LoadingComponent title="Brands" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center bg-foreground/5 py-4 rounded-3xl animate-roundedShadow">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 uppercase tracking-wide font-albert-sans">
          Brands
        </h1>
        <p className="text-muted-foreground">
          Discover amazing products from our collection
        </p>
      </div>

      <Tabs defaultValue="all" className="">
        <TabsList className="gap-2 flex-wrap bg-transparent h-fit mb-5">
          {/* <TabsTrigger value="all">All Brands</TabsTrigger> */}
          <TabsTrigger
            asChild
            value="all"
            className="grow-0 data-[state=active]:bg-blue-500 data-[state=active]:text-white dark:data-[state=active]:bg-blue-500 dark:data-[state=active]:text-white"
          >
            <Button variant={"outline"} size={"default"}>
              All Brands
            </Button>
          </TabsTrigger>
          {Array.from({ length: 26 }, (_, index) => (
            <TabsTrigger
              asChild
              key={index}
              value={String.fromCharCode(65 + index)}
              className="grow-0 data-[state=active]:bg-blue-500 data-[state=active]:text-white dark:data-[state=active]:bg-blue-500 dark:data-[state=active]:text-white"
            >
              <Button
                variant={"outline"}
                size={"icon"}
                disabled={
                  letterBrands(String.fromCharCode(65 + index)).length == 0
                }
              >
                {String.fromCharCode(65 + index)}
              </Button>
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="all">
          <div
            className={`grid gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`}
          >
            {brands.map((brand) => (
              <CategoryCard
                key={brand._id}
                item={brand}
                hrefPath="brands"
                showTitle={false}
              />
            ))}
          </div>
        </TabsContent>
        {Array.from({ length: 26 }, (_, index) => (
          <TabsContent key={index} value={String.fromCharCode(65 + index)}>
            <div
              className={`grid gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`}
            >
              {brands.map(
                (brand) =>
                  brand.name.startsWith(String.fromCharCode(65 + index)) && (
                    <CategoryCard
                      key={brand._id}
                      item={brand}
                      hrefPath="brands"
                      showTitle={false}
                    />
                  )
              )}
            </div>
          </TabsContent>
        ))}
        {/* <TabsContent value="password">Change your password here.</TabsContent> */}
      </Tabs>

      {/* Display Brands */}
      {/* <div
        className={`grid gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`}
      >
        {brands.map((brand) => (
          <CategoryCard
            key={brand._id}
            item={brand}
            hrefPath="brands"
            showTitle={false}
          />
        ))}
      </div> */}

      {/* Handle No products */}
      {brands.length == 0 && (
        <h3 className="text-destructive text-4xl text-center font-mono font-semibold py-10">
          No Brands Found
        </h3>
      )}
    </div>
  );
}
