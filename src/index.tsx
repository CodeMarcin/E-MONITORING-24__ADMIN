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
import { InvoiceAdd } from "./Pages/Invoices/InvoiceAdd/InvoiceAdd";
import { Settings } from "./Pages/Settings/Settings";
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
      {
        path: "/invoiceAdd",
        element: <InvoiceAdd />,
      },
      {
        path: "/invoiceAdd/:id",
        element: <InvoiceAdd />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<RouterProvider router={router} />);
