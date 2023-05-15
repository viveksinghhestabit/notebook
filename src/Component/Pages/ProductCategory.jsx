import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

const ProductCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const base_url = process.env.REACT_APP_BASE_URL;

  const fetchCategories = async () => {
    try {
      setLoading(true);
      fetch(`${base_url}auth/allcategories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let allcategories = data.data.map((product) => {
            return {
              id: product._id,
              title: product.name,
              description: product.description,
              imagePath: product.imagePath,
            };
          });
          setCategories(allcategories);
          setLoading(false);
        });
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="container my-2">
      <h1 className="text-center">Categories</h1>
      <hr />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="row">
        {categories.map((category) => (
          <div className="col-md-4 my-2" key={category.id}>
            <div className="card shadow">
              <img
                className="img-fluid card-img-top shadow-sm"
                src={category.imagePath}
                alt={category.title}
                style={{ height: "350px" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{category.title}</h5>
                <p className="card-text">{category.description}</p>
                <Link
                  to={`/products/${category.id}`}
                  className="btn btn-primary"
                >
                  View Products
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategory;
