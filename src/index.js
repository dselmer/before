import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./cartContext.js";

ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </ErrorBoundary>,
  document.getElementById("root")
);
