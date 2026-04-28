import { useState } from "react";
import {
    Check, X, ArrowRight, Zap, Shield, Lock, RefreshCw,
    Globe, Users, TrendingUp, Star, Sparkles,
    Building2, Layers, ChevronDown, Clock, HeartHandshake,
    BadgeCheck, Rocket, CreditCard, Server,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useReveal } from "../../hooks/useReveal";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const GradText = ({ children }) => (
    <span style={{ background: "linear-gradient(135deg, var(--accent), var(--accent3) 60%, var(--accent2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
        {children}
    </span>
);

const SectionLabel = ({ text }) => (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 14 }}>
        <div style={{ width: 18, height: 1.5, background: "var(--accent)", borderRadius: 2, boxShadow: "0 0 6px var(--glow)" }} />
        {text}
    </div>
);

// ─── BILLING TOGGLE ───────────────────────────────────────────────────────────
const BillingToggle = ({ annual, setAnnual }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 52 }}>
        <span style={{ fontSize: 14, color: !annual ? "var(--text)" : "var(--text2)", fontWeight: !annual ? 600 : 400, transition: "color 0.2s" }}>Monthly</span>
        <button onClick={() => setAnnual(a => !a)} style={{
            width: 52, height: 28, borderRadius: 14,
            background: annual ? "linear-gradient(135deg, var(--accent), var(--accent2))" : "var(--surface2)",
            border: "1px solid var(--border2)", cursor: "pointer", position: "relative",
            transition: "all 0.3s", boxShadow: annual ? "0 0 14px var(--glow)" : "none",
        }}>
            <div style={{
                position: "absolute", top: 3, left: annual ? 26 : 4,
                width: 20, height: 20, borderRadius: "50%", background: "#fff",
                transition: "left 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            }} />
        </button>
        <span style={{ fontSize: 14, color: annual ? "var(--text)" : "var(--text2)", fontWeight: annual ? 600 : 400, transition: "color 0.2s" }}>
            Annual
            <span style={{ marginLeft: 7, fontSize: 11, padding: "2px 8px", background: "rgba(0,255,179,0.12)", color: "var(--accent3)", borderRadius: 100, fontWeight: 700, border: "1px solid rgba(0,255,179,0.2)", boxShadow: "0 0 8px var(--glow3)" }}>
                Save 20%
            </span>
        </span>
    </div>
);

// ─── PLAN CARD ────────────────────────────────────────────────────────────────
const PlanCard = ({ id, plan, monthlyPrice, annualPrice, desc, features, cta, featured, color, icon: Icon, annual, delay, selected, onSelect }) => {
    const [ref, visible] = useReveal();
    const price = annual ? annualPrice : monthlyPrice;
    const isFree = monthlyPrice === "Free";
    const savings = !isFree && annual
        ? `Save $${(parseInt(monthlyPrice) * 12 - parseInt(annualPrice) * 12)}/yr`
        : null;

    const isSelected = selected === id;

    return (
        <div ref={ref}
            onClick={() => onSelect(id)}
            style={{
                position: "relative", cursor: "pointer",
                background: isSelected
                    ? `linear-gradient(145deg, ${color}20, ${color}08)`
                    : "var(--card-bg)",
                border: `2px solid ${isSelected ? color : featured ? color + "40" : "var(--card-border)"}`,
                borderRadius: 24, padding: "36px 30px 32px",
                opacity: visible ? 1 : 0,
                transform: visible
                    ? `translateY(${isSelected || featured ? "-12px" : "0"}) scale(${isSelected ? 1.03 : featured ? 1.01 : 1})`
                    : "translateY(32px)",
                transition: `all 0.4s cubic-bezier(0.34,1.2,0.64,1) ${delay}ms`,
                boxShadow: isSelected
                    ? `0 0 0 1px ${color}50, 0 32px 80px ${color}28, 0 0 60px ${color}14`
                    : featured
                        ? `0 0 0 1px ${color}25, 0 20px 60px ${color}12`
                        : "0 4px 24px rgba(0,0,0,0.2)",
                backdropFilter: "blur(16px)",
                userSelect: "none",
            }}>

            {/* selected glow top border */}
            <div style={{
                position: "absolute", top: 0, left: "5%", right: "5%", height: 1,
                background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                boxShadow: `0 0 ${isSelected ? "16px" : "6px"} ${color}`,
                opacity: isSelected ? 1 : featured ? 0.5 : 0,
                transition: "all 0.4s",
            }} />

            {/* selected checkmark badge */}
            {isSelected && (
                <div style={{ position: "absolute", top: -14, right: 20, width: 28, height: 28, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 16px ${color}` }}>
                    <Check size={15} color="#fff" strokeWidth={3} />
                </div>
            )}

            {/* featured / most popular badge */}
            {featured && !isSelected && (
                <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#fff", background: `linear-gradient(135deg, var(--accent), var(--accent2))`, padding: "4px 16px", borderRadius: 100, whiteSpace: "nowrap", boxShadow: "0 4px 16px var(--glow)", textTransform: "uppercase" }}>
                    Most popular
                </div>
            )}

            {/* selected label */}
            {isSelected && (
                <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#fff", background: `linear-gradient(135deg, ${color}, var(--accent2))`, padding: "4px 16px", borderRadius: 100, whiteSpace: "nowrap", boxShadow: `0 4px 16px ${color}80`, textTransform: "uppercase" }}>
                    ✓ Selected
                </div>
            )}

            {/* plan header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: `${color}16`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: isSelected ? `0 0 18px ${color}50` : "none", transition: "box-shadow 0.3s" }}>
                            <Icon size={19} color={color} strokeWidth={1.8} />
                        </div>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: "var(--text)", letterSpacing: "-0.02em" }}>{plan}</div>
                    </div>
                    <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6, maxWidth: 220 }}>{desc}</div>
                </div>
                {savings && (
                    <div style={{ fontSize: 11, padding: "3px 9px", background: "rgba(0,255,179,0.1)", color: "var(--accent3)", borderRadius: 100, fontWeight: 700, border: "1px solid rgba(0,255,179,0.2)", whiteSpace: "nowrap" }}>
                        {savings}
                    </div>
                )}
            </div>

            {/* price */}
            <div style={{ marginBottom: 24, paddingBottom: 22, borderBottom: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                    {!isFree && <span style={{ fontSize: 20, fontWeight: 500, color: "var(--text2)", fontFamily: "'Syne', sans-serif" }}>$</span>}
                    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 52, letterSpacing: "-0.04em", lineHeight: 1, color: isSelected ? color : "var(--text)", filter: isSelected ? `drop-shadow(0 0 16px ${color}60)` : "none", transition: "all 0.3s" }}>
                        {isFree ? "Free" : price}
                    </span>
                    {!isFree && (
                        <div style={{ display: "flex", flexDirection: "column", marginLeft: 4 }}>
                            <span style={{ fontSize: 13, color: "var(--text2)" }}>/ user</span>
                            <span style={{ fontSize: 13, color: "var(--text2)" }}>/ month</span>
                        </div>
                    )}
                </div>
                {isFree && <div style={{ fontSize: 12.5, color: "var(--text3)", marginTop: 4 }}>Forever free, no card needed</div>}
                {!isFree && annual && <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 5 }}>Billed annually · Cancel anytime</div>}
                {!isFree && !annual && <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 5 }}>Billed monthly · Cancel anytime</div>}
            </div>

            {/* features */}
            <div style={{ marginBottom: 26, display: "flex", flexDirection: "column", gap: 10 }}>
                {features.map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <div style={{ marginTop: 1, flexShrink: 0 }}>
                            <Check size={14} color={color} strokeWidth={2.5} style={{ filter: isSelected ? `drop-shadow(0 0 5px ${color})` : "none", transition: "filter 0.3s" }} />
                        </div>
                        <span style={{ fontSize: 13.5, color: "var(--text2)", lineHeight: 1.55 }}>{f}</span>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <a href="/signup"
                onClick={e => e.stopPropagation()}
                style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "13px 0", width: "100%",
                    background: isSelected
                        ? `linear-gradient(135deg, ${color}, var(--accent2))`
                        : featured
                            ? `linear-gradient(135deg, var(--accent), var(--accent2))`
                            : `${color}14`,
                    color: isSelected || featured ? "#fff" : color,
                    border: isSelected || featured ? "none" : `1px solid ${color}28`,
                    borderRadius: 12, fontSize: 14.5, fontWeight: 600,
                    cursor: "pointer", transition: "all 0.3s",
                    fontFamily: "'DM Sans', sans-serif",
                    boxShadow: isSelected ? `0 6px 24px ${color}60` : featured ? "0 6px 24px var(--glow)" : "none",
                    textDecoration: "none",
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}>
                {cta} <ArrowRight size={15} strokeWidth={2.5} />
            </a>
        </div>
    );
};

// ─── COMPARISON TABLE ────────────────────────────────────────────────────────
const CompareTable = () => {
    const [ref, visible] = useReveal();

    const categories = [
        {
            name: "Core tools",
            rows: [
                { label: "Projects", free: "1", plus: "Unlimited", pro: "Unlimited" },
                { label: "Users", free: "Up to 20", plus: "Unlimited", pro: "Unlimited" },
                { label: "Storage", free: "1 GB", plus: "500 GB", pro: "5 TB" },
                { label: "Message boards", free: true, plus: true, pro: true },
                { label: "To-dos & tasks", free: true, plus: true, pro: true },
                { label: "Card table (Kanban)", free: true, plus: true, pro: true },
                { label: "Campfire chat", free: true, plus: true, pro: true },
                { label: "Docs & files", free: true, plus: true, pro: true },
                { label: "Scheduling & calendar", free: true, plus: true, pro: true },
                { label: "Automatic check-ins", free: true, plus: true, pro: true },
            ],
        },
        {
            name: "Brand management",
            rows: [
                { label: "Brand workspaces", free: "1", plus: "Unlimited", pro: "Unlimited" },
                { label: "Brand-specific email routing", free: false, plus: true, pro: true },
                { label: "Custom branding per brand", free: false, plus: true, pro: true },
                { label: "Client access per brand", free: false, plus: true, pro: true },
                { label: "Brand analytics", free: false, plus: true, pro: true },
            ],
        },
        {
            name: "AI features",
            rows: [
                { label: "AI assistant", free: false, plus: "Basic", pro: "Full" },
                { label: "Smart task suggestions", free: false, plus: true, pro: true },
                { label: "AI email drafting per brand", free: false, plus: false, pro: true },
                { label: "Deadline predictions", free: false, plus: false, pro: true },
                { label: "Auto thread summaries", free: false, plus: true, pro: true },
            ],
        },
        {
            name: "Reports & visibility",
            rows: [
                { label: "Overdue report", free: true, plus: true, pro: true },
                { label: "Who's responsible", free: false, plus: true, pro: true },
                { label: "Time tracking (Timesheet)", free: false, plus: "Add-on", pro: "Included" },
                { label: "Mission control", free: false, plus: true, pro: true },
                { label: "Hill charts", free: false, plus: true, pro: true },
                { label: "Lineup (visual timeline)", free: false, plus: true, pro: true },
                { label: "Export reports (PDF/CSV)", free: false, plus: false, pro: true },
            ],
        },
        {
            name: "Admin & security",
            rows: [
                { label: "Admin Pro Pack", free: false, plus: "Add-on", pro: "Included" },
                { label: "Two-factor authentication", free: true, plus: true, pro: true },
                { label: "SSO / SAML", free: false, plus: false, pro: true },
                { label: "Audit log", free: false, plus: false, pro: true },
                { label: "Priority support", free: false, plus: false, pro: true },
                { label: "Personal onboarding", free: false, plus: false, pro: true },
                { label: "99.9% uptime SLA", free: true, plus: true, pro: true },
            ],
        },
    ];

    const Cell = ({ val, isHeader }) => {
        if (isHeader) return (
            <td style={{ padding: "14px 20px", textAlign: "center", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: "var(--text)", borderBottom: "1px solid var(--border2)" }}>{val}</td>
        );
        if (val === true) return (
            <td style={{ padding: "13px 20px", textAlign: "center", borderBottom: "1px solid var(--border)" }}>
                <Check size={16} color="var(--accent3)" strokeWidth={2.5} style={{ margin: "0 auto", display: "block", filter: "drop-shadow(0 0 4px rgba(0,255,179,0.5))" }} />
            </td>
        );
        if (val === false) return (
            <td style={{ padding: "13px 20px", textAlign: "center", borderBottom: "1px solid var(--border)" }}>
                <X size={15} color="var(--text3)" strokeWidth={2} style={{ margin: "0 auto", display: "block" }} />
            </td>
        );
        return (
            <td style={{ padding: "13px 20px", textAlign: "center", fontSize: 13, color: "var(--text2)", borderBottom: "1px solid var(--border)", fontWeight: 500 }}>{val}</td>
        );
    };

    return (
        <div ref={ref} style={{ overflowX: "auto", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.6s ease" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
                <thead>
                    <tr style={{ background: "var(--surface2)" }}>
                        <td style={{ padding: "16px 20px", fontSize: 13, fontWeight: 600, color: "var(--text3)", borderBottom: "1px solid var(--border2)", width: "40%" }}>Feature</td>
                        {["Free", "Plus", "Pro Unlimited"].map((h, i) => <Cell key={i} val={h} isHeader />)}
                    </tr>
                </thead>
                <tbody>
                    {categories.map((cat, ci) => (
                        <>
                            <tr key={`cat-${ci}`}>
                                <td colSpan={4} style={{ padding: "16px 20px 8px", fontSize: 11, fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: "1px solid var(--border)", background: "var(--bg3)" }}>
                                    {cat.name}
                                </td>
                            </tr>
                            {cat.rows.map((row, ri) => (
                                <tr key={`row-${ci}-${ri}`}
                                    style={{ background: ri % 2 === 0 ? "transparent" : "rgba(120,100,255,0.018)" }}
                                    onMouseEnter={e => e.currentTarget.style.background = "var(--surface)"}
                                    onMouseLeave={e => e.currentTarget.style.background = ri % 2 === 0 ? "transparent" : "rgba(120,100,255,0.018)"}>
                                    <td style={{ padding: "13px 20px", fontSize: 13.5, color: "var(--text2)", borderBottom: "1px solid var(--border)" }}>{row.label}</td>
                                    <Cell val={row.free} />
                                    <Cell val={row.plus} />
                                    <Cell val={row.pro} />
                                </tr>
                            ))}
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// ─── TESTIMONIAL MINI ─────────────────────────────────────────────────────────
const MiniTesti = ({ quote, name, role, color, delay }) => {
    const [ref, visible] = useReveal();
    return (
        <div ref={ref} style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 18, padding: "22px 24px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: `all 0.5s ease ${delay}ms`, backdropFilter: "blur(16px)" }}>
            <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="var(--accent4)" color="var(--accent4)" />)}
            </div>
            <p style={{ fontSize: 13.5, color: "var(--text2)", lineHeight: 1.75, fontStyle: "italic", marginBottom: 16 }}>"{quote}"</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${color}, var(--accent2))`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0, boxShadow: `0 0 10px ${color}50` }}>
                    {name[0]}
                </div>
                <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{name}</div>
                    <div style={{ fontSize: 11.5, color: "var(--text3)" }}>{role}</div>
                </div>
            </div>
        </div>
    );
};

// ─── FAQ ITEM ─────────────────────────────────────────────────────────────────
const FaqItem = ({ q, a }) => {
    const [open, setOpen] = useState(false);
    return (
        <div style={{ borderBottom: "1px solid var(--border)" }}>
            <button onClick={() => setOpen(o => !o)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "17px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 16 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", fontFamily: "'DM Sans', sans-serif" }}>{q}</span>
                <ChevronDown size={17} color="var(--text3)" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.3s", flexShrink: 0 }} />
            </button>
            <div style={{ maxHeight: open ? 400 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
                <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.8, paddingBottom: 18 }}>{a}</p>
            </div>
        </div>
    );
};

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function PricingPage() {
    const { dark, css } = useTheme();
    const [annual, setAnnual] = useState(false);
    const [selected, setSelected] = useState("plus"); // default selected
    const [showTable, setShowTable] = useState(false);
    const t = (d, l) => dark ? d : l;

    const plans = [
        {
            id: "free",
            plan: "Free",
            monthlyPrice: "Free",
            annualPrice: "Free",
            desc: "Run one project at a time. No credit card, forever free.",
            icon: Rocket,
            color: t("#00FFB3", "#00a87a"),
            featured: false,
            cta: "Start free forever",
            features: [
                "1 project at a time",
                "Up to 20 users",
                "1 GB storage space",
                "All core tools included",
                "Message boards, to-dos, chat",
                "Docs & file sharing",
                "Upgrade anytime, no pressure",
            ],
        },
        {
            id: "plus",
            plan: "Plus",
            monthlyPrice: "15",
            annualPrice: "12",
            desc: "Ideal for freelancers, startups, and growing teams.",
            icon: Zap,
            color: t("#7B5EFF", "#5a3be8"),
            featured: true,
            cta: "Try free for 30 days",
            features: [
                "Unlimited projects",
                "Pay only for employees",
                "Guests & clients always free",
                "500 GB storage",
                "Unlimited brand workspaces",
                "AI assistant (basic)",
                "24/7/365 support",
                "Timesheet add-on available",
                "Admin Pro Pack add-on",
            ],
        },
        {
            id: "pro",
            plan: "Pro Unlimited",
            monthlyPrice: "299",
            annualPrice: "239",
            desc: "Fixed price for your whole org. Every feature, no per-user fees.",
            icon: Building2,
            color: t("#FF4D8D", "#e8185e"),
            featured: false,
            cta: "Try free for 60 days",
            features: [
                "Unlimited projects & users",
                "Fixed price — no per-user billing",
                "5 TB storage",
                "Full AI suite per brand",
                "Priority 24/7/365 support",
                "Timesheet included",
                "Admin Pro Pack included",
                "SSO / SAML",
                "Audit log",
                "Personal onboarding session",
                "Or $349/mo billed monthly",
            ],
        },
    ];

    const testimonials = [
        { quote: "Switched from $800/month of tools to CampHQ Plus. Same output, fraction of the cost. Our team actually uses it.", name: "Ahsan K.", role: "Head of Ops, MediaGroup", color: "#7B5EFF", delay: 0 },
        { quote: "Pro Unlimited for our 60-person company costs less than 3 Slack seats. The fixed pricing is a game changer.", name: "Sara M.", role: "Director, BrandHouse", color: "#00FFB3", delay: 80 },
        { quote: "Started free, upgraded to Plus after day 2. The 30-day trial meant zero risk and we never looked back.", name: "Raza J.", role: "CEO, DigitalStack", color: "#FF4D8D", delay: 160 },
    ];

    const faqs = [
        { q: "How does the free trial work?", a: "Plus gets 30 days free, Pro Unlimited gets 60 days. No credit card required. At the end of the trial your account reverts to the Free plan — you never lose your data." },
        { q: "Who counts as a user for billing?", a: "Only employees you add count toward billing. Clients, contractors, and guests are always free on Plus." },
        { q: "Can I switch plans later?", a: "Yes, anytime. Upgrade, downgrade, or cancel entirely — all self-service, no questions asked." },
        { q: "What's included in the Timesheet add-on?", a: "Timesheet lets you track hours spent on tasks inside CampHQ. Included with Pro Unlimited, available as an add-on for Plus." },
        { q: "What is the Admin Pro Pack?", a: "Greater control over access, permissions, project templates, and member management. Included with Pro Unlimited, add-on for Plus." },
        { q: "Is there a discount for nonprofits or schools?", a: "Yes — contact us directly. We offer special pricing for nonprofits, NGOs, schools, and open-source projects." },
        { q: "What happens to our data if we cancel?", a: "Your data is yours. Export everything anytime, entirely self-service, in a format you can actually browse." },
        { q: "Do you offer refunds?", a: "Yes — we aim to be fair. If you're unsatisfied within a reasonable window, contact us and we'll make it right." },
    ];

    // selected plan details for the sticky summary bar
    const selectedPlan = plans.find(p => p.id === selected);

    return (
        <div style={{ ...css, background: "var(--bg)", color: "var(--text)", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", transition: "background 0.4s, color 0.4s", overflowX: "hidden" }}>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
        @keyframes fadeUp    { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes orbFloat  { from{transform:translate(0,0)scale(1)} to{transform:translate(20px,14px)scale(1.05)} }
        @keyframes pulse-ring{ 0%{box-shadow:0 0 0 0 var(--glow)} 70%{box-shadow:0 0 0 10px transparent} 100%{box-shadow:0 0 0 0 transparent} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:var(--bg)}
        ::-webkit-scrollbar-thumb{background:var(--surface2);border-radius:2px}
        ::-webkit-scrollbar-thumb:hover{background:var(--accent)}
        a{text-decoration:none} button{font-family:inherit} ::selection{background:var(--accent);color:#fff}
      `}</style>

            {/* BG */}
            <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
                {dark && [...Array(40)].map((_, i) => (
                    <div key={i} style={{ position: "absolute", width: Math.random() * 2 + 1, height: Math.random() * 2 + 1, borderRadius: "50%", background: "#fff", opacity: Math.random() * 0.5 + 0.1, top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }} />
                ))}
                <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(123,94,255,0.18) 0%, transparent 65%)", top: "-10%", right: "-10%", animation: "orbFloat 14s ease-in-out infinite alternate", filter: "blur(70px)" }} />
                <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,77,141,0.12) 0%, transparent 65%)", bottom: "5%", left: "-8%", animation: "orbFloat 17s ease-in-out infinite alternate", animationDelay: "-6s", filter: "blur(80px)" }} />
                <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,255,179,0.08) 0%, transparent 65%)", top: "40%", left: "40%", animation: "orbFloat 20s ease-in-out infinite alternate", animationDelay: "-10s", filter: "blur(80px)" }} />
                {dark && <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(123,94,255,0.012) 2px, rgba(123,94,255,0.012) 4px)" }} />}
            </div>

            <Navbar />

            {/* ── SELECTED PLAN STICKY BAR ── */}
            {selected && (
                <div style={{ position: "sticky", top: 64, zIndex: 99, background: "var(--nav-bg)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border2)", padding: "10px 5%", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, animation: "slideDown 0.3s ease both" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: selectedPlan.color, boxShadow: `0 0 8px ${selectedPlan.color}` }} />
                        <span style={{ fontSize: 13.5, color: "var(--text)" }}>
                            <strong style={{ fontFamily: "'Syne', sans-serif" }}>{selectedPlan.plan}</strong> selected
                            <span style={{ color: "var(--text2)", marginLeft: 8 }}>
                                — {selectedPlan.monthlyPrice === "Free" ? "Free forever" : `$${annual ? selectedPlan.annualPrice : selectedPlan.monthlyPrice}/user/mo`}
                            </span>
                        </span>
                    </div>
                    <a href="/signup" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 20px", background: `linear-gradient(135deg, ${selectedPlan.color}, var(--accent2))`, color: "#fff", borderRadius: 8, fontSize: 13.5, fontWeight: 600, boxShadow: `0 4px 16px ${selectedPlan.color}50`, transition: "all 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                        Continue with {selectedPlan.plan} <ArrowRight size={13} />
                    </a>
                </div>
            )}

            {/* ── HERO ── */}
            <section style={{ position: "relative", zIndex: 1, padding: "72px 5% 48px", textAlign: "center" }}>
                <div style={{ maxWidth: 660, margin: "0 auto" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 16px", background: "var(--tag-bg)", border: "1px solid var(--border2)", borderRadius: 100, fontSize: 12, color: "var(--tag-text)", fontWeight: 600, marginBottom: 22, animation: "fadeUp 0.5s ease both", letterSpacing: "0.03em", boxShadow: "0 0 14px var(--glow)" }}>
                        <CreditCard size={12} color="var(--accent)" />
                        No credit card required to start
                    </div>
                    <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.4rem, 6vw, 4rem)", fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.08, marginBottom: 16, animation: "fadeUp 0.5s 0.1s ease both", animationFillMode: "both" }}>
                        Pick the package<br /><GradText>that fits you best.</GradText>
                    </h1>
                    <p style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", color: "var(--text2)", maxWidth: 460, margin: "0 auto", lineHeight: 1.8, fontWeight: 300, animation: "fadeUp 0.5s 0.2s ease both", animationFillMode: "both" }}>
                        Start free. Upgrade when you need more. Switch or cancel anytime — no lock-in, no retention specialists.
                    </p>
                </div>

                {/* Billing toggle */}
                <div style={{ marginTop: 40, animation: "fadeUp 0.5s 0.3s ease both", animationFillMode: "both" }}>
                    <BillingToggle annual={annual} setAnnual={setAnnual} />
                </div>

                {/* hint */}
                <div style={{ fontSize: 12.5, color: "var(--text3)", marginBottom: 28, animation: "fadeUp 0.5s 0.35s ease both", animationFillMode: "both" }}>
                    Click a plan to select it
                </div>

                {/* Plan cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, maxWidth: 1000, margin: "0 auto", alignItems: "start", paddingTop: 20 }}>
                    {plans.map((p, i) => (
                        <PlanCard key={p.id} {...p} annual={annual} delay={i * 80} selected={selected} onSelect={setSelected} />
                    ))}
                </div>

                {/* shared features note */}
                <div style={{ marginTop: 32, padding: "16px 22px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, display: "inline-flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "var(--text2)", animation: "fadeUp 0.5s 0.5s ease both", animationFillMode: "both" }}>
                    <BadgeCheck size={17} color="var(--accent3)" strokeWidth={2} style={{ flexShrink: 0 }} />
                    Every plan includes message boards, to-dos, card tables, campfire chat, scheduling, docs &amp; files, and reports.
                </div>
            </section>

            {/* ── COMPARISON TABLE ── */}
            <section style={{ position: "relative", zIndex: 1, padding: "72px 5%", textAlign: "center" }}>
                <SectionLabel text="Compare plans" />
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: 10 }}>
                    Full feature <GradText>comparison</GradText>
                </h2>
                <p style={{ fontSize: 15, color: "var(--text2)", marginBottom: 28, fontWeight: 300 }}>Every feature, side by side.</p>

                <button onClick={() => setShowTable(s => !s)} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 24px", background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 12, fontSize: 14, fontWeight: 500, color: "var(--text2)", cursor: "pointer", marginBottom: 28, transition: "all 0.2s", fontFamily: "inherit" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.boxShadow = "0 0 12px var(--glow)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.color = "var(--text2)"; e.currentTarget.style.boxShadow = "none"; }}>
                    <ChevronDown size={16} style={{ transform: showTable ? "rotate(180deg)" : "none", transition: "transform 0.3s" }} />
                    {showTable ? "Hide comparison table" : "Show full comparison table"}
                </button>

                {showTable && (
                    <div style={{ background: "var(--card-bg)", border: "1px solid var(--border2)", borderRadius: 20, overflow: "hidden", backdropFilter: "blur(16px)", textAlign: "left", boxShadow: "0 8px 40px rgba(0,0,0,0.3)" }}>
                        <CompareTable />
                    </div>
                )}
            </section>

            {/* ── STABLE COMPANY ── */}
            <section style={{ position: "relative", zIndex: 1, padding: "60px 5%", background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
                <div style={{ maxWidth: 900, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 36 }}>
                        <SectionLabel text="A stable company is part of the deal" />
                        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: 8 }}>
                            You can't build reliable software without a <GradText>reliable company.</GradText>
                        </h2>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                        {[
                            { icon: TrendingUp, text: "25 profitable years", color: t("#00FFB3", "#00a87a") },
                            { icon: Lock, text: "Zero debt, privately held", color: t("#7B5EFF", "#5a3be8") },
                            { icon: Server, text: "99.9% historical uptime", color: t("#00C8FF", "#006cc8") },
                            { icon: HeartHandshake, text: "Gold standard support", color: t("#FF4D8D", "#e8185e") },
                            { icon: RefreshCw, text: "Cancel anytime, no questions", color: t("#FFD166", "#c87800") },
                            { icon: Globe, text: "75,000+ orgs, 166 countries", color: t("#00FFB3", "#00a87a") },
                            { icon: Clock, text: "Response under 1hr, 24/7/365", color: t("#7B5EFF", "#5a3be8") },
                            { icon: BadgeCheck, text: "Built to stay, not exit", color: t("#00C8FF", "#006cc8") },
                        ].map(({ icon: Icon, text, color }, i) => {
                            const [ref, visible] = useReveal();
                            return (
                                <div ref={ref} key={i} style={{ display: "flex", alignItems: "center", gap: 11, padding: "14px 16px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 13, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)", transition: `all 0.4s ease ${i * 45}ms` }}>
                                    <Icon size={17} color={color} strokeWidth={1.8} style={{ flexShrink: 0, filter: `drop-shadow(0 0 5px ${color}60)` }} />
                                    <span style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.5 }}>{text}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS ── */}
            <section style={{ position: "relative", zIndex: 1, padding: "72px 5%", textAlign: "center" }}>
                <SectionLabel text="What customers say" />
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: 10 }}>
                    Real teams, <GradText>real savings</GradText>
                </h2>
                <p style={{ fontSize: 15, color: "var(--text2)", marginBottom: 40, fontWeight: 300 }}>What changed for the better after switching to CampHQ.</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18, maxWidth: 900, margin: "0 auto", textAlign: "left" }}>
                    {testimonials.map((t, i) => <MiniTesti key={i} {...t} />)}
                </div>
            </section>

            {/* ── FAQ ── */}
            <section style={{ position: "relative", zIndex: 1, padding: "72px 5%", background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
                <div style={{ maxWidth: 700, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 44 }}>
                        <SectionLabel text="Pricing FAQ" />
                        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.025em" }}>Common questions</h2>
                    </div>
                    {faqs.map((f, i) => <FaqItem key={i} {...f} />)}
                </div>
            </section>

            {/* ── CTA ── */}
            <section style={{ position: "relative", zIndex: 1, padding: "72px 5%", textAlign: "center" }}>
                <div style={{ maxWidth: 600, margin: "0 auto", background: "var(--card-bg)", border: "1px solid var(--border2)", borderRadius: 28, padding: "52px 40px", backdropFilter: "blur(20px)", position: "relative", overflow: "hidden", boxShadow: "0 0 80px var(--glow), 0 0 30px var(--glow2)" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, var(--accent), var(--accent3), transparent)", boxShadow: "0 0 10px var(--glow)" }} />
                    <SectionLabel text="Get started today" />
                    <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: 10 }}>
                        Risk-free. <GradText>Cancel anytime.</GradText>
                    </h2>
                    <p style={{ fontSize: 15, color: "var(--text2)", marginBottom: 28, fontWeight: 300, lineHeight: 1.75 }}>
                        30-day free trial on Plus. 60-day free trial on Pro Unlimited. No credit card. No contracts.
                    </p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <a href="/signup" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", background: "linear-gradient(135deg, var(--accent), var(--accent2))", color: "#fff", borderRadius: 12, fontSize: 15, fontWeight: 600, boxShadow: "0 6px 24px var(--glow)", transition: "all 0.25s" }}
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 36px var(--glow)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px var(--glow)"; }}>
                            Start free <ArrowRight size={15} />
                        </a>
                        <a href="/login" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", background: "var(--surface)", color: "var(--text2)", border: "1px solid var(--border2)", borderRadius: 12, fontSize: 15, fontWeight: 500, transition: "all 0.2s" }}
                            onMouseEnter={e => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.borderColor = "var(--border3,var(--border2))"; }}
                            onMouseLeave={e => { e.currentTarget.style.color = "var(--text2)"; e.currentTarget.style.borderColor = "var(--border2)"; }}>
                            Sign in to existing account
                        </a>
                    </div>
                    <p style={{ fontSize: 12.5, color: "var(--text3)", marginTop: 18 }}>
                        Questions?{" "}
                        <a href="mailto:hello@camphq.io" style={{ color: "var(--accent)", borderBottom: "1px solid var(--border2)" }}>hello@camphq.io</a>
                        {" "}— we reply within the hour.
                    </p>
                </div>
            </section>

            <Footer />

        </div>
    );
}