import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";
// import { getAccessToken } from "./helpers/getToken";

const authPages = "/auth";
const protectedPages = ["/cart", "/wishlist", "/account"];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  if (request.nextUrl.pathname.startsWith(authPages)) {
    if (!token) {
      return NextResponse.next();
    } else {
      const newUrl = new URL("/", process.env.NEXT_PUBLIC_URL);
      return NextResponse.redirect(newUrl);
    }
  }

  if (
    protectedPages.includes(request.nextUrl.pathname) ||
    request.nextUrl.pathname.startsWith(protectedPages[2])
  ) {
    if (token) {
      return NextResponse.next();
    } else {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set(
        "callbackUrl",
        request.nextUrl.pathname + request.nextUrl.search
      );
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request });
//   // const token = await getAccessToken();
//   if (token) {
//     NextResponse.next();
//   } else {
//     const loginUrl = new URL("/auth/login", request.url);
//     loginUrl.searchParams.set(
//       "callbackUrl",
//       request.nextUrl.pathname + request.nextUrl.search
//     );
//     return NextResponse.redirect(loginUrl);
//     // return NextResponse.redirect(new URL("/auth/login", request.url));
//   }
// }

// export const config = {
//   matcher: ["/cart", "/wishlist", "/account/:path"],
// };
