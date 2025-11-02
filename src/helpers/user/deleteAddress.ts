import { deleteAddressAction } from "@/actions/address/removeAddress.action";
import { toast } from "sonner";

export async function deleteAddress(addressId: string) {
  const response = await deleteAddressAction(addressId);
  if (response.status == "success") {
    toast.success(response.message);
    return response;
  } else {
    toast.error(response.message);
  }
}
