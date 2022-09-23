import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { StateProvider } from "./store";
import AuthProvider from "./firebase/auth";
import { Provider } from "react-redux";
import { store } from "./app/rtk-store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StateProvider>
      <AuthProvider>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </AuthProvider>
    </StateProvider>
  </React.StrictMode>
);
