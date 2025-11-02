import { Suspense } from "react";
import LoadingComponent from "@/app/loading";
import ProductsContent from "@/components/design/ProductsContent";

export default async function Products() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center bg-foreground/5 py-4 rounded-3xl animate-roundedShadow">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 uppercase tracking-wide font-albert-sans">
          Products
        </h1>
        <p className="text-muted-foreground">
          Discover amazing products from our collection
        </p>
      </div>

      <Suspense fallback={<LoadingComponent variant="products" />}>
        <ProductsContent />
      </Suspense>
    </div>
  );
}
