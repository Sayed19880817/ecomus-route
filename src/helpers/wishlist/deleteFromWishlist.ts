import { deleteFromWishlistAction } from "@/actions/wishlist/deleteFromWishlist.action";
import { toast } from "sonner";

export async function deleteFromWishlist(productId: string) {
  const response = await deleteFromWishlistAction(productId);
  if (response.status == "success") {
    toast.success(response.message);
    return response;
  } else {
    toast.error(response.message);
  }
}
