import { Avatar, Box, Button, IconButton, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchBox from "./SearchBox";
import FilterButton from "./FilterButton";
import { useTheme } from "@mui/material/styles";
import AboutIcon from "@icons/AboutIcon";

const Header = ({
  onHamburgerClick,
  isSidebarOpen,
}: {
  onHamburgerClick?: () => void;
  isSidebarOpen?: boolean;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: "24px",
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
          }}
        >
          Upgrade
        </Button>
        <AboutIcon />
        <Avatar src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww" />
      </Box>
    </Box>
  );
};

export default Header;
