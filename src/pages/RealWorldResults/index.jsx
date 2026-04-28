import { useState } from "react";
import {
    Star, ArrowRight, Quote, Building2, Users, Globe,
    TrendingUp, Zap, Shield, Search, Filter, ChevronRight,
    Briefcase, Palette, Code2, ShoppingBag, GraduationCap,
    Heart, CheckCircle2, BarChart3,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useReveal } from "../../hooks/useReveal";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const GradText = ({ children }) => (
    <span style={{ background: "linear-gradient(135deg, var(--accent), var(--accent3) 55%, var(--accent2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{children}</span>
);

const SectionLabel = ({ text }) => (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 14 }}>
        <div style={{ width: 18, height: 1.5, background: "var(--accent)", borderRadius: 2, boxShadow: "0 0 6px var(--glow)" }} />
        {text}
    </div>
);

// ─── FEATURED CASE STUDY ──── //
const FeaturedCard = ({ name, role, company, quote, result, color, avatar, delay, industry }) => {
    const [ref, visible] = useReveal();
    const [hov, setHov] = useState(false);
    return (
        <div ref={ref}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                background: "var(--card-bg)", border: `1px solid ${hov ? color + "40" : "var(--card-border)"}`,
                borderRadius: 24, padding: "32px 30px", backdropFilter: "blur(16px)",
                opacity: visible ? 1 : 0, transform: visible ? (hov ? "translateY(-5px)" : "translateY(0)") : "translateY(28px)",
                transition: `all 0.45s cubic-bezier(0.34,1.2,0.64,1) ${delay}ms`,
                boxShadow: hov ? `0 20px 56px rgba(0,0,0,0.3), 0 0 24px ${color}14` : "0 2px 20px rgba(0,0,0,0.15)",
                position: "relative", overflow: "hidden",
            }}>
            {hov && <div style={{ position: "absolute", top: 0, left: "8%", right: "8%", height: 1, background: `linear-gradient(90deg, transparent, ${color}, transparent)`, boxShadow: `0 0 10px ${color}` }} />}

            {/* industry tag */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, padding: "3px 10px", background: `${color}12`, color, borderRadius: 100, fontWeight: 700, border: `1px solid ${color}22`, marginBottom: 18, letterSpacing: "0.04em" }}>
                {industry}
            </div>

            {/* quote icon */}
            <div style={{ marginBottom: 12 }}>
                <Quote size={22} color={color} strokeWidth={1.5} style={{ opacity: 0.6 }} />
            </div>

            <p style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.8, fontWeight: 300, marginBottom: 20, fontStyle: "italic" }}>"{quote}"</p>

            {/* result chip */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 14px", background: `${color}10`, border: `1px solid ${color}25`, borderRadius: 10, marginBottom: 22 }}>
                <TrendingUp size={14} color={color} strokeWidth={2} />
                <span style={{ fontSize: 13, fontWeight: 600, color }}>{result}</span>
            </div>

            {/* author */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 18, borderTop: "1px solid var(--border)" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${color}, var(--accent2))`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 14, color: "#fff", flexShrink: 0, boxShadow: `0 0 14px ${color}50` }}>
                    {avatar}
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{name}</div>
                    <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 1 }}>{role}</div>
                </div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text2)" }}>{company}</div>
            </div>
        </div>
    );
};

// ─── MINI QUOTE ──── //
const MiniQuote = ({ quote, name, role, color, delay }) => {
    const [ref, visible] = useReveal();
    return (
        <div ref={ref} style={{
            padding: "20px 22px", background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: 16, opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: `all 0.4s ease ${delay}ms`,
        }}>
            <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="var(--accent4)" color="var(--accent4)" />)}
            </div>
            <p style={{ fontSize: 13.5, color: "var(--text2)", lineHeight: 1.75, fontStyle: "italic", marginBottom: 14 }}>"{quote}"</p>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, ${color}, var(--accent))`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                    {name[0]}
                </div>
                <div>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text)" }}>{name}</div>
                    <div style={{ fontSize: 11, color: "var(--text3)" }}>{role}</div>
                </div>
            </div>
        </div>
    );
};

// ─── STAT HIGHLIGHT ──── //
const StatHighlight = ({ value, label, sub, color, delay }) => {
    const [ref, visible] = useReveal();
    return (
        <div ref={ref} style={{ textAlign: "center", padding: "32px 24px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: `all 0.5s ease ${delay}ms` }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 52, letterSpacing: "-0.04em", lineHeight: 1, background: `linear-gradient(135deg, ${color}, var(--accent2))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: `drop-shadow(0 0 20px ${color}50)`, marginBottom: 8 }}>
                {value}
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 13, color: "var(--text3)", fontWeight: 300 }}>{sub}</div>
        </div>
    );
};

