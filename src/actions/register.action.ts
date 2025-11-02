"use server";
import { FailedLoginI, SuccessLoginI } from "@/interfaces/login";

interface formDate {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export async function registerAction(
  formDate: formDate
): Promise<SuccessLoginI | FailedLoginI> {
  return await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(formDate),
  }).then((res) => res.json());
}
