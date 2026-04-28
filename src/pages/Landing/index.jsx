import { useState, useEffect } from "react";
import {
    Sun, Moon, ArrowRight, Play, CheckCircle2, LayoutDashboard,
    MessageSquare, FolderOpen, BarChart3, Shield, Users, Bell,
    Kanban, Star, Globe, Smartphone, Monitor, TrendingUp, Lock,
    RefreshCw, Building2, Layers, Sparkles, Check, ChevronDown,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
import { useReveal } from "../../hooks/useReveal";
import Navbar from "../../components/Navbar";

// ─── ANIMATED COUNTER ─── //
const Counter = ({ to, suffix = "" }) => {
    const [val, setVal] = useState(0);
    const [ref, visible] = useReveal();
    useEffect(() => {
        if (!visible) return;
        let n = 0;
        const step = Math.ceil(to / 60);
        const t = setInterval(() => {
            n += step;
            if (n >= to) { setVal(to); clearInterval(t); } else setVal(n);
        }, 18);
        return () => clearInterval(t);
    }, [visible, to]);
    return (
        <span ref={ref} style={{
            background: "linear-gradient(135deg, var(--accent), var(--accent3))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>
            {val}{suffix}
        </span>
    );
};

// ─── MARQUEE ─── //
const Marquee = ({ items }) => {
    const doubled = [...items, ...items];
    return (
        <div style={{ overflow: "hidden", flex: 1 }}>
            <div style={{ display: "flex", gap: 12, animation: "marquee 30s linear infinite", whiteSpace: "nowrap" }}>
                {doubled.map((item, i) => (
                    <div key={i} style={{
                        display: "flex", alignItems: "center", gap: 8,
                        padding: "7px 16px", borderRadius: 100,
                        border: "1px solid var(--border2)", background: "var(--surface)",
                        fontSize: 13, color: "var(--text2)", fontWeight: 500, whiteSpace: "nowrap",
                        boxShadow: "0 0 0 1px var(--border)",
                    }}>
                        <Building2 size={13} color="var(--accent)" />
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── NEON CARD ──- //
const FeatureCard = ({ icon: Icon, title, desc, tag, color, delay = 0 }) => {
    const [ref, visible] = useReveal();
    const [hovered, setHovered] = useState(false);
    return (
        <div ref={ref}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: "var(--card-bg)",
                border: `1px solid ${hovered ? color + "40" : "var(--card-border)"}`,
                borderRadius: 20, padding: "28px 26px 24px",
                position: "relative", overflow: "hidden",
                transition: "all 0.35s cubic-bezier(0.34,1.2,0.64,1)",
                transform: visible ? (hovered ? "translateY(-6px)" : "translateY(0)") : "translateY(28px)",
                opacity: visible ? 1 : 0,
                transitionDelay: `${delay}ms`,
                boxShadow: hovered
                    ? `0 20px 60px rgba(0,0,0,0.4), 0 0 30px ${color}18, inset 0 1px 0 ${color}20`
                    : "0 2px 20px rgba(0,0,0,0.2)",
                backdropFilter: "blur(16px)",
            }}>

            {/* top glow line */}
            <div style={{
                position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
                background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                opacity: hovered ? 1 : 0, transition: "opacity 0.35s",
                boxShadow: `0 0 8px ${color}`,
            }} />

            {/* icon */}
            <div style={{
                width: 46, height: 46, borderRadius: 13, marginBottom: 18,
                background: `${color}14`,
                border: `1px solid ${color}28`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: hovered ? `0 0 16px ${color}30` : "none",
                transition: "box-shadow 0.3s",
            }}>
                <Icon size={21} color={color} strokeWidth={1.8} />
            </div>

            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 9, color: "var(--text)", letterSpacing: "-0.01em" }}>{title}</div>
            <div style={{ fontSize: 13.5, color: "var(--text2)", lineHeight: 1.7, fontWeight: 300 }}>{desc}</div>
            <div style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                marginTop: 16, fontSize: 11, padding: "4px 10px",
                background: `${color}12`, color,
                borderRadius: 100, fontWeight: 600, letterSpacing: "0.04em",
                border: `1px solid ${color}25`,
            }}>{tag}</div>
        </div>
    );
};

// ─── YES ITEM ─── //
const YesItem = ({ text, delay }) => {
    const [ref, visible] = useReveal();
    return (
        <div ref={ref} style={{
            display: "flex", alignItems: "flex-start", gap: 12, padding: "13px 0",
            borderBottom: "1px solid var(--border)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-16px)",
            transition: `all 0.45s ease ${delay}ms`,
        }}>
            <div style={{ marginTop: 2, flexShrink: 0 }}>
                <Check size={15} color="var(--accent3)" strokeWidth={2.5} />
            </div>
            <span style={{ fontSize: 14.5, color: "var(--text2)", lineHeight: 1.65 }}>{text}</span>
        </div>
    );
};

// ─── TESTI CARD ──── //
const TestiCard = ({ quote, name, role, color, delay }) => {
    const [ref, visible] = useReveal();
    return (
        <div ref={ref} style={{
            background: "var(--card-bg)", border: "1px solid var(--card-border)",
            borderRadius: 20, padding: 26,
            backdropFilter: "blur(16px)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: `all 0.55s ease ${delay}ms`,
            boxShadow: "0 4px 30px rgba(0,0,0,0.2)",
        }}>
            <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="var(--accent4)" color="var(--accent4)" />)}
            </div>
            <p style={{ fontSize: 13.5, color: "var(--text2)", lineHeight: 1.8, fontStyle: "italic", marginBottom: 18 }}>"{quote}"</p>
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: `linear-gradient(135deg, ${color}, var(--accent))`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 700, color: "#fff",
                    boxShadow: `0 0 12px ${color}50`,
                }}>
                    {name[0]}
                </div>
                <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text)" }}>{name}</div>
                    <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 1 }}>{role}</div>
                </div>
            </div>
        </div>
    );
};

