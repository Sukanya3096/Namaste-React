const heading = React.createElement("h1", {
    id: "title1"
}, "Heading 1");
const heading2 = React.createElement("h1", {
    id: "title2"
}, "Heading 2");
const container = React.createElement("div", {
    id: "container"
}, [
    heading,
    heading2
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(container);

//# sourceMappingURL=index.6bd02f5a.js.map
