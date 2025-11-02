import { addToCartAction } from "@/actions/cart/addToCart.action";
import { toast } from "sonner";

export async function AddToCart(productId: string) {
  const response = await addToCartAction(productId);
  if (response.status == "success") {
    toast.success(response.message);
    return response;
  } else {
    toast.error(response.message);
  }
}
