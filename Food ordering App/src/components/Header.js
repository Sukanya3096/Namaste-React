import {
  BarChart,
  OtherHousesOutlined,
  RingVolumeOutlined,
  SearchRounded,
  ShoppingCartRounded,
} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";
import restuarant from "../../../Food ordering App/images/restuarant.png";

const Header = (props) => {
  const [cart, setCart] = useState();
  const [searchText, setSearchText] = useState("");

  const searchHandler = (text) => {
    setSearchText(text.target.value);
    props.onSearch(text.target.value);
  };
  return (
    <header>
      <img src={restuarant} alt="" className="logo" />

      <div className="inputBox">
        <SearchRounded className="searchIcon" />
        <input
          type="text"
          value={searchText}
          placeholder="Search"
          onChange={searchHandler}
        />
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
