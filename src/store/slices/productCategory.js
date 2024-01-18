import { createSlice } from "@reduxjs/toolkit";
import * as api from "../../Api/index";

export const productCategorySlice = createSlice({
  name: "productCategory",
  initialState: {
    productCategories: [],
    loading: false,
    error: null,
  },
  reducers: {
    getProductCategories: (state, action) => {
      state.productCategories = action.payload;
    },
    addProductCategory: (state, action) => {
      state.productCategories.push(action.payload);
    },
    updateProductCategory: (state, action) => {
      const index = state.productCategories.findIndex(
        (productCategory) => productCategory._id === action.payload._id
      );
      state.productCategories[index] = action.payload;
    },
    deleteProductCategory: (state, action) => {
      state.productCategories = state.productCategories.filter(
        (productCategory) => productCategory._id !== action.payload
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
  getProductCategories,
  addProductCategory,
  updateProductCategory,
  deleteProductCategory,
  setError,
  setLoading,
} = productCategorySlice.actions;

export default productCategorySlice.reducer;

export const getProductCategoriesAsync = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await api.getCategories();
    const data = response.data;
    dispatch(getProductCategories(data.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const addProductCategoryAsync = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await api.addCategory(data);
    const result = response.data;
    dispatch(addProductCategory(result.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const updateProductCategoryAsync = (id, data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await api.updateCategory(id, data);
    const result = response.data;
    dispatch(updateProductCategory(result.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const deleteProductCategoryAsync = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await api.deleteCategory(id);
    const result = response.data;
    dispatch(deleteProductCategory(id));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
  }
};
