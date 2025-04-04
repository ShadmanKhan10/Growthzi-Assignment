import React, { useContext } from "react";
import { ModeContext } from "../../Context/ModeContext";
import { CartContext } from "../../Context/CartContext";
import logo from "../../assets/Images/logo.png";
import cart from "../../assets/Images/cart-icon.png";
import light from "../../assets/Images/light-mode.png";
import dark from "../../assets/Images/dark-mode.png";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { isDarkModeEnabled, setIsDarkModeEnabled } = useContext(ModeContext);
  const { getTotalItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleMode = () => {
    setIsDarkModeEnabled((prev) => !prev);
  };

  const handleNavigation = () => {
    navigate("/cart");
  };
  return (
    <div
      className="navbar-container"
      style={{
        backgroundColor: isDarkModeEnabled ? "black" : "white",
        border: isDarkModeEnabled ? "1px solid white" : "",
      }}
    >
      <div className="logo-container">
        <img src={logo} alt="logo" className="logo-icon" />
        <h3
          style={{ color: isDarkModeEnabled ? "white" : "black" }}
          className="logo-name"
        >
          ShopStop
        </h3>
      </div>
      <div className="nav-menu-container">
        <div className="cart-nav-container" onClick={handleMode}>
          <img
            src={isDarkModeEnabled ? light : dark}
            alt="menu"
            className="cart-icon"
          />
        </div>

        <div className="cart-nav-container">
          <img
            src={cart}
            alt="menu"
            className="cart-icon"
            onClick={handleNavigation}
          />
          <p
            style={{ color: isDarkModeEnabled ? "white" : "black" }}
            className="cart-quantity"
          >
            {getTotalItems()}
          </p>
        </div>
      </div>
    </div>
  );
}
