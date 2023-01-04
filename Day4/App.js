import React from "react";
import ReactDOM from "react-dom/client";
import { FaUser } from "react-icons/fa";
import logo from "./images/logo.png";

//creating nested tags using react.createElement
const container = React.createElement("div", { class: "title" }, [
  React.createElement("h1", { key: "h1" }, "Heading 1 - without JSX"),
  React.createElement("h2", { key: "h2" }, "Heading 2"),
  React.createElement("h3", { key: "h3" }, "Heading 3"),
]);

//using jsx, react elements
const heading1 = <h1>Heading 1 - with JSX</h1>;
const Heading2 = () => <h2>Heading 2</h2>;
const Heading3 = () => <h3>Heading 3</h3>;

const ContainerComponent = () => {
  return (
    <div className="title">
      {heading1}
      <Heading2 />
      <Heading3 />
    </div>
  );
};

//search-bar

const SearchComponent = () => {
  return (
    <input
      className="search"
      key="search-bar"
      placeholder={"search anything"}
    />
  );
};

const MainComponent = () => {
  return (
    <div className="main">
      <img src={logo} alt="logo" width="40px" height="40px" />
      <SearchComponent />
      <FaUser size="2em" />
    </div>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MainComponent />);
