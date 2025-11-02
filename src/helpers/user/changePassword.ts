import { changePasswordAction } from "@/actions/user/changePassword.action";
import { toast } from "sonner";

export interface ChangePasswordInputsI {
  currentPassword: string;
  password: string;
  rePassword: string;
}

export async function changePassword(newData: ChangePasswordInputsI) {
  const response = await changePasswordAction(newData);
  if ("user" in response) {
    toast.success("Your Password is changed successfully", {
      description: "Please sign In again to continue shopping",
    });
    return response;
  } else {
    toast.error(response.errors.msg);
  }
}
