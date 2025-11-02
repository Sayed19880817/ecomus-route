"use server";

export interface VerifyResetCodeIRes {
  status?: string;
  statusMsg?: string;
  message?: string;
}

export async function verifyResetCodeAction(
  formData: object
): Promise<VerifyResetCodeIRes> {
  return await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  ).then((res) => res.json());
}
