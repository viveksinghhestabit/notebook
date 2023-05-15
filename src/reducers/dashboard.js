const initialState = {
  dashboard: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DASHBOARD":
      return {
        ...state,
        dashboard: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
