"use client";

import { useState, useEffect } from "react";
import { CategoryAndBrand } from "@/interfaces";
import { CategoriesApiResponse } from "@/Types";
import { apiServices } from "@/services";
import LoadingComponent from "@/app/loading";
import CategoryCard from "@/components/design/CategoryCard";

export default function Categories() {
  const [categories, setCategories] = useState<CategoryAndBrand[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchAllCategories(): Promise<void> {
    setLoading(true);
    const response: CategoriesApiResponse =
      await apiServices.getAllCategories();
    setCategories(response.data);
    setLoading(false);
  }

  useEffect(() => {
    document.title = "Categories - Ecomus";
    fetchAllCategories();
    window.scroll(0, 0);
  }, []);

  if (loading && Categories.length === 0) {
    return <LoadingComponent title="Categories" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center bg-foreground/5 py-4 rounded-3xl animate-roundedShadow">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 uppercase tracking-wide font-albert-sans">
          categories
        </h1>
        <p className="text-muted-foreground">
          Discover amazing products from our collection
        </p>
      </div>

      {/* Display Categories */}
      <div
        className={`grid gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`}
      >
        {categories.map((category) => (
          <CategoryCard
            key={category._id}
            item={category}
            hrefPath="categories"
          />
        ))}
      </div>

      {/* Handle No products */}
      {categories.length == 0 && (
        <h3 className="text-destructive text-4xl text-center font-mono font-semibold py-10">
          No Categories Found
        </h3>
      )}
    </div>
  );
}
