"use client";

import { useState, useEffect, useCallback } from "react";
import { CategoryAndBrand, Product } from "@/interfaces";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";
import { ProductsApiResponse } from "@/Types";
import ProductCard2 from "@/components/design/ProductCard2";
import { apiServices } from "@/services";
// import { handleAddToCart } from "@/helpers/addToCart";
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
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import DynamicPagination from "@/components/design/DynamicPagination";
import Image from "next/image";
import { AddToCartDialog } from "@/components/design/products/AddToCartDialog";

export default function SingleBrandProducts() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { brandId } = useParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [currentBrand, setCurrentBrand] = useState<CategoryAndBrand | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showValue, setShowValue] = useState<string>("10");
  const [pages, setPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const pageParam = searchParams.get("page");
    return pageParam ? parseInt(pageParam, 10) : 1;
  });
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product>();
  // console.log(searchParams.entries().toArray());

  // async function fetchCategoryProducts() {
  //   setLoading(true);
  //   const data: ProductsApiResponse = await apiServices.getAllProducts([
  //     { key: "limit", value: showValue },
  //     // { key: "page", value: page.toString() },
  //     { key: "category[in]", value: String(catId) },
  //   ]);
  //   setProducts(data.data);
  //   setLoading(false);
  //   setPages(data.metadata.numberOfPages);
  //   // setCurrentPage(page);
  // }
  async function fetchSearchProducts(showNum?: number) {
    setLoading(true);
    window.scroll(0, 0);
    // console.log(searchParams.toString());

    const data: ProductsApiResponse = await apiServices.getSearchProducts(
      searchParams,
      showNum ? showNum?.toString() : showValue,
      "brand",
      String(brandId)
    );
    setProducts(data.data);
    setLoading(false);
    setPages(data.metadata.numberOfPages);
    setCurrentPage(
      searchParams.has("page") ? parseInt(searchParams.get("page") ?? "1") : 1
    );
    // setCurrentPage(page);
  }

  async function fetchSingleCategoryData() {
    const data = await apiServices.getSpecificBrand(String(brandId));
    setCurrentBrand(data.data);
  }

  useEffect(() => {
    if (localStorage.getItem("viewMode") != null) {
      const mode = localStorage.getItem("viewMode");
      setViewMode(mode == "grid" ? "grid" : "list");
    }
    fetchSingleCategoryData();
    // fetchCategoryProducts(); // Fetch initial products on mount, starting at page 1
    // window.scroll(0, 0);
    // fetchSearchProducts(10);
  }, []);

  useEffect(() => {
    document.title = currentBrand?.name + " - " + "Products - Ecomus";
  }, [currentBrand]);

  useEffect(() => {
    fetchSearchProducts();
  }, [searchParams]);

  const createQueryString = useCallback(
    (name: string, value: string, newParams?: string) => {
      const params = new URLSearchParams(
        newParams ? newParams.toString() : searchParams.toString()
      );
      params.set(name, value);
      // console.log(params.toString());

      return params.toString();
    },
    [searchParams]
  );

  function handlePageChange(page: number): string {
    // url.searchParams.append("page", currentPage.toLocaleString());
    // url.searchParams.append("category[in]", "6439d58a0049ad0b52b9003f");
    // console.log(url.searchParams.entries().toArray());
    // console.log(pathname);

    router.push(pathname + "?" + createQueryString("page", page.toString()));
    // router.push(pathname + "?" + "page=5", {
    //   scroll: true,
    // });
    setCurrentPage(page);
    // console.log(currentPage);
    // console.log(page);

    // if (searchParams.toString()) {
    // }
    // fetchSearchProducts();
    // else {
    //   fetchProducts(page);
    // }

    return searchParams.toString();
  }

  function handleLimitChange(limit: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (params.has("page")) {
      params.set("page", "1");
      setCurrentPage(1);
    }
    router.push(
      pathname +
        "?" +
        createQueryString("limit", limit.toString(), params.toString())
    );
    // fetchSearchProducts();
    setShowValue(limit.toString());
  }

  // store viewMode in localStorage
  const toggleViewList = () => {
    if (viewMode == "grid") {
      setViewMode("list");
      localStorage.setItem("viewMode", "list");
    } else {
      setViewMode("grid");
      localStorage.setItem("viewMode", "grid");
    }
  };

  if (loading && products.length === 0) {
    return <LoadingComponent title="Products" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex gap-8 justify-center items-center bg-foreground/5 p-4 rounded-3xl animate-roundedShadow">
        <Image
          src={currentBrand!.image}
          alt={currentBrand!.name}
          width={500}
          height={500}
          className="w-32 h-32 rounded-2xl"
        />
        <div className="">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 uppercase tracking-wide font-albert-sans">
            {currentBrand!.name}
          </h2>
          <p className="text-muted-foreground">
            Discover amazing products from our collection
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="flex items-center justify-between mb-6">
        {/* Filter */}
        <div className="">
          <FilterSheet showCategories={false} showBrands={false} />
        </div>

        {/* View Mode and show section */}
        <div className="flex justify-center items-center gap-4 md:gap-8">
          {/* Show selection */}
          <div className="flex justify-center items-center gap-2">
            <span>Show</span>
            <Select
              onValueChange={(num) => {
                // console.log(num);
                // fetchProducts(num);
                // setShowValue(num);
                handleLimitChange(Number(num));
              }}
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
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={toggleViewList}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Display Products */}
      {viewMode === "grid" ? (
        // Products Grid
        <div
          className={`grid gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`}
        >
          {products.map((product) => (
            <ProductCard2
              key={product._id}
              product={product}
              setIsOpenDialog={setIsOpenDialog}
              setCurrentProduct={setCurrentProduct}
              // onAddToCart={handleAddToCart}
              // onAddToWishlist={handleAddToWishlist}
            />
          ))}
        </div>
      ) : (
        // Product List
        <div className={`grid gap-4 grid-cols-1`}>
          {products.map((product) => (
            <ProductCardList
              key={product._id}
              product={product}
              setIsOpenDialog={setIsOpenDialog}
              setCurrentProduct={setCurrentProduct}
              // onAddToWishlist={handleAddToWishlist}
            />
          ))}
        </div>
      )}

      {/* Handle No products */}
      {products.length == 0 && (
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
    </div>
  );
}
