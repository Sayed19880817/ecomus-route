"use server";

export interface ForgotPassIRes {
  statusMsg: string;
  message: string;
}

export async function forgotPasswordAction(
  formData: object
): Promise<ForgotPassIRes> {
  return await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  ).then((res) => res.json());
}
