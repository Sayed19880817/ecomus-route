import { apiServices } from "@/services";
import { GetCartApiResponse } from "@/Types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCartData = createAsyncThunk(
  "cartSlice/getCartData",
  async () => {
    const data = await apiServices.GetUserCartData();
    return data;
  }
);

const initialState: {
  cartData: GetCartApiResponse | null;
  isLoading: boolean;
  error: string;
} = {
  cartData: null,
  isLoading: true,
  error: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartDate(state, action) {
      state.cartData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCartData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartData = action.payload;
    });
    builder.addCase(getCartData.rejected, (state) => {
      state.isLoading = false;
      if (state.cartData?.message) state.error = state.cartData?.message;
    });
  },
});

export const cartReducer = cartSlice.reducer;

export const { setCartDate } = cartSlice.actions;
