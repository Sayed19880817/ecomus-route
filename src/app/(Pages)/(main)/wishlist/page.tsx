"use client";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
// import { Product } from "@/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { storeDispatch, storeState } from "@/redux/store";
import LoadingComponent from "@/app/loading";
// import { setWishlistDate } from "@/redux/slices/wishlistSlice";
// import { removeFromWishlist } from "@/helpers/wishlist/removeFromwishlist";
import WishlistProductCard from "@/components/design/products/WishlistProductCard";
import { getWishlistData } from "@/redux/slices/wishlistSlice";
import { deleteFromWishlist } from "@/helpers/wishlist/deleteFromWishlist";
import { deleteFromWishlistAction } from "@/actions/wishlist/deleteFromWishlist.action";
import { AddToCart } from "@/helpers/cart/addToCart";
import { getCartData } from "@/redux/slices/cartSlice";
import { toast } from "sonner";

export default function WishListPage() {
  const { wishlistData, isLoading: loadingWishlist } = useSelector(
    (state: storeState) => state.wishlist
  );
  const dispatch = useDispatch<storeDispatch>();

  const removeItem = async (id: string, setLoading: (x: boolean) => void) => {
    setLoading(true);
    const response = await deleteFromWishlist(id);
    if (response?.status == "success") {
      dispatch(getWishlistData());
    }
    setLoading(false);
  };

  const moveToCart = async (id: string, setLoading: (x: boolean) => void) => {
    setLoading(true);
    const response = await deleteFromWishlistAction(id);
    if (response.status == "success") {
      await AddToCart(id);
      await dispatch(getWishlistData());
      await dispatch(getCartData());
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  };

  if (loadingWishlist) {
    return <LoadingComponent title="your wishlist" />;
  }

  return (
    <div className={`container min-h-screen transition-colors duration-300`}>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="px-4 sm:px-2 py-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl leading-normal font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Your Wishlist
              </h1>
              <p className="text-muted-foreground mt-2">
                {wishlistData!.data.length}{" "}
                {wishlistData!.data.length === 1 ? "item" : "items"} in your
                wishlist
              </p>
            </div>
          </div>

          {/* wishlist Items */}
          <div className=" space-y-6">
            {wishlistData!.data.length === 0 ? (
              <Card className="border-2 border-dashed max-w-2xl mx-auto">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Heart className="w-16 h-16 text-muted-foreground/50 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    Your wishlist is empty
                  </h3>
                  <p className="text-muted-foreground text-center mb-6">
                    Looks like you haven&apos;t liked any items yet.
                  </p>
                  <Button
                    asChild
                    className="text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    <Link href={"/products"}>Continue Shopping</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {wishlistData?.data.map((item) => (
                  <WishlistProductCard
                    key={item._id}
                    item={item}
                    handleMoveToCart={moveToCart}
                    handleRemoveItem={removeItem}
                  />
                ))}
              </div>
            )}

            {/* Continue Shopping */}
            {wishlistData!.data.length != 0 && (
              <Card className="max-w-md mx-auto">
                <CardContent className="">
                  <Button asChild variant="outline" className="w-full">
                    <Link href={"/products"}>Continue Shopping</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
