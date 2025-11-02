import { SingleBrandApiResponse } from "@/Types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/brands/[brandId]">
) {
  const { brandId } = await ctx.params;
  const response: SingleBrandApiResponse = await fetch(
    "https://ecommerce.routemisr.com/api/v1/brands/" + brandId
  ).then((res) => res.json());
  return NextResponse.json(response);
}
