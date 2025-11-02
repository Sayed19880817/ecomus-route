import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slices/cartSlice";
import { wishlistReducer } from "./slices/wishlistSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export type storeState = ReturnType<typeof store.getState>;

export type storeDispatch = typeof store.dispatch;
