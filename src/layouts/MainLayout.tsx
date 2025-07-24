import { useState } from "react";
import { Box, Drawer, useMediaQuery, useTheme } from "@mui/material";
import SidebarMenu from "../components/Sidebar/Sidebar";
import LogoAndName from "../components/Sidebar/LogoAndName";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import { appRoutes } from "../routes/appRoutess";
import { globalRoutes } from "../routes/globalRoutes";

const drawerWidth = 240;
const collapsedWidth = 72;

const MainLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggleDesktopMenu = () => setDesktopOpen((prev) => !prev);
  const handleToggleMobileMenu = () => setMobileOpen((prev) => !prev);

  return (
    <Box sx={{ display: "flex" }}>
      {/* ✅ MOBILE DRAWER */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleToggleMobileMenu}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <LogoAndName toggleMenu={handleToggleMobileMenu} open={true} />
          <SidebarMenu routes={appRoutes} open={true} />
          <SidebarMenu routes={globalRoutes} open={true} />
        </Drawer>
      )}

      {/* ✅ DESKTOP DRAWER */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          open={desktopOpen}
          sx={{
            width: desktopOpen ? drawerWidth : collapsedWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: desktopOpen ? drawerWidth : collapsedWidth,
              boxSizing: "border-box",
              transition: "width 0.3s ease",
              overflowX: "hidden",
            },
          }}
        >
          <LogoAndName
            toggleMenu={handleToggleDesktopMenu}
            open={desktopOpen}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100vh",
            }}
          >
            <SidebarMenu routes={appRoutes} open={desktopOpen} />
            <SidebarMenu routes={globalRoutes} open={desktopOpen} />
          </Box>
        </Drawer>
      )}

      {/* ✅ MAIN CONTENT */}
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
            left: !isMobile
              ? desktopOpen
                ? `${drawerWidth}px`
                : `${collapsedWidth}px`
              : 0,
            width: !isMobile
              ? `calc(100% - ${desktopOpen ? drawerWidth : collapsedWidth}px)`
              : "100%",
            zIndex: 1100,
            backgroundColor: "rgba(241, 242, 244, 1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Header
            onHamburgerClick={
              isMobile ? handleToggleMobileMenu : handleToggleDesktopMenu
            }
            isSidebarOpen={isMobile ? mobileOpen : desktopOpen}
          />
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            // padding: 2,
            marginTop: "106px", // same as header height
            overflow: "auto",
            background: "rgba(241, 242, 244, 1)",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
