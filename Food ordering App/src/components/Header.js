import {
  BarChart,
  OtherHousesOutlined,
  RingVolumeOutlined,
  SearchRounded,
  ShoppingCartRounded,
  KeyboardArrowDown,
} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useState } from "react";
import restuarant from "../../../Food ordering App/images/restuarant.png";
import { GOOGLE_API_KEY } from "../constants";
import Geocode from "react-geocode";
import { Sidebar } from "./Sidebar";

const Header = (props) => {
  const [cart, setCart] = useState();
  const [searchText, setSearchText] = useState("");
  const [address, setAddress] = useState("");
  const [sidebarFlag, setSidebarFlag] = useState(false);

  const searchHandler = (text) => {
    setSearchText(text.target.value);
    props.onSearch(text.target.value);
  };

  const sidebarHandler = () => {
    setSidebarFlag(!sidebarFlag);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      codeLatLng(position.coords.latitude, position.coords.longitude);
    });
  }, []);

  function codeLatLng(lat, lng) {
    Geocode.setApiKey(GOOGLE_API_KEY); // USE YOUR GOOGLE API KEY!

    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        let city, state, country, zip;
        for (
          let i = 0;
          i < response.results[0].address_components.length;
          i++
        ) {
          for (
            let j = 0;
            j < response.results[0].address_components[i].types.length;
            j++
          ) {
            switch (response.results[0].address_components[i].types[j]) {
              case "locality":
                city = response.results[0].address_components[i].long_name;
                break;
              case "administrative_area_level_1":
                state = response.results[0].address_components[i].long_name;
                break;
              case "country":
                country = response.results[0].address_components[i].long_name;
                break;
              case "postal_code":
                zip = response.results[0].address_components[i].long_name;
                break;
            }
          }
        }
        setAddress(`${city}, ${state} ${zip}, ${country}`);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  return (
    <header>
      <Sidebar
        placement="start"
        name="start"
        flag={sidebarFlag}
        addressChange={setAddress}
      />
      <img src={restuarant} alt="" className="logo" />
      <span className="address">
        {address}{" "}
        <span onClick={sidebarHandler}>
          <KeyboardArrowDown />
        </span>
      </span>

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
