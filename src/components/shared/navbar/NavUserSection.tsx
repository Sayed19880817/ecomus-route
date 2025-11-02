"use client";
import { Button } from "@/components/ui";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";

export default function NavUserSection() {
  const session = useSession();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="outline-0!" variant="ghost">
            <svg
              className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            {session.status == "authenticated" && (
              <p className="font-semibold text-sm hidden md:block">
                Hi{" "}
                <span className="font-normal">
                  {session.data.user.name.split(" ", 1)}
                </span>
              </p>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-36" align="end">
          {session.status == "authenticated" && (
            <>
              <DropdownMenuLabel className="hidden md:block">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuLabel className="block md:hidden">
                Hi{" "}
                <span className="font-normal">
                  {session?.data.user.name.split(" ", 1)}
                </span>
              </DropdownMenuLabel>
            </>
          )}
          <DropdownMenuGroup>
            {session.status == "authenticated" ? (
              <>
                <DropdownMenuItem asChild>
                  <Link href={"/account/profile"}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={"/account/orders"}>All Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={"/account/addresses"}>Addresses</Link>
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem asChild>
                  <Link href="/auth/register">Register</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/auth/login">Login</Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              target="_blank"
              href={"https://github.com/IbrahimEissa98?tab=repositories"}
            >
              GitHub
            </Link>
          </DropdownMenuItem>
          {session.status == "authenticated" && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                Log out
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* {session.status == "authenticated" && (
        <p className="font-semibold text-xs">
          Hi{" "}
          <span className="font-normal">
            {session.data.user.name?.split(" ", 1)}
          </span>
        </p>
      )} */}
    </>
  );
}
