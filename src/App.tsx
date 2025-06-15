import AppRouter from "@routes/AppRouter";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppThemeProvider } from "./theme/theme";
const App = () => {
  return (
    // <Router>
    //   <Routes>
    //     {/* Layout Route */}
    //     <Route
    //       element={
    //         <MainLayout open={open} handleToggleMenu={handleToggleMenu} />
    //       }
    //     >
    //       <Route path="/dashboard" element={<h2>Dashboard Page</h2>} />
    //       <Route path="/settings/profile" element={<h2>Profile Page</h2>} />
    //       <Route path="/settings/account" element={<h2>Account Page</h2>} />
    //       <Route path="/knowledge" element={<h2>knowledge Page</h2>} />
    //       <Route path="*" element={<h2>Welcome! Select a menu option.</h2>} />
    //     </Route>
    //   </Routes>
    // </Router>
    <AppThemeProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AppThemeProvider>
  );
};

export default App;
