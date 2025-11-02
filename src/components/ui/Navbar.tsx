import { useState, useEffect, ReactNode, AnchorHTMLAttributes } from "react";

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
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navigationItems = [
    { name: "Features", href: "/features", highlight: true },
    { name: "Product", href: "/product" },
    { name: "Pricing", href: "/pricing" },
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

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-md border-b border-gray-200"
            : "bg-white"
          }`}
        style={{
          backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.9)" : "white",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
          boxShadow: isScrolled ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
          borderBottom: isScrolled ? "1px solid #e5e7eb" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "64px",
            }}
          >
            {/* Logo */}
            <Link to="/" style={{ display: "flex", alignItems: "center" }}>
              <img
                src="/Tiiron_logo.png"
                alt="Tiiron Logo"
                style={{
                  height: "40px",
                  width: "auto",
                  objectFit: "contain",
                  transition: "transform 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
            </Link>

            {/* Desktop Navigation */}
            <div
              style={{
                display: isDesktop ? "flex" : "none",
                alignItems: "center",
                gap: "2rem",
              }}
              className="desktop-nav"
            >
              {navigationItems.map((item) => (
                <div key={item.name} style={{ position: "relative" }}>
                  {item.hasDropdown ? (
                    <div style={{ position: "relative" }}>
                      <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.25rem",
                          color: "#1f2937",
                          fontWeight: 500,
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "16px",
                          padding: 0,
                        }}
                      >
                        <span>{item.name}</span>
                        <span style={{ fontSize: "12px" }}>▼</span>
                      </button>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      style={{
                        fontWeight: 500,
                        color: item.highlight ? "#ef4444" : "#1f2937",
                        textDecoration: "none",
                        fontSize: "16px",
                      }}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div
              style={{
                display: isDesktop ? "flex" : "none",
                alignItems: "center",
                gap: "1rem",
              }}
              className="desktop-cta"
            >
              <Link
                to="/login"
                style={{
                  display: "block",
                  padding: "0.5rem 1rem",
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
                style={{
                  padding: "0.5rem 1.5rem",
                  background: "linear-gradient(to right, #ef4444, #ec4899)",
                  color: "white",
                  fontWeight: 600,
                  borderRadius: "9999px",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                Get Started for Free →
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                padding: "0.5rem",
                borderRadius: "0.375rem",
                color: "#374151",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "20px",
                display: isDesktop ? "none" : "block",
              }}
              className="mobile-menu-btn"
            >
              {isOpen ? "✕" : "☰"}
            </button>

            {/* Mobile Menu */}
            {isOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  backgroundColor: "white",
                  borderTop: "1px solid #e5e7eb",
                  padding: "1.5rem",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              >
                {navigationItems.map((item) => (
                  <div key={item.name} style={{ marginBottom: "1rem" }}>
                    {item.hasDropdown ? (
                      <div>
                        <button
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === item.name ? null : item.name
                            )
                          }
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "0.5rem",
                            borderRadius: "0.375rem",
                            fontWeight: 500,
                            color: "#1f2937",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "16px",
                          }}
                        >
                          {item.name}
                          <span>{openDropdown === item.name ? "▲" : "▼"}</span>
                        </button>
                        {openDropdown === item.name && (
                          <div style={{ paddingLeft: "1rem", marginTop: "0.5rem" }}>
                            {item.dropdown?.map((drop) => (
                              <Link
                                key={drop.name}
                                to={drop.href}
                                onClick={() => setIsOpen(false)}
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
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        style={{
                          display: "block",
                          padding: "0.5rem",
                          borderRadius: "0.375rem",
                          fontWeight: 500,
                          color: item.highlight ? "#ef4444" : "#1f2937",
                          textDecoration: "none",
                          fontSize: "16px",
                        }}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <div
                  style={{
                    paddingTop: "1rem",
                    borderTop: "1px solid #e5e7eb",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: "block",
                      padding: "0.5rem 1rem",
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
                    onClick={() => setIsOpen(false)}
                    style={{
                      padding: "0.5rem 1.5rem",
                      background: "linear-gradient(to right, #ef4444, #ec4899)",
                      color: "white",
                      fontWeight: 600,
                      borderRadius: "9999px",
                      textDecoration: "none",
                      fontSize: "14px",
                      textAlign: "center",
                    }}
                  >
                    Get Started for Free →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div style={{ height: "64px" }}></div>
    </>
  );
};

export default Navbar;

