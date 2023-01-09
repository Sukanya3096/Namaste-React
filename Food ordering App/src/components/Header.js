import {
  BarChart,
  OtherHousesOutlined,
  RingVolumeOutlined,
  SearchRounded,
  ShoppingCartRounded,
} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";

const Header = () => {
  const [cart, setCart] = useState();
  return (
    <header>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/food-delivery-37c59.appspot.com/o/Images%2Flogo.png?alt=media&token=fc228623-ef27-4af4-8ea5-b9ebeeaf47dc"
        alt=""
        className="logo"
      />

      <div className="inputBox">
        <SearchRounded className="searchIcon" />
        <input type="text" placeholder="Search" />
      </div>

      <div className="shoppingCart">
        <ShoppingCartRounded className="cart" />
        <div className={`${!cart ? "noCartItem" : "cart_content"}`}>
          <p>{cart ? cart.length : ""}</p>
        </div>
      </div>

      <div className="profileContainer">
        <div className="pr">
          <IconButton aria-label="home">
            <OtherHousesOutlined />
          </IconButton>
        </div>

        <IconButton aria-label="home">
          <RingVolumeOutlined />
        </IconButton>
      </div>

      <div className="toggleMenu">
        <BarChart className="toggleIcon" />
      </div>
    </header>
  );
};

export default Header;
