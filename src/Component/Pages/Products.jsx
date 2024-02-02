import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import TokenContext from "../../Context/TokenContext";
import {
  getProductByCatIdAsync,
  deleteProductAsync,
} from "../../store/slices/products";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const dispatch = useDispatch();
  const allProduct = useSelector((state) => state.products.products);
  const products = allProduct.map((product) => ({
    ...product,
    id: product._id,
  }));
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const { useCart } = useContext(TokenContext);
  const { addItem } = useCart();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductByCatIdAsync(id));
  }, []);

  return (
    <div className="container my-2">
      <h1 className="text-center">Products</h1>
      <hr />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="row">
        {products.length === 0 && (
          <div className="col-md-12 text-center">
            <h4>No Products Found</h4>
          </div>
        )}
        {products.map((product) => (
          <div className="col-md-4 my-2" key={product._id}>
            <div className="card shadow">
              <img
                className="img-fluid card-img-top shadow-sm fit-image"
                src={product.imagePath}
                alt={product.title}
                style={{ height: "350px" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Price: {product.price}</p>
                <p className="card-text">Category: {product.category.name}</p>
                <div key={product._id}>
                  <button
                    onClick={() => addItem(product)}
                    className="btn btn-primary"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
