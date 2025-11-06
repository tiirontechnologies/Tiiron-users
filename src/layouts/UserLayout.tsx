import { Box } from "@mui/material";
import Header from "../components/ui/header/Header";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {/* ✅ HEADER - Full width, no sidebar */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1100,
          backgroundColor: "rgba(241, 242, 244, 1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Header />
      </Box>

      {/* ✅ MAIN CONTENT - Full width */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginTop: "106px", // same as header height
          overflow: "auto",
          background: "rgba(241, 242, 244, 1)",
          width: "100%",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default UserLayout;
