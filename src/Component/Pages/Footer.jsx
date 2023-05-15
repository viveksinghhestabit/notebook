import React from "react";

const Footer = () => {
  return (
    <div className="container-fluid bg-dark text-light py-3">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h4>About Us</h4>
            <p>
              this is an ecommerce website created by vivek singh. also you can
              add your daily notes here.
            </p>
          </div>
          <div className="col-md-4">
            <h4>Social Links</h4>
            <ul className="list-unstyled">
              <li>
                <a
                  style={{ textDecoration: "none" }}
                  href="https://www.facebook.com/vivek.singh.1004837/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa fa-facebook mx-1 fa-lg"></i> Facebook
                </a>
              </li>
              <li>
                <a
                  style={{ textDecoration: "none" }}
                  href="https://www.instagram.com/vivek_singh_rajput_/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa fa-instagram mx-1 fa-lg"></i> Instagram
                </a>
              </li>
              <li>
                <a
                  style={{ textDecoration: "none" }}
                  href="https://www.linkedin.com/in/vivek-singh-rajput-7b0b3b1b2/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa fa-linkedin mx-1 fa-lg"></i> Linkedin
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h4>News Letter</h4>
            <form>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your email"
                />
                <button className="btn btn-primary mt-2">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-12 text-center">
            <p>CopyRight &copy; 2023, All Rights Reserved By Vivek Singh </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
