import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TokenContext from "../Context/TokenContext";
import * as api from "../Api/index";

const Orders = () => {
  const { access_token, user } = useContext(TokenContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  if (access_token == null || access_token == "") {
    navigate("/login");
  }

  const fetchOrders = async () => {
    const response = await api.getPayments();
    const data = await response.data;
    if (data.status !== 200) {
      setError(data.message);
      setLoading(false);
      return;
    }
    setOrders(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container py-5">
      <h1>Orders</h1>
      <div className="row">
        {loading && <h1>Loading...</h1>}
        {error && <h1>Something went wrong...</h1>}
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Sr No</th>
              <th scope="col">Payment Id</th>
              <th scope="col">Order Id</th>
              <th scope="col">Order Date</th>
              <th scope="col">Total Amount</th>
              <th scope="col">Payment Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{order.payment_id}</td>
                  <td>{order._id}</td>
                  <td>{order.date}</td>
                  <td>{order.amount}</td>
                  <td>{order.status}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        user.role == "admin"
                          ? navigate(`/admin/orders/${order._id}`)
                          : navigate(`/orders/${order._id}`);
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
