import React from "react";
import ReactDOM from "react-dom/client";
import '@progress/kendo-theme-default/dist/all.css';
import ProductDetailsPdfExports from "./Components/ProductDetailsPdfExports";

const App = () => (
  <>
  <ProductDetailsPdfExports />
  </>
);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
