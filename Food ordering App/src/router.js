import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./App";
import Error from "./components/Error";
import Body from "./components/Body";
import Contact from "./components/Contact";

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
      ],
    },
  ]);
};

export default appRouter;
