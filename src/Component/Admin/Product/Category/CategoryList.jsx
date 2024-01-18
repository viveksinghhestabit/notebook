import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TokenContext from "../../../../Context/TokenContext";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductCategoriesAsync,
  deleteProductCategoryAsync,
} from "../../../../store/slices/productCategory";

const CategoryList = () => {
  const dispatch = useDispatch();
  const productCategories = useSelector(
    (state) => state.productCategory.productCategories
  );
  const { MySwal } = useContext(TokenContext);
  const loading = useSelector((state) => state.productCategory.loading);
  const error = useSelector((state) => state.productCategory.error);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductCategoriesAsync());
  }, [deleteProductCategoryAsync]);

  const deleteCategory = async (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      confirmButtonText: "Ok",
      showconfirmButton: true,
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deleteProductCategoryAsync(id));
        MySwal.fire({
          title: "Deleted!",
          text: "Your Category has been deleted.",
          icon: "success",
          confirmButtonText: "Ok",
          showconfirmButton: true,
          timer: 5000,
        });
      }
    });
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-12 mb-2">
          <button
            className="btn btn-primary"
            style={{ float: "right" }}
            onClick={() => navigate("/admin/category-add")}
          >
            Add Category
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header text-center">
              <h4 className="card-title"> Category List</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                {error && <h1>{error}</h1>}
                {loading && <h1>Loading...</h1>}
                <table className="table">
                  <thead className=" text-primary">
                    <tr>
                      <th>Sr No</th>
                      <th>Image</th>
                      <th>Category Name</th>
                      <th>Category Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productCategories.map((category, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={category.imagePath}
                            alt="category"
                            style={{ width: "50px", height: "50px" }}
                          />
                        </td>
                        <td>{category.name}</td>
                        <td>{category.description}</td>
                        <td>
                          <button
                            onClick={() =>
                              navigate(`/admin/category-edit/${category._id}`)
                            }
                            className="btn btn-primary"
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger mx-2"
                            onClick={() => deleteCategory(category._id)}
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
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
