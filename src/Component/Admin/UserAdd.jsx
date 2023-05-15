import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TokenContext from "../../Context/TokenContext";

const UserAdd = () => {
  const { access_token } = useContext(TokenContext);
  const base_url = process.env.REACT_APP_BASE_URL;
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState("");
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
    fetch(`${base_url}users/create`, {
      method: "POST",
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
        if (data.status == "200") {
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

  return (
    <div className="container my-5">
      <h1 className="text-center">Add User</h1>
      <div className="row my-5">
        <div className="col-md-7 col-10 mx-auto">
          <form>
            <div className="mb-3 row">
              <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  onChange={handleChange}
                  name="email"
                  value={user.email}
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Name"
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
                Password
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
                Confirm Password
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  name="confirmPassword"
                  value={user.confirmPassword}
                  onChange={handleChange}
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            {errors.length > 0 && (
              <div className="alert alert-danger" role="alert">
                {errors.map((error, index) => {
                  return <li key={index}>{error.msg}</li>;
                })}
              </div>
            )}
            {message && (
              <div className="alert alert-success" role="alert">
                {message}
              </div>
            )}
            <div className="mb-3 row">
              <div className="col-sm-10 offset-sm-2">
                <button onClick={handleSubmit} className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserAdd;
