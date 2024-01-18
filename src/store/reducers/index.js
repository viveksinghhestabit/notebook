import { notesSlice } from "../slices/notes";
import { productsSlice } from "../slices/products";
import { productCategorySlice } from "../slices/productCategory";
import { contactsSlice } from "../slices/contacts";

export const rootReducer = {
  notes: notesSlice.reducer,
  products: productsSlice.reducer,
  productCategory: productCategorySlice.reducer,
  contacts: contactsSlice.reducer,
};
