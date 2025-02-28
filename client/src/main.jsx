import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./main.css";
import Registration from "./Pages/Registration.jsx";
import Login from "./Pages/Login/Login.jsx";
import Menu from "./components/Menu.jsx";
import Games from "./Pages/Games/Games.jsx";
import Account from "./Pages/Account.jsx";
import WishList from "./Pages/WishList/WishList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Registration />,
  },
  {
    path: "/u",
    element: <Menu />,
    children: [
      {
        path: "/u/games",
        element: <Games />,
      },
      {
        path: "/u/wishlist",
        element: <WishList />,
      },
      {
        path: "/u/account",
        element: <Account />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
