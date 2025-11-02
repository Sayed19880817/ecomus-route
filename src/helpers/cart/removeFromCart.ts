import { removeProductFromCartAction } from "@/actions/cart/removeProductFromCart.action";
import { toast } from "sonner";

export async function removeFromCart(productId: string) {
  const response = await removeProductFromCartAction(productId);

  if (response.status == "success") {
    toast.success("Product Removed from cart successfully");
    return response;
  } else {
    toast.error(response.message);
  }
}
