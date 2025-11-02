"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import NavHeader from "./NavHeader";
import NavMobileMenu from "./NavMobileMenu";
import NavSearch from "./NavSearch";
import Logo from "@/components/design/Logo";
import NavCartOrWish from "./NavCartOrWish";
import { Heart, ShoppingCart } from "lucide-react";
import NavUserSection from "./NavUserSection";
import { Button } from "@/components/ui";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/design/ThemeToggler2";
import { useSession } from "next-auth/react";
import { storeDispatch, storeState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getCartData } from "@/redux/slices/cartSlice";
import { getWishlistData } from "@/redux/slices/wishlistSlice";

const Navbar4: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // const [cartItems, setCartItems] = useState(3);
  const pathname = usePathname();
  const session = useSession();
  const { isLoading: cartLoading, cartData } = useSelector(
    (store: storeState) => store.cart
  );
  const { isLoading: wishlistLoading, wishlistData } = useSelector(
    (store: storeState) => store.wishlist
  );
  const dispatch = useDispatch<storeDispatch>();
  // console.log("🚀 ~ Navbar4 ~ session:", session);

  const navMenuLinks = [
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "Brands", href: "/brands" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement actual search functionality
    alert(`Searching for: ${searchQuery}`);
    setSearchQuery("");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (session.status == "authenticated") {
      dispatch(getCartData());
      dispatch(getWishlistData());
    }
  }, [dispatch, session.status]);

  return (
    <>
      {!pathname.includes("auth") && (
        <>
          {/* Top header section */}
          <NavHeader />

          <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-md">
            {/* Main navbar */}
            <div className="container mx-auto px-4 sm:px-2">
              <div className="flex justify-between items-center h-16">
                {/* Logo and mobile menu button */}
                <div className="flex items-center">
                  <NavMobileMenu
                    cartItems={Number(cartData?.numOfCartItems)}
                    categories={navMenuLinks}
                    handleSearch={handleSearch}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    wishlistItems={4}
                  />
                  <Link
                    href="/"
                    className="text-2xl font-bold text-gray-900 dark:text-white"
                  >
                    <Logo />
                  </Link>
                </div>

                {/* Search bar - hidden on mobile, visible on medium screens and up */}
                <NavSearch
                  handleSearch={handleSearch}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />

                {/* Right side icons */}
                <div className="flex items-center space-x-2">
                  {/* Theme toggler */}
                  {/* <ThemeToggler /> */}
                  <ModeToggle />

                  {/* Wishlist */}
                  <NavCartOrWish
                    icon={<Heart />}
                    href="/wishlist"
                    items={Number(wishlistData?.count)}
                    isLoadingCart={wishlistLoading}
                    badgeVariant="destructive"
                  />

                  {/* Cart */}
                  <NavCartOrWish
                    icon={<ShoppingCart />}
                    href="/cart"
                    items={Number(cartData?.numOfCartItems)}
                    isLoadingCart={cartLoading}
                    badgeVariant="default"
                  />

                  {/* User section */}
                  <NavUserSection />
                </div>
              </div>
            </div>

            {/* Categories section */}
            {/* <NavDropdown items={categories} title="Categories" /> */}
            <div className="mx-auto px-4 py-1 hidden md:block bg-gradient-to-r from-blue-950 to-blue-800">
              <NavigationMenu className="flex justify-center items-center gap-3">
                <NavigationMenuList className="flex gap-3">
                  {navMenuLinks.map((link) => {
                    const isActive = pathname.startsWith(link.href);
                    return (
                      <NavigationMenuItem key={link.href}>
                        {/* <NavigationMenuLink> */}
                        <Button
                          asChild
                          variant="ghost"
                          className={cn(
                            "py-3 px-4 text-gray-200 hover:text-white hover:bg-gray-200/20 dark:hover:bg-gray-200/20 font-medium flex items-center focus:border-none!",
                            isActive
                              ? "bg-primary/50 drop-shadow-md text-white shadow-md font-semibold"
                              : ""
                          )}
                        >
                          <Link href={link.href}>{link.name}</Link>
                        </Button>
                        {/* </NavigationMenuLink> */}
                      </NavigationMenuItem>
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenu>
              {/* <div className="flex justify-center items-center">
            {navMenuLinks.map((navLink, index) => {
              return (
                <NavigationMenuLink key={index}>
                  <Button
                    asChild
                    variant="ghost"
                    className="py-3 px-4 text-gray-200 hover:text-white hover:bg-gray-200/20 dark:hover:bg-gray-200/20 font-medium flex items-center focus:border-none!"
                  >
                    <Link href={navLink.href}>{navLink.name}</Link>
                  </Button>
                </NavigationMenuLink>
              );
            })}
          </div> */}
            </div>
          </nav>
        </>
      )}
    </>
  );
};

export default Navbar4;
