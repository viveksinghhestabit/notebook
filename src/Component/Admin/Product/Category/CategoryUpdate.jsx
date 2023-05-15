import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TokenContext from "../../../../Context/TokenContext";
import * as api from "../../../../Api/index";

const CategoryUpdate = () => {
  const [category, setCategory] = useState({
    name: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const { access_token } = useContext(TokenContext);
  const { id } = useParams();
  const getCategoryById = async () => {
    try {
      setLoading(true);
      const response = await api.getCategory(id);
      const data = await response.data;
      if (data.status !== 200) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setCategory(data.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getCategoryById();
  }, []);
  const updateCategory = async () => {
    try {
      setLoading(true);
      let form = new FormData();
      form.append("name", category.name);
      form.append("description", category.description);
      form.append("image", category.image);
      const response = await api.updateCategory(id, form);
      const data = await response.data;
      if (data.status !== 200) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      navigate("/admin/category-list");
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCategory();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            <div className="card-header">
              <h3>Update Category</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    value={category.name}
                    onChange={(e) => {
                      setCategory({
                        ...category,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    name="description"
                    id="description"
                    className="form-control"
                    value={category.description}
                    onChange={(e) =>
                      setCategory({
                        ...category,
                        [e.target.name]: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-8">
                      <label htmlFor="image">Image</label>
                      <input
                        type="file"
                        name="image"
                        id="image"
                        className="form-control"
                        onChange={(e) => {
                          setCategory({
                            ...category,
                            [e.target.name]: e.target.files[0],
                          });
                        }}
                      />
                    </div>
                    <div className="col-md-4">
                      <img
                        src={`${category.imagePath}`}
                        alt="category"
                        className="img-fluid img-thumbnail rounded mt-4 mb-2"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    Update Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
