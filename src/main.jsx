import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { ProductDetailsPage } from "./pages/ProductDetailsPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/products/:productId",
    Component: ProductDetailsPage,
  },
]);

const root = document.getElementById("root");

createRoot(root).render(<RouterProvider router={router} />);
