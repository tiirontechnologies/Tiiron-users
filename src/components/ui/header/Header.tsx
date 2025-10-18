import { Avatar, Box, Button, IconButton, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchBox from "./SearchBox";
import FilterButton from "./FilterButton";
import { useTheme } from "@mui/material/styles";
import AboutIcon from "@icons/AboutIcon";
import ProfilePopup from "./profilePopup";

const Header = ({
  onHamburgerClick,
  isSidebarOpen,
}: {
  onHamburgerClick?: () => void;
  isSidebarOpen?: boolean;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        // padding: "24px",
        padding: isMobile ? "24px 8px" : "24px",
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* Hamburger toggles between open/close icons */}
        {isMobile && onHamburgerClick && (
          <IconButton onClick={onHamburgerClick}>
            {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        )}
        <SearchBox />
        <FilterButton />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Button
          sx={{
            background: "rgba(112, 45, 255, 1)",
            color: "#fff",
            padding: "12px 48px",
            borderRadius: "12px",
            display: { xs: "none", sm: "block" },
          }}
        >
          Upgrade
        </Button>

        <ProfilePopup></ProfilePopup>
      </Box>
    </Box>
  );
};

export default Header;
