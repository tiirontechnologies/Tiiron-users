import { createContext, useContext } from "react";
import useTheme from "../hooks/useTheme";

// Provide default values to avoid undefined
const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

/**
 * ThemeProvider wraps the app and provides theme state globally
 */
export const ThemeProvider = ({ children }) => {
  const [theme, toggleTheme] = useTheme();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use ThemeContext
export const useThemeContext = () => useContext(ThemeContext);
