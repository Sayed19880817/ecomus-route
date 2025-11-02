"use server";
import { FailedLoginI, SuccessLoginI } from "@/interfaces/login";

export async function loginAction(
  email: string,
  password: string
): Promise<SuccessLoginI | FailedLoginI> {
  return await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => res.json());
}
