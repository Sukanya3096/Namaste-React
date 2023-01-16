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
import { GET_COORDS, GOOGLE_API_KEY } from "../constants";
import Geocode from "react-geocode";
import { Sidebar } from "./Sidebar";
import { Link } from "react-router-dom";

const Header = (props) => {
  const [cart, setCart] = useState();
  const [searchText, setSearchText] = useState("");
  const [address, setAddress] = useState("");
  const [sidebarFlag, setSidebarFlag] = useState(false);

  const searchHandler = (text) => {
    let identifier;
    clearTimeout(identifier);
    identifier = setTimeout(() => {
      props.onSearch(text.target.value);
    }, 1000);
    setSearchText(text.target.value);
  };

  const sidebarHandler = () => {
    setSidebarFlag(!sidebarFlag);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      codeLatLng(position.coords.latitude, position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    getCoordsFromAddr(address).then((res) => {
      props.onCoords(res?.lat, res?.lng);
    });
  }, [address]);

  async function getCoordsFromAddr(addr) {
    const coords = await fetch(
      `${GET_COORDS}${addr}&key=${GOOGLE_API_KEY}`
    ).then((response) => response.json());

    return coords.results[0]?.geometry.location;
  }

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
          <Link to="/">
            <IconButton aria-label="home">
              <OtherHousesOutlined />
            </IconButton>
          </Link>
        </div>

        <Link to="/contact">
          <IconButton aria-label="home">
            <RingVolumeOutlined />
          </IconButton>
        </Link>
      </div>

      <div className="toggleMenu">
        <BarChart className="toggleIcon" />
      </div>
    </header>
  );
};

export default Header;
