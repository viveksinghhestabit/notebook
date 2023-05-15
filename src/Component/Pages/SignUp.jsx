import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../Api/index";

const SignUp = () => {
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      const error = {
        msg: "Password and Confirm Password must be same",
      };
      setErrors([error]);
      setTimeout(() => {
        setErrors([]);
      }, 2000);
      return;
    }
    const response = await api.register(user);
    const json = await response.data;
    if (json.errors) {
      setErrors(json.errors);
      setTimeout(() => {
        setErrors([]);
      }, 2000);
      return;
    }
    if (json.status === 200) {
      setUser({
        email: "",
        name: "",
        password: "",
      });
      setMessage(json.message);
      setTimeout(() => {
        Navigator("/login");
      }, 2000);
    }
  };
  return (
    <div className="container my-5">
      <h1 className="text-center">Sign Up to My Notes</h1>
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

export default SignUp;