// ─── STEP ─── //
const Step = ({ title, desc, icon: Icon, delay, num }) => {
    const [ref, visible] = useReveal();
    return (
        <div ref={ref} style={{
            textAlign: "center", padding: "0 16px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: `all 0.5s ease ${delay}ms`,
        }}>
            <div style={{
                width: 58, height: 58, borderRadius: "50%",
                background: "linear-gradient(135deg, var(--accent), var(--accent2))",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 18px",
                boxShadow: "0 0 24px var(--glow), 0 0 8px var(--glow2)",
            }}>
                <Icon size={22} color="#fff" strokeWidth={2} />
            </div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 8, color: "var(--text)" }}>{title}</div>
            <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.7 }}>{desc}</div>
        </div>
    );
};

// ─── PRICING CARD ─── //
const PricingCard = ({ plan, price, desc, features, cta, featured, delay }) => {
    const [ref, visible] = useReveal();
    const [hov, setHov] = useState(false);
    return (
        <div ref={ref}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                background: featured
                    ? "linear-gradient(145deg, var(--accent), var(--accent2) 120%)"
                    : "var(--card-bg)",
                border: featured ? "none" : `1px solid ${hov ? "var(--border3)" : "var(--card-border)"}`,
                borderRadius: 24, padding: "34px 30px",
                opacity: visible ? 1 : 0,
                transform: visible
                    ? `translateY(${featured ? "-10px" : "0"}) scale(${featured ? 1.02 : 1})`
                    : "translateY(28px)",
                transition: `all 0.55s ease ${delay}ms`,
                boxShadow: featured
                    ? "0 28px 80px var(--glow), 0 0 40px var(--glow2)"
                    : hov ? "0 16px 50px rgba(0,0,0,0.35)" : "0 4px 20px rgba(0,0,0,0.2)",
                backdropFilter: "blur(16px)",
                position: "relative", overflow: "hidden",
            }}>
            {featured && (
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }} />
            )}
            {featured && <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.65)", marginBottom: 14, textTransform: "uppercase" }}>Most popular</div>}
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 21, color: featured ? "#fff" : "var(--text)", marginBottom: 7 }}>{plan}</div>
            <div style={{ fontSize: 13, color: featured ? "rgba(255,255,255,0.65)" : "var(--text2)", marginBottom: 22, lineHeight: 1.6 }}>{desc}</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 44, color: featured ? "#fff" : "var(--text)", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 26 }}>
                {price}
                <span style={{ fontSize: 15, fontWeight: 400, opacity: 0.6 }}>{price !== "Free" ? "/mo" : ""}</span>
            </div>
            {features.map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 11 }}>
                    <Check size={14} color={featured ? "rgba(255,255,255,0.85)" : "var(--accent3)"} strokeWidth={2.5} />
                    <span style={{ fontSize: 13.5, color: featured ? "rgba(255,255,255,0.8)" : "var(--text2)" }}>{f}</span>
                </div>
            ))}
            <button style={{
                width: "100%", marginTop: 26, padding: "13px 0",
                background: featured ? "rgba(255,255,255,0.18)" : "linear-gradient(135deg, var(--accent), var(--accent2))",
                color: "#fff",
                border: featured ? "1px solid rgba(255,255,255,0.25)" : "none",
                borderRadius: 12, fontSize: 14.5, fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                transition: "all 0.2s", fontFamily: "'DM Sans', sans-serif",
                boxShadow: featured ? "none" : "0 4px 18px var(--glow)",
            }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                {cta} <ArrowRight size={15} />
            </button>
        </div>
    );
};

