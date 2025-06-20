import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";

import { Provider } from "react-redux";

import router from "./routes/route.jsx";

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
