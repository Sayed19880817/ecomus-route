"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import slider1 from "@/assets/images/slider/slider5.jpeg";
import slider2 from "@/assets/images/slider/slider2.png";
import slider3 from "@/assets/images/slider/slider3.jpeg";
import slider4 from "@/assets/images/slider/slider4.png";
import slider5 from "@/assets/images/slider/slider1.png";
import preview1 from "@/assets/images/preview/preview1.jpg";
import preview2 from "@/assets/images/preview/preview2.jpg";
import preview3 from "@/assets/images/preview/preview3.jpeg";
import preview4 from "@/assets/images/preview/preview4.png";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const sliderImages = [slider1, slider2, slider3, slider4, slider5];
const previewImages = [preview1, preview2, preview3, preview4];

export function MainSliderHome() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

  return (
    <div className="bg-gray-200 dark:bg-slate-900 py-8">
      <div className="container">
        <Carousel
          plugins={[plugin.current]}
          className="w-full group relative before:absolute rounded-2xl shadow-[-5px_-5px_#09c] overflow-hidden before:rounded-2xl before:w-full before:h-full before:bg-[#09c]"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={() => plugin.current.play(false)}
        >
          <CarouselContent className="rounded-2xl px-0">
            {sliderImages.map((image, index) => (
              <CarouselItem key={index} className="shadow-none pl-4">
                <div className="p-0 shadow-none">
                  <Card className="border-0 shadow-none p-0">
                    <CardContent className="p-0 h-80 border-0 w-full">
                      <Image
                        src={image}
                        alt={`slider image${index}`}
                        className="h-full w-full"
                        property="5"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute hidden group-hover:flex left-2 bg-white/50 text-blue-500 hover:text-blue-700" />
          <CarouselNext className="absolute hidden group-hover:flex right-2 bg-white/50 text-blue-500 hover:text-blue-700" />
        </Carousel>
        <div className="w-full">
          <ul className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {previewImages.map((image, index) => (
              <li key={index} className="inline-block">
                <Button
                  className="relative before:absolute rounded-2xl shadow-[-3px_-3px_#09c] h-48 w-full overflow-hidden"
                  asChild
                >
                  <Link href={"/"} className="p-0!">
                    <Image
                      className="w-full h-full"
                      src={image}
                      alt={`Image Preview ${index}`}
                    />
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
