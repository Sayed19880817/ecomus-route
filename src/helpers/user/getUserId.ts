import { apiServices } from "@/services";
import { VerifyTokenApiResponse } from "@/Types";

export async function getUserId() {
  const response: VerifyTokenApiResponse = await apiServices.getUserId();
  if (response.message == "verified") {
    return response.decoded.id;
  }
}
