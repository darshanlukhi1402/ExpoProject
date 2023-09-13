import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("productsData", async () => {
  try {
    const res = await axios.get("https://dummyjson.com/users");
    // console.log("res", res?.data?.users);
    return res?.data?.users;
  } catch (error) {
    console.log("error", error);
  }
});
