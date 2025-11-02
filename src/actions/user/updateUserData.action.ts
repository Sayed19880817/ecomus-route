"use server";

import { getAccessToken } from "@/helpers/getToken";
import {
  FailedUpdateUserDataApiResponse,
  SuccessUpdateUserDataApiResponse,
} from "@/Types";

export interface SingleDataOfUpdateUserData {
  key: string;
  value: string;
}

export async function updateUserDataAction(
  newData: SingleDataOfUpdateUserData[]
): Promise<SuccessUpdateUserDataApiResponse | FailedUpdateUserDataApiResponse> {
  const obj = newData.reduce<Record<string, string>>((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {});
  // console.log(obj);

  return await fetch("https://ecommerce.routemisr.com/api/v1/users/updateMe/", {
    method: "PUT",
    headers: {
      token: (await getAccessToken()) + "",
      "Content-type": "application/json",
    },
    body: JSON.stringify(obj),
  }).then((res) => res.json());
}

// "use server";

// import { getAccessToken } from "@/helpers/getToken";
// import {
//   FailedUpdateUserDataApiResponse,
//   SuccessUpdateUserDataApiResponse,
// } from "@/Types";

// export async function updateUserDataAction(
//   name: string,
//   email: string,
//   phone: string
// ): Promise<SuccessUpdateUserDataApiResponse | FailedUpdateUserDataApiResponse> {
//   return await fetch("https://ecommerce.routemisr.com/api/v1/users/updateMe/", {
//     method: "POST",
//     headers: {
//       token: (await getAccessToken()) + "",
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify({
//       name,
//       email,
//       phone,
//     }),
//   }).then((res) => res.json());
// }
