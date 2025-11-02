import { CategoriesApiResponse } from "@/Types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const response: CategoriesApiResponse = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories" + "?" + searchParams
  ).then((res) => res.json());
  return NextResponse.json(response);
}
