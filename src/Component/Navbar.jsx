import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Auth/auth";
import logo from "../notes.png";
import TokenContext from "../Context/TokenContext";
import { useCart } from "react-use-cart";

const Navbar = () => {
  const { access_token, setAccessToken, user } = useContext(TokenContext);
  const { items } = useCart();
  const Navigator = useNavigate();
  const logoutUser = () => {
    logout();
    setAccessToken("");
    Navigator("/");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} style={{ maxWidth: "50px" }} alt="My Notes" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/product-categories">
                Products
              </Link>
            </li>

            {access_token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/notes">
                    Notes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/chat">
                    Chat
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/orders">
                    Orders
                  </Link>
                </li>
              </>
            )}
            {user && user.role === "admin" && user.isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/contact-list">
                  Contact List
                </Link>
              </li>
            )}
          </ul>
          <form className="d-flex">
            {!access_token && (
              <>
                <button
                  className="btn btn-outline-primary"
                  style={{ marginRight: "20px" }}
                >
                  <Link to="/login">Login</Link>
                </button>
                <button className="btn btn-outline-success">
                  <Link to="/signUp">Sign Up</Link>
                </button>
              </>
            )}

            {access_token && (
              //cart icon
              <>
                <button className="btn mx-2">
                  <Link to="/cart" style={{ textDecoration: "none" }}>
                    <i className="fa fa-shopping-cart"></i>
                    <span
                      className="badge bg-warning text-dark ms-1"
                      style={{ marginBottom: "10px" }}
                    >
                      {items.length}
                    </span>
                  </Link>
                </button>
                <button
                  onClick={logoutUser}
                  className="btn btn-outline-danger"
                  type="submit"
                >
                  Logout
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
