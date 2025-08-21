import AppRouter from "@routes/AppRouter";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppThemeProvider } from "./theme/theme";
const App = () => {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AppThemeProvider>
  );
};

export default App;
