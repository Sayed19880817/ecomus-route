"use client";
import { useState, useRef, useEffect } from "react";
import {
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Share2,
  Shield,
  Truck,
  RotateCcw,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Product } from "@/interfaces";
import LoadingComponent from "@/app/loading";
import { apiServices } from "@/services";
import { useParams } from "next/navigation";
import Link from "next/link";
import { renderStars } from "@/helpers/renderStars";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(-1);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mockProduct, setMockProduct] = useState<Product | null>();
  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const desc = useRef<HTMLParagraphElement>(null);

  const { productId } = useParams();

  // Fetching Specific Product data
  async function fetchSpecificProduct() {
    setLoading(true);
    const product = await apiServices.getSpecificProduct(String(productId));
    console.log(product);

    setMockProduct(product.data);
    setLoading(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchSpecificProduct();
  }, []);

  useEffect(() => {
    if (loading == false && mockProduct) {
      desc.current!.innerHTML = mockProduct.description
        .replace(/\n/g, ` <br /> `)
        .replace(/\t/g, ": ");
    }
  }, [mockProduct, loading]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !containerRef.current) return;

    const imageRect = imageRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    // Calculate position within the image (for zoom)
    const x = Math.max(
      0,
      Math.min(100, ((e.clientX - imageRect.left) / imageRect.width) * 100)
    );
    const y = Math.max(
      0,
      Math.min(100, ((e.clientY - imageRect.top) / imageRect.height) * 100)
    );

    // Calculate mouse position relative to container (for floating element)
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    setZoomPosition({ x, y });
    setMousePosition({ x: mouseX, y: mouseY });
  };

  const handleAddToCart = () => {
    console.log("Added to cart:", { product: mockProduct, quantity });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    console.log("Wishlist toggled:", isWishlisted);
  };

  if (loading) {
    return <LoadingComponent title="Product" />;
  }

  if (!mockProduct) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-destructive mb-4 text-3xl font-mono font-semibold">
            {" "}
            Product not found
          </p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen container">
      <div className="px-4 md:px-0 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4 md:hidden">
            <div className="flex items-center gap-2">
              <Badge asChild variant="outline" className="text-lg px-5">
                <Link href={`/brands/${mockProduct.brand._id}`}>
                  {mockProduct.brand.name}
                </Link>
              </Badge>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-transparent">
              {mockProduct.title}
            </h1>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {renderStars(Number(mockProduct.ratingsAverage))}
              </div>
              <span className="text-sm text-muted-foreground">
                {mockProduct.ratingsAverage} (
                {mockProduct.ratingsQuantity.toLocaleString()} reviews)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <p className="text-foreground/50 text-sm">Category: </p>
              <Badge asChild variant="secondary" className="text-sm">
                <Link href={`/categories/${mockProduct.category._id}`}>
                  {mockProduct.category.name}
                </Link>
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-foreground/50 text-sm">Subcategories: </p>
              {mockProduct.subcategory.map((sub) => (
                <Badge
                  asChild
                  key={sub._id}
                  variant="outline"
                  className="text-xs"
                >
                  <Link href={`/subcategories/${sub._id}`}>{sub.name}</Link>
                </Badge>
              ))}
            </div>
          </div>
          {/* Image Gallery Section */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative">
              <Card
                ref={containerRef}
                className="overflow-hidden border-0 py-0 shadow-2xl bg-gradient-to-br from-white to-gray-50"
              >
                <CardContent className="p-0">
                  <div
                    ref={imageRef}
                    className="aspect-square relative overflow-hidden cursor-zoom-in bg-white"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsZooming(true)}
                    onMouseLeave={() => setIsZooming(false)}
                  >
                    <Image
                      src={
                        mockProduct.images[selectedImage] ??
                        mockProduct.imageCover
                      }
                      alt={mockProduct.title}
                      width={1000}
                      height={1000}
                      className="w-full h-full object-cover transition-all duration-500 ease-out py-0"
                    />
                    {Number(mockProduct?.quantity) < 10 &&
                      Number(mockProduct?.quantity) > 0 && (
                        <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-white">
                          Only {mockProduct?.quantity} left!
                        </Badge>
                      )}
                    {Number(mockProduct?.quantity) == 0 ||
                      (isNaN(mockProduct?.quantity) && (
                        <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-white">
                          Out of Stock
                        </Badge>
                      ))}
                    <Badge className="absolute top-4 right-4 bg-green-500 hover:bg-green-600 text-white">
                      {mockProduct?.sold}+ Sold
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Floating Zoom Window */}
              {isZooming && (
                <div
                  className="fixed z-50 pointer-events-none transition-all duration-200 ease-out"
                  style={{
                    left:
                      mousePosition.x > window.innerWidth - 350
                        ? mousePosition.x - 200
                        : mousePosition.x + 20,
                    top:
                      mousePosition.y > window.innerHeight - 350
                        ? mousePosition.y - 200
                        : mousePosition.y + 20,
                    width: "300px",
                    height: "300px",
                  }}
                >
                  <Card className="w-full h-full shadow-2xl border-2 border-primary/20 bg-white py-0">
                    <CardContent className="p-0 w-full h-full">
                      <div className="w-full h-full overflow-hidden rounded-lg relative">
                        <Image
                          src={
                            mockProduct.images[selectedImage] ??
                            mockProduct.imageCover
                          }
                          width={1000}
                          height={1000}
                          alt="Zoomed view"
                          className="w-full h-full object-cover"
                          style={{
                            transform: `scale(2.5)`,
                            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                          }}
                        />
                        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          Zoom View
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex justify-evenly items-center gap-2">
              {mockProduct?.images.map((image, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg py-0 ${
                    selectedImage === index
                      ? "ring-2 ring-blue-500 shadow-lg scale-105"
                      : "hover:scale-105"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden rounded-lg">
                      <Image
                        width={200}
                        height={200}
                        src={image}
                        alt={`${mockProduct.title} view ${index + 1}`}
                        className="w-full h-full object-cover transition-all duration-300"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Product Information Section */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4 hidden md:block">
              <div className="flex items-center gap-2">
                <Badge asChild variant="outline" className="text-lg px-5">
                  <Link href={`/brands/${mockProduct.brand._id}`}>
                    {mockProduct.brand.name}
                  </Link>
                </Badge>
              </div>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-transparent">
                {mockProduct.title}
              </h1>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {renderStars(Number(mockProduct.ratingsAverage), 24)}
                </div>
                <span className="text-sm text-muted-foreground">
                  {mockProduct.ratingsAverage} (
                  {mockProduct.ratingsQuantity.toLocaleString()} reviews)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-foreground/50 text-sm">Category: </p>
                <Badge asChild variant="secondary" className="text-sm">
                  <Link href={`/categories/${mockProduct.category._id}`}>
                    {mockProduct.category.name}
                  </Link>
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-foreground/50 text-sm">Subcategories: </p>
                {mockProduct.subcategory.map((sub) => (
                  <Badge
                    asChild
                    key={sub._id}
                    variant="outline"
                    className="text-xs"
                  >
                    <Link href={`/subcategories/${sub._id}`}>{sub.name}</Link>
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-primary">
                  {mockProduct.price.toFixed(2)}
                  <sub className="ps-2">EGP</sub>
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Free shipping on orders over $50
              </p>
            </div>

            <Separator />

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Description</h3>
              <p ref={desc} className="text-muted-foreground leading-relaxed">
                {/* {mockProduct.description} */}
              </p>
            </div>

            {/* Features */}
            <Card className="border-blue-200 bg-accent/70">
              <CardContent className="p-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Truck size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Free Delivery</p>
                      <p className="text-xs text-muted-foreground">2-3 days</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-green-100 rounded-full">
                      <Shield size={16} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">2 Year Warranty</p>
                      <p className="text-xs text-muted-foreground">
                        Full coverage
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-orange-100 rounded-full">
                      <RotateCcw size={16} className="text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">30-Day Returns</p>
                      <p className="text-xs text-muted-foreground">
                        Hassle-free
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setQuantity(Math.min(mockProduct.quantity, quantity + 1))
                    }
                    disabled={quantity >= mockProduct.quantity}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {mockProduct.quantity} available
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1 h-14 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  onClick={handleAddToCart}
                  disabled={
                    mockProduct.quantity == 0 || isNaN(mockProduct.quantity)
                  }
                >
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant={isWishlisted ? "default" : "outline"}
                  className={`h-14 px-6 ${
                    isWishlisted ? "bg-red-500 hover:bg-red-600 text-white" : ""
                  }`}
                  onClick={handleWishlist}
                >
                  <Heart
                    size={20}
                    className={isWishlisted ? "fill-current" : ""}
                  />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-6"
                  onClick={() => {
                    navigator.clipboard.writeText(location.href);
                    toast.success("Success", {
                      description: "Link copied to clipboard successfully",
                      // action: {
                      //   label: "Undo",
                      //   onClick: () => console.log("Undo"),
                      // },
                    });
                  }}
                >
                  <Share2 size={20} />
                </Button>
              </div>

              <Button
                size="lg"
                variant="outline"
                className="w-full h-14 text-lg font-semibold border-2 border-orange-300 text-orange-600 hover:bg-orange-50"
              >
                Buy Now - Express Checkout
              </Button>
            </div>

            {/* Stock Status */}
            <Card className="bg-green-50 border-green-200 py-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-center gap-2">
                  <Check size={24} className="text-green-600" />
                  <span className="text-green-800 font-medium">
                    In Stock - Ready to Ship
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
