"use client";

import { useState, useEffect, useCallback, useTransition } from "react";
import { Product } from "@/interfaces";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";
import { ProductsApiResponse } from "@/Types";
import ProductCard2 from "@/components/design/ProductCard2";
import { apiServices } from "@/services";
import ProductCardList from "@/components/design/ProductCardList";
import LoadingComponent from "@/app/loading";
import FilterSheet from "@/components/design/FilterSheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DynamicPagination from "@/components/design/DynamicPagination";
import { AddToCartDialog } from "./products/AddToCartDialog";

export default function ProductsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showValue, setShowValue] = useState<string>("10");
  const [pages, setPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product>();

  // Get current values from URL
  const urlLimit = searchParams.get("limit") || "10";
  const urlPage = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    // Set document title
    document.title = "Products - Ecomus";

    // Get viewMode from localStorage
    const storedViewMode = localStorage.getItem("viewMode");
    if (storedViewMode === "list" || storedViewMode === "grid") {
      setViewMode(storedViewMode);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  async function fetchProducts() {
    try {
      setLoading(true);
      window.scrollTo(0, 0);

      // const data: ProductsApiResponse = await apiServices.getSearchProducts(
      const data: ProductsApiResponse = await apiServices.getSearchProducts(
        searchParams,
        urlLimit
      );

      setProducts(data.data);
      setPages(data.metadata.numberOfPages);
      setCurrentPage(urlPage);
      setShowValue(urlLimit);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
      setPages(1);
    } finally {
      setLoading(false);
    }
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  function handlePageChange(page: number) {
    startTransition(() => {
      const queryString = createQueryString("page", page.toString());
      router.push(pathname + "?" + queryString);
    });
  }

  function handleLimitChange(limit: number) {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("limit", limit.toString());
      params.set("page", "1"); // Reset to first page

      router.push(pathname + "?" + params.toString());
    });
  }

  // Store viewMode in localStorage
  const toggleViewList = () => {
    const newViewMode = viewMode === "grid" ? "list" : "grid";
    setViewMode(newViewMode);
    localStorage.setItem("viewMode", newViewMode);
  };

  if (loading) {
    return <LoadingComponent variant="products" />;
  }

  return (
    <>
      {/* Features Section */}
      <div className="flex items-center justify-between mb-6">
        {/* Filter */}
        <div className="">
          <FilterSheet showSubCategories={true} />
        </div>

        {/* View Mode and show section */}
        <div className="flex justify-center items-center gap-4 md:gap-8">
          {/* Show selection */}
          <div className="flex justify-center items-center gap-2">
            <span>Show</span>
            <Select
              value={showValue}
              onValueChange={(num) => handleLimitChange(Number(num))}
              disabled={isPending}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="40">40</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* ViewMode Buttons */}
          <div className="flex items-center border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={toggleViewList}
              className="rounded-r-none"
              disabled={isPending}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={toggleViewList}
              className="rounded-l-none"
              disabled={isPending}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Loading overlay for transitions */}
      {isPending && (
        <div className="relative">
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      )}

      {/* Display Products */}
      {viewMode === "grid" ? (
        // Products Grid
        <div
          className={`grid gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ${
            isPending ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          {products.map((product) => (
            <ProductCard2
              key={product._id}
              product={product}
              setIsOpenDialog={setIsOpenDialog}
              setCurrentProduct={setCurrentProduct}
              // onAddToCart={handleAddToCart}
              // onAddToWishlist={AddToWishlist}
            />
          ))}
        </div>
      ) : (
        // Product List
        <div
          className={`grid gap-4 grid-cols-1 ${
            isPending ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          {products.map((product) => (
            <ProductCardList
              key={product._id}
              product={product}
              setIsOpenDialog={setIsOpenDialog}
              setCurrentProduct={setCurrentProduct}
              // onAddToCart={handleAddToCart}
              // onAddToWishlist={AddToWishlist}
            />
          ))}
        </div>
      )}

      {/* Handle No products */}
      {products.length === 0 && !loading && (
        <h3 className="text-destructive text-4xl text-center font-mono font-semibold py-10">
          No Products Found
        </h3>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div className="mt-8">
          <DynamicPagination
            currentPage={currentPage}
            totalPages={pages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
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
