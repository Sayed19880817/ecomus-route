"use server";

import { getAccessToken } from "@/helpers/getToken";
import { FailedUpdateUserDataI, SuccessLoginI } from "@/interfaces";

export async function changePasswordAction(
  formData: object
): Promise<SuccessLoginI | FailedUpdateUserDataI> {
  return await fetch(
    "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
    {
      method: "PUT",
      headers: {
        token: (await getAccessToken()) + "",
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  ).then((res) => res.json());
}
