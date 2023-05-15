import React, { useState } from "react";
import TokenContext from "./TokenContext";
import { getToken, getUser } from "../Auth/auth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useCart } from "react-use-cart";

const MySwal = withReactContent(Swal);

const TokenState = (props) => {
  const token = getToken();
  const user = getUser();
  const [access_token, setAccessToken] = useState(token);
  return (
    <>
      <TokenContext.Provider
        value={{ access_token, setAccessToken, user, MySwal, useCart }}
      >
        {props.children}
      </TokenContext.Provider>
    </>
  );
};

export default TokenState;
