import { useState, useEffect } from "react";
import { Sun, Moon, Layers, ArrowRight, Menu, X, ChevronDown } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const NAV_LINKS = [
    { label: "Real world results", href: "/realworldresults" },
    { label: "Features", href: "/features" },
    { label: "About", href: "/about" },
    { label: "Paths", href: "/paths" },
    { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
    const { dark, toggle, css } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState(null);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    // Close mobile menu on resize
    useEffect(() => {
        const fn = () => { if (window.innerWidth > 768) setMobileOpen(false); };
        window.addEventListener("resize", fn);
        return () => window.removeEventListener("resize", fn);
    }, []);

    return (
        <>
            <style>{`
        @keyframes navSlide {
          from { opacity:0; transform:translateY(-8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes mobileSlide {
          from { opacity:0; transform:translateY(-16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .nav-link-line::after {
          content:'';
          position:absolute;
          bottom:-2px; left:0; right:0;
          height:1px;
          background:var(--accent);
          transform:scaleX(0);
          transform-origin:left;
          transition:transform 0.25s ease;
          box-shadow: 0 0 6px var(--accent);
        }
        .nav-link-line:hover::after { transform:scaleX(1); }
      `}</style>

            <nav style={{
                ...css,
                position: "sticky", top: 0, zIndex: 200,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "0 5%", height: 64,
                background: scrolled
                    ? "var(--nav-bg)"
                    : "transparent",
                backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
                WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
                borderBottom: scrolled
                    ? `1px solid var(--border)`
                    : "1px solid transparent",
                transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                animation: "navSlide 0.5s ease both",
            }}>

                {/* ── LEFT: LOGO ── */}
                <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
                    <div style={{
                        width: 32, height: 32, borderRadius: 9,
                        background: "linear-gradient(135deg, var(--accent), var(--accent2))",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 0 18px var(--glow), 0 0 6px var(--glow2)",
                        transition: "box-shadow 0.3s",
                    }}
                        onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 28px var(--glow), 0 0 12px var(--glow2)"}
                        onMouseLeave={e => e.currentTarget.style.boxShadow = "0 0 18px var(--glow), 0 0 6px var(--glow2)"}>
                        <Layers size={15} color="#fff" strokeWidth={2.5} />
                    </div>
                    <span style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 800, fontSize: 19,
                        color: "var(--text)",
                        letterSpacing: "-0.025em",
                    }}>
                        Camp<span style={{ color: "var(--accent)" }}>HQ</span>
                    </span>
                </a>

                {/* ── CENTER: LINKS (desktop) ── */}
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    {NAV_LINKS.map(({ label, href }) => (
                        <a key={label} href={href}
                            className="nav-link-line"
                            onMouseEnter={() => setHoveredLink(label)}
                            onMouseLeave={() => setHoveredLink(null)}
                            style={{
                                position: "relative",
                                fontSize: 14, fontWeight: 400,
                                color: hoveredLink === label ? "var(--text)" : "var(--text2)",
                                padding: "6px 12px",
                                borderRadius: 8,
                                textDecoration: "none",
                                transition: "color 0.2s, background 0.2s",
                                background: hoveredLink === label ? "var(--tag-bg)" : "transparent",
                                whiteSpace: "nowrap",
                            }}>
                            {label}
                        </a>
                    ))}
                </div>

                {/* ── RIGHT: ACTIONS ── */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>

                    {/* Theme toggle */}
                    <button onClick={toggle} aria-label="Toggle theme" style={{
                        width: 38, height: 38, borderRadius: 10,
                        border: "1px solid var(--border2)",
                        background: "var(--surface)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", transition: "all 0.2s", flexShrink: 0,
                        position: "relative", overflow: "hidden",
                    }}
                        onMouseEnter={e => {
                            e.currentTarget.style.borderColor = "var(--accent)";
                            e.currentTarget.style.boxShadow = "0 0 12px var(--glow)";
                            e.currentTarget.style.background = "var(--tag-bg)";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.borderColor = "var(--border2)";
                            e.currentTarget.style.boxShadow = "none";
                            e.currentTarget.style.background = "var(--surface)";
                        }}>
                        {dark
                            ? <Sun size={16} color="var(--accent4)" strokeWidth={2} />
                            : <Moon size={16} color="var(--accent)" strokeWidth={2} />}
                    </button>

                    {/* Sign in */}
                    <a href="/login" style={{
                        fontSize: 14, fontWeight: 500,
                        color: "var(--text2)", padding: "8px 14px",
                        borderRadius: 8, textDecoration: "none",
                        transition: "color 0.2s, background 0.2s",
                        whiteSpace: "nowrap",
                    }}
                        onMouseEnter={e => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.background = "var(--surface)"; }}
                        onMouseLeave={e => { e.currentTarget.style.color = "var(--text2)"; e.currentTarget.style.background = "transparent"; }}>
                        Sign in
                    </a>

                    {/* Sign up CTA */}
                    <a href="/signup" style={{
                        display: "flex", alignItems: "center", gap: 6,
                        padding: "9px 20px",
                        background: "linear-gradient(135deg, var(--accent), var(--accent2))",
                        color: "#fff", borderRadius: 10,
                        fontSize: 14, fontWeight: 600,
                        textDecoration: "none", whiteSpace: "nowrap",
                        boxShadow: "0 4px 18px var(--glow), 0 2px 8px var(--glow2)",
                        transition: "all 0.25s",
                        fontFamily: "'DM Sans', sans-serif",
                    }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = "translateY(-1px)";
                            e.currentTarget.style.boxShadow = "0 8px 28px var(--glow), 0 4px 14px var(--glow2)";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 4px 18px var(--glow), 0 2px 8px var(--glow2)";
                        }}>
                        Sign up free <ArrowRight size={14} strokeWidth={2.5} />
                    </a>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMobileOpen(o => !o)}
                        aria-label="Toggle menu"
                        style={{
                            display: "none",
                            width: 38, height: 38, borderRadius: 10,
                            border: "1px solid var(--border2)",
                            background: "var(--surface)",
                            alignItems: "center", justifyContent: "center",
                            cursor: "pointer", flexShrink: 0,
                        }}
                        className="mobile-hamburger">
                        {mobileOpen
                            ? <X size={18} color="var(--text2)" />
                            : <Menu size={18} color="var(--text2)" />}
                    </button>
                </div>
            </nav>

            {/* ── MOBILE MENU ── */}
            {mobileOpen && (
                <div style={{
                    ...css,
                    position: "sticky", top: 64, zIndex: 199,
                    background: "var(--nav-bg)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    borderBottom: "1px solid var(--border)",
                    padding: "16px 5% 24px",
                    animation: "mobileSlide 0.25s ease both",
                }}>
                    {NAV_LINKS.map(({ label, href }) => (
                        <a key={label} href={href}
                            onClick={() => setMobileOpen(false)}
                            style={{
                                display: "block",
                                padding: "12px 16px",
                                fontSize: 15, fontWeight: 500,
                                color: "var(--text2)",
                                textDecoration: "none",
                                borderRadius: 10,
                                marginBottom: 4,
                                transition: "all 0.15s",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = "var(--tag-bg)"; e.currentTarget.style.color = "var(--text)"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text2)"; }}>
                            {label}
                        </a>
                    ))}
                    <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
                        <a href="/login" style={{ flex: 1, textAlign: "center", padding: "11px", background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 10, fontSize: 14, fontWeight: 500, color: "var(--text2)", textDecoration: "none" }}>Sign in</a>
                        <a href="/signup" style={{ flex: 1, textAlign: "center", padding: "11px", background: "linear-gradient(135deg, var(--accent), var(--accent2))", borderRadius: 10, fontSize: 14, fontWeight: 600, color: "#fff", textDecoration: "none", boxShadow: "0 4px 16px var(--glow)" }}>Sign up free</a>
                    </div>
                </div>
            )}

            <style>{`
        @media (max-width: 768px) {
          .mobile-hamburger { display: flex !important; }
        }
        @media (max-width: 860px) {
          .nav-center-links { display: none !important; }
        }
      `}</style>
        </>
    );
}