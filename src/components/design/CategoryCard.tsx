import React from "react";
import { Button, Card, CardContent } from "../ui";
import Link from "next/link";
import Image from "next/image";
import { CategoryAndBrand } from "@/interfaces";

export default function CategoryCard({
  item,
  hrefPath,
  showTitle = true,
}: {
  item: CategoryAndBrand;
  hrefPath: "brands" | "categories";
  showTitle?: boolean;
}) {
  return (
    <Card className="border-0 shadow-none p-0">
      <CardContent className="relative flex aspect-square items-center justify-center p-0 h-52 rounded-2xl overflow-hidden border-0 shadow-[-2px_-2px_3px_#09c] w-full">
        <Button asChild>
          <Link href={`${hrefPath}/${item._id}`} className="w-full h-full p-0!">
            <Image
              width={500}
              height={500}
              src={item.image}
              alt={item.name}
              className="h-full w-full"
            />
            {showTitle && (
              <p className="absolute line-clamp-1 break-all bottom-0.5 font-bold font-albert-sans text-blue-800 shadow-[-2px_-2px_3px_#09c] bg-white/50 backdrop-blur-lg px-4 py-1 rounded-xl">
                {item.name}
              </p>
            )}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
