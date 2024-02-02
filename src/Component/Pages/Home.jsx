import TokenContext from "../../Context/TokenContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import slider1 from "../../images/slider1.jpg";
import slider2 from "../../images/slider2.jpg";
import slider3 from "../../images/slider3.jpg";

const Home = () => {
  const { access_token, user } = useContext(TokenContext);
  console.log(user, 'user');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const base_url = process.env.REACT_APP_BASE_URL;
  const fetchCategories = async () => {
    try {
      setLoading(true);
      fetch(`${base_url}auth/allcategories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let allcategories = data.data.map((product) => {
            return {
              id: product._id,
              title: product.name,
              description: product.description,
              imagePath: product.imagePath,
            };
          });
          setCategories(allcategories);
          setLoading(false);
        });
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const navigate = useNavigate();
  if (access_token && user && user.role === "admin") {
    navigate("/admin");
  }

  return (
    <div
      className="container my-3"
      style={{ minHeight: "70vh", maxWidth: "100%" }}
    >
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner" style={{ height: "500px" }}>
          <div className="carousel-item active">
            <img
              src={slider1}
              alt="product"
              className="img-fluid"
              style={{ width: "100%" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src={slider2}
              alt="product"
              className="img-fluid"
              style={{ width: "100%" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src={slider3}
              alt="product"
              className="img-fluid"
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <br />
      <h1 className="text-center">Welcome to My Notes</h1>
      <hr />
      <p className="text-center">
        This is a simple note taking app. You can create, edit, delete and view
        your notes. also there is a search bar to search your notes.
      </p>
      <br />
      <p className="text-center">
        You can also purchase products from our store. We have a wide range of
        products. You can also add products to your cart and checkout.
      </p>
      <div className="row text-center my-2 mb-2">
        <hr />
        <h1 className="">Top Categories</h1>
        {categories.map((category) => {
          return (
            <div className="col-md-4 my-2" key={category.id}>
              <div className="card">
              <img
                className="img-fluid card-img-top shadow-sm"
                src={category.imagePath}
                alt={category.title}
                style={{ height: "350px" }}
              />
                <div className="card-body">
                  <h5 className="card-title">{category.title}</h5>
                  <p className="card-text">{category.description}</p>
                  <a
                    href={`/products/${category.id}`}
                    className="btn btn-primary"
                  >
                    View Products
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
