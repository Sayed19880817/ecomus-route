import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui";
import Link from "next/link";

interface NavDropdownProps {
  title: string;
  items: {
    name: string;
    href: string;
  }[];
}

export default function NavDropdown({ title, items }: NavDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="py-3 px-4 text-gray-200 hover:text-white hover:bg-gray-200/20 dark:hover:bg-gray-200/20 font-medium flex items-center focus:border-none!"
        >
          {title}
          <svg
            className="ml-1 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-56">
        {items.map((item) => (
          <DropdownMenuItem key={item.name} asChild>
            <Link href={item.href} className="cursor-pointer">
              {item.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
