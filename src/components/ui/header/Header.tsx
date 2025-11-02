import { Box, Button, IconButton, useMediaQuery, Badge } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchBox from "./SearchBox";
import FilterButton from "./FilterButton";
import { useTheme } from "@mui/material/styles";
import ProfilePopup from "./profilePopup";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import { CartModal } from "../cart/cartModal";
import { useGetCartQuery } from "../../../features/course-browse/api/courseApi";

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

  const [isCartOpen, setIsCartOpen] = useState(false);

  const { data: cartData } = useGetCartQuery(undefined, {
    pollingInterval: 30000,
  });

  const cartItemCount = cartData?.data?.items?.length || 0;
  const handleOpenCart = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);

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
        <IconButton color="primary" onClick={handleOpenCart}>
          <Badge
            badgeContent={cartItemCount}
            color="error"
            max={9}
            invisible={cartItemCount === 0}
          >
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        <ProfilePopup></ProfilePopup>
      </Box>
      <CartModal isOpen={isCartOpen} onClose={handleCloseCart} />
    </Box>
  );
};

export default Header;
