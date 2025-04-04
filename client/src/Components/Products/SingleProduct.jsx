import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import star from "../../assets/Images/star.png";
import { ModeContext } from "../../Context/ModeContext";

export default function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { isDarkModeEnabled } = useContext(ModeContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        console.log(response.data);
        setProduct(response.data);
      } catch (error) {
        console.log("Something went wrong", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="single-product-container"
      style={{ border: isDarkModeEnabled && "0.5px solid white" }}
    >
      <div className="single-product-image-container">
        <img
          src={product.image}
          alt={product.title}
          className="single-product-image"
        />
      </div>

      <div className="single-product-info-container">
        <p
          className="single-product-title"
          style={{ color: isDarkModeEnabled && "white" }}
        >
          {product.title}
        </p>
        <p className="single-product-description">{product.description}</p>
        <div className="single-product-rating-container">
          <img src={star} alt="star" className="single-rating-icon" />
          <p
            className="single-product-rating"
            style={{ color: isDarkModeEnabled && "white" }}
          >
            {product.rating?.rate}
          </p>
        </div>
        <p
          className="single-product-category"
          style={{ color: isDarkModeEnabled && "white" }}
        >
          Category: {product.category}
        </p>
        <p
          className="single-product-price"
          style={{ color: isDarkModeEnabled && "white" }}
        >
          ${product.price}
        </p>
        <button
          style={{
            color: isDarkModeEnabled && "black",
            backgroundColor: isDarkModeEnabled && "white",
          }}
          className="buy-now-button"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
