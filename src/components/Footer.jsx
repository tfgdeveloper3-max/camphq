import { Sun, Moon, Layers } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
    const { dark, toggle } = useTheme();

    return (
        <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid var(--border)", padding: "44px 5%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 36, marginBottom: 36 }}>
                {/* Brand */}
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 11 }}>
                        <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg, var(--accent), var(--accent2))", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 14px var(--glow)" }}>
                            <Layers size={14} color="#fff" strokeWidth={2.5} />
                        </div>
                        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17, color: "var(--text)", letterSpacing: "-0.02em" }}>
                            Camp<span style={{ color: "var(--accent)" }}>HQ</span>
                        </span>
                    </div>
                    <p style={{ fontSize: 13, color: "var(--text3)", maxWidth: 210, lineHeight: 1.7 }}>
                        Project management for multi-brand companies that value clarity.
                    </p>
                </div>

                {/* Link columns */}
                {[
                    { title: "Product", links: [{ l: "Features", h: "/#features" }, { l: "Pricing", h: "/pricing" }, { l: "Changelog", h: "/new" }, { l: "Integrations", h: "/integrations" }, { l: "Apps", h: "/apps" }] },
                    { title: "Company", links: [{ l: "About", h: "/about" }, { l: "Customers", h: "/customers" }, { l: "Handbook", h: "/handbook" }, { l: "Blog", h: "/blog" }, { l: "Careers", h: "/careers" }] },
                    { title: "Support", links: [{ l: "Help center", h: "/support" }, { l: "Live classes", h: "/classes" }, { l: "Tutorials", h: "/learn" }, { l: "Status", h: "/uptime" }, { l: "Contact", h: "/support" }] },
                    { title: "Legal", links: [{ l: "Privacy", h: "/policies" }, { l: "Terms", h: "/policies" }, { l: "Security", h: "/security" }, { l: "Refund", h: "/refund" }, { l: "Cookies", h: "/policies" }] },
                ].map(({ title, links }) => (
                    <div key={title}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 13 }}>{title}</div>
                        {links.map(({ l, h }) => (
                            <a key={l} href={h} style={{ display: "block", fontSize: 13, color: "var(--text3)", marginBottom: 9, transition: "color 0.2s" }}
                                onMouseEnter={e => { e.target.style.color = "var(--text)"; }}
                                onMouseLeave={e => { e.target.style.color = "var(--text3)"; }}>
                                {l}
                            </a>
                        ))}
                    </div>
                ))}
            </div>

            {/* Bottom bar */}
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 22, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
                <span style={{ fontSize: 12.5, color: "var(--text3)" }}>© 2025 CampHQ. Built with care for multi-brand teams.</span>
                <button onClick={toggle} style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 14px", background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 100, cursor: "pointer", fontSize: 13, color: "var(--text2)", fontFamily: "inherit", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.boxShadow = "0 0 10px var(--glow)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.boxShadow = "none"; }}>
                    {dark ? <Sun size={13} color="var(--accent4)" /> : <Moon size={13} color="var(--accent)" />}
                    {dark ? "Light mode" : "Dark mode"}
                </button>
            </div>
        </footer>
    );
}