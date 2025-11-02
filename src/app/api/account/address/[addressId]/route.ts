import { getAccessToken } from "@/helpers/getToken";
import { GetSpecificAddressApiResponse } from "@/Types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/account/address/[addressId]">
) {
  const { addressId } = await ctx.params;
  const response: GetSpecificAddressApiResponse = await fetch(
    "https://ecommerce.routemisr.com/api/v1/addresses/" + addressId,
    {
      method: "GET",
      headers: {
        token: (await getAccessToken()) + "",
      },
    }
  ).then((res) => res.json());
  return NextResponse.json(response);
}
