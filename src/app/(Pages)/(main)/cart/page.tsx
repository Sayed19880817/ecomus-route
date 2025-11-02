"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
  Truck,
  Shield,
  Info,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import {
  GetCartProduct,
  PaymentShippingAddressI,
  SingleAddress,
} from "@/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { storeDispatch, storeState } from "@/redux/store";
import LoadingComponent from "@/app/loading";
import { formatCurrency } from "@/helpers/formatCurrency";
import { getCartData, setCartDate } from "@/redux/slices/cartSlice";
import { removeFromCart } from "@/helpers/cart/removeFromCart";
import { clearCart } from "@/helpers/cart/clearCart";
import CartProductCard from "@/components/design/products/CartProductCard";
import { updateProductCountInCart } from "@/helpers/cart/updateProductCountInCart";
import { removeProductFromCartAction } from "@/actions/cart/removeProductFromCart.action";
import { AddToWishlist } from "@/helpers/wishlist/addToWishlist";
import { getWishlistData } from "@/redux/slices/wishlistSlice";
import { toast } from "sonner";
import { AddressSelectionDialog } from "@/components/design/account/AddressSelectionDialog";
import { apiServices } from "@/services";
import { onlinePaymentAction } from "@/actions/cart/onlinePayment.action";
import { cashPaymentAction } from "@/actions/cart/cashPayment.action";
import { useRouter } from "next/navigation";
// import {formatCurrency} from "@/helpers/formatCurrency"

