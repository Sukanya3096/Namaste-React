import React, { useState } from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../App.css";
import { RouterProvider, Outlet } from "react-router-dom";
import appRouter from "./router";
import Footer from "./components/Footer";

export const AppLayout = () => {
  const [searchText, setSearchText] = useState();
  const [getLat, setLat] = useState();
  const [getLng, setLng] = useState();

  searchTextFn = (text) => {
    setSearchText(text);
  };
  getLatLngFxn = (lat, lng) => {
    setLng(lng);
    setLat(lat);
  };

  return (
    <div className="App">
      <Header onSearch={searchTextFn} onCoords={getLatLngFxn} />
      <div className="main">
        <Outlet context={[searchText, getLat, getLng]} />
      </div>
      <Footer />
    </div>
  );
};

const routes = appRouter();

const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={routes} />);
