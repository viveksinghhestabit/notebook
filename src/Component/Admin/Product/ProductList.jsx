import React, { useState, useEffect, useContext } from "react";
import TokenContext from "../../../Context/TokenContext";
import { useNavigate } from "react-router-dom";
import * as api from "../../../Api/index";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { access_token, MySwal } = useContext(TokenContext);
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const fetchProducts = async () => {
    try {
      const response = await api.getProducts();
      const data = await response.data;
      if (data.status !== 200) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setProducts(data.data);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  const deleteProduct = (id) => {
    try {
      MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        confirmButtonText: "Ok",
        showconfirmButton: true,
        showCancelButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await api.deleteProduct(id);
          const data = await response.data;
          if (data.status !== 200) {
            setError(data.message);
            setLoading(false);
            return;
          }
          setLoading(false);
          MySwal.fire({
            title: "Success",
            text: "Product Deleted Successfully",
            icon: "success",
            confirmButtonText: "Ok",
            showconfirmButton: true,
            timer: 5000,
          }).then(() => {
            fetchProducts();
          });
        } else if (result.isDismissed) {
          MySwal.fire({
            title: "Cancelled",
            text: "Your Product is safe :)",
            icon: "error",
            confirmButtonText: "Ok",
            showconfirmButton: true,
            timer: 5000,
          });
        }
      });
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h1>Product List</h1>
        </div>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <div className="row">
        <div className="col-md-12 m-2 ">
          <button
            className="btn btn-primary float-end"
            onClick={() => navigate("/admin/product-add")}
          >
            Add Product
          </button>
        </div>
        <div className="col-md-12">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Product Description</th>
                <th>Product Category</th>
                <th>Product Creator</th>
                <th>Product Status</th>
                <th>Product Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id}>
                  <td>{++index}</td>
                  <td>
                    <img
                      className="img-fluid img-thumbnail rounded mx-auto d-block"
                      src={product.imagePath}
                      alt={product.name}
                      width="50"
                      height="50"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.description}</td>
                  <td>{product.category.name}</td>
                  <td>{product.creator.name}</td>
                  <td>{product.status ? "Active" : "Inactive"}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        navigate(`/admin/product-edit/${product._id}`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
