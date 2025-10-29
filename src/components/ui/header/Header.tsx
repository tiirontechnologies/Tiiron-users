import { Avatar, Box, Button, IconButton, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchBox from "./SearchBox";
import FilterButton from "./FilterButton";
import { useTheme } from "@mui/material/styles";
import AboutIcon from "@icons/AboutIcon";
import ProfilePopup from "./profilePopup";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../../slices/cartSlice"; // Path adjust karna pad sakta hai
import { CartModal } from "../cart/cartModal";

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
  const cartItems = useSelector(selectCartItems); // Cart items count ke liye
  const cartItemCount = cartItems.length;

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
        <IconButton
          color="primary"
          onClick={handleOpenCart}
          sx={{ position: "relative" }}
        >
          <ShoppingCartIcon />
          {/* Cart Count Badge (optional) */}
          {cartItemCount > 0 && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 18,
                height: 18,
                borderRadius: "50%",
                bgcolor: "red",
                color: "white",
                fontSize: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                // Max count display
                lineHeight: 1,
              }}
            >
              {cartItemCount > 9 ? "9+" : cartItemCount}
            </Box>
          )}
        </IconButton>

        <ProfilePopup></ProfilePopup>
      </Box>
      <CartModal isOpen={isCartOpen} onClose={handleCloseCart} />
    </Box>
  );
};

export default Header;
