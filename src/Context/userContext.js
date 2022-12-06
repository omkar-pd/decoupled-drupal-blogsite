import { createContext, useReducer, useEffect } from "react";
import userReducer from "./userReducer";

const initialState = {
  user: JSON.parse(localStorage.getItem("access-token")) || null,
  isAuthenticated: false,
};

if (initialState.user) {
  initialState.isAuthenticated = true;
}

export const Context = createContext(initialState);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  useEffect(() => {
    return () => {};
  }, [state.isAuthenticated]);
  return (
    <Context.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
