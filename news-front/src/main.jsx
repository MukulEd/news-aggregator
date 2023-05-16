import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ContextProvider } from "./contexts/ContextProvider";
import { ToastContainer } from "react-toastify";
import router from "./router.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.min.css";
import store from "@/store/index.js";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ContextProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <ToastContainer />
    </ContextProvider>
  </Provider>
  // </React.StrictMode>
);