export default function ShoppingCartPage() {
  // const [isDarkMode, setIsDarkMode] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  // const [isDeleting, setIsDeleting] = useState<string | null>(null);
  // const [isMovingToWish, setIsMovingToWish] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState<boolean>(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout>();
  const { cartData, isLoading: loadingCart } = useSelector(
    (state: storeState) => state.cart
  );
  const [cartItems, setCartItems] = useState<GetCartProduct[]>([]);
  const dispatch = useDispatch<storeDispatch>();

  const [userAddresses, setUserAddresses] = useState<SingleAddress[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<SingleAddress | null>(
    null
  );
  const [paymentShippingAddress, setPaymentShippingAddress] =
    useState<PaymentShippingAddressI | null>(null);
  const [isOpenAddressesDialog, setIsOpenAddressesDialog] = useState(false);
  const [isLoadingOnline, setIsLoadingOnline] = useState<boolean>(false);
  const [isLoadingCash, setIsLoadingCash] = useState<boolean>(false);
  const router = useRouter();

  useMemo(() => {
    if (
      cartData &&
      cartData?.data.products.length > 0 &&
      typeof cartData?.data.products[0].product == "string"
    ) {
      dispatch(getCartData());
    }
  }, [cartData?.data.products, dispatch]);

  async function getAddresses() {
    // setIsLoadingPage(true);
    const response = await apiServices.GetUserAddresses();
    if (response.status == "success") {
      setUserAddresses(response.data);
      if (response.data.length != 0) {
        setSelectedAddress(response.data[0]);
      }
    }
    // setIsLoadingPage(false);
  }

  useEffect(() => {
    document.title = "Cart - Ecomus";
    getAddresses();
  }, []);

  useEffect(() => {
    if (selectedAddress != null) {
      const shippingAddress = {
        details: selectedAddress.details,
        phone: selectedAddress.phone,
        city: selectedAddress.city,
      };
      setPaymentShippingAddress(Object(shippingAddress));
      console.log(paymentShippingAddress);
    }
  }, [selectedAddress]);

  // if (
  //   cartData &&
  //   cartData?.data.products.length > 0 &&
  //   typeof cartData?.data.products[0].product == "string"
  // ) {
  //   dispatch(getCartData());
  // }

  useEffect(() => {
    if (
      cartData &&
      cartData?.data.products.length > 0 &&
      typeof cartData?.data.products[0].product !== "string"
    ) {
      setCartItems(cartData?.data.products);
    }
    // if (typeof cartData?.data.products[0].product == "string") {
    //   setCartItems(cartData?.data.products);
    // }
  }, [cartData]);

  const updateCount = async (id: string, newQuantity: number) => {
    clearTimeout(timerId);
    const timer = setTimeout(async () => {
      const response = await updateProductCountInCart(id, newQuantity);
      if (response?.status == "success") {
        dispatch(getCartData());
      }
    }, 1000);
    setTimerId(timer);
  };

  const removeItem = async (id: string, setLoading: (x: boolean) => void) => {
    setLoading(true);
    if (cartData && cartData?.numOfCartItems > 1) {
      const response = await removeFromCart(id);
      if (response?.status == "success") {
        dispatch(setCartDate(response));
      }
    } else {
      clearAllCart();
    }
    setLoading(true);
  };

  const clearAllCart = async () => {
    // setCartItems((items) => items?.filter((item) => item._id !== id));
    setIsClearing(true);
    const response = await clearCart();
    if (response?.message == "success") {
      dispatch(getCartData());
      setCartItems([]);
    }
    setIsClearing(false);
  };

  const moveToWishlist = async (
    id: string,
    setLoading: (x: boolean) => void
  ) => {
    setLoading(true);
    const response = await removeProductFromCartAction(id);
    if (response.status == "success") {
      await AddToWishlist(id);
      await dispatch(getWishlistData());
      await dispatch(getCartData());
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setPromoApplied(true);
      setPromoCode("");
    }
  };

  // Address functions
  const handleAddressSelect = (address: SingleAddress) => {
    setSelectedAddress(address);
  };

  // Payment Methods
  async function handleOnlinePayment() {
    setIsLoadingOnline(true);
    const response = await onlinePaymentAction(
      String(cartData?.cartId),
      paymentShippingAddress!
    );
    if ("session" in response) {
      location.href = String(response.session?.url);
    }
    setIsLoadingOnline(false);
  }
  async function handleCashPayment() {
    setIsLoadingCash(true);
    const response = await cashPaymentAction(
      String(cartData?.cartId),
      paymentShippingAddress!
    );
    if ("data" in response) {
      toast.success(response.status, {
        description: "Cash Order Done.",
      });
      router.push("/account/orders");
      await dispatch(getCartData());
    } else {
      toast.error(response.message);
    }
    setIsLoadingCash(false);
  }

  const subtotal = cartItems?.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  const discount = promoApplied ? subtotal! * 0.1 : 0;
  const total = subtotal;

  if (
    (loadingCart && cartItems.length == 0) ||
    (cartData &&
      cartData?.data.products.length > 0 &&
      typeof cartData?.data.products[0].product == "string")
  ) {
    return <LoadingComponent title="your Cart" />;
  }

  return (
    <div className={`container min-h-screen transition-colors duration-300`}>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="px-4 sm:px-2 py-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl leading-normal font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Shopping Cart
              </h1>
              <p className="text-muted-foreground mt-2">
                {cartItems!.length} {cartItems!.length === 1 ? "item" : "items"}{" "}
                in your cart
              </p>
            </div>
            {cartItems.length > 0 && (
              <Button
                variant={"destructive"}
                disabled={isClearing}
                onClick={() => clearAllCart()}
              >
                {isClearing ? (
                  <>
                    <Loader2 className="animate-spin size-4" /> Clearing Cart
                  </>
                ) : (
                  <>
                    <Trash2 className="size-4" />
                    Clear Cart
                  </>
                )}
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-8 space-y-6">
              {cartItems!.length === 0 ? (
                <Card className="border-2 border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <ShoppingBag className="w-16 h-16 text-muted-foreground/50 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-muted-foreground text-center mb-6">
                      Looks like you haven&apos;t added any items to your cart
                      yet.
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
                cartItems?.map((item) => (
                  <CartProductCard
                    key={item.product._id}
                    item={item}
                    handleMoveToWishList={moveToWishlist}
                    handleRemoveItem={removeItem}
                    handleUpdateCount={updateCount}
                  />
                ))
              )}

              {/* Continue Shopping */}
              {cartItems.length != 0 && (
                <Card>
                  <CardContent className="">
                    <Button asChild variant="outline" className="w-full">
                      <Link href={"/products"}>Continue Shopping</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="sticky top-28">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Promo Code */}
                  <div className="space-y-3">
                    <Label htmlFor="promo" className="text-sm font-medium">
                      Promo Code
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="promo"
                        placeholder="Enter code (try SAVE10)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-grow"
                      />
                      <Button
                        onClick={applyPromoCode}
                        disabled={!promoCode}
                        variant="outline"
                      >
                        Apply
                      </Button>
                    </div>
                    {promoApplied && (
                      <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
                        <Info className="w-4 h-4 text-green-600" />
                        <AlertDescription className="text-green-800 dark:text-green-200">
                          Promo code applied! You saved 10%
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>
                        Subtotal (
                        {cartItems!.reduce((sum, item) => sum + item.count, 0)}{" "}
                        items)
                      </span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>

                    {promoApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount (10%)</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-green-500">Free</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Button
                    className="w-full h-12 text-white text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    disabled={cartItems!.length === 0}
                    onClick={() => setIsOpenAddressesDialog(true)}
                  >
                    Proceed to Pay
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  {/* Security Info */}
                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      <span>Secure</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Truck className="w-3 h-3" />
                      <span>Fast Delivery</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <AddressSelectionDialog
            addresses={userAddresses}
            onAddressSelect={handleAddressSelect}
            isOpenAddressesDialog={isOpenAddressesDialog}
            setIsOpenAddressesDialog={setIsOpenAddressesDialog}
            selectedAddress={selectedAddress}
            handleOnlinePayment={handleOnlinePayment}
            handleCashPayment={handleCashPayment}
            isLoadingCash={isLoadingCash}
            isLoadingOnline={isLoadingOnline}
          />
        </div>
      </div>
    </div>
  );
}
