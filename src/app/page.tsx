// "use client";
// import { Button } from "@/components";
import { CategoriesSlider2 } from "@/components/design/CategoriesSlider2";
import { MainSliderHome } from "@/components/design/MainSliderHome";
import ProductsContainer from "@/components/design/ProductsContainer";
import ShippingSection from "@/components/design/ShippingSection";
// import { useState } from "react";

export default function Home() {
  // const [error, setError] = useState(null);

  // if (error) {
  //   return (
  //     <div className="container mx-auto px-4 py-8">
  //       <div className="text-center">
  //         <p className="text-red-500 mb-4">{error}</p>
  //         <Button>Try Again</Button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <main className="*:px-6">
      <MainSliderHome />

      {/* Shipping Section */}
      <ShippingSection />

      {/* Categories Section */}
      <CategoriesSlider2 />

      <ProductsContainer />
    </main>
  );
}
