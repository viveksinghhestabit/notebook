import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TokenContext from "../../../../Context/TokenContext";
import * as api from "../../../../Api/index";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const { access_token } = useContext(TokenContext);

  const getchAllCategory = async () => {
    try {
      setLoading(true);
      const response = await api.getCategories();
      const data = await response.data;
      if (data.status !== 200) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setCategories(data.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getchAllCategory();
  }, []);

  const deleteCategory = async (id) => {
    try {
      setLoading(true);
      const response = await api.deleteCategory(id);
      const data = await response.data;
      if (data.status !== 200) {
        setError(data.message);
        setLoading(false);
        return;
      }
      getchAllCategory();
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
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
                    {categories.map((category, index) => (
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
