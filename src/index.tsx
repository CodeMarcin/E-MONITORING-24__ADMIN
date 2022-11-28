import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import "./index.css";
import "./CSS/vars.css";
import "./CSS/styleovveride.css";
import "./CSS/styles.css";
import App from "./App";
import { ContractorAddEdit } from "./Pages/Contrators/ContractorAddEdit/ContractorAddEdit";
import { ContractorsAll } from "./Pages/Contrators/ContractorsAll/ContractorsAll";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/contractorsAll",
        element: <ContractorsAll />,
      },
      {
        path: "/contractorAdd",
        element: <ContractorAddEdit />,
      },
      {
        path: "/contractorEdit/:id",
        element: <ContractorAddEdit />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<RouterProvider router={router} />);
