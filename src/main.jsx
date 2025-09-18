import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import AddTouristsSpot from "./Pages/AddTouristsSpot.jsx";
import MyList from "./Pages/MyList.jsx";
import UpdatePages from "./Components/UpdateSpotModal.jsx";
import AuthProviders from "./providers/AuthProviders.jsx";
import Home from "./Pages/Home.jsx";
import PrivateRoute from "./Private/PrivateRoute.jsx";
import SpotDetails from "./Pages/SpotDetails.jsx";

import { motion, AnimatePresence } from "framer-motion";

const withTransition = (Component) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: .75 }}
  >
    <Component />
  </motion.div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        loader: async () => {
          const res = await fetch("http://localhost:5000/alltouristspot");
          const data = await res.json();
          return Array.isArray(data) ? data : data?.spots || [];
        },
        element: withTransition(Home), // ✅ smooth transition
      },
      {
        path: "/spots/:id",
        element: (
          <PrivateRoute>
            {withTransition(SpotDetails)}
          </PrivateRoute>
        ),
      },
      {
        path: "/addtouristsspot",
        element: (
          <PrivateRoute>
            {withTransition(AddTouristsSpot)}
          </PrivateRoute>
        ),
      },
      {
        path: "/mylist",
        element: (
          <PrivateRoute>
            {withTransition(MyList)}
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: withTransition(Login),
      },
      {
        path: "register",
        element: withTransition(Register),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProviders>
      <AnimatePresence mode="wait">
        <RouterProvider router={router} />
      </AnimatePresence>
    </AuthProviders>
  </StrictMode>
);
