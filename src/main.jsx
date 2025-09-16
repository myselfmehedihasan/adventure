import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import AddTouristsSpot from "./Pages/AddTouristsSpot.jsx";
import MyList from "./Pages/MyList.jsx";
import UpdatePages from "./Pages/UpdatePages.jsx";
import AuthProviders from "./providers/AuthProviders.jsx";
import Home from "./Pages/Home.jsx";
import PrivateRoute from "./Private/PrivateRoute.jsx";
import SpotDetails from "./Pages/SpotDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        // ✅ Attach loader to Home so it can fetch spots
        loader: async () => {
          const res = await fetch("http://localhost:5000/alltouristspot");
          const data = await res.json();
          // Ensure we always return an array
          return Array.isArray(data) ? data : data?.spots || [];
        },
        element: <Home />, // default home page
      },
      {
        path: "/spots/:id",
        element: (
          <PrivateRoute>
            <SpotDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/addtouristsspot",
        element: (
          <PrivateRoute>
            <AddTouristsSpot />
          </PrivateRoute>
        ),
      },
      {
        path: "/mylist",
        element: (
          <PrivateRoute>
            <MyList />
          </PrivateRoute>
        ),
      },
      {
        path: "/updatemylist",
        element: <UpdatePages />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProviders>
      <RouterProvider router={router} />
    </AuthProviders>
  </StrictMode>
);
