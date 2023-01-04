import React from "react";
import ReactDOM from "react-dom/client";
const heading = React.createElement(
  "h1",
  { id: "title1", key: "h1" },
  "Heading 1"
);
const heading2 = React.createElement(
  "h1",
  { id: "title2", key: "h2" },
  "Heading 2"
);
const container = React.createElement("div", { id: "container" }, [
  heading,
  heading2,
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(container);
