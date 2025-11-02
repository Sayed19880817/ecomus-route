import { getAccessToken } from "@/helpers/getToken";
import { GetCartApiResponse } from "@/Types";
import { NextResponse } from "next/server";

export async function GET() {
  const response: GetCartApiResponse = await fetch(
    "https://ecommerce.routemisr.com/api/v1/cart",
    {
      method: "GET",
      headers: {
        token: (await getAccessToken()) + "",
      },
    }
  ).then((res) => res.json());
  return NextResponse.json(response);
}
