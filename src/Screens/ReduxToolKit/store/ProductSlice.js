import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../Actions/Action";

const ProductSlice = createSlice({
  name: "Product",
  initialState: {
    data: null,
    isLoader: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts?.pending, (state, action) => {
      state.isLoader = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoader = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoader = false;
      state.isError = true;
    });
  },
});

export default ProductSlice.reducer;
