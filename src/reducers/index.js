import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import { reducer as toastrReducer } from "react-redux-toastr";
import { reducer as modalReducer } from "redux-modal";
import { reducer as authReducer } from "./auth";
import { reducer as notesReducer } from "./notes";
import { reducer as productCategoriesReducer } from "./productCategories";
import { reducer as productsReducer } from "./products";
import { reducer as ordersReducer } from "./orders";
import { reducer as paymentsReducer } from "./payments";
import { reducer as dashboardReducer } from "./dashboard";

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  toastr: toastrReducer,
  modals: modalReducer,
  auth: authReducer,
  notes: notesReducer,
  productCategories: productCategoriesReducer,
  products: productsReducer,
  orders: ordersReducer,
  payments: paymentsReducer,
  dashboard: dashboardReducer,
});
