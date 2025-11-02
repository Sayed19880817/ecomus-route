import { resetPasswordAction } from "@/actions/user/resetPassword.action";
import { toast } from "sonner";

export interface ResetPasswordInputsI {
  email: string;
  newPassword: string;
}

export async function resetPassword(formData: ResetPasswordInputsI) {
  const response = await resetPasswordAction(formData);
  if ("token" in response) {
    toast.success("Success", {
      description: "You can sign in now with new password",
    });
    return response;
  } else {
    toast.error(response.message);
  }
}
