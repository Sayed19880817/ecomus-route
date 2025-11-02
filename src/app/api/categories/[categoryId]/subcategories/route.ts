import { SubCategoriesApiResponse } from "@/Types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/categories/[categoryId]">
) {
  const { categoryId } = await ctx.params;
  const response: SubCategoriesApiResponse = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories/" +
      categoryId +
      "/subcategories"
  ).then((res) => res.json());
  return NextResponse.json(response);
}
