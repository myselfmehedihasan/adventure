import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import AllTouristsSpot from './Pages/allTouristsSpot.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import AddTouristsSpot from './Pages/AddTouristsSpot.jsx';
import MyList from './Pages/MyList.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,

    children:[
      //  {
      //   path: "/",
      //   element: <App />, // default home page
      // },
      {
        path:"/alltouristsspot",
        element:<AllTouristsSpot></AllTouristsSpot>
      },
      {
        path:"/addtouristsspot",
        element:<AddTouristsSpot></AddTouristsSpot>
      },
      {
        path:"/mylist",
        element:<MyList></MyList>
      },
      {
        path: "login",
        element: <Login />, // login page
      },
      {
        path: "register",
        element: <Register />, // register page
      },
      // {
      //   path: "*",
      //   element: <NotFound />, // 404 page
      // },
    ],
      
    
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>,
)
