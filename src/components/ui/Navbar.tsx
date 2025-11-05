import { useState, useEffect, ReactNode, AnchorHTMLAttributes } from "react";
import { Box, Button, IconButton, Badge, useMediaQuery, useTheme, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchBox from "./header/SearchBox";
import FilterButton from "./header/FilterButton";
import ProfilePopup from "./header/profilePopup";
import NotificationIcon from "@icons/NotificationIcon";
import { CartModal } from "./cart/cartModal";
import { useGetCartQuery } from "../../features/course-browse/api/courseApi";
import { useAuth } from "../../hooks/useAuth";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

// Simple Link component for navigation
const Link = ({ to, children, className, onClick, ...props }: LinkProps) => (
  <a href={to} className={className} onClick={onClick} {...props}>
    {children}
  </a>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const { token, user } = useAuth();
  const isLoggedIn = !!token;

  const { data: cartData } = useGetCartQuery(undefined, {
    pollingInterval: 30000,
    skip: !isLoggedIn, // Only fetch cart if user is logged in
  });

  const cartItemCount = cartData?.data?.items?.length || 0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when screen size changes
  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
      setOpenDropdown(null);
    }
  }, [isMobile]);

  const handleOpenCart = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);
  const toggleMobileMenu = () => setIsOpen(!isOpen);
  const closeMobileMenu = () => {
    setIsOpen(false);
    setOpenDropdown(null);
  };

  const navigationItems = [
    {
      name: "Explore",
      hasDropdown: true,
      dropdown: [
        {
          name: "Why Tiiron",
          desc: "Learn from success stories",
          href: "/whytiiron",
        },
        {
          name: "Who It's For",
          desc: "See who benefits from us",
          href: "/whomfor",
        },
        {
          name: "How It Works",
          desc: "Understand our platform workflow",
          href: "/ourplatform",
        },
        {
          name: "Browse Courses",
          desc: "Explore our course catalog",
          href: "/learner/browse-courses",
        },
      ],
    },
    {
      name: "Resources",
      hasDropdown: true,
      dropdown: [
        { name: "Blog", desc: "Insights, tips & updates", href: "/blog" },
        { name: "Docs", desc: "Developer & API documentation", href: "/docs" },
        {
          name: "Community",
          desc: "Join our community space",
          href: "/community",
        },
      ],
    },
  ];

  const renderDropdown = (item: typeof navigationItems[number]) => {
    if (!item.hasDropdown || !item.dropdown) return null;

    return (
      <Box
        onMouseEnter={() => setOpenDropdown(item.name)}
        onMouseLeave={() => setOpenDropdown(null)}
        sx={{
          position: "absolute",
          top: "100%",
          left: 0,
          mt: 1,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          padding: "0.75rem",
          minWidth: "280px",
          zIndex: 1000,
          border: "1px solid #e5e7eb",
        }}
      >
        {item.dropdown.map((drop) => (
          <Link
            key={drop.name}
            to={drop.href}
            onClick={() => setOpenDropdown(null)}
            style={{
              display: "block",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              backgroundColor: "#f9fafb",
              textDecoration: "none",
              color: "#1f2937",
              marginBottom: "0.5rem",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f3f4f6";
              e.currentTarget.style.transform = "translateX(4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#f9fafb";
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            <p
              style={{
                fontSize: "14px",
                fontWeight: 600,
                margin: "0 0 0.25rem 0",
              }}
            >
              {drop.name}
            </p>
            <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
              {drop.desc}
            </p>
          </Link>
        ))}
      </Box>
    );
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.95)" : "white",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
          boxShadow: isScrolled ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
          borderBottom: isScrolled ? "1px solid #e5e7eb" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <Box
          sx={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: { xs: "0 1rem", sm: "0 1.5rem", md: "0rem" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: { xs: "64px", md: "72px" },
              gap: { xs: 1, md: 2 },
            }}
          >
            {/* Left Side: Logo + Search Bar + Filter */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1, sm: 1.5, md: 2 },
                flex: { xs: 1, lg: "0 0 auto" },
                minWidth: 0,
                maxWidth: { lg: "60%", xl: "65%" },
                marginRight: { lg: 3, xl: 4 },
              }}
            >
              <Link
                to="/"
                onClick={closeMobileMenu}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <Box
                  component="img"
                  src="/Tiiron_logo.png"
                  alt="Tiiron Logo"
                  sx={{
                    height: { xs: "32px", md: "40px" },
                    width: "auto",
                    objectFit: "contain",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                />
              </Link>
              {!isMobile && (
                <>
                  <Box
                    sx={{
                      display: { xs: "none", lg: "block" },
                      minWidth: { lg: "480px", xl: "516px" },
                      flex: 1,
                      maxWidth: { lg: "600px" },
                    }}
                  >
                    <SearchBox />
                  </Box>
                  {!isMobile && (
                    <Box sx={{ display: { xs: "none", lg: "block" }, flexShrink: 0 }}>
                      <FilterButton />
                    </Box>
                  )}
                </>
              )}
            </Box>

            {/* Desktop Navigation - Center */}
            {!isMobile && (
              <Box
                sx={{
                  display: { xs: "none", lg: "flex" },
                  alignItems: "center",
                  gap: { lg: 1.5, xl: 2 },
                  justifyContent: "center",
                  flexShrink: 0,
                  flex: "0 0 auto",
                }}
              >
                {navigationItems.map((item) => (
                  <Box
                    key={item.name}
                    sx={{
                      position: "relative",
                    }}
                  >
                    {item.hasDropdown && (
                      <>
                        <Button
                          onMouseEnter={() => setOpenDropdown(item.name)}
                          onMouseLeave={() => setOpenDropdown(null)}
                          onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                          sx={{
                            color: "#ffffff",
                            fontWeight: 500,
                            fontSize: "15px",
                            textTransform: "none",
                            padding: "0.625rem 1rem",
                            borderRadius: "8px",
                            minWidth: "auto",
                            whiteSpace: "nowrap",
                            "&:hover": {
                              backgroundColor: "#f3f4f6",
                            },
                          }}
                        >
                          {item.name}
                          <Box
                            component="span"
                            sx={{
                              fontSize: "10px",
                              ml: 0.75,
                              transform: openDropdown === item.name ? "rotate(180deg)" : "rotate(0deg)",
                              transition: "transform 0.2s ease",
                              display: "inline-flex",
                              alignItems: "center",
                            }}
                          >
                            ▼
                          </Box>
                        </Button>
                        {openDropdown === item.name && renderDropdown(item)}
                      </>
                    )}
                  </Box>
                ))}
              </Box>
            )}

            {/* Right Side: Actions */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 0.5, sm: 1, md: 1.5, lg: 1.5, xl: 2 },
                flexShrink: 0,
                flex: "0 0 auto",
                marginLeft: { lg: 2, xl: 3 },
              }}
            >
              {/* Desktop Actions */}
              {!isMobile && (
                <>
                  {isLoggedIn && (
                    <>
                      <Button
                        sx={{
                          background: "rgba(112, 45, 255, 1)",
                          color: "#fff",
                          padding: { lg: "10px 20px", xl: "12px 28px" },
                          borderRadius: "12px",
                          textTransform: "none",
                          fontWeight: 600,
                          fontSize: "14px",
                          whiteSpace: "nowrap",
                          boxShadow: "0 1px 3px rgba(112, 45, 255, 0.3)",
                          "&:hover": {
                            background: "rgba(112, 45, 255, 0.9)",
                            boxShadow: "0 2px 6px rgba(112, 45, 255, 0.4)",
                            transform: "translateY(-1px)",
                          },
                          transition: "all 0.2s ease",
                          display: { xs: "none", lg: "flex" },
                          alignItems: "center",
                          flexShrink: 0,
                        }}
                      >
                        Upgrade
                      </Button>
                      <IconButton
                        onClick={handleOpenCart}
                        sx={{
                          color: "#1f2937",
                          padding: "8px",
                          flexShrink: 0,
                          "&:hover": {
                            backgroundColor: "#f3f4f6",
                          },
                        }}
                      >
                        <Badge
                          badgeContent={cartItemCount}
                          color="error"
                          max={9}
                          invisible={cartItemCount === 0}
                        >
                          <ShoppingCartIcon />
                        </Badge>
                      </IconButton>
                      <IconButton
                        sx={{
                          color: "#1f2937",
                          padding: "8px",
                          flexShrink: 0,
                          "&:hover": {
                            backgroundColor: "#f3f4f6",
                          },
                        }}
                      >
                        <NotificationIcon />
                      </IconButton>
                    </>
                  )}
                  {isLoggedIn ? (
                    <Box sx={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
                      <ProfilePopup />
                    </Box>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "0.5rem 1rem",
                          color: "#1f2937",
                          backgroundColor: "#f3f4f6",
                          borderRadius: "9999px",
                          textAlign: "center",
                          textDecoration: "none",
                          fontSize: "14px",
                          fontWeight: 500,
                          whiteSpace: "nowrap",
                          transition: "all 0.2s ease",
                          flexShrink: 0,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#e5e7eb";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#f3f4f6";
                        }}
                      >
                        Login
                      </Link>
                      <Link
                        to="/organization/create-account"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "0.5rem 1.25rem",
                          background: "linear-gradient(to right, #ef4444, #ec4899)",
                          color: "white",
                          fontWeight: 600,
                          borderRadius: "9999px",
                          textDecoration: "none",
                          fontSize: "14px",
                          whiteSpace: "nowrap",
                          transition: "all 0.2s ease",
                          boxShadow: "0 2px 4px rgba(239, 68, 68, 0.3)",
                          flexShrink: 0,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = "0.9";
                          e.currentTarget.style.transform = "translateY(-1px)";
                          e.currentTarget.style.boxShadow = "0 4px 8px rgba(239, 68, 68, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = "1";
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "0 2px 4px rgba(239, 68, 68, 0.3)";
                        }}
                      >
                        Get Started
                      </Link>
                    </>
                  )}
                </>
              )}

              {/* Mobile Menu Button */}
              <IconButton
                onClick={toggleMobileMenu}
                sx={{
                  display: { xs: "flex", lg: "none" },
                  color: "#1f2937",
                  padding: "8px",
                }}
                aria-label="Toggle menu"
              >
                {isOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Mobile Menu Drawer */}
        <Drawer
          anchor="right"
          open={isOpen && isMobile}
          onClose={closeMobileMenu}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              width: { xs: "85%", sm: "400px" },
              maxWidth: "400px",
              boxSizing: "border-box",
            },
          }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              padding: "1.5rem",
              backgroundColor: "#ffffff",
            }}
          >
            {/* Mobile Search and Filter */}
            <Box sx={{ display: "flex", gap: "10px", mb: 3 }}>
              <Box sx={{ flex: 1 }}>
                <SearchBox />
              </Box>
              <FilterButton />
            </Box>

            {/* Mobile Navigation Items */}
            <Box sx={{ flex: 1, overflowY: "auto" }}>
              {navigationItems.map((item) => (
                <Box key={item.name} sx={{ marginBottom: "1rem" }}>
                  {item.hasDropdown && (
                    <Box>
                      <Button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === item.name ? null : item.name
                          )
                        }
                        fullWidth
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "0.75rem 1rem",
                          borderRadius: "8px",
                          fontWeight: 500,
                          color: "#1f2937",
                          backgroundColor: openDropdown === item.name ? "#f3f4f6" : "transparent",
                          textTransform: "none",
                          fontSize: "16px",
                          "&:hover": {
                            backgroundColor: "#f3f4f6",
                          },
                        }}
                      >
                        {item.name}
                        <Box
                          component="span"
                          sx={{
                            fontSize: "12px",
                            transform: openDropdown === item.name ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.2s ease",
                          }}
                        >
                          ▼
                        </Box>
                      </Button>
                      {openDropdown === item.name && (
                        <Box sx={{ paddingLeft: "1rem", marginTop: "0.5rem" }}>
                          {item.dropdown?.map((drop) => (
                            <Link
                              key={drop.name}
                              to={drop.href}
                              onClick={closeMobileMenu}
                              style={{
                                display: "block",
                                padding: "0.75rem",
                                borderRadius: "0.5rem",
                                backgroundColor: "#f9fafb",
                                textDecoration: "none",
                                color: "#1f2937",
                                marginBottom: "0.5rem",
                              }}
                            >
                              <p
                                style={{
                                  fontSize: "14px",
                                  fontWeight: 600,
                                  margin: "0 0 0.25rem 0",
                                }}
                              >
                                {drop.name}
                              </p>
                              <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
                                {drop.desc}
                              </p>
                            </Link>
                          ))}
                        </Box>
                      )}
                    </Box>
                  )}
                </Box>
              ))}
            </Box>

            {/* Mobile CTA Buttons */}
            <Box
              sx={{
                paddingTop: "1.5rem",
                borderTop: "1px solid #e5e7eb",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {isLoggedIn ? (
                <>
                  <Box sx={{ display: "flex", gap: "10px", justifyContent: "center", mb: 1 }}>
                    <IconButton
                      onClick={() => {
                        handleOpenCart();
                        closeMobileMenu();
                      }}
                      sx={{
                        color: "#1f2937",
                        border: "1px solid #e5e7eb",
                        borderRadius: "12px",
                      }}
                    >
                      <Badge
                        badgeContent={cartItemCount}
                        color="error"
                        max={9}
                        invisible={cartItemCount === 0}
                      >
                        <ShoppingCartIcon />
                      </Badge>
                    </IconButton>
                    <IconButton
                      sx={{
                        color: "#1f2937",
                        border: "1px solid #e5e7eb",
                        borderRadius: "12px",
                      }}
                    >
                      <NotificationIcon />
                    </IconButton>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <ProfilePopup />
                    </Box>
                  </Box>
                  <Button
                    fullWidth
                    sx={{
                      background: "rgba(112, 45, 255, 1)",
                      color: "#fff",
                      padding: "12px 24px",
                      borderRadius: "12px",
                      textTransform: "none",
                      fontWeight: 600,
                      "&:hover": {
                        background: "rgba(112, 45, 255, 0.9)",
                      },
                    }}
                    onClick={closeMobileMenu}
                  >
                    Upgrade
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    style={{
                      display: "block",
                      padding: "0.75rem 1rem",
                      color: "#1f2937",
                      backgroundColor: "#f3f4f6",
                      borderRadius: "9999px",
                      textAlign: "center",
                      textDecoration: "none",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    Login
                  </Link>
                  <Link
                    to="/organization/create-account"
                    onClick={closeMobileMenu}
                    style={{
                      padding: "0.75rem 1.5rem",
                      background: "linear-gradient(to right, #ef4444, #ec4899)",
                      color: "white",
                      fontWeight: 600,
                      borderRadius: "9999px",
                      textDecoration: "none",
                      fontSize: "14px",
                      textAlign: "center",
                      display: "block",
                    }}
                  >
                    Get Started for Free →
                  </Link>
                </>
              )}
            </Box>
          </Box>
        </Drawer>
      </nav>

      {/* Spacer */}
      <Box sx={{ height: { xs: "64px", md: "72px" } }} />

      {/* Cart Modal */}
      {isLoggedIn && <CartModal isOpen={isCartOpen} onClose={handleCloseCart} />}
    </>
  );
};

export default Navbar;

