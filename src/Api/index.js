import axios from "axios";
import { getToken } from "../Auth/auth";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    const access_token = getToken();
    if (access_token) {
      config.headers.Authorization = `${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = (data) => api.post("/auth/login", data);
export const googleLogin = (data) => api.post("/auth/googlelogin", data);
export const register = (data) => api.post("/auth/register", data);

export const getGraphData = (range) =>
  api.get(`/orders/dashboard?grapgrange=${range}`);

export const getPayments = () => api.get("/orders/getpayments");
export const getOrder = (id) => api.get(`/orders/getorder/${id}`);
export const updateOrder = (id, data) =>
  api.put(`/orders/updateorder/${id}`, data);

//notes
export const getNotes = () => api.get("/notes/getall");
export const getNote = (id) => api.get(`/notes/get/${id}`);
export const addNote = (data) => api.post("/notes/create", data);
export const updateNote = (id, data) => api.put(`notes/update/${id}`, data);
export const deleteNote = (id) => api.delete(`/notes/delete/${id}`);

//productcategories
export const getCategories = () => api.get("/productCategory/getall");
export const addCategory = (data) => api.post("/productCategory/create", data);
export const getCategory = (id) => api.get(`/productCategory/get/${id}`);
export const updateCategory = (id, data) =>
    api.put(`/productCategory/update/${id}`, data);
export const deleteCategory = (id) => api.delete(`/productCategory/delete/${id}`);

//products
export const getProducts = () => api.get("/products/getall");
export const addProduct = (data) => api.post("/products/create", data);
export const getProduct = (id) => api.get(`/products/get/${id}`);
export const updateProduct = (id, data) =>
    api.put(`/products/update/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/delete/${id}`);


