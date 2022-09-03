import { useReducer } from "react";
import { createContext } from "react";

const INITIAL_STATE = {
  darkMode:
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches,
};

export const DarkModeContext = createContext(INITIAL_STATE);

const darkModeReducer = (state, action) => {
  switch (action.type) {
    case "LIGHT":
      return {
        darkMode: false,
      };
    case "DARK":
      return {
        darkMode: true,
      };
    case "TOGGLE":
      return {
        darkMode: !state.darkMode,
      };
    default:
      return state;
  }
};

export const DarkModeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(darkModeReducer, INITIAL_STATE);

  return (
    <DarkModeContext.Provider
      value={{
        darkMode: state.darkMode,
        dispatch,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};
