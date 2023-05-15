import React from "react";
import App from "./App";
import TokenState from "./Context/TokenState";

const Main = () => {
  return (
    <TokenState>
      <App />
    </TokenState>
  );
};

export default Main;
