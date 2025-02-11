import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { UserProvider } from "./context/UserContext.jsx";
import Registration from './Pages/Registration.jsx'
import Login from './Pages/Login.jsx'
import Menu from "./Pages/Menu.jsx";
import Games from "./components/Games/Games.jsx"
import EditAccountInformation from "./Pages/EditAccountInformation.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Registration />
  },
  {
    path: "/u",
    element: <Menu />,
    children: [
      {
        path: "/u/games/:userId",
        element: <Games />
      },
      {
        path: "/u/wishlist/:id",
        element: <Registration />
      },
      {
        path: "/u/account/:id",
        element: <Registration />
      },
    ], 
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
