import { clearCartAction } from "@/actions/cart/clearCart.action";
import { toast } from "sonner";

export async function clearCart() {
  const response = await clearCartAction();

  if (response.message == "success") {
    toast.success("Cart cleared successfully");
    return response;
  } else {
    toast.error(response.message);
  }
}
