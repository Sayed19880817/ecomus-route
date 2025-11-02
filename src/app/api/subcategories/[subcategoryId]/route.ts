import { SubCategoriesApiResponse } from "@/Types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/subcategories/[subcategoryId]">
) {
  const { subcategoryId } = await ctx.params;
  const response: SubCategoriesApiResponse = await fetch(
    "https://ecommerce.routemisr.com/api/v1/subcategories/" + subcategoryId
  ).then((res) => res.json());
  return NextResponse.json(response);
}
