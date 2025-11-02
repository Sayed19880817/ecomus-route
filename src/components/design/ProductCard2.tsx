"use client";
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
import { motion, useInView } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { storeDispatch, storeState } from "@/redux/store";
import { AddToWishlist } from "@/helpers/wishlist/addToWishlist";
import { getWishlistData } from "@/redux/slices/wishlistSlice";
import { deleteFromWishlist } from "@/helpers/wishlist/deleteFromWishlist";

interface ProductCardProps {
  product: Product;
  setIsOpenDialog: (a: boolean) => void;
  setCurrentProduct: (product: Product) => void;
  // onAddToCart: (product: Product) => void;
  // onAddToWishlist: (productId: string) => void;
}

const ProductCard2 = ({
  product,
  setIsOpenDialog,
  setCurrentProduct,
}: // onAddToCart,
// onAddToWishlist,
ProductCardProps) => {
  const { wishlistData } = useSelector((state: storeState) => state.wishlist);
  const dispatch = useDispatch<storeDispatch>();
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  // (() => {
  //   // wishlistData?.data.forEach((item) => {
  //   if (wishlistData) {
  //     for (let i = 0; i < wishlistData?.data.length; i++) {
  //       if (wishlistData.data[i]._id == product._id) return true;
  //     }
  //   }
  //   return false;
  // })()

  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-15% 0px",
  });

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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-full"
    >
      <Card
        className="w-full group gap-3 py-0 pb-3 h-full overflow-hidden transition-all duration-300 shadow-none hover:shadow-md shadow-blue-400 border-gray-200 dark:bg-slate-900"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      >
        <div className="relative">
          {/* Image container */}
          <div className="relative overflow-hidden flex justify-center items-center">
            <Link className="w-full h-full" href={`/products/${product._id}`}>
              <Image
                src={product.imageCover}
                alt={product.title}
                width={180}
                height={180}
                loading="eager"
                className={cn(
                  "w-full aspect-square transition-all duration-500",
                  isHovered && "scale-110"
                )}
              />
            </Link>
          </div>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.sold > 5000 && (
              <Badge className="bg-green-600 text-xs text-white">
                Best Seller
              </Badge>
            )}
            {(product.quantity == 0 || product.quantity == null) && (
              <Badge className="bg-destructive text-xs text-white">
                Out of Stock
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
              className={`h-4 w-4 ${
                isWishlisted ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
        </div>

        <CardContent className="px-3 h-full flex flex-col justify-between">
          <div>
            {/* Brand and category */}
            <div className="flex justify-between items-start mb-1">
              <Link
                href={`/brands/${product.brand._id}`}
                className="text-xs font-semibold text-blue-600 uppercase tracking-wide line-clamp-1"
              >
                {product.brand.name}
              </Link>
            </div>

            {/* Product name and description */}
            <Link
              href={`/products/${product._id}`}
              className="font-bold text-gray-900 mb-1 line-clamp-2 dark:text-white"
            >
              {product.title}
            </Link>
            {/* <p className="text-xs text-gray-600 mb-2 line-clamp-2 break-all dark:text-gray-300">
            {product.description}
          </p> */}

            {/* Rating */}
            <div className="flex items-center mb-2">
              <div className="flex mr-1">
                {renderStars(product.ratingsAverage)}
              </div>
              <span className="text-xs text-gray-500">
                {product.ratingsAverage} ({product.ratingsQuantity})
              </span>
            </div>

            {/* Sales info */}
            <div className="flex items-center mb-3">
              <span className="text-xs font-medium text-gray-900 dark:text-gray-200">
                {product.sold} sold
              </span>
              <div className="w-1 h-1 rounded-full bg-gray-400 mx-2"></div>
              <span className="text-xs font-medium text-green-600">
                +{Math.round(product.sold * 0.3).toLocaleString()}
              </span>
              <span className="text-xs text-gray-500 ml-1">46%</span>
            </div>

            {/* Price */}
            <div className="flex items-center mb-3">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {product.price.toFixed(2)} <sub>EGP</sub>
              </span>
            </div>
          </div>

          <div className="">
            <div className="w-full flex flex-col items-center">
              {/* Add to cart button */}
              {/* <AddToCartDialog product={product} /> */}
              <Button
                onClick={() => {
                  setCurrentProduct(product);
                  setIsOpenDialog(true);
                }}
                className="w-full flex items-center justify-center gap-1 text-white bg-blue-600 hover:bg-blue-700 mb-3"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Cart</span>
              </Button>
              {/* Delivery option */}
              <div className="flex items-center">
                <Truck className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-xs font-medium text-green-600">
                  Free Delivery
                </span>
                <Badge
                  variant="outline"
                  className="text-[0.6rem] ml-2 py-0 px-1.5 border-gray-300"
                >
                  Express
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard2;
