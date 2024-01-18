import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../../Api/index";
import { addProductAsync, setLoading } from "../../../store/slices/products";
import { getProductCategoriesAsync } from "../../../store/slices/productCategory";
import { useDispatch, useSelector } from "react-redux";

const ProductAdd = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const productCategories = useSelector(
    (state) => state.productCategory.productCategories
  );
  const [product, setProduct] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductCategoriesAsync());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    let form = new FormData();
    for (let key in product) {
      form.append(key, product[key]);
    }
    dispatch(addProductAsync(form));
    dispatch(setLoading(false));
    navigate("/admin/product-list");
  };

  return (
    <div className="container my-2">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            <div className="card-header">
              <h3>Add Product</h3>
            </div>
          </div>
          <div className="card-body">
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              id="form"
              className="form-control"
            >
              <div className="form-group mb-2">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  value={product.name}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  className="form-control"
                  value={product.description}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      [e.target.name]: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div className="form-group mb-2">
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="form-control"
                  onChange={(e) => {
                    setProduct({
                      ...product,
                      [e.target.name]: e.target.files[0],
                    });
                  }}
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="form-control"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="category">Category</label>
                <select
                  name="category"
                  id="category"
                  className="form-control"
                  value={product.category}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      [e.target.name]: e.target.value,
                    })
                  }
                >
                  <option value="">Select Category</option>
                  {productCategories &&
                    productCategories.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group mb-2">
                <label htmlFor="status">Status</label>
                <select
                  name="status"
                  id="status"
                  className="form-control"
                  value={product.status}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      [e.target.name]: e.target.value,
                    })
                  }
                >
                  <option value="">Select Status</option>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>

              <div className="form-group mb-2">
                <button type="submit" className="btn btn-primary">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAdd;
