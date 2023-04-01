import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { store } from "./store";
import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import { persistor } from "./store";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/*<PersistGate loading={null} persistor={persistor}>*/}
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    {/*</PersistGate> */}
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.register();
