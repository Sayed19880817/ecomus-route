import {
  SingleDataOfUpdateUserData,
  updateUserDataAction,
} from "@/actions/user/updateUserData.action";
// import { FailedUpdateUserDataApiResponse, SuccessUpdateUserDataApiResponse } from "@/Types";
import { toast } from "sonner";

export async function updateUserData(newData: SingleDataOfUpdateUserData[]) {
  const response = await updateUserDataAction(newData);
  if ("user" in response) {
    toast.success("Your data is updated successfully", {
      description: "Please sign In again to continue shopping",
    });
    return response;
  } else {
    toast.error(response.errors.msg);
  }
}

// import { updateUserDataAction } from "@/actions/user/updateUserData.action";
// // import { FailedUpdateUserDataApiResponse, SuccessUpdateUserDataApiResponse } from "@/Types";
// import { toast } from "sonner";

// export async function updateUserData(
//   name: string,
//   email: string,
//   phone: string
// ) {
//   const response = await updateUserDataAction(name, email, phone);
//   if ("user" in response) {
//     toast.success("Your data is updated successfully");
//     // return response;
//   } else {
//     toast.error(response.errors.msg);
//   }
// }
