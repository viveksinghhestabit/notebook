import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../../../Api/index";

const CategoryAdd = () => {
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const addCategory = async () => {
    try {
      setLoading(true);
      let form = new FormData();
      form.append("name", category.name);
      form.append("description", category.description);
      form.append("image", category.image);

      const response = await api.addCategory(form);
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
    addCategory();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            <div className="card-header">
              <h3>Add Category</h3>
            </div>
          </div>
          <div className="card-body">
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              id="form"
            >
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  value={category.name}
                  onChange={(e) =>
                    setCategory({
                      ...category,
                      [e.target.name]: e.target.value,
                    })
                  }
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
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryAdd;
