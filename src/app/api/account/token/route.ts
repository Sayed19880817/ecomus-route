import { getAccessToken } from "@/helpers/getToken";
import { VerifyTokenApiResponse } from "@/Types";
import { NextResponse } from "next/server";

export async function GET() {
  const accessToken: string = (await getAccessToken()) + "";
  const response: Promise<VerifyTokenApiResponse> = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
    {
      method: "GET",
      headers: {
        token: accessToken,
      },
    }
  ).then((res) => res.json());
  return NextResponse.json(response);
}
