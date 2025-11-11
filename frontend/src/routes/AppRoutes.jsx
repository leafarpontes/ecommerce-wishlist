import { createBrowserRouter } from "react-router";
import { ProductList } from "../pages/ProductList/ProductList";
import { Wishlist } from "../pages/Wishlist/Wishlist";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductList />,
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
  },
])