import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import "./Cart.css";
import { ModeContext } from "../../Context/ModeContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
    clearCart,
  } = useContext(CartContext);
  const { isDarkModeEnabled } = useContext(ModeContext);

  const loadRazorpay = () => {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) {
        resolve(window.Razorpay);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(window.Razorpay);
      script.onerror = () => reject(new Error("Razorpay SDK failed to load"));

      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);

    try {
      const payableAmt = Number(getTotalPrice() * 87);
      const Razorpay = await loadRazorpay();

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: payableAmt, currency: "INR" }),
        }
      );

      const order = await response.json();
      if (!order.id) {
        alert("Failed to create order. Please try again.");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_TEST_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "ShopStop",
        description: "Payment for your product/service",
        order_id: order.id,
        handler: async function (response) {
          console.log("Payment response:", response);
          const verifyRes = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/verify-payment`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            }
          );

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            alert("Payment successful!");
            clearCart();
          } else {
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9999999999",
        },
        theme: { color: isDarkModeEnabled ? "#000000" : "#F37254" },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
      navigate("/");
    }
  };

  return (
    <div className="cart-container">
      <h2
        style={{ color: isDarkModeEnabled && "white" }}
        className="shopping-cart-headaing"
      >
        Shopping Cart
      </h2>
      {cart.length === 0 ? (
        <p
          style={{
            color: isDarkModeEnabled && "white",
            marginLeft: "2rem",
            fontSize: "2rem",
            textAlign: "center",
          }}
        >
          Your cart is empty.
        </p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div
                key={item.id}
                className="cart-item"
                style={{ border: isDarkModeEnabled && "0.5px solid white" }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h4
                    className="cart-product-title"
                    style={{ color: isDarkModeEnabled && "white" }}
                  >
                    {item.title.slice(0, 15)} {item.title.length > 15 && "..."}
                  </h4>
                  <p
                    className="cart-product-price"
                    style={{ color: isDarkModeEnabled && "white" }}
                  >
                    ${item.price.toFixed(2)}
                  </p>
                  <div className="cart-item-controls">
                    <button
                      className="increment-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span
                      className="specific-product-quantity"
                      style={{ color: isDarkModeEnabled && "white" }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      className="decrement-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    style={{
                      backgroundColor: isDarkModeEnabled && "white",
                      color: isDarkModeEnabled && "black",
                    }}
                    onClick={() => removeFromCart(item.id)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3
              style={{ color: isDarkModeEnabled && "white" }}
              className="cart-total-items"
            >
              Total Items: {getTotalItems()}
            </h3>
            <h3
              style={{ color: isDarkModeEnabled && "white" }}
              className="cart-total-price"
            >
              Total Price: ${getTotalPrice().toFixed(2)}
            </h3>
            <button
              onClick={handlePayment}
              style={{
                backgroundColor: isDarkModeEnabled && "white",
                color: isDarkModeEnabled && "black",
              }}
              className="buy-cart"
            >
              {loading ? "Initiating" : "Buy"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
