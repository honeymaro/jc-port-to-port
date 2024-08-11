import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import RegisterPage from "pages/Register";
import ShoppingPage from "pages/Shopping";
import imgContent from "assets/images/shopping/content.jpg";
import SearchPage from "pages/Shopping/Search";
import { css } from "@emotion/react";
import App from "App";

import "react-loading-skeleton/dist/skeleton.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "shopping",
        element: <ShoppingPage />,
        children: [
          {
            index: true,
            element: (
              <img
                src={imgContent}
                alt="content"
                css={css`
                  width: 100%;
                  height: auto;
                  object-fit: contain;
                `}
              />
            ),
          },
          {
            path: "search",
            element: <SearchPage />,
          },
        ],
      },
      {
        index: true,
        element: <Navigate to="/register" replace />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
