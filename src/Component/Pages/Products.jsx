import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import TokenContext from "../../Context/TokenContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { useCart } = useContext(TokenContext);
  const { addItem } = useCart();
  const { id } = useParams();
  const base_url = process.env.REACT_APP_BASE_URL;
  const fetchProducts = async () => {
    try {
      setLoading(true);
      fetch(`${base_url}auth/productbyCatId/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let allProducts = data.data.map((product) => {
            return {
              id: product._id,
              title: product.name,
              price: product.price,
              description: product.description,
              imagePath: product.imagePath,
              category: product.category,
            };
          });
          setProducts(allProducts);
          setLoading(false);
        });
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container my-2">
      <h1 className="text-center">Products</h1>
      <hr />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="row">
        {products.length === 0 && (
          <div className="col-md-12 text-center">
            <h4>No Products Found</h4>
          </div>
        )}
        {products.map((product) => (
          <div className="col-md-4 my-2" key={product.id}>
            <div className="card shadow">
              <img
                className="img-fluid card-img-top shadow-sm fit-image"
                src={product.imagePath}
                alt={product.title}
                style={{ height: "350px" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Price: {product.price}</p>
                <p className="card-text">Category: {product.category.name}</p>
                <div key={product.id}>
                  <button
                    onClick={() => addItem(product)}
                    className="btn btn-primary"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