// ─── MINI DASHBOARD PREVIEW ─── //
const DashPreview = () => (
    <div style={{
        background: "var(--surface)", border: "1px solid var(--border2)",
        borderRadius: 20, overflow: "hidden",
        boxShadow: "0 40px 120px rgba(0,0,0,0.6), 0 0 60px var(--glow), 0 0 30px var(--glow2)",
    }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", background: "var(--bg2)", borderBottom: "1px solid var(--border)" }}>
            {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
            <div style={{ flex: 1, margin: "0 10px", background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 5, padding: "3px 10px", fontSize: 11, color: "var(--text3)" }}>app.camphq.io/dashboard</div>
        </div>
        <div style={{ display: "flex", height: 310 }}>
            <div style={{ width: 185, background: "var(--bg3)", borderRight: "1px solid var(--border)", padding: 13, flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: "linear-gradient(135deg, var(--accent), var(--accent2))", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 10px var(--glow)" }}>
                        <Layers size={12} color="#fff" />
                    </div>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 14, color: "var(--text)" }}>Camp<span style={{ color: "var(--accent)" }}>HQ</span></span>
                </div>
                {[
                    { icon: LayoutDashboard, label: "Dashboard", active: true },
                    { icon: Kanban, label: "Projects", active: false },
                    { icon: CheckCircle2, label: "To-dos", active: false },
                    { icon: MessageSquare, label: "Messages", active: false },
                    { icon: FolderOpen, label: "Files", active: false },
                ].map(({ icon: Icon, label, active }, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 9px", borderRadius: 7, marginBottom: 2, background: active ? "var(--tag-bg)" : "transparent", color: active ? "var(--accent)" : "var(--text2)", fontSize: 12, fontWeight: active ? 600 : 400, boxShadow: active ? "inset 0 0 8px var(--glow)" : "none" }}>
                        <Icon size={13} strokeWidth={active ? 2.5 : 1.8} /> {label}
                    </div>
                ))}
                <div style={{ fontSize: 10, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", padding: "11px 9px 4px", fontWeight: 600 }}>Brands</div>
                {[
                    { c: "var(--accent)", n: "Brand Alpha" },
                    { c: "var(--accent2)", n: "Brand Beta" },
                    { c: "var(--accent3)", n: "Brand Gamma" },
                ].map(({ c, n }, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 9px", fontSize: 11, color: "var(--text2)" }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: c, boxShadow: `0 0 5px ${c}` }} /> {n}
                    </div>
                ))}
            </div>
            <div style={{ flex: 1, padding: 16, background: "var(--bg2)", overflow: "hidden" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 13 }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "var(--text)" }}>Good morning 👋</div>
                    <div style={{ fontSize: 10, padding: "3px 9px", background: "var(--tag-bg)", color: "var(--tag-text)", borderRadius: 100, fontWeight: 600, border: "1px solid var(--border2)" }}>12 due today</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 7, marginBottom: 11 }}>
                    {[
                        { v: "24", l: "Projects", w: "72%", c: "var(--accent)" },
                        { v: "87%", l: "On time", w: "87%", c: "var(--accent3)" },
                        { v: "6", l: "Brands", w: "60%", c: "var(--accent2)" },
                    ].map(({ v, l, w, c }, i) => (
                        <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 9, padding: 10 }}>
                            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 19, color: "var(--text)" }}>{v}</div>
                            <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 2 }}>{l}</div>
                            <div style={{ height: 2, background: "var(--border)", borderRadius: 2, marginTop: 7, overflow: "hidden" }}>
                                <div style={{ width: w, height: "100%", background: c, borderRadius: 2, boxShadow: `0 0 6px ${c}` }} />
                            </div>
                        </div>
                    ))}
                </div>
                {[
                    { c: "var(--accent)", n: "Q1 Campaign — Alpha", s: "Active", sc: "var(--accent3)" },
                    { c: "var(--accent4)", n: "Website Redesign", s: "Review", sc: "var(--accent4)" },
                    { c: "var(--accent3)", n: "Product Launch", s: "Planning", sc: "var(--accent)" },
                ].map(({ c, n, s, sc }, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 7, padding: "7px 10px", marginBottom: 5 }}>
                        <div style={{ width: 7, height: 7, borderRadius: 2, background: c, flexShrink: 0, boxShadow: `0 0 5px ${c}` }} />
                        <span style={{ fontSize: 11.5, color: "var(--text)", fontWeight: 500, flex: 1 }}>{n}</span>
                        <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 100, background: `${sc}18`, color: sc, fontWeight: 600 }}>{s}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// ─── FAQ ITEM ─── //
const FaqItem = ({ q, a }) => {
    const [open, setOpen] = useState(false);
    return (
        <div style={{ borderBottom: "1px solid var(--border)" }}>
            <button onClick={() => setOpen(o => !o)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "17px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 16 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", fontFamily: "'DM Sans', sans-serif" }}>{q}</span>
                <ChevronDown size={17} color="var(--text3)" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.3s", flexShrink: 0 }} />
            </button>
            <div style={{ maxHeight: open ? 300 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
                <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.8, paddingBottom: 18 }}>{a}</p>
            </div>
        </div>
    );
};

// ─── HELPERS ─── //
const SectionLabel = ({ text }) => (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 14 }}>
        <div style={{ width: 18, height: 1.5, background: "var(--accent)", borderRadius: 2, boxShadow: "0 0 6px var(--glow)" }} />
        {text}
    </div>
);

const GradText = ({ children }) => (
    <span style={{
        background: "linear-gradient(135deg, var(--accent), var(--accent3) 60%, var(--accent2))",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
    }}>
        {children}
    </span>
);

