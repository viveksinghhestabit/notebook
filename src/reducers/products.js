const reducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_Product":
      return {
        ...state,
        dashboard: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
