import "./App.css";
import Navbar from "./Component/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import AdminLayout from "./Component/Admin/AdminLayout";
import { useContext } from "react";
import TokenContext from "./Context/TokenContext";
import AdminRoutes from "./Routes/AdminRoutes";
import FrontRoutes from "./Routes/FrontRoutes";
import { CartProvider } from "react-use-cart";
import Footer from "./Component/Pages/Footer";

function App() {
  const { access_token, user } = useContext(TokenContext);
  return (
    <>
      <Router>
        {access_token && user && user.isAdmin ? (
          <AdminLayout>
            <AdminRoutes />
          </AdminLayout>
        ) : (
          <>
            <CartProvider>
              <Navbar />
              <FrontRoutes />
              <Footer />
            </CartProvider>
          </>
        )}
      </Router>
    </>
  );
}

export default App;
