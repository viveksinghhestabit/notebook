import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Main from "./Main";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "./store/slices/notes";

const store = configureStore({
  reducer: {
    notes: notesSlice,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Main />
  </Provider>
);

reportWebVitals();
