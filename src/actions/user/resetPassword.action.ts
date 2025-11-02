"use server";

export interface ResetPasswordIRes {
  token?: string;
  statusMsg?: string;
  message?: string;
}

export async function resetPasswordAction(
  formData: object
): Promise<ResetPasswordIRes> {
  return await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  ).then((res) => res.json());
}
