import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Component/Admin/Dashboard";
import Notes from "../Component/Pages/Notes";
import AddNote from "../Component/Pages/AddNote";
import EditNote from "../Component/Pages/EditNote";
import ContactList from "../Component/Admin/ContactList";
import UserList from "../Component/Admin/UserList";
import UserAdd from "../Component/Admin/UserAdd";
import UserEdit from "../Component/Admin/UserEdit";
import CategoryAdd from "../Component/Admin/Product/Category/CategoryAdd";
import CategoryUpdate from "../Component/Admin/Product/Category/CategoryUpdate";
import CategoryList from "../Component/Admin/Product/Category/CategoryList";
import ProductList from "../Component/Admin/Product/ProductList";
import ProductAdd from "../Component/Admin/Product/ProductAdd";
import ProductEdit from "../Component/Admin/Product/ProductEdit";
import Orders from "../Component/Orders";
import OrderDetail from "../Component/OrderDetail";

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route exact path="/admin" element={<Dashboard />} />
        <Route exact path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/notes" element={<Notes />} />
        <Route path="/admin/add-note" element={<AddNote />} />
        <Route path="/admin/edit-note/:id" element={<EditNote />} />
        <Route path="/admin/contact-list" element={<ContactList />} />
        <Route path="/admin/user-list" element={<UserList />} />
        <Route path="/admin/user-add" element={<UserAdd />} />
        <Route path="/admin/user-edit/:id" element={<UserEdit />} />
        <Route path="/admin/category-list" element={<CategoryList />} />
        <Route path="/admin/category-add" element={<CategoryAdd />} />
        <Route path="/admin/category-edit/:id" element={<CategoryUpdate />} />
        <Route path="/admin/product-list" element={<ProductList />} />
        <Route path="/admin/product-add" element={<ProductAdd />} />
        <Route path="/admin/product-edit/:id" element={<ProductEdit />} />
        <Route path="/admin/order-list" element={<Orders />} />
        <Route path="/admin/orders/:id" element={<OrderDetail />} />
      </Routes>
    </>
  );
};

export default AdminRoutes;
