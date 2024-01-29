import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserContexProvider } from "./utilis/UseContext/UseContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContexProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserContexProvider>
);
