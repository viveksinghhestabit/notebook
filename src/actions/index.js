const getTokens = () => {
  return {
    type: "GET_TOKENS",
  };
};

const setTokens = (tokens) => {
  return {
    type: "SET_TOKENS",
    tokens,
  };
};

export { getTokens, setTokens };
