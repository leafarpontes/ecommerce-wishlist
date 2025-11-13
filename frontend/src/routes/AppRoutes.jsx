import { createBrowserRouter } from "react-router";
import { ProductList } from "../pages/ProductList/ProductList";
import { Wishlist } from "../pages/Wishlist/Wishlist";
import { NotFound } from "../pages/NotFound/NotFound";
import { Layout } from "../components/Layout/Layout";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ProductList />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ]
  }
])