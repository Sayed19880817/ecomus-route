import { addToWishlistAction } from "@/actions/wishlist/addToWishlist.action";
import { toast } from "sonner";

export async function AddToWishlist(productId: string) {
  const response = await addToWishlistAction(productId);
  if (response.status == "success") {
    toast.success(response.message);
    return response;
  } else {
    toast.error(response.message);
  }
}
