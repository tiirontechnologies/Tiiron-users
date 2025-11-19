import AppRouter from "@routes/AppRouter";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppThemeProvider } from "./theme/theme";
import { useFirebaseAuthListener } from "./hooks/useFirebaseAuthListener";

const App = () => {
  // Initialize Firebase auth listener
  // This hook handles all Firebase auth state changes
  useFirebaseAuthListener();

  return (
    <AppThemeProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AppThemeProvider>
  );
};

export default App;
