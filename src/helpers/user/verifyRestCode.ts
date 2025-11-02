import { verifyResetCodeAction } from "@/actions/user/verifyResetCode.action";
import { toast } from "sonner";

export interface VerifyResetCodeInputI {
  resetCode: string;
}

export async function verifyResetCode(code: VerifyResetCodeInputI) {
  const response = await verifyResetCodeAction(code);
  if ("status" in response) {
    toast.success(response.status, {
      description: "Enter your new password",
    });
    return response;
  } else {
    toast.error(response.message);
  }
}
