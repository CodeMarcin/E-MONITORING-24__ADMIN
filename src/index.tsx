import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import "./index.css";
import "./CSS/vars.css";
import "./CSS/styleovveride.css";
import "./CSS/styles.css";
import App from "./App";
import { ContractorAdd } from "./Pages/Contrators/ContractorAdd/ContractorAdd";
import { ContractorsAll } from "./Pages/Contrators/ContractorsAll/ContractorsAll";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/contractorAdd",
        element: <ContractorAdd />,
      },
      {
        path: '/contractorsAll',
        element: <ContractorsAll />
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<RouterProvider router={router} />);

