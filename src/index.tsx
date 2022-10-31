import React from "react";
import ReactDOM from "react-dom/client";
import '@progress/kendo-theme-default/dist/all.css';
import EmployeeDetails from "./Components/EmployeeDetails";

const App = () => (
  <>
  <EmployeeDetails />
  </>
);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
