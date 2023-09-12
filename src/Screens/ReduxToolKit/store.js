import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../ReduxToolKit/store/ProductSlice";

export const store = configureStore({
  reducer: {
    product: ProductReducer,
  },
});
