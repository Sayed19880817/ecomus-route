import { getAccessToken } from "@/helpers/getToken";
import { GetWishlistApiResponse } from "@/Types";
import { NextResponse } from "next/server";

export async function GET() {
  const response: GetWishlistApiResponse = await fetch(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      method: "GET",
      headers: {
        token: (await getAccessToken()) + "",
      },
    }
  ).then((res) => res.json());
  return NextResponse.json(response);
}
