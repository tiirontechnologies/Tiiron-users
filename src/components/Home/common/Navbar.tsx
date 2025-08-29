import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

// Simulated Link component
const Link = ({ to, children, className, onClick, ...props }) => (
  <a href={to} className={className} onClick={onClick} {...props}>
    {children}
  </a>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { name: "Features", href: "/features", highlight: true },
    { name: "Product", href: "/product" },
    { name: "Pricing", href: "/pricing" },
    { name: "Resources", href: "/resources", hasDropdown: true },
    { name: "How It Works", href: "/how-it-works", hasDropdown: true },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-md border-b border-gray-200"
            : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Tiiron</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative group">
                  {item.hasDropdown ? (
                    <button className="flex items-center space-x-1 text-gray-800 hover:text-gray-900 font-medium transition-colors duration-200">
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 duration-300" />
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className={`font-medium transition-colors duration-200 ${
                        item.highlight
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500"
                          : "text-gray-800 hover:text-gray-900"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <a
                href="http://tiiron.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-gray-800 bg-gray-100 rounded-full hover:bg-gray-200 text-center"
              >
                Login
              </a>
              <Link
                to="/LoginSignup"
                className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-200"
              >
                Get Started for Free →
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-all duration-300"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white border-t border-gray-200 px-6 py-6 space-y-3">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md font-medium ${
                  item.highlight
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            ))}

            <div className="pt-4 border-t border-gray-200 space-y-3">
              <a
                href="http://tiiron.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-gray-800 bg-gray-100 rounded-full hover:bg-gray-200 text-center"
              >
                Login
              </a>
              <Link
                to="/LoginSignup"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-full hover:from-red-600 hover:to-pink-600 text-center"
              >
                Get Started for Free →
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
