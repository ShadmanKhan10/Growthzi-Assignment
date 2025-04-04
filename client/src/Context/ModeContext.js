import { createContext } from "react";

export const ModeContext = createContext({
  isDarkModeEnabled: 0,
  setIsDarkModeEnabled: () => {},
});
