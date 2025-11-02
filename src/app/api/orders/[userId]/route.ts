import { GetUserOrdersApiResponse } from "@/Types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/orders/[userId]">
) {
  const { userId } = await ctx.params;
  const response: GetUserOrdersApiResponse = await fetch(
    "https://ecommerce.routemisr.com/api/v1/orders/user/" + userId
  ).then((res) => res.json());
  return NextResponse.json(response);
}
