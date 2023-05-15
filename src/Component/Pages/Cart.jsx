import { useContext } from "react";
import { useCart } from "react-use-cart";
import StripeCheckout from "react-stripe-checkout";
import TokenContext from "../../Context/TokenContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { items, updateItemQuantity, removeItem, emptyCart } = useCart();
  const { access_token, MySwal } = useContext(TokenContext);
  const base_url = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  if (access_token == null || access_token == "") {
    navigate("/login");
  }

  const handleChangeQuantity = (id, value) => {
    items.map((item) => {
      if (item.id === id) {
        if (item.quantity === 1 && value === -1) {
          removeItem(id);
        } else {
          updateItemQuantity(id, item.quantity + value);
        }
      }
    });
  };
  const handleToken = (token) => {
    fetch(`${base_url}orders/paywithstripe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${access_token}`,
      },
      body: JSON.stringify({
        token,
        items,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        emptyCart();
        MySwal.fire({
          icon: "success",
          title: "Order Placed Successfully",
          text: "Your order has been placed successfully",
          timer: 2000,
        }).then(() => {
          navigate("/orders");
        });
      });
  };

  return (
    <div className="container my-2">
      <h1>Cart</h1>
      <div className="row">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Sr No</th>
              <th scope="col">Product Image</th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
              <th scope="col">Update Quantity</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <th scope="row">{++index}</th>
                <td>
                  <img
                    className="img-fluid img-thumbnail rounded mx-auto d-block"
                    src={item.imagePath}
                    alt={item.title}
                    style={{ maxHeight: "50px" }}
                  />
                </td>
                <td>{item.title}</td>
                <td>
                  {" "}
                  <i className="fa fa-inr"></i> {item.price}
                </td>
                <td>{item.quantity}</td>
                <td>
                  {" "}
                  <i className="fa fa-inr"></i>
                  {item.price * item.quantity}
                </td>
                <td>
                  <button
                    onClick={() => handleChangeQuantity(item.id, -1)}
                    className="btn btn-danger me-2"
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleChangeQuantity(item.id, 1)}
                    className="btn btn-success me-2"
                  >
                    +
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-9 "></div>
        <div className="col-md-3">
          <h3>
            Total : <i className="fa fa-inr"></i>
            {items.reduce((total, item) => {
              return total + item.price * item.quantity;
            }, 0)}
          </h3>
        </div>
      </div>
      <hr />
      <button className="btn btn-primary float-end">
        <StripeCheckout
          stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
          token={handleToken}
          name="Buy Product"
          amount={
            items.reduce((total, item) => {
              return total + item.price * item.quantity;
            }, 0) * 100
          }
          currency="INR"
          billingAddress
          shippingAddress
        >
          Pay Now
        </StripeCheckout>
      </button>
      <button onClick={() => emptyCart()} className="btn btn-danger">
        Clear Cart
      </button>
      <hr />
    </div>
  );
};

export default Cart;
