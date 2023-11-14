import { createBrowserRouter } from "react-router-dom";
import { ShimmerSimpleGallery } from "react-shimmer-effects";
import { AppLayout } from "./App";
import Error from "./components/Error";
import Body from "./components/Body";
import RestaurantMenu from "./components/RestaurantMenu";
import { lazy, Suspense } from "react";
import Cart from "./components/Cart";

const Contacts = lazy(() => import("./components/Contact"));
const CartItem = lazy(() => import("./components/Cart"));

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
          element: (
            <Suspense
              fallback={<ShimmerSimpleGallery card imageHeight={200} caption />}
            >
              <Contacts />
            </Suspense>
          ),
        },
        {
          path: "/about",
          element: (
            <Suspense
              fallback={<ShimmerSimpleGallery card imageHeight={200} caption />}
            >
              <Contacts />
            </Suspense>
          ),
        },
        {
          path: "/cart",
          element: (
            <Suspense
              fallback={<ShimmerSimpleGallery card imageHeight={200} caption />}
            >
              <CartItem />
            </Suspense>
          ),
        },
        {
          path: "/restaurant/:id",
          element: <RestaurantMenu />,
        },
      ],
    },
  ]);
};

export default appRouter;
