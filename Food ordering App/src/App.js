import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../App.css";
import Body from "./components/Body";
import { restaurantList } from "./constants";

const AppLayout = () => {
  const [searchText, setSearchText] = useState();

  searchTextFn = (text) => {
    setSearchText(text);
  };

  return (
    <div className="App">
      <Header onSearch={searchTextFn} />
      <Body searchText={searchText} />
    </div>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
