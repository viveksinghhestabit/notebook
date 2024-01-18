import { createSlice } from "@reduxjs/toolkit";
import * as api from "../../Api/index";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      state.products[index] = action.payload;
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  setError,
  setLoading,
} = productsSlice.actions;

export default productsSlice.reducer;

export const getProductsAsync = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await api.getProducts();
    const data = response.data;
    dispatch(getProducts(data.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const getProductByCatIdAsync = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await api.getProductByCatId(id);
    const data = response.data;
    dispatch(getProducts(data.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const addProductAsync = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await api.addProduct(data);
    const product = response.data;
    dispatch(addProduct(product.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const updateProductAsync = (id, data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await api.updateProduct(id, data);
    const product = response.data;
    dispatch(updateProduct(product.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const deleteProductAsync = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await api.deleteProduct(id);
    dispatch(deleteProduct(id));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
  }
};
