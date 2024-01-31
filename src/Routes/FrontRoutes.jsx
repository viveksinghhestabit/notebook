import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Component/Pages/Home";
import Login from "../Component/Pages/Login";
import About from "../Component/Pages/About";
import SignUp from "../Component/Pages/SignUp";
import Notes from "../Component/Pages/Notes";
import AddNote from "../Component/Pages/AddNote";
import EditNote from "../Component/Pages/EditNote";
import Contact from "../Component/Pages/Contact";
import Products from "../Component/Pages/Products";
import Cart from "../Component/Pages/Cart";
import ProductCategory from "../Component/Pages/ProductCategory";
import Orders from "../Component/Orders";
import OrderDetail from "../Component/OrderDetail";
import Chat from "../Component/Pages/Chat";

const FrontRoutes = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/add-note" element={<AddNote />} />
        <Route path="/edit-note/:id" element={<EditNote />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products/:id" element={<Products />} />
        <Route path="/product-categories" element={<ProductCategory />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
      </Routes>
    </>
  );
};

export default FrontRoutes;
