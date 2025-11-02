"use client";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Lock, MapPin, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const sidenavLinks = [
  {
    title: "Profile",
    icon: <User className="w-4 h-4 mr-3" />,
    link: "/account/profile",
  },
  {
    title: "Orders",
    icon: <ShoppingBag className="w-4 h-4 mr-3" />,
    link: "/account/orders",
  },
  {
    title: "Addresses",
    icon: <MapPin className="w-4 h-4 mr-3" />,
    link: "/account/addresses",
  },
  {
    title: "Change Password",
    icon: <Lock className="w-4 h-4 mr-3" />,
    link: "/account/change-password",
  },
];

export default function SidenavLinks() {
  const pathname = usePathname();
  const active =
    "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400";
  return (
    <>
      {sidenavLinks.map((link) => {
        const isActive = pathname.includes(link.link);
        return (
          <Button
            key={link.title}
            asChild
            variant="ghost"
            className={cn("w-full justify-start", isActive && active)}
          >
            <Link href={link.link}>
              {link.icon}
              {link.title}
            </Link>
          </Button>
        );
      })}
    </>
  );
}
