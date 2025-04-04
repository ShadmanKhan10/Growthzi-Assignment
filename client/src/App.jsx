import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import { ModeContext } from "./Context/ModeContext";
import { CartProvider } from "./Context/CartContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingleProduct from "./Components/Products/SingleProduct";
import Cart from "./Components/Cart/Cart";

function App() {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  return (
    <CartProvider>
      <ModeContext.Provider value={{ isDarkModeEnabled, setIsDarkModeEnabled }}>
        <div style={{ backgroundColor: isDarkModeEnabled ? "black" : "white" }}>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<SingleProduct />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ModeContext.Provider>
    </CartProvider>
  );
}

export default App;
