import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AllTouristsSpot from "./Pages/allTouristsSpot.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import AddTouristsSpot from "./Pages/AddTouristsSpot.jsx";
import MyList from "./Pages/MyList.jsx";
import AuthProviders from "./providers/AuthProviders.jsx";
import Home from "./Pages/Home.jsx";
import UpdatePages from "./Pages/UpdatePages.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        index: true,
        element: <Home></Home>, // default home page
      },
      {
        path: "/alltouristsspot",
        loader:()=> fetch('http://localhost:5000/alltouristspot'),
        element: <AllTouristsSpot></AllTouristsSpot>,
      },
      {
        path: "/addtouristsspot",
        element: <AddTouristsSpot></AddTouristsSpot>,
      },
      {
        path: "/mylist",
        element: <MyList></MyList>,
      },

      {
        path: "/updatemylist",
        element: <UpdatePages></UpdatePages>,
      },
      {
        path: "login",
        element: <Login />, // login page
      },
      {
        path: "register",
        element: <Register />, // register page
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <AuthProviders>
      <RouterProvider router={router} />
    </AuthProviders>
  </StrictMode>
);
