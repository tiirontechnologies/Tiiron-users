import { useState } from "react";
import { Box, Drawer } from "@mui/material";
import SidebarMenu from "../components/Sidebar/Sidebar";
import LogoAndName from "../components/Sidebar/LogoAndName";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import { appRoutes } from "../routes/appRoutess";
import { globalRoutes } from "../routes/globalRoutes";

const drawerWidth = 240;
const collapsedWidth = 72;

const MainLayout = () => {
  const [open, setOpen] = useState(true);
  const handleToggleMenu = () => setOpen(!open);

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : collapsedWidth,
            boxSizing: "border-box",
            transition: "width 0.3s ease",
            overflowX: "hidden",
          },
        }}
      >
        <LogoAndName toggleMenu={handleToggleMenu} open={open} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100vh",
          }}
        >
          <SidebarMenu routes={appRoutes} open={open} />
          <SidebarMenu routes={globalRoutes} open={open} />
        </Box>
      </Drawer>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: open ? `${drawerWidth}px` : `${collapsedWidth}px`,
            width: open
              ? `calc(100% - ${drawerWidth}px)`
              : `calc(100% - ${collapsedWidth}px)`,
            zIndex: 1100,
            backgroundColor: "rgba(241, 242, 244, 1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Header />
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: 2,
            marginTop: "72px", // same as header height
            overflow: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
