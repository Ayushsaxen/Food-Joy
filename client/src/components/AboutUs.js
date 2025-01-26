import React from "react";

export default function AboutUs() {
  return (
    <div className="about-us-container">
      <div className="left-side">
        <img
          src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Restaurant"
          className="image"
        />
      </div>
      <div className="right-side">
        <h2 className="title">About Food Joy</h2>
        <p className="text">
          Welcome to Food Joy! We are dedicated to offering delicious and fresh
          food, made with love and passion. Our chefs use the finest ingredients
          to create a unique dining experience that brings joy to every bite.
          Come and enjoy a delightful meal with your loved ones at Food Joy –
          where every bite brings happiness!
        </p>
      </div>
    </div>
  );
}
