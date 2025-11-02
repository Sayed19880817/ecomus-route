"use client";
import Logo from "@/components/design/Logo";
import { Button } from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavMobileMenuProps {
  handleSearch: (e: React.FormEvent) => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  categories: { name: string; href: string }[];
  wishlistItems: number;
  cartItems: number;
}

export default function NavMobileMenu({
  handleSearch,
  searchQuery,
  setSearchQuery,
  categories,
  wishlistItems,
  cartItems,
}: NavMobileMenuProps) {
  const pathname = usePathname();
  const session = useSession();

  const closeSheet = () => {
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden p-0! text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mr-2"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h12M4 12h16M4 18h10"
            />
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="max-w-80 w-full p-0 max-h-screen overflow-y-auto"
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <Link href="/" onClick={closeSheet}>
              <Logo />
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="space-y-2 relative">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for anything"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full ps-7"
                />
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-gray-500 w-4" />
              </div>
              <Button type="submit" className="w-full">
                Search
              </Button>
            </form>

            {/* Mobile categories */}
            <div className="py-2 w-full border-t border-gray-200 dark:border-gray-700">
              {categories.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeSheet}
                    className={cn(
                      "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "hover:text-foreground hover:bg-accent"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile wishlist and cart */}
            <div className="space-y-2 pt-4 border-t">
              <SheetClose asChild>
                <Link
                  href="/wishlist"
                  className="flex items-center text-gray-700 dark:text-gray-300 py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  Wishlist
                  {wishlistItems > 0 && session.status == "authenticated" && (
                    <Badge variant="destructive" className="ml-2">
                      {wishlistItems}
                    </Badge>
                  )}
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/cart"
                  className="flex items-center text-gray-700 dark:text-gray-300 py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Cart
                  {cartItems > 0 && session.status == "authenticated" && (
                    <Badge variant="default" className="ml-2">
                      {cartItems}
                    </Badge>
                  )}
                </Link>
              </SheetClose>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
