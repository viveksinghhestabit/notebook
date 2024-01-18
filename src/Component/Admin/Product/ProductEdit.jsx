import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TokenContext from "../../../Context/TokenContext";
import { useDispatch, useSelector } from "react-redux";
import { getProductCategoriesAsync } from "../../../store/slices/productCategory";
import { updateProductAsync } from "../../../store/slices/products";
import * as api from "../../../Api/index";

const ProductEdit = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const [product, setProduct] = useState({});
  const productCategories = useSelector(
    (state) => state.productCategory.productCategories
  );
  const navigate = useNavigate();
  const { MySwal } = useContext(TokenContext);
  const { id } = useParams();

  const fetchProduct = async () => {
    const response = await api.getProduct(id);
    const result = response.data;
    setProduct(result.data);
  };
  useEffect(() => {
    dispatch(getProductCategoriesAsync());
    fetchProduct();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let form = new FormData();
    for (let key in product) {
      form.append(key, product[key]);
    }
    dispatch(updateProductAsync(id, form));
    MySwal.fire({
      title: "Updated!",
      text: "Your Product has been updated.",
      icon: "success",
      confirmButtonText: "Ok",
      showconfirmButton: true,
      timer: 5000,
    });
    navigate("/admin/product-list");
  };
  console.log(product, "product");
  return (
    <div className="container my-2">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            <div className="card-header">
              <h3>Edit Product</h3>
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
                <div className="row">
                  <div className="col-md-9">
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
                  <div className="col-md-3">
                    <img
                      src={product.imagePath}
                      alt=""
                      className="img-fluid img-thumbnail rounded mx-auto d-block"
                    />
                  </div>
                </div>
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
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      [e.target.name]: e.target.value,
                    })
                  }
                >
                  <option value="">Select Status</option>
                  <option
                    selected={product.status === true ? "selected" : ""}
                    value="1"
                  >
                    Active
                  </option>
                  <option
                    selected={product.status === false ? "selected" : ""}
                    value="inactive"
                  >
                    Inactive
                  </option>
                </select>
              </div>

              <div className="form-group mb-2">
                <button type="submit" className="btn btn-primary">
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;
