import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/interfaces";
import Link from "next/link";
import { renderStars } from "@/helpers/renderStars";
import { cn } from "@/lib/utils";
import { AddToWishlist } from "@/helpers/wishlist/addToWishlist";
import { useDispatch, useSelector } from "react-redux";
import { storeDispatch, storeState } from "@/redux/store";
import { deleteFromWishlist } from "@/helpers/wishlist/deleteFromWishlist";
import { getWishlistData } from "@/redux/slices/wishlistSlice";

interface ProductCardListProps {
  product: Product;
  setIsOpenDialog: (a: boolean) => void;
  setCurrentProduct: (product: Product) => void;
  // onAddToCart: (product: Product) => void;
  // onAddToWishlist: (productId: string) => void;
}

const ProductCardList = ({
  product,
  setCurrentProduct,
  setIsOpenDialog,
}: // onAddToCart,
// onAddToWishlist,
ProductCardListProps) => {
  const { wishlistData } = useSelector((state: storeState) => state.wishlist);
  const dispatch = useDispatch<storeDispatch>();
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const desc = useRef<HTMLParagraphElement>(null);

  const handleWishlistClick = async () => {
    if (isWishlisted) {
      setIsWishlisted(!isWishlisted);
      await deleteFromWishlist(product._id);
    } else {
      setIsWishlisted(!isWishlisted);
      await AddToWishlist(product._id);
    }
    await dispatch(getWishlistData());
  };

  useEffect(() => {
    wishlistData?.data.forEach((item) => {
      if (item._id == product._id) {
        setIsWishlisted(true);
      }
    });
  }, [wishlistData]);

  useEffect(() => {
    desc.current!.innerHTML = product.description
      .replace(/\n/g, ` <br /> `)
      .replace(/\t/g, ": ");
  }, []);

  return (
    <Card
      className="w-full group p-4 h-full transition-all duration-300 shadow-none hover:shadow-md shadow-blue-400 border-gray-200 dark:bg-slate-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        {/* Image container */}
        <div className="relative md:w-1/4 object-contain h-56 rounded-2xl overflow-hidden flex justify-center items-center">
          <Link href={`products/${product._id}`}>
            <Image
              src={product.imageCover}
              alt={product.title}
              width={200}
              height={200}
              className={cn(
                "w-full h-full transition-all duration-500 rounded-2xl",
                isHovered && "scale-105"
              )}
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.sold > 2000 && (
              <Badge className="bg-green-600 text-xs text-white">
                Best Seller
              </Badge>
            )}
          </div>

          {/* Wishlist button */}
          <Button
            variant="secondary"
            size="icon"
            className={`absolute top-2 right-2 transition-all duration-300 ${
              isHovered || isWishlisted
                ? "opacity-100 scale-100"
                : "opacity-0 scale-90"
            }`}
            onClick={handleWishlistClick}
          >
            <Heart
              className={`h-4 w-4  ${
                isWishlisted ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
        </div>

        <CardContent className="p-0 flex-1 flex flex-col justify-between">
          <div>
            {/* Product name */}
            <Link
              href={`/products/${product._id}`}
              className="font-bold text-lg text-gray-900 mb-2 line-clamp-1 dark:text-white"
            >
              {product.title}
            </Link>

            {/* Product description/details */}
            <div className="text-sm text-gray-600 mb-3 dark:text-gray-300">
              <p className="line-clamp-2" ref={desc}></p>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-2">
              <div className="flex mr-1">
                {renderStars(product.ratingsAverage)}
              </div>
              <span className="text-xs text-gray-500">
                {product.ratingsAverage} ({product.ratingsQuantity})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center mb-3">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {product.price.toFixed(2)} EGP
              </span>
            </div>

            {/* Brand and category */}
            <div className="flex flex-wrap items-center gap-2 mb-3 text-sm text-gray-500">
              <span className="font-normal">
                Brand:
                <Link
                  href={`/brands/${product.brand._id}`}
                  className="font-semibold font-mono text-blue-400 ml-2"
                >
                  {product.brand.name}
                </Link>
              </span>
              <span className="mx-1">•</span>
              <span className="font-normal">
                Category:
                <Link
                  href={`/categories/${product.category._id}`}
                  className="font-semibold font-mono text-blue-400 ml-2"
                >
                  {product.category.name}
                </Link>
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            {/* Add to cart button */}
            {/* <AddToCartBtn productId={product._id} /> */}
            <Button
              onClick={() => {
                setCurrentProduct(product);
                setIsOpenDialog(true);
              }}
              className="flex items-center justify-center gap-1 text-white bg-blue-600 hover:bg-blue-700 mb-3"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add to Cart</span>
            </Button>

            {/* Delivery option */}
            <div className="flex items-center justify-center">
              <Truck className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-xs font-medium text-green-600">
                Free Delivery
              </span>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default ProductCardList;
