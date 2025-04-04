import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import star from "../../assets/Images/star.png";
import heart from "../../assets/Images/heart.png";
import heartDark from "../../assets/Images/heartDark.png";
import "./Products.css";
import { ModeContext } from "../../Context/ModeContext";
import { CartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import FilterSearch from "./FilterSearch";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();
  const { isDarkModeEnabled } = useContext(ModeContext);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.log("Something went wrong", error);
      }
    };
    fetchProduct();
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    return (
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "All" || product.category === selectedCategory)
    );
  });

  return (
    <>
      <FilterSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="products-container">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="product-card"
            style={{
              backgroundColor: isDarkModeEnabled ? "black" : "white",
              border: isDarkModeEnabled ? "0.5px solid white" : "",
            }}
          >
            <div
              className="product-img-container"
              style={{ backgroundColor: "white" }}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img
                src={product.image}
                alt={product.image}
                className={
                  isDarkModeEnabled ? "product-img-dark" : "product-img"
                }
              />
            </div>
            <h4
              className="product-title"
              style={{ color: isDarkModeEnabled ? "white" : "black" }}
            >
              {product.title.slice(0, 23)}
              {product.title.length > 22 && "..."}
            </h4>
            <p className="product-description">
              {product.description.slice(0, 30)}
              {product.description.length > 30 && "..."}
            </p>
            <div className="rating-and-category-container">
              <img src={star} alt="rating" className="rating-img" />
              <p
                className="product-rating"
                style={{ color: isDarkModeEnabled ? "white" : "black" }}
              >
                {product.rating.rate}
              </p>
            </div>
            <p
              className="product-category"
              style={{ color: isDarkModeEnabled ? "white" : "black" }}
            >
              Category: {product.category}
            </p>
            <h4
              className="product-price"
              style={{ color: isDarkModeEnabled ? "white" : "black" }}
            >
              ${product.price}
            </h4>
            <div className="card-buttons-container">
              <button
                className="add-to-cart-button"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
              <img
                src={isDarkModeEnabled ? heartDark : heart}
                alt="wishlist"
                className="wishlist-icon"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
