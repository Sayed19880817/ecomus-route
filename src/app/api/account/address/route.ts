import { getAccessToken } from "@/helpers/getToken";
import { GetUserAddressesApiResponse } from "@/Types";
import { NextResponse } from "next/server";

export async function GET() {
  const response: GetUserAddressesApiResponse = await fetch(
    "https://ecommerce.routemisr.com/api/v1/addresses",
    {
      method: "GET",
      headers: {
        token: (await getAccessToken()) + "",
      },
    }
  ).then((res) => res.json());
  return NextResponse.json(response);
}