// ─── INDUSTRY FILTER ──── //
const industries = [
    { id: "all", label: "All industries", icon: Globe },
    { id: "agency", label: "Agencies", icon: Briefcase },
    { id: "brand", label: "Multi-brand", icon: Building2 },
    { id: "design", label: "Design", icon: Palette },
    { id: "tech", label: "Tech", icon: Code2 },
    { id: "retail", label: "Retail", icon: ShoppingBag },
    { id: "education", label: "Education", icon: GraduationCap },
];

export default function ResultsPage() {
    const { dark, css } = useTheme();
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const t = (d, l) => dark ? d : l;

    const featured = [
        {
            id: "agency",
            name: "Ahsan Khan", role: "Managing Director", company: "LaunchCo",
            avatar: "AK", color: t("#7B5EFF", "#5a3be8"), industry: "Agency",
            quote: "We manage 12 brands and CampHQ is the first tool that actually makes sense for our structure. The brand switching is seamless, the AI saves us hours, and our clients actually love the portal we give them.",
            result: "Client onboarding time cut in half",
        },
        {
            id: "brand",
            name: "Sara Malik", role: "Project Director", company: "BrandHouse PK",
            avatar: "SM", color: t("#FF4D8D", "#e8185e"), industry: "Multi-brand",
            quote: "Replaced Basecamp, Slack, and half our email chains in one go. The message board plus chat combo is exactly what our distributed team needed. We went from 3 tools to 1 and nothing fell through the cracks.",
            result: "3 tools replaced, 0 dropped tasks",
        },
        {
            id: "tech",
            name: "Raza Javed", role: "CEO", company: "DigitalStack",
            avatar: "RJ", color: t("#00FFB3", "#00a87a"), industry: "Tech",
            quote: "The AI email drafting per brand is a game changer. Each brand has its own tone and CampHQ actually respects that. Our client communications improved dramatically within the first week.",
            result: "Client response satisfaction up 40%",
        },
        {
            id: "design",
            name: "Kim Curry", role: "Creative Director", company: "Kim Curry Design",
            avatar: "KC", color: t("#00C8FF", "#006cc8"), industry: "Design",
            quote: "We consistently meet deadlines because facts, files, and comments are in one place. Everyone is accountable. I haven't sent a 'where is that file?' email in six months.",
            result: "Zero missed deadlines in 6 months",
        },
        {
            id: "agency",
            name: "Ryan Shepard", role: "Founder", company: "WP Site Care",
            avatar: "RS", color: t("#FFD166", "#c87800"), industry: "Agency",
            quote: "For the first time our team is truly collaborating — everyone moving in the same direction with the same goals. The before/after is remarkable. Remarkable what changed in just one week of using CampHQ.",
            result: "Team alignment improved in week 1",
        },
        {
            id: "retail",
            name: "Zara Malik", role: "Marketing Director", company: "RetailHub",
            avatar: "ZM", color: t("#FF4D8D", "#e8185e"), industry: "Retail",
            quote: "Our Q4 launch involved 4 agencies, 2 internal teams, and 6 freelancers. CampHQ was the only reason it didn't fall apart. Every deliverable was tracked. Every decision was documented. No confusion.",
            result: "Most successful Q4 launch to date",
        },
        {
            id: "tech",
            name: "Rick Reynolds", role: "Engineering Lead", company: "iCONN Systems",
            avatar: "RR", color: t("#7B5EFF", "#5a3be8"), industry: "Tech",
            quote: "Throughput time on standard projects decreased by 30%. The transparency across departments eliminated bottlenecks that were previously invisible. We didn't realize how much time we were losing until it stopped happening.",
            result: "Project throughput improved 30%",
        },
        {
            id: "education",
            name: "Ryan Singh", role: "Program Director", company: "EduTrack",
            avatar: "RS", color: t("#00FFB3", "#00a87a"), industry: "Education",
            quote: "Running three certification programs across two cities used to mean three Google Drives and constant WhatsApp confusion. CampHQ gave every cohort its own space. Students know where to go, instructors know what's due.",
            result: "3 programs running simultaneously",
        },
        {
            id: "brand",
            name: "Andrea Lopez", role: "Head of Brand", company: "GlobalNet",
            avatar: "AL", color: t("#00C8FF", "#006cc8"), industry: "Multi-brand",
            quote: "Before CampHQ, managing our 8 brands meant eight different Slack workspaces and nobody knew what anyone else was doing. Now the admin dashboard shows me the health of every brand in one glance.",
            result: "8 brands managed from one dashboard",
        },
    ];

    const miniQuotes = [
        { quote: "Switched from $800/month of tools to CampHQ Plus. Same output, a fraction of the cost.", name: "Tariq B.", role: "Freelance Consultant", color: t("#7B5EFF", "#5a3be8") },
        { quote: "Our client said 'this is the most organized agency I've ever worked with.' We didn't tell them it was CampHQ.", name: "Nadia R.", role: "Agency Lead, DesignFlow", color: t("#FF4D8D", "#e8185e") },
        { quote: "Finally a tool the whole team actually uses. No more chasing people to update Jira.", name: "Omar K.", role: "PM, AppWorks", color: t("#00FFB3", "#00a87a") },
        { quote: "The calm of CampHQ is contagious. My team is less stressed and more productive.", name: "Hira F.", role: "Director, FastTrack", color: t("#00C8FF", "#006cc8") },
        { quote: "I stopped using email internally completely. Everything is in CampHQ now.", name: "Bilal M.", role: "Founder, DataFlow", color: t("#FFD166", "#c87800") },
        { quote: "Onboarded a new team member in 20 minutes. They knew exactly where to find everything.", name: "Sana T.", role: "Ops Manager, BrandCo", color: t("#7B5EFF", "#5a3be8") },
        { quote: "My response to clients went from 24 hours to same-day. Everything is at my fingertips.", name: "Usman A.", role: "Client Director, MediaHub", color: t("#FF4D8D", "#e8185e") },
        { quote: "Pro Unlimited for our 60-person company costs less than 3 Slack seats. That math is insane.", name: "Farah N.", role: "CFO, TechCorp", color: t("#00FFB3", "#00a87a") },
        { quote: "The hill charts feature alone changed how we communicate progress to stakeholders.", name: "Ali R.", role: "Product Lead, LaunchCo", color: t("#00C8FF", "#006cc8") },
    ];

    const filtered = filter === "all"
        ? featured
        : featured.filter(f => f.id === filter);

    const searchFiltered = search
        ? filtered.filter(f =>
            f.name.toLowerCase().includes(search.toLowerCase()) ||
            f.company.toLowerCase().includes(search.toLowerCase()) ||
            f.industry.toLowerCase().includes(search.toLowerCase()) ||
            f.quote.toLowerCase().includes(search.toLowerCase())
        )
        : filtered;

    return (
        <div style={{ ...css, background: "var(--bg)", color: "var(--text)", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", transition: "background 0.4s, color 0.4s", overflowX: "hidden" }}>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
        @keyframes fadeUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes orbFloat { from{transform:translate(0,0)scale(1)} to{transform:translate(20px,14px)scale(1.05)} }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:var(--bg)}
        ::-webkit-scrollbar-thumb{background:var(--surface2);border-radius:2px}
        ::-webkit-scrollbar-thumb:hover{background:var(--accent)}
        a{text-decoration:none} button{font-family:inherit} ::selection{background:var(--accent);color:#fff}
        input::placeholder{color:var(--text3)}
      `}</style>

            {/* BG */}
            <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
                {dark && [...Array(30)].map((_, i) => (
                    <div key={i} style={{ position: "absolute", width: Math.random() * 2 + 1, height: Math.random() * 2 + 1, borderRadius: "50%", background: "#fff", opacity: Math.random() * 0.4 + 0.08, top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }} />
                ))}
                <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(123,94,255,0.16) 0%, transparent 65%)", top: "-12%", left: "-10%", animation: "orbFloat 12s ease-in-out infinite alternate", filter: "blur(70px)" }} />
                <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,77,141,0.1) 0%, transparent 65%)", bottom: "0%", right: "-8%", animation: "orbFloat 16s ease-in-out infinite alternate", animationDelay: "-5s", filter: "blur(80px)" }} />
                {dark && <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(123,94,255,0.012) 2px, rgba(123,94,255,0.012) 4px)" }} />}
            </div>

            <Navbar />

            {/* ── HERO ── */}
            <section style={{ position: "relative", zIndex: 1, padding: "88px 5% 72px", textAlign: "center" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`, backgroundSize: "56px 56px", maskImage: "radial-gradient(ellipse 70% 55% at 50% 40%, black 20%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 70% 55% at 50% 40%, black 20%, transparent 100%)", pointerEvents: "none" }} />
                <div style={{ position: "relative", zIndex: 2, maxWidth: 720, margin: "0 auto" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 16px", background: "var(--tag-bg)", border: "1px solid var(--border2)", borderRadius: 100, fontSize: 12, color: "var(--tag-text)", fontWeight: 600, marginBottom: 24, animation: "fadeUp 0.5s ease both", boxShadow: "0 0 14px var(--glow)" }}>
                        <Star size={12} color="var(--accent4)" fill="var(--accent4)" />
                        Real results from real teams — no cherry-picking
                    </div>
                    <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.6rem, 6.5vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.07, marginBottom: 20, animation: "fadeUp 0.5s 0.1s ease both", animationFillMode: "both" }}>
                        What changed<br /><GradText>for the better.</GradText>
                    </h1>
                    <p style={{ fontSize: "clamp(1rem, 1.8vw, 1.12rem)", color: "var(--text2)", maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.8, fontWeight: 300, animation: "fadeUp 0.5s 0.2s ease both", animationFillMode: "both" }}>
                        Over 75,000 organizations use CampHQ. Here's what teams across every industry say happened after they switched.
                    </p>
                    {/* stars row */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap", animation: "fadeUp 0.5s 0.3s ease both", animationFillMode: "both" }}>
                        <div style={{ display: "flex", gap: 2 }}>{[...Array(5)].map((_, i) => <Star key={i} size={20} fill="var(--accent4)" color="var(--accent4)" />)}</div>
                        <span style={{ fontSize: 18, fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "var(--text)" }}>4.9 / 5</span>
                        <span style={{ fontSize: 14, color: "var(--text2)" }}>from 2,400+ reviews</span>
                    </div>
                </div>
            </section>

            {/* ── STATS BAR ── */}
            <div style={{ position: "relative", zIndex: 1, margin: "0 5%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", border: "1px solid var(--border2)", borderRadius: 24, overflow: "hidden", gap: 1, background: "var(--border2)" }}>
                {[
                    { value: "75K+", label: "Teams worldwide", sub: "across 166 countries", color: t("#7B5EFF", "#5a3be8") },
                    { value: "4.9★", label: "Average rating", sub: "from 2,400+ reviews", color: t("#FFD166", "#c87800") },
                    { value: "30%", label: "Faster project delivery", sub: "reported by customers", color: t("#00FFB3", "#00a87a") },
                    { value: "3×", label: "Tools replaced on avg", sub: "per team that switches", color: t("#FF4D8D", "#e8185e") },
                ].map((s, i) => (
                    <div key={i} style={{ background: "var(--bg2)", transition: "background 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "var(--surface)"}
                        onMouseLeave={e => e.currentTarget.style.background = "var(--bg2)"}>
                        <StatHighlight {...s} delay={i * 70} />
                    </div>
                ))}
            </div>

            {/* ── FILTER + SEARCH ── */}
            <div style={{ position: "sticky", top: 64, zIndex: 90, background: "var(--nav-bg)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)", padding: "12px 5%", display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                {/* search */}
                <div style={{ position: "relative", flex: "0 0 220px" }}>
                    <Search size={14} color="var(--text3)" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                    <input
                        value={search} onChange={e => setSearch(e.target.value)}
                        placeholder="Search stories…"
                        style={{ width: "100%", padding: "8px 12px 8px 34px", background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 100, fontSize: 13.5, color: "var(--text)", outline: "none", fontFamily: "inherit", transition: "border-color 0.2s" }}
                        onFocus={e => e.target.style.borderColor = "var(--accent)"}
                        onBlur={e => e.target.style.borderColor = "var(--border2)"} />
                </div>

                {/* filters */}
                <div style={{ display: "flex", gap: 8, overflowX: "auto", WebkitOverflowScrolling: "touch", flex: 1 }}>
                    {industries.map(({ id, label, icon: Icon }) => (
                        <button key={id} onClick={() => setFilter(id)} style={{
                            display: "flex", alignItems: "center", gap: 6,
                            padding: "8px 16px", borderRadius: 100, fontSize: 13, fontWeight: filter === id ? 600 : 400,
                            cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap", fontFamily: "inherit",
                            background: filter === id ? "linear-gradient(135deg, var(--accent), var(--accent2))" : "var(--surface)",
                            color: filter === id ? "#fff" : "var(--text2)",
                            border: filter === id ? "none" : "1px solid var(--border2)",
                            boxShadow: filter === id ? "0 4px 16px var(--glow)" : "none",
                        }}>
                            <Icon size={13} strokeWidth={2} /> {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── FEATURED STORIES ── */}
            <section style={{ position: "relative", zIndex: 1, padding: "56px 5%" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    {searchFiltered.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text3)", fontSize: 15 }}>
                            No stories match your search. Try a different keyword.
                        </div>
                    ) : (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
                            {searchFiltered.map((s, i) => (
                                <FeaturedCard key={i} {...s} delay={i * 55} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ── MINI QUOTES WALL ── */}
            <section style={{ position: "relative", zIndex: 1, padding: "72px 5%", background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
                <div style={{ textAlign: "center", marginBottom: 44 }}>
                    <SectionLabel text="More voices" />
                    <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: 10 }}>
                        Thousands more <GradText>love CampHQ</GradText>
                    </h2>
                    <p style={{ fontSize: 15, color: "var(--text2)", fontWeight: 300 }}>A small sample from our community.</p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(3, 1fr))", gap: 14, maxWidth: 1100, margin: "0 auto" }}>
                    {miniQuotes.map((q, i) => <MiniQuote key={i} {...q} delay={i * 50} />)}
                </div>
            </section>

            {/* ── BY THE NUMBERS ── */}
            <section style={{ position: "relative", zIndex: 1, padding: "80px 5%" }}>
                <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
                    {(() => {
                        const [ref, visible] = useReveal(); return (
                            <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-20px)", transition: "all 0.6s ease" }}>
                                <SectionLabel text="By the numbers" />
                                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.2, marginBottom: 16 }}>
                                    The results <GradText>speak for themselves</GradText>
                                </h2>
                                <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.8, fontWeight: 300 }}>
                                    These numbers come directly from customer surveys and support conversations. We don't make them up, and we don't cherry-pick outliers.
                                </p>
                            </div>
                        );
                    })()}

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                        {[
                            { value: "94%", label: "Would recommend CampHQ", color: t("#7B5EFF", "#5a3be8") },
                            { value: "87%", label: "Report fewer dropped tasks", color: t("#00FFB3", "#00a87a") },
                            { value: "3.2×", label: "Average tools replaced", color: t("#FF4D8D", "#e8185e") },
                            { value: "2wk", label: "Average time to full adoption", color: t("#00C8FF", "#006cc8") },
                            { value: "68%", label: "Reduce internal email volume", color: t("#FFD166", "#c87800") },
                            { value: "91%", label: "Still using after 12 months", color: t("#7B5EFF", "#5a3be8") },
                        ].map(({ value, label, color }, i) => {
                            const [ref, visible] = useReveal();
                            return (
                                <div ref={ref} key={i} style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 16, padding: "22px 18px", textAlign: "center", backdropFilter: "blur(12px)", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: `all 0.4s ease ${i * 60}ms` }}>
                                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 32, letterSpacing: "-0.03em", color, filter: `drop-shadow(0 0 14px ${color}50)`, marginBottom: 6 }}>{value}</div>
                                    <div style={{ fontSize: 12.5, color: "var(--text2)", lineHeight: 1.5 }}>{label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section style={{ position: "relative", zIndex: 1, padding: "72px 5%", textAlign: "center" }}>
                <div style={{ maxWidth: 600, margin: "0 auto", background: "var(--card-bg)", border: "1px solid var(--border2)", borderRadius: 28, padding: "52px 40px", backdropFilter: "blur(20px)", position: "relative", overflow: "hidden", boxShadow: "0 0 80px var(--glow), 0 0 30px var(--glow2)" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, var(--accent), var(--accent3), transparent)", boxShadow: "0 0 10px var(--glow)" }} />
                    <SectionLabel text="Join them" />
                    <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: 14 }}>
                        Your story starts <GradText>here.</GradText>
                    </h2>
                    <p style={{ fontSize: 15.5, color: "var(--text2)", marginBottom: 32, fontWeight: 300, lineHeight: 1.75 }}>
                        75,000+ teams already made the switch. Start free — no card, no pressure, no catch.
                    </p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <a href="/signup" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", background: "linear-gradient(135deg, var(--accent), var(--accent2))", color: "#fff", borderRadius: 12, fontSize: 15, fontWeight: 600, boxShadow: "0 6px 24px var(--glow)", transition: "all 0.25s" }}
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 36px var(--glow)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px var(--glow)"; }}>
                            Try CampHQ free <ArrowRight size={15} />
                        </a>
                        <a href="/paths" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", background: "var(--surface)", color: "var(--text2)", border: "1px solid var(--border2)", borderRadius: 12, fontSize: 15, fontWeight: 500, transition: "all 0.2s" }}
                            onMouseEnter={e => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                            onMouseLeave={e => { e.currentTarget.style.color = "var(--text2)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                            Find your path <ChevronRight size={15} />
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}