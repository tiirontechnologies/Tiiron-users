import { useState, useEffect, ReactNode, AnchorHTMLAttributes } from "react";
import { Box, Button, IconButton, Badge, useMediaQuery, useTheme, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchBox from "./header/SearchBox";
import FilterButton from "./header/FilterButton";
import ProfilePopup from "./header/profilePopup";
import { CartModal } from "./cart/cartModal";
import { useGetCartQuery } from "../../features/course-browse/api/courseApi";
import { useAuth } from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";

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
  const isSmallMobile = useMediaQuery("(max-width: 400px)");
  const location = useLocation();

  const { token, user, isLoggedIn } = useAuth();

  // Check if a route is active
  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + "/");
  };

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
      name: "Why Tiiron",
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
      ],
    },
    {
      name: "Explore",
      hasDropdown: true,
      dropdown: [
        {
          name: "Browse Courses",
          desc: "Explore our course catalog",
          href: "/learner/browse-courses",
        },
        {
          name: "Tiiron Business",
          desc: "AI-powered learning solutions",
          href: "https://tiiron-for-busines",
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
        className="dropdown-container"
        data-dropdown={item.name}
        sx={{
          position: "absolute",
          top: "100%",
          left: 0,
          mt: 0.25,
          pt: 0.5,
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          padding: "0.75rem",
          minWidth: "256px",
          width: "256px",
          maxWidth: "90vw",
          zIndex: 1000,
          border: "1px solid #e5e7eb",
          opacity: openDropdown === item.name ? 1 : 0,
          visibility: openDropdown === item.name ? "visible" : "hidden",
          transform: openDropdown === item.name ? "translateY(0)" : "translateY(-8px)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
          pointerEvents: openDropdown === item.name ? "auto" : "none",
        }}
      >
        {item.dropdown.map((drop) => {
          const active = isActive(drop.href);
          return (
            <Box
              key={drop.name}
              component={Link}
              to={drop.href}
              onClick={() => setOpenDropdown(null)}
              sx={{
                position: "relative",
                display: "block",
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                background: active
                  ? "linear-gradient(to right, #fef2f2, #fdf2f8)"
                  : "transparent",
                textDecoration: "none",
                marginBottom: "0.25rem",
                transition: "all 0.2s ease",
                "&:hover": {
                  background: "linear-gradient(to right, #fef2f2, #fdf2f8)",
                  "& .accent-bar": {
                    opacity: 1,
                  },
                },
              }}
            >
              {/* Accent bar - Single vertical line */}
              <Box
                className="accent-bar"
                sx={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  width: "4px",
                  background: "linear-gradient(to bottom, #ef4444, #ec4899)",
                  borderRadius: "0 4px 4px 0",
                  opacity: active ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              />
              <Box
                component="p"
                sx={{
                  fontSize: "15px",
                  fontWeight: 500,
                  margin: "0 0 0.25rem 0",
                  color: active ? "#ef4444" : "#1E2939",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    color: "transparent",
                    background: "linear-gradient(to right, #ef4444, #a855f7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  },
                }}
              >
                {drop.name}
                {item.name === "Resources" &&
                  ["Blog", "Docs", "Community"].includes(drop.name) && (
                    <Box
                      component="span"
                      sx={{
                        ml: 1,
                        display: "inline-flex",
                        alignItems: "center",
                        px: 0.5,
                        py: 0.125,
                        borderRadius: "9999px",
                        backgroundColor: "#e7f0fd",
                        color: "#2563eb !important",
                        fontSize: "10px",
                        fontWeight: 600,
                        border: "1px solid #b6d1fa",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                        WebkitTextFillColor: "#2563eb !important",
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      Coming Soon
                    </Box>
                  )}
              </Box>
              <Box
                component="p"
                sx={{
                  fontSize: "12px",
                  color: active ? "#374151" : "#4b5563",
                  margin: 0,
                  transition: "color 0.2s ease",
                }}
              >
                {drop.desc}
              </Box>
            </Box>
          );
        })}
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
          backgroundColor: isScrolled ? "rgba(255, 255, 255, 1.0)" : "white",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
          boxShadow: isScrolled ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
          borderBottom: isScrolled ? "1px solid #e5e7eb" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <Box
          sx={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: { xs: "0 1rem", sm: "0 1.5rem", md: "0 2rem", lg: "0 2.5rem", xl: "0 3rem" },
            width: "100%",
            boxSizing: "border-box",
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
                gap: { xs: 0.75, sm: 1, md: 1.5, lg: 1.5, xl: 2 },
                flex: { xs: 1, lg: "0 0 auto" },
                minWidth: 0,
                maxWidth: { lg: "45%", xl: "50%" },
                marginRight: { lg: 2, xl: 2.5 },
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
                      minWidth: { lg: "300px", xl: "350px" },
                      flex: 1,
                      maxWidth: { lg: "400px", xl: "450px" },
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
                  gap: { lg: 0.75, xl: 1 },
                  justifyContent: "center",
                  flexShrink: 0,
                  flex: "0 0 auto",
                  flexWrap: "nowrap",
                  marginX: { lg: 2, xl: 2.5 },
                }}
              >
                {navigationItems.map((item) => {
                  const hasActiveDropdownItem = item.dropdown?.some((drop) => isActive(drop.href));
                  return (
                    <Box
                      key={item.name}
                      onMouseEnter={() => setOpenDropdown(item.name)}
                      onMouseLeave={() => setOpenDropdown(null)}
                      sx={{
                        position: "relative",
                      }}
                    >
                      {item.hasDropdown && (
                        <>
                          <Button
                            variant="text"
                            onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                              fontWeight: 700,
                              fontSize: "15px",
                              textTransform: "none",
                              padding: "0.625rem 1rem",
                              borderRadius: "8px",
                              minWidth: "auto",
                              whiteSpace: "nowrap",
                              color: "#1F2937",
                              backgroundColor: "transparent",
                              boxShadow: "none",
                              transition: "all 0.2s ease",
                              "&:hover": {
                                color: "transparent",
                                background: "linear-gradient(to right, #ef4444, #a855f7)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                backgroundColor: "transparent",
                                boxShadow: "none",
                              },
                            }}
                          >
                            <Box component="span">{item.name}</Box>
                            <Box
                              component="span"
                              sx={{
                                fontSize: "10px",
                                ml: 0.5,
                                transform: openDropdown === item.name ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 0.3s ease",
                                display: "inline-flex",
                                alignItems: "center",
                                color: "inherit",
                              }}
                            >
                              ▼
                            </Box>
                          </Button>
                          {renderDropdown(item)}
                        </>
                      )}
                    </Box>
                  );
                })}
              </Box>
            )}

            {/* Right Side: Actions */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 0.5, sm: 0.75, md: 1, lg: 1, xl: 1.5 },
                flexShrink: 0,
                flex: "0 0 auto",
                marginLeft: { lg: 2, xl: 2.5 },
              }}
            >
              {/* Desktop Actions */}
              {!isMobile && (
                <>
                  {isLoggedIn && (
                    <>
                      <IconButton
                        sx={{
                          color: "#1E2939",
                          padding: "8px",
                          flexShrink: 0,
                          transition: "all 0.2s ease",
                          "&:hover": {
                            backgroundColor: "#f3f4f6",
                            color: "#ef4444",
                            transform: "scale(1.1)",
                          },
                        }}
                        aria-label="Upgrade"
                      >
                        <WorkspacePremiumIcon />
                      </IconButton>
                      <IconButton
                        onClick={handleOpenCart}
                        sx={{
                          color: "#000000",
                          padding: "8px",
                          flexShrink: 0,
                          transition: "all 0.2s ease",
                          "&:hover": {
                            backgroundColor: "#f3f4f6",
                            transform: "scale(1.1)",
                            "& svg": {
                              color: "#2563eb",
                            },
                          },
                        }}
                        aria-label="Shopping cart"
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
                          color: "#000000",
                          padding: "8px",
                          flexShrink: 0,
                          transition: "all 0.2s ease",
                          "&:hover": {
                            backgroundColor: "#f3f4f6",
                            transform: "scale(1.1)",
                            "& svg": {
                              color: "#fbbf24",
                            },
                          },
                        }}
                        aria-label="Notifications"
                      >
                        <NotificationsIcon />
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
                        to="/sign-up"
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
                        Get Started →
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
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: "#f3f4f6",
                    color: "#ef4444",
                  },
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
              backgroundColor: "#ffffff",
            }}
          >
            {/* Mobile Drawer Header with Close Button */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1.25rem 1.5rem",
                borderBottom: "1px solid #e5e7eb",
                flexShrink: 0,
              }}
            >
              <Link
                to="/"
                onClick={closeMobileMenu}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src="/Tiiron_logo.png"
                  alt="Tiiron Logo"
                  sx={{
                    height: "32px",
                    width: "auto",
                    objectFit: "contain",
                  }}
                />
              </Link>
              <IconButton
                onClick={closeMobileMenu}
                sx={{
                  color: "#1f2937",
                  padding: "8px",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: "#f3f4f6",
                    color: "#ef4444",
                    transform: "rotate(90deg)",
                  },
                }}
                aria-label="Close menu"
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Mobile Search and Filter */}
            <Box sx={{ display: "flex", gap: "10px", padding: "1.5rem", paddingBottom: "1rem" }}>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <SearchBox />
              </Box>
              {!isSmallMobile && (
                <Box
                  sx={{
                    flexShrink: 0,
                  }}
                >
                  <FilterButton />
                </Box>
              )}
            </Box>

            {/* Mobile Navigation Items */}
            <Box sx={{ flex: 1, overflowY: "auto", paddingX: "1.5rem" }}>
              {navigationItems.map((item) => {
                const hasActiveDropdownItem = item.dropdown?.some((drop) => isActive(drop.href));
                return (
                  <Box key={item.name} sx={{ marginBottom: "1rem" }}>
                    {item.hasDropdown && (
                      <Box>
                        <Button
                          variant="text"
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
                            fontWeight: 700,
                            color: "#1F2937",
                            backgroundColor: "transparent",
                            boxShadow: "none",
                            textTransform: "none",
                            fontSize: "16px",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              backgroundColor: "transparent",
                              color: "transparent",
                              background: "linear-gradient(to right, #ef4444, #a855f7)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text",
                              boxShadow: "none",
                            },
                          }}
                        >
                          {item.name}
                          <Box
                            component="span"
                            sx={{
                              fontSize: "12px",
                              transform: openDropdown === item.name ? "rotate(180deg)" : "rotate(0deg)",
                              transition: "transform 0.3s ease",
                              color: "inherit",
                            }}
                          >
                            ▼
                          </Box>
                        </Button>
                        {openDropdown === item.name && (
                          <Box sx={{ paddingLeft: "1rem", marginTop: "0.5rem" }}>
                            {item.dropdown?.map((drop) => {
                              const active = isActive(drop.href);
                              return (
                                <Box
                                  key={drop.name}
                                  component={Link}
                                  to={drop.href}
                                  onClick={closeMobileMenu}
                                  sx={{
                                    position: "relative",
                                    display: "block",
                                    padding: "0.75rem 1rem",
                                    borderRadius: "0.5rem",
                                    background: active
                                      ? "linear-gradient(to right, #fef2f2, #fdf2f8)"
                                      : "#f9fafb",
                                    textDecoration: "none",
                                    marginBottom: "0.5rem",
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                      background: "linear-gradient(to right, #fef2f2, #fdf2f8)",
                                      "& .accent-bar": {
                                        opacity: 1,
                                      },
                                    },
                                  }}
                                >
                                  {/* Accent bar - Single vertical line */}
                                  <Box
                                    className="accent-bar"
                                    sx={{
                                      position: "absolute",
                                      left: 0,
                                      top: 0,
                                      height: "100%",
                                      width: "4px",
                                      background: "linear-gradient(to bottom, #ef4444, #ec4899)",
                                      borderRadius: "0 4px 4px 0",
                                      opacity: active ? 1 : 0,
                                      transition: "opacity 0.3s ease",
                                    }}
                                  />
                                  <Box
                                    component="p"
                                    sx={{
                                      fontSize: "15px",
                                      fontWeight: 500,
                                      margin: "0 0 0.25rem 0",
                                      color: active ? "#ef4444" : "#1E2939",
                                      transition: "all 0.2s ease",
                                      "&:hover": {
                                        color: "transparent",
                                        background: "linear-gradient(to right, #ef4444, #a855f7)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                      },
                                    }}
                                  >
                                    {drop.name}
                                    {item.name === "Resources" &&
                                      ["Blog", "Docs", "Community"].includes(drop.name) && (
                                        <Box
                                          component="span"
                                          sx={{
                                            ml: 1,
                                            display: "inline-flex",
                                            alignItems: "center",
                                            px: 0.5,
                                            py: 0.125,
                                            borderRadius: "9999px",
                                            backgroundColor: "#e7f0fd",
                                            color: "#2563eb !important",
                                            fontSize: "10px",
                                            fontWeight: 600,
                                            border: "1px solid #b6d1fa",
                                            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                                            WebkitTextFillColor: "#2563eb !important",
                                            position: "relative",
                                            zIndex: 1,
                                          }}
                                        >
                                          Coming Soon
                                        </Box>
                                      )}
                                  </Box>
                                  <Box
                                    component="p"
                                    sx={{
                                      fontSize: "12px",
                                      color: active ? "#374151" : "#4b5563",
                                      margin: 0,
                                      transition: "color 0.2s ease",
                                    }}
                                  >
                                    {drop.desc}
                                  </Box>
                                </Box>
                              );
                            })}
                          </Box>
                        )}
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>

            {/* Mobile CTA Buttons */}
            <Box
              sx={{
                padding: "1.5rem",
                borderTop: "1px solid #e5e7eb",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {isLoggedIn ? (
                <>
                  {/* Mobile Icons Row - All aligned */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: { xs: "0.5rem", sm: "0.75rem" },
                      flexWrap: "nowrap",
                    }}
                  >
                    <IconButton
                      onClick={() => {
                        handleOpenCart();
                        closeMobileMenu();
                      }}
                      sx={{
                        color: "#000000",
                        padding: { xs: "8px", sm: "10px" },
                        borderRadius: "12px",
                        border: "1px solid #e5e7eb",
                        minWidth: { xs: "44px", sm: "48px" },
                        height: { xs: "44px", sm: "48px" },
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: "#f3f4f6",
                          borderColor: "#2563eb",
                          transform: "scale(1.05)",
                          "& svg": {
                            color: "#2563eb",
                          },
                        },
                        "&:active": {
                          transform: "scale(0.95)",
                        },
                      }}
                      aria-label="Shopping cart"
                    >
                      <Badge
                        badgeContent={cartItemCount}
                        color="error"
                        max={9}
                        invisible={cartItemCount === 0}
                      >
                        <ShoppingCartIcon sx={{ fontSize: { xs: "20px", sm: "22px" } }} />
                      </Badge>
                    </IconButton>
                    <IconButton
                      sx={{
                        color: "#000000",
                        padding: { xs: "8px", sm: "10px" },
                        borderRadius: "12px",
                        border: "1px solid #e5e7eb",
                        minWidth: { xs: "44px", sm: "48px" },
                        height: { xs: "44px", sm: "48px" },
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: "#f3f4f6",
                          borderColor: "#fbbf24",
                          transform: "scale(1.05)",
                          "& svg": {
                            color: "#fbbf24",
                          },
                        },
                        "&:active": {
                          transform: "scale(0.95)",
                        },
                      }}
                      aria-label="Notifications"
                    >
                      <NotificationsIcon sx={{ fontSize: { xs: "20px", sm: "22px" } }} />
                    </IconButton>
                    <IconButton
                      sx={{
                        color: "#1E2939",
                        padding: { xs: "8px", sm: "10px" },
                        borderRadius: "12px",
                        border: "1px solid #e5e7eb",
                        minWidth: { xs: "44px", sm: "48px" },
                        height: { xs: "44px", sm: "48px" },
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: "#f3f4f6",
                          borderColor: "#ef4444",
                          color: "#ef4444",
                          transform: "scale(1.05)",
                        },
                        "&:active": {
                          transform: "scale(0.95)",
                        },
                      }}
                      aria-label="Upgrade"
                    >
                      <WorkspacePremiumIcon sx={{ fontSize: { xs: "20px", sm: "22px" } }} />
                    </IconButton>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: { xs: "44px", sm: "48px" },
                        height: { xs: "44px", sm: "48px" },
                      }}
                    >
                      <ProfilePopup />
                    </Box>
                  </Box>
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
                    to="/sign-up"
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

