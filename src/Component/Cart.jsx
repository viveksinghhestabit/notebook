import { useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    const isExist = cart.find((item) => item.id === product.id);
    if (isExist) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (product) => {
    const isExist = cart.find((item) => item.id === product.id);
    if (isExist.quantity === 1) {
      setCart(cart.filter((item) => item.id !== product.id));
    } else {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const handleRemoveAllFromCart = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  const hnadleUpdateCartQuantity = (product, quantity) => {
    if (quantity === 0) {
      return;
    }
    setCart(
      cart.map((item) =>
        item.id === product.id ? { ...item, quantity } : item
      )
    );
  };

  return <div>Cart</div>;
};

export default Cart;
