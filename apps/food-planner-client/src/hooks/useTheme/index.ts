import { createContext, useContext } from "react";

import type { ThemeProviderState } from "@components/ThemeProvider/types";

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

export const ThemeProviderContext
  = createContext<ThemeProviderState>(initialState);

function useTheme() {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
}

export default useTheme;
