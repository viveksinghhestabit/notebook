import React from "react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TokenContext from "../../Context/TokenContext";

const UserEdit = () => {
  const { access_token } = useContext(TokenContext);
  const base_url = process.env.REACT_APP_BASE_URL;
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const id = window.location.pathname.split("/")[2];
  const Navigator = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${base_url}users/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${access_token}`,
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.status === "200") {
          setUser({
            email: "",
            name: "",
            password: "",
          });
          setMessage(data.message);
          setTimeout(() => {
            Navigator("/user-list");
          }, 2000);
        } else {
          console.log(data);
          setErrors(data.errors);
        }
      });
  };

  const getUserById = async (id) => {
    try {
      setLoading(true);
      fetch(`${baseUrl}users/get/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${access_token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status === "200") {
            setUser(data.data);
          } else {
            console.log(data);
            setErrors(data.errors);
          }
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserById(id);
  }, []);

  return (
    <div className="container my-5">
      <h1 className="text-center">Edit User</h1>
      {message && (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      )}
      {errors.length > 0 &&
        errors.map((error) => (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ))}
      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <div className="row my-5">
        <div className="col-md-7 col-10 mx-auto">
          <form>
            <div className="mb-3 row">
              <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="inputName" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label
                htmlFor="inputPassword"
                className="col-sm-2 col-form-label"
              >
                Password
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-sm-10 offset-sm-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
