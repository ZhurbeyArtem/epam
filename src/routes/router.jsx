import { createBrowserRouter } from "react-router-dom";

import { Home } from "../pages/Home/Home";
import { Tweets } from "../pages/Tweets/Tweets";


export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/tweets",
      element: <Tweets />,
    },
    {
      path: "*",
      element: <Home />,
    },
  ]

);
