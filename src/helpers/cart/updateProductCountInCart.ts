import { updateProductCountInCartAction } from "@/actions/cart/updateProductCountInCart.action";
import { toast } from "sonner";

export async function updateProductCountInCart(
  productId: string,
  newCount: number
) {
  const response = await updateProductCountInCartAction(productId, newCount);

  if (response.status == "success") {
    toast.success("Product count updated successfully");
    return response;
  } else {
    toast.error(response.message);
  }
}
