const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        isAuthenticated: true,
        user: JSON.parse(localStorage.getItem("access-token")) || null,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