// ─── MAIN PAGE ─── //
export default function LandingPage() {
    const { dark, toggle, css } = useTheme();

    const t = (d, l) => dark ? d : l;

    const features = [
        { icon: Building2, title: "Brand workspaces", desc: "Each brand gets its own isolated workspace. Switch in one click. Data, files, and chats stay fully separate.", tag: "Multi-brand", color: t("#7B5EFF", "#5a3be8") },
        { icon: CheckCircle2, title: "Smart to-dos", desc: "Assign tasks, deadlines, subtasks. AI scores priorities and flags what's falling behind before it becomes a problem.", tag: "AI-powered", color: t("#00FFB3", "#00a87a") },
        { icon: MessageSquare, title: "Real-time chat", desc: "Brand-specific rooms, DMs, threads, reactions. Like Campfire — faster, smarter, actually tied to your work.", tag: "Real-time", color: t("#FF4D8D", "#e8185e") },
        { icon: FolderOpen, title: "Docs & files", desc: "Upload, organize, preview files per brand. Never lose an asset. Search everything across all brands instantly.", tag: "Cloud storage", color: t("#FFD166", "#c87800") },
        { icon: Kanban, title: "Card table", desc: "Our take on Kanban for process tracking. Visualize stages, move cards, spot bottlenecks at a glance.", tag: "Visual boards", color: t("#00C8FF", "#006cc8") },
        { icon: BarChart3, title: "Reports", desc: "Not numbers — real work as evidence. See what's overdue, who's responsible, what actually shipped.", tag: "Reports", color: t("#7B5EFF", "#5a3be8") },
        { icon: Sparkles, title: "AI assistant", desc: "Summarize threads, draft brand emails in the right tone, auto-assign tasks. Respects each brand's unique voice.", tag: "Claude AI", color: t("#FF4D8D", "#e8185e") },
        { icon: Bell, title: "Hey! notifications", desc: "All pings in one calm menu. Direct messages stay work-only. No more WhatsApp chains for client approvals.", tag: "Focused alerts", color: t("#FFD166", "#c87800") },
        { icon: Users, title: "Client access", desc: "Invite clients to projects. Control what they see. Keep all feedback on record. No scattered email threads.", tag: "Client portal", color: t("#00C8FF", "#006cc8") },
    ];

    const yesItems = [
        "Prevent clients from seeing unfinished work",
        "Link files from Google Docs, Figma, Dropbox, Airtable",
        "See everything I need to do on a single screen",
        "See everything that's overdue at a glance",
        "Use CampHQ even if some teammates prefer email",
        "See all work completed on any given day",
        "Set up projects only some team members can see",
        "@mention someone so they get notified instantly",
        "See all work assigned to someone on one page",
        "See exactly who worked on what — today, yesterday, last week",
        "Assign tasks to multiple people at once",
        "See all projects on a visual timeline",
        "Keep discussion about a task attached to that task",
        "Get clients to officially approve a design",
        "Hold my team accountable for deadlines",
    ];

    const testimonials = [
        { quote: "We manage 12 brands and CampHQ is the first tool that actually makes sense for our structure. Brand switching is seamless, AI saves us hours.", name: "Ahsan Khan", role: "Head of Ops, MediaGroup PK", color: "#7B5EFF" },
        { quote: "Replaced Basecamp, Slack, and half our email chains in one go. The message board + chat is exactly what our team needed.", name: "Sara Malik", role: "Project Director, BrandHouse", color: "#00FFB3" },
        { quote: "AI email drafting per brand is a game changer. Each brand has its tone and CampHQ respects that. Client comms are 10× better.", name: "Raza Javed", role: "CEO, DigitalStack", color: "#FF4D8D" },
        { quote: "For the first time our team is truly collaborating — everyone moving in the same direction. Remarkable change in just one week.", name: "Ryan S.", role: "WP Site Care", color: "#FFD166" },
        { quote: "We consistently meet deadlines because facts, files, and comments live in one place. Everyone is accountable.", name: "Kim C.", role: "Kim Curry Design", color: "#00C8FF" },
        { quote: "Throughput decreased 30%. Transparency eliminated bottlenecks that weren't even visible before CampHQ.", name: "Rick R.", role: "iCONN Systems", color: "#7B5EFF" },
    ];

    const plans = [
        { plan: "Free", price: "Free", desc: "Run one project. Perfect for testing.", features: ["1 project", "Up to 20 users", "1 GB storage", "All core tools", "Upgrade anytime"], cta: "Start free forever", featured: false },
        { plan: "Plus", price: "$15", desc: "Ideal for freelancers & small teams.", features: ["Unlimited projects", "Pay per user", "500 GB storage", "24/7 support", "Timesheet add-on"], cta: "Try free for 30 days", featured: true },
        { plan: "Pro Unlimited", price: "$299", desc: "Fixed price. Every feature. For all.", features: ["Unlimited everything", "5 TB storage", "Priority support", "All add-ons", "Onboarding"], cta: "Try free for 60 days", featured: false },
    ];

    const faqs = [
        { q: "How long have you been around? Can we trust you?", a: "CampHQ is built for longevity — zero debt, privately held, built to stay not exit. Our employee handbook is public so you can see how we operate." },
        { q: "What about reliability and uptime?", a: "Historical uptime over 99.9%. Data stored in multiple redundant centers, backed up several times daily. Our status page is always public." },
        { q: "Will we still need Slack, Asana, or Dropbox?", a: "Nope. Built-in chat replaces Slack. To-dos and Card Tables replace Asana/Trello. File storage replaces Dropbox. Link external tools via Doors if needed." },
        { q: "Can I export our data if we want to leave?", a: "Absolutely, anytime, entirely self-service. No need to ask anyone. Data is provided in a format you can actually browse in a web browser." },
        { q: "Does CampHQ have an API?", a: "Yes — full-featured REST API. Build custom integrations with invoicing, accounting, time-tracking, and hundreds of third-party tools." },
        { q: "What kind of customer support do you offer?", a: "24/7/365 support from specialists. Typical response under one hour. Live classes, video tutorials, and a full help library — all free." },
    ];

    return (
        <div style={{ ...css, background: "var(--bg)", color: "var(--text)", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", transition: "background 0.4s, color 0.4s", position: "relative", overflowX: "hidden" }}>

            {/* ── GLOBAL STYLES ── */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
        @keyframes marquee    { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes fadeUp     { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes orbFloat   { from{transform:translate(0,0) scale(1)} to{transform:translate(20px,14px) scale(1.05)} }
        @keyframes scanline   { from{transform:translateY(-100%)} to{transform:translateY(100vh)} }
        @keyframes pulse-ring { 0%{box-shadow:0 0 0 0 var(--glow)} 70%{box-shadow:0 0 0 10px transparent} 100%{box-shadow:0 0 0 0 transparent} }
        *,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:var(--bg); }
        ::-webkit-scrollbar-thumb { background:var(--surface3); border-radius:2px; }
        ::-webkit-scrollbar-thumb:hover { background:var(--accent); box-shadow:0 0 6px var(--glow); }
        a { text-decoration:none; }
        button { font-family:inherit; }
        ::selection { background:var(--accent); color:#fff; }
      `}</style>

            {/* ── DEEP SPACE BACKGROUND ── */}
            <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
                {/* star field */}
                {dark && [...Array(60)].map((_, i) => (
                    <div key={i} style={{
                        position: "absolute",
                        width: Math.random() * 2 + 1,
                        height: Math.random() * 2 + 1,
                        borderRadius: "50%",
                        background: "#fff",
                        opacity: Math.random() * 0.6 + 0.1,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animation: `pulse-ring ${Math.random() * 4 + 2}s ease-in-out infinite`,
                        animationDelay: `${Math.random() * 5}s`,
                    }} />
                ))}
                {/* orbs */}
                <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(123,94,255,0.2) 0%, transparent 65%)", top: "-15%", left: "-15%", animation: "orbFloat 12s ease-in-out infinite alternate", filter: "blur(60px)" }} />
                <div style={{ position: "absolute", width: 550, height: 550, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,77,141,0.12) 0%, transparent 65%)", top: "0%", right: "-12%", animation: "orbFloat 15s ease-in-out infinite alternate", animationDelay: "-5s", filter: "blur(70px)" }} />
                <div style={{ position: "absolute", width: 450, height: 450, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,255,179,0.10) 0%, transparent 65%)", bottom: "5%", left: "25%", animation: "orbFloat 18s ease-in-out infinite alternate", animationDelay: "-9s", filter: "blur(80px)" }} />
                <div style={{ position: "absolute", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,200,255,0.08) 0%, transparent 65%)", bottom: "20%", right: "5%", animation: "orbFloat 20s ease-in-out infinite alternate", animationDelay: "-13s", filter: "blur(70px)" }} />
                {/* subtle scanline */}
                {dark && <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(123,94,255,0.015) 2px, rgba(123,94,255,0.015) 4px)" }} />}
            </div>

            {/* ── NAVBAR ── */}
            <Navbar />

            {/* ── HERO ── */}
            <section style={{ position: "relative", zIndex: 1, padding: "96px 5% 80px", textAlign: "center" }}>
                {/* grid */}
                <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`, backgroundSize: "56px 56px", maskImage: "radial-gradient(ellipse 70% 55% at 50% 40%, black 20%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 70% 55% at 50% 40%, black 20%, transparent 100%)", pointerEvents: "none" }} />

                <div style={{ position: "relative", zIndex: 2, maxWidth: 840, margin: "0 auto" }}>
                    {/* badge */}
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 16px", background: "var(--tag-bg)", border: "1px solid var(--border2)", borderRadius: 100, fontSize: 12, color: "var(--tag-text)", fontWeight: 600, marginBottom: 28, animation: "fadeUp 0.6s ease both", letterSpacing: "0.03em", boxShadow: "0 0 14px var(--glow)" }}>
                        <div style={{ width: 6, height: 6, background: "var(--accent3)", borderRadius: "50%", boxShadow: "0 0 8px var(--accent3)", animation: "pulse-ring 2s infinite" }} />
                        <Sparkles size={12} color="var(--accent)" />
                        Now with AI-powered brand workspaces
                    </div>

                    {/* headline */}
                    <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.8rem, 7vw, 5rem)", fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.05, marginBottom: 22, animation: "fadeUp 0.6s 0.1s ease both", animationFillMode: "both" }}>
                        Wrestling with projects?<br />
                        <GradText>It doesn't have to be this hard.</GradText>
                    </h1>

                    {/* sub */}
                    <p style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "var(--text2)", maxWidth: 560, margin: "0 auto 38px", lineHeight: 1.8, fontWeight: 300, animation: "fadeUp 0.6s 0.2s ease both", animationFillMode: "both" }}>
                        Most project tools are overwhelming, inadequate, or chaotic. CampHQ is refreshingly straightforward — built for multi-brand companies that need clarity without the noise.
                    </p>

                    {/* CTAs */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap", animation: "fadeUp 0.6s 0.3s ease both", animationFillMode: "both" }}>
                        <a href="/signup" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 26px", background: "linear-gradient(135deg, var(--accent), var(--accent2))", color: "#fff", borderRadius: 12, fontSize: 15, fontWeight: 600, boxShadow: "0 8px 30px var(--glow), 0 4px 12px var(--glow2)", cursor: "pointer", transition: "all 0.25s" }}
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 16px 44px var(--glow), 0 8px 20px var(--glow2)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 30px var(--glow), 0 4px 12px var(--glow2)"; }}>
                            Try CampHQ free <ArrowRight size={16} strokeWidth={2.5} />
                        </a>
                        <a href="#features" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 26px", background: "var(--surface)", color: "var(--text2)", border: "1px solid var(--border2)", borderRadius: 12, fontSize: 15, fontWeight: 500, cursor: "pointer", transition: "all 0.25s" }}
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.borderColor = "var(--border3)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.color = "var(--text2)"; e.currentTarget.style.borderColor = "var(--border2)"; }}>
                            <Play size={15} fill="currentColor" /> Watch demo
                        </a>
                    </div>

                    {/* social proof */}
                    <div style={{ marginTop: 48, display: "flex", alignItems: "center", justifyContent: "center", gap: 18, flexWrap: "wrap", animation: "fadeUp 0.6s 0.44s ease both", animationFillMode: "both" }}>
                        <div style={{ display: "flex" }}>
                            {["AK", "SM", "RJ", "LP"].map((init, i) => (
                                <div key={i} style={{ width: 30, height: 30, borderRadius: "50%", border: "2px solid var(--bg)", marginLeft: i === 0 ? 0 : -8, background: [`linear-gradient(135deg,#7B5EFF,#FF4D8D)`, `linear-gradient(135deg,#00FFB3,#7B5EFF)`, `linear-gradient(135deg,#FFD166,#FF4D8D)`, `linear-gradient(135deg,#00C8FF,#7B5EFF)`][i], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff" }}>{init}</div>
                            ))}
                            <div style={{ width: 30, height: 30, borderRadius: "50%", border: "2px solid var(--bg)", marginLeft: -8, background: "var(--surface2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "var(--text3)", fontWeight: 600 }}>+48</div>
                        </div>
                        <span style={{ fontSize: 13.5, color: "var(--text2)" }}><strong style={{ color: "var(--text)" }}>2,000+</strong> teams on CampHQ</span>
                        <div style={{ display: "flex", gap: 1 }}>{[...Array(5)].map((_, i) => <Star key={i} size={13} fill="var(--accent4)" color="var(--accent4)" />)}</div>
                        <span style={{ fontSize: 13.5, color: "var(--text2)" }}>4.9 / 5</span>
                    </div>
                </div>

                {/* dashboard preview */}
                <div style={{ position: "relative", zIndex: 2, maxWidth: 840, margin: "56px auto 0", animation: "fadeUp 0.8s 0.5s ease both", animationFillMode: "both" }}>
                    <DashPreview />
                </div>
            </section>

            {/* ── MARQUEE ── */}
            <div style={{ position: "relative", zIndex: 1, padding: "36px 5%", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--bg2)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <span style={{ fontSize: 10, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, whiteSpace: "nowrap" }}>Trusted by</span>
                    <Marquee items={["Acme Corp", "LaunchCo", "DesignStudio", "AppWorks", "RetailHub", "DataFlow", "GlobalNet", "FastTrack", "BrandHouse", "TechCorp"]} />
                </div>
            </div>

            {/* ── FEATURES ── */}
            <section id="features" style={{ position: "relative", zIndex: 1, padding: "96px 5%", textAlign: "center" }}>
                <SectionLabel text="Features" />
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: 14 }}>
                    Everything your team needs.<br /><GradText>Nothing they don't.</GradText>
                </h2>
                <p style={{ fontSize: 16, color: "var(--text2)", maxWidth: 500, margin: "0 auto 56px", lineHeight: 1.75, fontWeight: 300 }}>Built for multi-brand companies that need clarity without the chaos.</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, textAlign: "left" }}>
                    {features.map((f, i) => <FeatureCard key={i} {...f} delay={i * 55} />)}
                </div>
            </section>

            {/* ── STATS ── */}
            <div style={{ position: "relative", zIndex: 1, margin: "0 5%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", border: "1px solid var(--border2)", borderRadius: 24, overflow: "hidden", gap: 1, background: "var(--border2)" }}>
                {[
                    { label: "Teams using CampHQ", to: 2000, suffix: "+" },
                    { label: "Uptime guaranteed", to: 99, suffix: ".9%" },
                    { label: "Faster than email", to: 3, suffix: "×" },
                    { label: "Brands per company", to: 20, suffix: "+" },
                ].map(({ label, to, suffix }, i) => (
                    <div key={i} style={{ background: "var(--bg2)", padding: "38px 28px", textAlign: "center", transition: "background 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "var(--surface)"}
                        onMouseLeave={e => e.currentTarget.style.background = "var(--bg2)"}>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 46, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>
                            <Counter to={to} suffix={suffix} />
                        </div>
                        <div style={{ fontSize: 13.5, color: "var(--text2)", marginTop: 8, fontWeight: 300 }}>{label}</div>
                    </div>
                ))}
            </div>

            {/* ── YES YOU CAN ── */}
            <section style={{ position: "relative", zIndex: 1, padding: "80px 5%", background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", marginTop: 96 }}>
                <div style={{ maxWidth: 780, margin: "0 auto" }}>
                    <SectionLabel text="The answer is YES" />
                    <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: 10 }}>
                        Can software be simple <em>and</em> powerfully full-featured?
                    </h2>
                    <p style={{ fontSize: 15.5, color: "var(--text2)", marginBottom: 36, lineHeight: 1.75, fontWeight: 300 }}>With CampHQ the answer is absolutely <strong style={{ color: "var(--text)" }}>YES.</strong></p>
                    <div style={{ columns: 2, columnGap: 0 }}>
                        {yesItems.map((item, i) => <YesItem key={i} text={item} delay={i * 35} />)}
                    </div>
                </div>
            </section>

            {/* ── HOW IT WORKS ── */}
            <section style={{ position: "relative", zIndex: 1, padding: "96px 5%", textAlign: "center" }}>
                <SectionLabel text="How it works" />
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: 10 }}>
                    Up and running <GradText>in minutes</GradText>
                </h2>
                <p style={{ fontSize: 15.5, color: "var(--text2)", marginBottom: 56, fontWeight: 300 }}>No training, no migration, no IT required.</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", position: "relative" }}>
                    <div style={{ position: "absolute", top: 28, left: "14%", right: "14%", height: 1, background: "linear-gradient(90deg, transparent, var(--accent), var(--accent3), transparent)", boxShadow: "0 0 8px var(--glow)" }} />
                    {[
                        { title: "Create your company", desc: "Sign up and set up your company in under 2 minutes.", icon: Building2 },
                        { title: "Add your brands", desc: "Create workspaces for each brand, assign team members.", icon: Layers },
                        { title: "Start projects", desc: "Add tasks, milestones, files. Organized per brand.", icon: Kanban },
                        { title: "Collaborate & ship", desc: "Chat, share, track — let AI handle the repetitive stuff.", icon: Sparkles },
                    ].map((s, i) => <Step key={i} {...s} num={i + 1} delay={i * 100} />)}
                </div>
            </section>

            {/* ── TESTIMONIALS ── */}
            <section id="customers" style={{ position: "relative", zIndex: 1, padding: "96px 5%", textAlign: "center" }}>
                <SectionLabel text="What changed for the better" />
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: 10 }}>
                    Teams love <GradText>CampHQ</GradText>
                </h2>
                <p style={{ fontSize: 15.5, color: "var(--text2)", marginBottom: 56, fontWeight: 300 }}>Over 30 pages of customer stories. Here's a taste.</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, textAlign: "left" }}>
                    {testimonials.map((t, i) => <TestiCard key={i} {...t} delay={i * 75} />)}
                </div>
            </section>

            {/* ── PRICING ── */}
            <section id="pricing" style={{ position: "relative", zIndex: 1, padding: "96px 5%", textAlign: "center" }}>
                <SectionLabel text="Pricing" />
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: 10 }}>
                    Pick the package <GradText>that fits you</GradText>
                </h2>
                <p style={{ fontSize: 15.5, color: "var(--text2)", marginBottom: 56, fontWeight: 300 }}>Start free. Upgrade when ready. Cancel anytime.</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(256px, 1fr))", gap: 20, textAlign: "left", alignItems: "center" }}>
                    {plans.map((p, i) => <PricingCard key={i} {...p} delay={i * 100} />)}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(175px, 1fr))", gap: 10, marginTop: 36 }}>
                    {[
                        { icon: Shield, text: "25 profitable years" },
                        { icon: Lock, text: "Zero debt, privately held" },
                        { icon: TrendingUp, text: "99.9% uptime" },
                        { icon: RefreshCw, text: "Cancel anytime" },
                        { icon: Globe, text: "166 countries served" },
                        { icon: Users, text: "24/7/365 support" },
                    ].map(({ icon: Icon, text }, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, padding: "11px 14px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 11 }}>
                            <Icon size={14} color="var(--accent3)" strokeWidth={2} style={{ flexShrink: 0 }} />
                            <span style={{ fontSize: 12.5, color: "var(--text2)" }}>{text}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── PLATFORM ── */}
            <div style={{ position: "relative", zIndex: 1, padding: "52px 5%", background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
                    <div>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 5, color: "var(--text)" }}>CampHQ is everywhere</div>
                        <p style={{ fontSize: 14, color: "var(--text2)", fontWeight: 300 }}>Mac, Windows, iOS, Android, and on the web</p>
                    </div>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        {[{ icon: Monitor, label: "Desktop" }, { icon: Smartphone, label: "iOS" }, { icon: Smartphone, label: "Android" }, { icon: Globe, label: "Web app" }].map(({ icon: Icon, label }, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 16px", background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 100, fontSize: 13, color: "var(--text2)", cursor: "pointer", transition: "all 0.2s" }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.boxShadow = "0 0 12px var(--glow)"; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.color = "var(--text2)"; e.currentTarget.style.boxShadow = "none"; }}>
                                <Icon size={14} color="var(--accent)" strokeWidth={2} /> {label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── FAQ ── */}
            <section style={{ position: "relative", zIndex: 1, padding: "96px 5%" }}>
                <div style={{ maxWidth: 700, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 52 }}>
                        <SectionLabel text="FAQ" />
                        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.025em" }}>Common questions</h2>
                    </div>
                    {faqs.map((f, i) => <FaqItem key={i} {...f} />)}
                </div>
            </section>

            {/* ── CTA ── */}
            <section style={{ position: "relative", zIndex: 1, padding: "96px 5%", textAlign: "center" }}>
                <div style={{ maxWidth: 660, margin: "0 auto", background: "var(--card-bg)", border: "1px solid var(--border2)", borderRadius: 28, padding: "60px 44px", backdropFilter: "blur(20px)", position: "relative", overflow: "hidden", boxShadow: "0 0 80px var(--glow), 0 0 30px var(--glow2)" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, var(--accent), var(--accent3), transparent)", boxShadow: "0 0 10px var(--glow)" }} />
                    <SectionLabel text="Get started" />
                    <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: 14 }}>
                        It's time for <GradText>CampHQ.</GradText>
                    </h2>
                    <p style={{ fontSize: 15.5, color: "var(--text2)", marginBottom: 34, fontWeight: 300, lineHeight: 1.75 }}>Start free. No credit card. First brand workspace up in 5 minutes.</p>
                    <div style={{ display: "flex", gap: 9, maxWidth: 430, margin: "0 auto" }}>
                        <input placeholder="Enter your work email" style={{ flex: 1, padding: "12px 16px", background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 10, color: "var(--text)", fontSize: 14, outline: "none", fontFamily: "inherit", transition: "all 0.2s" }}
                            onFocus={e => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "0 0 10px var(--glow)"; }}
                            onBlur={e => { e.target.style.borderColor = "var(--border2)"; e.target.style.boxShadow = "none"; }} />
                        <button style={{ padding: "12px 22px", background: "linear-gradient(135deg, var(--accent), var(--accent2))", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap", transition: "all 0.2s", fontFamily: "inherit", boxShadow: "0 4px 18px var(--glow)" }}
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 24px var(--glow)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 18px var(--glow)"; }}>
                            Get early access <ArrowRight size={14} />
                        </button>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid var(--border)", padding: "44px 5%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 36, marginBottom: 36 }}>
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 11 }}>
                            <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg, var(--accent), var(--accent2))", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 14px var(--glow)" }}>
                                <Layers size={14} color="#fff" strokeWidth={2.5} />
                            </div>
                            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17, color: "var(--text)", letterSpacing: "-0.02em" }}>Camp<span style={{ color: "var(--accent)" }}>HQ</span></span>
                        </div>
                        <p style={{ fontSize: 13, color: "var(--text3)", maxWidth: 210, lineHeight: 1.7 }}>Project management for multi-brand companies that value clarity.</p>
                    </div>
                    {[
                        { title: "Product", links: ["Features", "Pricing", "Changelog", "Integrations", "Apps"] },
                        { title: "Company", links: ["About", "Customers", "Handbook", "Blog", "Careers"] },
                        { title: "Support", links: ["Help center", "Live classes", "Tutorials", "Status", "Contact"] },
                        { title: "Legal", links: ["Privacy", "Terms", "Security", "Refund", "Cookies"] },
                    ].map(({ title, links }) => (
                        <div key={title}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 13 }}>{title}</div>
                            {links.map(l => (
                                <a key={l} href="#" style={{ display: "block", fontSize: 13, color: "var(--text3)", marginBottom: 9, transition: "color 0.2s" }}
                                    onMouseEnter={e => { e.target.style.color = "var(--text)"; }}
                                    onMouseLeave={e => { e.target.style.color = "var(--text3)"; }}>{l}</a>
                            ))}
                        </div>
                    ))}
                </div>
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

        </div>
    );
}