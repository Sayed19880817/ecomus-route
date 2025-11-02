import { SingleProductApiResponse } from "@/Types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/products/[productId]">
) {
  const { productId } = await ctx.params;
  const response: SingleProductApiResponse = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products/" + productId
  ).then((res) => res.json());
  return NextResponse.json(response);
}
