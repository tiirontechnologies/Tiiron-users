import React from "react";

const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();

  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "Analytics", href: "#" },
        { name: "Integrations", href: "#" },
        { name: "API", href: "#", external: true },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#" },
        { name: "Help Center", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Webinars", href: "#" },
        { name: "Case Studies", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Careers", href: "mailto:hr@inacademic.com" },
        { name: "Partners", href: "#" },
        { name: "Press Kit", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { name: "Twitter", href: "https://x.com/HrInacademic", icon: "🐦" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/inacademic", icon: "💼" },
    { name: "Instagram", href: "https://www.instagram.com/inacademic_official/", icon: "📷" },
    { name: "Facebook", href: "https://www.facebook.com/inacademic_official", icon: "👍" },
    { name: "YouTube", href: "https://www.youtube.com/@inacademic", icon: "📺" },
  ];

  const contactInfo = [
    { text: "admin@tiiron.com", href: "mailto:admin@tiiron.com", icon: "✉️" },
    { text: "+91 9161218740", href: "tel:+919161218740", icon: "📞" },
  ];

  return (
    <footer
      style={{
        width: "100%",
        background: "linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)",
        color: "#d1d5db",
      }}
    >
      {/* Newsletter CTA */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        <div
          style={{
            background: "linear-gradient(to right, #1e293b, #0f172a)",
            borderRadius: "16px",
            border: "1px solid #374151",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center", flex: 1 }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "white", margin: "0 0 0.5rem 0" }}>
              Get product updates & tips
            </h3>
            <p style={{ fontSize: "0.875rem", color: "#9ca3af", margin: 0 }}>
              Join the Tiiron newsletter — no spam, just useful stuff.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              flexWrap: "wrap",
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1,
                minWidth: "200px",
                padding: "0.5rem 1rem",
                border: "1px solid #4b5563",
                borderRadius: "8px",
                backgroundColor: "#1e293b",
                color: "#e5e7eb",
                fontSize: "14px",
              }}
              required
            />
            <button
              type="submit"
              style={{
                padding: "0.5rem 1.25rem",
                borderRadius: "8px",
                background: "linear-gradient(to right, #dc2626, #ec4899)",
                color: "white",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Subscribe →
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem 3rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {/* Brand Info & Contact */}
          <div style={{ gridColumn: "span 2" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <img
                src="/Tiiron_logo_footer.png"
                alt="Tiiron Logo"
                style={{ height: "48px", width: "auto", objectFit: "contain" }}
              />
            </div>

            <p style={{ color: "#9ca3af", marginBottom: "0.75rem", maxWidth: "500px", fontSize: "14px" }}>
              We help educators deliver interactive learning and real-time practice. Learners don't just
              watch they practice, improve, and master concepts.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {contactInfo.map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "#9ca3af",
                    textDecoration: "none",
                    fontSize: "14px",
                  }}
                >
                  <span>{c.icon}</span>
                  <span>{c.text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Link Sections */}
          {footerSections.map((sec, idx) => (
            <div key={idx}>
              <h4 style={{ fontSize: "14px", fontWeight: 600, color: "white", marginBottom: "0.75rem" }}>
                {sec.title}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {sec.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href === "#") e.preventDefault();
                      }}
                      style={{
                        color: "#9ca3af",
                        textDecoration: "none",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <span>{link.name}</span>
                      {link.external && <span style={{ fontSize: "10px" }}>↗</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social Links */}
          <div>
            <h4 style={{ fontSize: "14px", fontWeight: 600, color: "white", marginBottom: "1rem" }}>
              Follow Us
            </h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "0.75rem",
              }}
            >
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "0.5rem",
                    borderRadius: "8px",
                    border: "1px solid #374151",
                    color: "#9ca3af",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Row */}
      <div style={{ backgroundColor: "white", borderTop: "1px solid #e5e7eb" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "1.25rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: "14px", color: "#4b5563", textAlign: "center" }}>
            <span>© {currentYear} Tiiron. All rights reserved.</span>
            <span style={{ marginLeft: "0.5rem" }}>Made with ❤️ in India</span>
          </div>

          <nav style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem", fontSize: "14px" }}>
            <a href="/languages" style={{ color: "#4b5563", textDecoration: "none" }}>
              Languages
            </a>
            <a href="/legal" style={{ color: "#4b5563", textDecoration: "none" }}>
              Legal
            </a>
            <a href="/privacy" style={{ color: "#4b5563", textDecoration: "none" }}>
              Privacy
            </a>
            <a href="/sitemap" style={{ color: "#4b5563", textDecoration: "none" }}>
              Sitemap
            </a>
            <a href="/status" style={{ color: "#4b5563", textDecoration: "none" }}>
              Status
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

