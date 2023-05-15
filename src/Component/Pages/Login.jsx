import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../Auth/auth";
import TokenContext from "../../Context/TokenContext";
import * as api from "../../Api/index";

const Login = () => {
  const { setAccessToken } = useContext(TokenContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    const response = await api.login(data);
    const json = await response.data;
    if (json.errors) {
      setError(json.errors[0].msg);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
    if (json.response.status_code === 200) {
      const { access_token, message } = json.response;
      console.log(message);
      setToken(access_token);
      await setAccessToken(access_token);
      const user = JSON.parse(atob(access_token.split(".")[1]));
      if (user.role === "admin") {
        Navigate("/admin/dashboard");
      } else {
        Navigate("/");
      }
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center">Login to My Notes</h1>
      <div className="row my-5">
        <div className="col-md-7 col-10 mx-auto">
          <form>
            <div className="mb-3 row">
              <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  className="form-control"
                  id="inputPassword"
                />
              </div>
            </div>
            {error && (
              <div className="mb-3 row">
                <div className="col-sm-10 offset-sm-2">
                  <p className="text-danger">{error}</p>
                </div>
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

export default Login;
