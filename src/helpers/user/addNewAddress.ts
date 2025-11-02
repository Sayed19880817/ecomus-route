import { addAddressAction } from "@/actions/address/addAddress.action";
import { toast } from "sonner";

export async function AddNewAddress(formData: object) {
  const response = await addAddressAction(formData);
  if (response.status == "success") {
    toast.success(response.message);
    return response;
  } else {
    toast.error(response.message);
  }
}
