import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./App";
import Error from "./components/Error";
import Body from "./components/Body";
import Contact from "./components/Contact";
import RestuarantMenu from "./components/RestuarantMenu";

const appRouter = () => {
  return createBrowserRouter([
    {
      path: "",
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Body />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/restuarant/:id",
          element: <RestuarantMenu />,
        },
      ],
    },
  ]);
};

export default appRouter;
