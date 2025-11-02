import { apiServices } from "@/services";
import { GetWishlistApiResponse } from "@/Types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getWishlistData = createAsyncThunk(
  "wishlistSlice/getWishlistData",
  async () => {
    const data = await apiServices.GetUserWishlistData();
    return data;
  }
);

const initialState: {
  wishlistData: GetWishlistApiResponse | null;
  isLoading: boolean;
  error: string;
} = {
  wishlistData: null,
  isLoading: true,
  error: "",
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlistDate(state, action) {
      state.wishlistData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWishlistData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getWishlistData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.wishlistData = action.payload;
    });
    builder.addCase(getWishlistData.rejected, (state) => {
      state.isLoading = false;
      if (state.wishlistData?.message)
        state.error = state.wishlistData?.message;
    });
  },
});

export const wishlistReducer = wishlistSlice.reducer;

export const { setWishlistDate } = wishlistSlice.actions;
