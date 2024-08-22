import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import SolarSystem from "../Pages/SolarSystem/SolarSystem";
import KaboomGame from "../Pages/KaboomGame/KaboomGame";
const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/about',
          element: <About></About>
        },
        {
          path: '/solarSystem',
          element: <SolarSystem></SolarSystem>
        },
        {
          path:'/kaboomGame',
          element: <KaboomGame></KaboomGame>
        }
      ]
    },
  ]);

  export default router;