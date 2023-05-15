import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TokenContext from "../Context/TokenContext";
import * as api from "../Api/index";

const OrderDetail = () => {
  const { access_token, user, MySwal } = useContext(TokenContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  if (access_token == null || access_token == "") {
    navigate("/login");
  }
  const { id } = useParams();

  const fetchOrder = async () => {
    const response = await api.getOrder(id);
    const data = await response.data;
    if (data.status !== 200) {
      setError(data.message);
      setLoading(false);
      return;
    }
    setOrderData(data.data);
    setLoading(false);
  };

  const updateOrder = async (id, status) => {
    if (user.role != "admin") {
      MySwal.fire({
        icon: "error",
        title: "You are not authorized to update order",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    const response = await api.updateOrder(id, { status });
    const data = await response.data;
    if (data.status !== 200) {
      MySwal.fire({
        icon: "error",
        title: "Something went wrong",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    MySwal.fire({
      icon: "success",
      title: "Order Updated Successfully",
      message: "Order Updated Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    fetchOrder();
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div className="container py-5">
      <h1>Order Detail</h1>
      <div className="row">
        {loading && <h1>Loading...</h1>}
        {error && <h1>Something went wrong...</h1>}
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Sr No</th>
              <th scope="col">Product Image</th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th>Status</th>
              {user.role == "admin" &&
                orderData.filter((order) => order.status == "pending").length >
                  0 && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {orderData.map((order, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <img
                      className="img-fluid img-thumbnail rounded mx-auto d-block"
                      src={order.product.imagePath}
                      alt={order.product.name}
                      style={{ maxHeight: "50px" }}
                    />
                  </td>
                  <td>{order.product.name}</td>
                  <td>
                    <i className="fa fa-inr"></i> {order.product.price}
                  </td>
                  <td>{order.quantity}</td>
                  <td>
                    {order.status == "pending" && (
                      <span className="btn btn-warning">Pending</span>
                    )}
                    {order.status == "cancelled" && (
                      <span className="btn btn-danger">Cancelled</span>
                    )}
                    {order.status == "delivered" && (
                      <span className="btn btn-success">Delivered</span>
                    )}
                  </td>
                  {(user.role == "admin" && order.status == "pending" && (
                    <td>
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => {
                          updateOrder(order._id, "pending");
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-success mx-2"
                        onClick={() => {
                          updateOrder(order._id, "delivered");
                        }}
                      >
                        Deliver
                      </button>
                    </td>
                  )) || <td></td>}
                </tr>
              );
            })}
            <tr>
              <td colSpan="4"></td>
              <td>
                <b>Total</b>
              </td>
              <td>
                <b>
                  <i className="fa fa-inr"></i>{" "}
                  {orderData.reduce(
                    (a, b) => a + b.product.price * b.quantity,
                    0
                  )}
                </b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetail;
