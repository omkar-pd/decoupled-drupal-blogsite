import { createContext, useEffect } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("access-token")) || null,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  //   const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  //   useEffect(() => {
  //     localStorage.setItem("user", JSON.stringify(state.user));
  //   }, [state.user]);
  let user = localStorage.getItem("access-token");
  useEffect(() => {
    window.addEventListener("storage", () => {
      user = JSON.parse(localStorage.getItem("access-token")) || null;
    });
    // console.log(user);
  }, []);

  return (
    <Context.Provider
      value={{
        user: user,
      }}
    >
      {children}
    </Context.Provider>
  );
};
