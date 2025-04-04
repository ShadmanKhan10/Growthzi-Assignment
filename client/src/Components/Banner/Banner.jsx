import React from "react";
import banner from "../../assets/Images/banner.jpg";
import bannerAnimation from "../../assets/Images/banner-animation.json";
import "./Banner.css";
import Lottie from "lottie-react";

export default function Banner() {
  return (
    <div className="banner-container">
      <img src={banner} alt="banner" className="banner-img" />
      <div className="banner-text-container">
        <h1 className="banner-heading">Elevate Your Shopping Experience!</h1>
        <p className="banner-tagline">One stop for all your shoppings</p>
      </div>
      <div className="banner-animation">
        <Lottie animationData={bannerAnimation} loop={true} />
      </div>
    </div>
  );
}
