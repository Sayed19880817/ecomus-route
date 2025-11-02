import { forgotPasswordAction } from "@/actions/user/forgotPassword.action";
import { toast } from "sonner";

export interface ForgotPasswordInputsI {
  email: string;
}

export async function forgotPassword(email: ForgotPasswordInputsI) {
  const response = await forgotPasswordAction(email);
  if (response.statusMsg == "success") {
    toast.success(response.message);
    return response;
  } else {
    toast.error(response.message);
  }
}
