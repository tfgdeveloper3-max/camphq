import { useState } from "react";
import {
    Layers, Heart, Zap, Shield, Users, Globe, TrendingUp,
    ArrowRight, Star, Coffee, Rocket, BookOpen, Lock,
    MessageSquare, CheckCircle2, Building2, Sparkles, Clock,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useReveal } from "../../hooks/useReveal";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// ─── HELPERS ─── //
const GradText = ({ children }) => (
    <span style={{ background: "linear-gradient(135deg, var(--accent), var(--accent3) 55%, var(--accent2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
        {children}
    </span>
);

const SectionLabel = ({ text }) => (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 14 }}>
        <div style={{ width: 18, height: 1.5, background: "var(--accent)", borderRadius: 2, boxShadow: "0 0 6px var(--glow)" }} />
        {text}
    </div>
);

// ─── STAT CARD ─── //
const StatCard = ({ value, label, color, delay }) => {
    const [ref, visible] = useReveal();
    return (
        <div ref={ref} style={{
            textAlign: "center", padding: "32px 20px",
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: `all 0.5s ease ${delay}ms`,
        }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 48, letterSpacing: "-0.04em", lineHeight: 1, background: `linear-gradient(135deg, ${color}, var(--accent2))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: `drop-shadow(0 0 20px ${color}50)` }}>
                {value}
            </div>
            <div style={{ fontSize: 14, color: "var(--text2)", marginTop: 8, fontWeight: 300 }}>{label}</div>
        </div>
    );
};

// ─── VALUE CARD ─── //
const ValueCard = ({ icon: Icon, title, desc, color, delay }) => {
    const [ref, visible] = useReveal();
    const [hov, setHov] = useState(false);
    return (
        <div ref={ref}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                background: "var(--card-bg)", border: `1px solid ${hov ? color + "40" : "var(--card-border)"}`,
                borderRadius: 20, padding: "28px 26px",
                opacity: visible ? 1 : 0, transform: visible ? (hov ? "translateY(-5px)" : "translateY(0)") : "translateY(24px)",
                transition: `all 0.4s cubic-bezier(0.34,1.2,0.64,1) ${delay}ms`,
                boxShadow: hov ? `0 16px 48px rgba(0,0,0,0.3), 0 0 20px ${color}15` : "0 2px 16px rgba(0,0,0,0.15)",
                backdropFilter: "blur(16px)", position: "relative", overflow: "hidden",
            }}>
            {hov && <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: `linear-gradient(90deg, transparent, ${color}, transparent)`, boxShadow: `0 0 10px ${color}` }} />}
            <div style={{ width: 46, height: 46, borderRadius: 13, background: `${color}14`, border: `1px solid ${color}28`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, boxShadow: hov ? `0 0 16px ${color}30` : "none", transition: "box-shadow 0.3s" }}>
                <Icon size={21} color={color} strokeWidth={1.8} />
            </div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, marginBottom: 10, color: "var(--text)", letterSpacing: "-0.01em" }}>{title}</div>
            <div style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7, fontWeight: 300 }}>{desc}</div>
        </div>
    );
};

// ─── TIMELINE ITEM ─── //
const TimelineItem = ({ year, title, desc, color, side, delay }) => {
    const [ref, visible] = useReveal();
    const isLeft = side === "left";
    return (
        <div ref={ref} style={{
            display: "grid", gridTemplateColumns: "1fr 48px 1fr", alignItems: "start", gap: 0,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: `all 0.55s ease ${delay}ms`,
            marginBottom: 40,
        }}>
            {/* left content */}
            <div style={{ textAlign: "right", paddingRight: 28, paddingTop: 4 }}>
                {isLeft ? (
                    <>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 15, color: "var(--text)", marginBottom: 6 }}>{title}</div>
                        <div style={{ fontSize: 13.5, color: "var(--text2)", lineHeight: 1.7, fontWeight: 300 }}>{desc}</div>
                    </>
                ) : (
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, color, filter: `drop-shadow(0 0 12px ${color}60)` }}>{year}</div>
                )}
            </div>

            {/* center dot */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 16, height: 16, borderRadius: "50%", background: color, boxShadow: `0 0 16px ${color}, 0 0 6px ${color}`, border: `3px solid var(--bg)`, zIndex: 2, marginTop: 4, flexShrink: 0 }} />
                <div style={{ flex: 1, width: 1, background: `linear-gradient(to bottom, ${color}60, transparent)`, minHeight: 60, marginTop: 4 }} />
            </div>

            {/* right content */}
            <div style={{ paddingLeft: 28, paddingTop: 4 }}>
                {!isLeft ? (
                    <>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 15, color: "var(--text)", marginBottom: 6 }}>{title}</div>
                        <div style={{ fontSize: 13.5, color: "var(--text2)", lineHeight: 1.7, fontWeight: 300 }}>{desc}</div>
                    </>
                ) : (
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, color, filter: `drop-shadow(0 0 12px ${color}60)` }}>{year}</div>
                )}
            </div>
        </div>
    );
};

// ─── TEAM CARD ─── //
const TeamCard = ({ name, role, bio, avatar, color, delay }) => {
    const [ref, visible] = useReveal();
    const [hov, setHov] = useState(false);
    return (
        <div ref={ref}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                background: "var(--card-bg)", border: `1px solid ${hov ? color + "40" : "var(--card-border)"}`,
                borderRadius: 20, padding: "28px 24px",
                opacity: visible ? 1 : 0, transform: visible ? (hov ? "translateY(-4px)" : "translateY(0)") : "translateY(24px)",
                transition: `all 0.4s cubic-bezier(0.34,1.2,0.64,1) ${delay}ms`,
                boxShadow: hov ? `0 12px 40px rgba(0,0,0,0.25), 0 0 18px ${color}12` : "0 2px 16px rgba(0,0,0,0.15)",
                backdropFilter: "blur(16px)",
            }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: `linear-gradient(135deg, ${color}, var(--accent2))`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: "#fff", flexShrink: 0, boxShadow: `0 0 18px ${color}50` }}>
                    {avatar}
                </div>
                <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: "var(--text)", letterSpacing: "-0.01em" }}>{name}</div>
                    <div style={{ fontSize: 12.5, color, marginTop: 2, fontWeight: 600 }}>{role}</div>
                </div>
            </div>
            <div style={{ fontSize: 13.5, color: "var(--text2)", lineHeight: 1.75, fontWeight: 300 }}>{bio}</div>
        </div>
    );
};

// ─── PRINCIPLE ITEM ─── //
const PrincipleItem = ({ num, title, desc, delay }) => {
    const [ref, visible] = useReveal();
    return (
        <div ref={ref} style={{
            display: "flex", gap: 20, paddingBottom: 28, borderBottom: "1px solid var(--border)",
            opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-16px)",
            transition: `all 0.5s ease ${delay}ms`,
        }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 36, color: "var(--border2)", letterSpacing: "-0.04em", lineHeight: 1, flexShrink: 0, minWidth: 44, userSelect: "none" }}>
                {String(num).padStart(2, "0")}
            </div>
            <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.01em" }}>{title}</div>
                <div style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.75, fontWeight: 300 }}>{desc}</div>
            </div>
        </div>
    );
};

// ─── MAIN PAGE ─── //
export default function AboutPage() {
    const { dark, css } = useTheme();
    const t = (d, l) => dark ? d : l;

    const values = [
        { icon: Heart, title: "People first", desc: "We build software for humans, not the other way around. Every feature decision starts with how it affects real people doing real work.", color: t("#FF4D8D", "#e8185e") },
        { icon: Lock, title: "Calm by design", desc: "Notifications, urgency, and anxiety are productivity killers. CampHQ is intentionally calm — structured to reduce stress, not create it.", color: t("#7B5EFF", "#5a3be8") },
        { icon: Shield, title: "Long-term thinking", desc: "We're not chasing growth metrics or VC milestones. We make decisions for the next decade, not the next quarter.", color: t("#00FFB3", "#00a87a") },
        { icon: Globe, title: "Transparency", desc: "We publish our handbook, pricing, and policies publicly. No hidden terms. No dark patterns. What you see is exactly what you get.", color: t("#00C8FF", "#006cc8") },
        { icon: Coffee, title: "Work-life balance", desc: "We keep our team to a manageable size and work sane hours. We believe in working sustainably — not burning out, not burning others out.", color: t("#FFD166", "#c87800") },
        { icon: Zap, title: "Opinionated software", desc: "We don't build everything everyone asks for. We make deliberate choices about what belongs in CampHQ and what doesn't. Focus is a feature.", color: t("#FF4D8D", "#e8185e") },
    ];

    const timeline = [
        { year: "2000", title: "Basecamp camp was born", desc: "Jason Fried and David Heinemeier Hansson started 37signals as a web design firm. The original Basecamp was built to manage their own projects.", color: t("#7B5EFF", "#5a3be8"), side: "left" },
        { year: "2004", title: "Ruby on Rails ships", desc: "DHH extracted Rails from Basecamp and open-sourced it. It went on to power GitHub, Shopify, Twitter, and thousands of companies worldwide.", color: t("#FF4D8D", "#e8185e"), side: "right" },
        { year: "2012", title: "Remote work manifesto", desc: "Jason and David wrote REWORK and later REMOTE, redefining how the world thinks about distributed teams — years before the pandemic proved them right.", color: t("#00FFB3", "#00a87a"), side: "left" },
        { year: "2019", title: "HEY email launches", desc: "CampHQ introduced HEY, a radically rethought email experience. It proved that even email — a 50-year-old protocol — could be rethought from scratch.", color: t("#00C8FF", "#006cc8"), side: "right" },
        { year: "2022", title: "Multi-brand focus", desc: "CampHQ introduced brand workspaces — giving agencies and multi-brand companies the structure they always needed but never had.", color: t("#FFD166", "#c87800"), side: "left" },
        { year: "2024", title: "AI joins the team", desc: "Claude AI integration brought smart task suggestions, brand-aware email drafting, and thread summaries — all without surrendering human control.", color: t("#7B5EFF", "#5a3be8"), side: "right" },
    ];

    const team = [
        { name: "Jason F.", role: "Co-founder & CEO", bio: "Jason has spent 25 years thinking about how software should feel. Author of REWORK and REMOTE. Believes calm is productive.", avatar: "JF", color: t("#7B5EFF", "#5a3be8") },
        { name: "David H.", role: "Co-founder & CTO", bio: "DHH created Ruby on Rails. He's opinionated about software, cars, and working without the nonsense that usually comes with success.", avatar: "DH", color: t("#FF4D8D", "#e8185e") },
        { name: "Andrea L.", role: "Head of Design", bio: "Andrea believes every pixel should have a reason. She keeps CampHQ feeling human when every tech trend pushes toward the inhuman.", avatar: "AL", color: t("#00FFB3", "#00a87a") },
        { name: "Ryan S.", role: "Head of Customer Success", bio: "Ryan has personally answered over 50,000 support emails. He's the reason our response time stays under an hour, every single day.", avatar: "RS", color: t("#00C8FF", "#006cc8") },
        { name: "Kim C.", role: "Lead Engineer", bio: "Kim writes the kind of code that makes other engineers stop and read it twice. Obsessed with performance and reliability.", avatar: "KC", color: t("#FFD166", "#c87800") },
        { name: "Zara M.", role: "Product Manager", bio: "Zara decides what doesn't go into CampHQ. Her most important word is 'no'. That's not stubbornness — it's how you build something lasting.", avatar: "ZM", color: t("#FF4D8D", "#e8185e") },
    ];

    const principles = [
        { title: "We stay small on purpose", desc: "CampHQ has fewer than 60 employees. That's a feature. It means everyone is accountable, decisions are fast, and nobody gets lost in a bureaucracy." },
        { title: "We don't take outside investment", desc: "No VCs. No board pressure to grow at all costs. We answer to our customers, not investors. That's why we can say no to things that would compromise the product." },
        { title: "We work async by default", desc: "Most communication at CampHQ is asynchronous. Nobody interrupts anyone. Deep work is respected. Meetings are rare and only when genuinely necessary." },
        { title: "We publish our thinking", desc: "Our handbook, policies, pricing, and principles are all public. We believe transparency builds trust — and that trust is worth more than any competitive advantage." },
        { title: "We charge fairly and simply", desc: "No per-seat pricing that penalizes success. No hidden add-ons. Pricing that makes sense, that you can plan around, that doesn't change every quarter." },
        { title: "We support the right to repair", desc: "Your data is yours, exportable anytime in a format you can actually use. If you leave, you leave with everything. We earn your business every single month." },
    ];

    return (
        <div style={{ ...css, background: "var(--bg)", color: "var(--text)", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", transition: "background 0.4s, color 0.4s", overflowX: "hidden" }}>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
        @keyframes fadeUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes orbFloat { from{transform:translate(0,0)scale(1)} to{transform:translate(20px,14px)scale(1.05)} }
        @keyframes pulse-ring{0%{box-shadow:0 0 0 0 var(--glow)}70%{box-shadow:0 0 0 10px transparent}100%{box-shadow:0 0 0 0 transparent}}
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:var(--bg)}
        ::-webkit-scrollbar-thumb{background:var(--surface2);border-radius:2px}
        ::-webkit-scrollbar-thumb:hover{background:var(--accent)}
        a{text-decoration:none} button{font-family:inherit} ::selection{background:var(--accent);color:#fff}
      `}</style>

            {/* BG */}
            <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
                {dark && [...Array(35)].map((_, i) => (
                    <div key={i} style={{ position: "absolute", width: Math.random() * 2 + 1, height: Math.random() * 2 + 1, borderRadius: "50%", background: "#fff", opacity: Math.random() * 0.4 + 0.08, top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }} />
                ))}
                <div style={{ position: "absolute", width: 650, height: 650, borderRadius: "50%", background: "radial-gradient(circle, rgba(123,94,255,0.16) 0%, transparent 65%)", top: "-15%", left: "-12%", animation: "orbFloat 13s ease-in-out infinite alternate", filter: "blur(70px)" }} />
                <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,255,179,0.1) 0%, transparent 65%)", top: "30%", right: "-10%", animation: "orbFloat 16s ease-in-out infinite alternate", animationDelay: "-5s", filter: "blur(80px)" }} />
                <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,77,141,0.1) 0%, transparent 65%)", bottom: "10%", left: "20%", animation: "orbFloat 19s ease-in-out infinite alternate", animationDelay: "-9s", filter: "blur(80px)" }} />
                {dark && <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(123,94,255,0.012) 2px, rgba(123,94,255,0.012) 4px)" }} />}
            </div>

            <Navbar />

            {/* ── HERO ── */}
            <section style={{ position: "relative", zIndex: 1, padding: "90px 5% 80px", textAlign: "center" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`, backgroundSize: "56px 56px", maskImage: "radial-gradient(ellipse 70% 55% at 50% 40%, black 20%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 70% 55% at 50% 40%, black 20%, transparent 100%)", pointerEvents: "none" }} />

                <div style={{ position: "relative", zIndex: 2, maxWidth: 760, margin: "0 auto" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 16px", background: "var(--tag-bg)", border: "1px solid var(--border2)", borderRadius: 100, fontSize: 12, color: "var(--tag-text)", fontWeight: 600, marginBottom: 26, animation: "fadeUp 0.5s ease both", boxShadow: "0 0 14px var(--glow)" }}>
                        <Building2 size={12} color="var(--accent)" />
                        Founded 2000 · Profitable every year since
                    </div>

                    <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.8rem, 7vw, 5rem)", fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.06, marginBottom: 22, animation: "fadeUp 0.5s 0.1s ease both", animationFillMode: "both" }}>
                        We build software<br />
                        <GradText>the way it should be built.</GradText>
                    </h1>

                    <p style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "var(--text2)", maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.8, fontWeight: 300, animation: "fadeUp 0.5s 0.2s ease both", animationFillMode: "both" }}>
                        CampHQ is made by a small, independent team that's been doing this for 25 years. No investors. No growth hacks. No dark patterns. Just software we're genuinely proud of.
                    </p>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap", animation: "fadeUp 0.5s 0.3s ease both", animationFillMode: "both" }}>
                        <a href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 26px", background: "linear-gradient(135deg, var(--accent), var(--accent2))", color: "#fff", borderRadius: 12, fontSize: 15, fontWeight: 600, boxShadow: "0 8px 28px var(--glow)", transition: "all 0.25s" }}
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 14px 40px var(--glow)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 28px var(--glow)"; }}>
                            Try CampHQ free <ArrowRight size={15} strokeWidth={2.5} />
                        </a>
                        <a href="/handbook" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 26px", background: "var(--surface)", color: "var(--text2)", border: "1px solid var(--border2)", borderRadius: 12, fontSize: 15, fontWeight: 500, transition: "all 0.25s" }}
                            onMouseEnter={e => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                            onMouseLeave={e => { e.currentTarget.style.color = "var(--text2)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                            <BookOpen size={15} /> Read our handbook
                        </a>
                    </div>
                </div>
            </section>

            {/* ── STATS ── */}
            <div style={{ position: "relative", zIndex: 1, margin: "0 5%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", border: "1px solid var(--border2)", borderRadius: 24, overflow: "hidden", gap: 1, background: "var(--border2)" }}>
                {[
                    { value: "25", label: "Years in business", color: t("#7B5EFF", "#5a3be8") },
                    { value: "75K+", label: "Organizations", color: t("#00FFB3", "#00a87a") },
                    { value: "166", label: "Countries", color: t("#FF4D8D", "#e8185e") },
                    { value: "<60", label: "Team members", color: t("#00C8FF", "#006cc8") },
                    { value: "$0", label: "Outside investment", color: t("#FFD166", "#c87800") },
                    { value: "99.9%", label: "Historical uptime", color: t("#7B5EFF", "#5a3be8") },
                ].map((s, i) => (
                    <div key={i} style={{ background: "var(--bg2)", transition: "background 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "var(--surface)"}
                        onMouseLeave={e => e.currentTarget.style.background = "var(--bg2)"}>
                        <StatCard {...s} delay={i * 60} />
                    </div>
                ))}
            </div>

            {/* ── OUR STORY ── */}
            <section style={{ position: "relative", zIndex: 1, padding: "96px 5%" }}>
                <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
                    {(() => {
                        const [ref, visible] = useReveal(); return (
                            <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-24px)", transition: "all 0.6s ease" }}>
                                <SectionLabel text="Our story" />
                                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: 20 }}>
                                    Started as a web design firm.<br />
                                    <GradText>Became a movement.</GradText>
                                </h2>
                                <p style={{ fontSize: 15.5, color: "var(--text2)", lineHeight: 1.8, fontWeight: 300, marginBottom: 18 }}>
                                    In 2000, Jason Fried and David Heinemeier Hansson were running a small web design shop called 37signals. They needed a better way to manage projects — so they built one. That tool became Basecamp. Then CampHQ.
                                </p>
                                <p style={{ fontSize: 15.5, color: "var(--text2)", lineHeight: 1.8, fontWeight: 300, marginBottom: 18 }}>
                                    Along the way, DHH extracted Ruby on Rails from the codebase and open-sourced it. It became one of the most influential web frameworks in history, powering Shopify, GitHub, and Airbnb.
                                </p>
                                <p style={{ fontSize: 15.5, color: "var(--text2)", lineHeight: 1.8, fontWeight: 300 }}>
                                    We've never taken outside investment. We've been profitable every single year. We write books, share our thinking publicly, and run the company the way we wish other companies were run.
                                </p>
                            </div>
                        );
                    })()}

                    {/* quote card */}
                    {(() => {
                        const [ref, visible] = useReveal(); return (
                            <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(24px)", transition: "all 0.6s ease 0.15s" }}>
                                <div style={{ background: "var(--card-bg)", border: "1px solid var(--border2)", borderRadius: 24, padding: "36px 32px", backdropFilter: "blur(16px)", position: "relative", overflow: "hidden", boxShadow: "0 0 40px var(--glow), 0 20px 60px rgba(0,0,0,0.25)" }}>
                                    <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: "linear-gradient(90deg, transparent, var(--accent), transparent)", boxShadow: "0 0 10px var(--glow)" }} />
                                    <div style={{ fontSize: 60, color: "var(--accent)", opacity: 0.3, fontFamily: "Georgia, serif", lineHeight: 1, marginBottom: 8 }}>"</div>
                                    <p style={{ fontSize: 18, fontStyle: "italic", color: "var(--text)", lineHeight: 1.75, fontWeight: 300, marginBottom: 24 }}>
                                        The real question is whether to use software as a tool to get a job done or as a badge of sophistication.
                                    </p>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, var(--accent), var(--accent2))", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: "#fff", boxShadow: "0 0 16px var(--glow)" }}>JF</div>
                                        <div>
                                            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: "var(--text)" }}>Jason Fried</div>
                                            <div style={{ fontSize: 12, color: "var(--text3)" }}>Co-founder & CEO, CampHQ</div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop: 16, background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 18, padding: "22px 24px", backdropFilter: "blur(12px)" }}>
                                    <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                                        <div style={{ width: 38, height: 38, borderRadius: 11, background: "rgba(0,255,179,0.12)", border: "1px solid rgba(0,255,179,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                            <BookOpen size={17} color="var(--accent3)" strokeWidth={1.8} />
                                        </div>
                                        <div>
                                            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: "var(--text)", marginBottom: 5 }}>Read our books</div>
                                            <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.65 }}>REWORK, REMOTE, and IT DOESN'T HAVE TO BE CRAZY AT WORK — over 1 million copies sold worldwide.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </div>
            </section>

            {/* ── VALUES ── */}
            <section style={{ position: "relative", zIndex: 1, padding: "80px 5%", background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
                <div style={{ textAlign: "center", marginBottom: 56 }}>
                    <SectionLabel text="What we believe" />
                    <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: 12 }}>
                        Our values aren't a wall poster.<br /><GradText>They're how we actually work.</GradText>
                    </h2>
                    <p style={{ fontSize: 16, color: "var(--text2)", fontWeight: 300, maxWidth: 480, margin: "0 auto" }}>These aren't aspirational statements. They're constraints we work within every day.</p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18, maxWidth: 1000, margin: "0 auto" }}>
                    {values.map((v, i) => <ValueCard key={i} {...v} delay={i * 60} />)}
                </div>
            </section>

            {/* ── TIMELINE ── */}
            <section style={{ position: "relative", zIndex: 1, padding: "96px 5%" }}>
                <div style={{ textAlign: "center", marginBottom: 60 }}>
                    <SectionLabel text="Our journey" />
                    <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.025em" }}>
                        25 years of <GradText>building with conviction</GradText>
                    </h2>
                </div>
                <div style={{ maxWidth: 700, margin: "0 auto" }}>
                    {timeline.map((item, i) => <TimelineItem key={i} {...item} delay={i * 80} />)}
                </div>
            </section>

            {/* ── PRINCIPLES ── */}
            <section style={{ position: "relative", zIndex: 1, padding: "80px 5%", background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
                <div style={{ maxWidth: 860, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
                    {(() => {
                        const [ref, visible] = useReveal(); return (
                            <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
                                <SectionLabel text="How we run things" />
                                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.15, marginBottom: 16 }}>
                                    The principles that keep us <GradText>honest</GradText>
                                </h2>
                                <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.8, fontWeight: 300 }}>
                                    We've been running CampHQ for 25 years without taking shortcuts. Here's how we do it.
                                </p>
                                <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12 }}>
                                    <Star size={16} color="var(--accent4)" fill="var(--accent4)" strokeWidth={2} />
                                    <span style={{ fontSize: 13.5, color: "var(--text2)" }}>Our full company handbook is free to read at <a href="/handbook" style={{ color: "var(--accent)" }}>camphq.io/handbook</a></span>
                                </div>
                            </div>
                        );
                    })()}
                    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                        {principles.map((p, i) => <PrincipleItem key={i} num={i + 1} {...p} delay={i * 60} />)}
                    </div>
                </div>
            </section>

            {/* ── TEAM ── */}
            <section style={{ position: "relative", zIndex: 1, padding: "96px 5%", textAlign: "center" }}>
                <SectionLabel text="The team" />
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: 12 }}>
                    Small team. <GradText>Big opinions.</GradText>
                </h2>
                <p style={{ fontSize: 16, color: "var(--text2)", maxWidth: 480, margin: "0 auto 52px", fontWeight: 300, lineHeight: 1.7 }}>
                    We keep the team intentionally small. Every person here makes a difference you can actually feel.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18, textAlign: "left", maxWidth: 1000, margin: "0 auto" }}>
                    {team.map((m, i) => <TeamCard key={i} {...m} delay={i * 70} />)}
                </div>
            </section>

            {/* ── REMOTE CULTURE ── */}
            <section style={{ position: "relative", zIndex: 1, padding: "72px 5%", background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
                <div style={{ maxWidth: 860, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(4, 1fr))", gap: 20 }}>
                    {[
                        { icon: Globe, title: "Fully remote since 2004", desc: "Our team works from 12 different countries. Not because it's trendy — because it's the right way to respect how people live.", color: t("#00FFB3", "#00a87a") },
                        { icon: Clock, title: "Async by default", desc: "Most decisions happen in writing, at everyone's own pace. Meetings are optional and rare. Deep work is protected.", color: t("#7B5EFF", "#5a3be8") },
                        { icon: Heart, title: "No burnout culture", desc: "We work 40 hours a week, not 80. We take real vacations. We don't celebrate exhaustion or treat overwork as a virtue.", color: t("#FF4D8D", "#e8185e") },
                        { icon: MessageSquare, title: "We eat our own cooking", desc: "Every CampHQ feature we ship, our team uses daily. If it annoys us, it annoys you. That's why we actually fix things.", color: t("#00C8FF", "#006cc8") },
                    ].map(({ icon: Icon, title, desc, color }, i) => {
                        const [ref, visible] = useReveal();
                        return (
                            <div ref={ref} key={i} style={{ display: "flex", gap: 16, padding: "22px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: `all 0.45s ease ${i * 80}ms` }}>
                                <div style={{ width: 42, height: 42, borderRadius: 12, background: `${color}14`, border: `1px solid ${color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                    <Icon size={19} color={color} strokeWidth={1.8} />
                                </div>
                                <div>
                                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "var(--text)", marginBottom: 7 }}>{title}</div>
                                    <div style={{ fontSize: 13.5, color: "var(--text2)", lineHeight: 1.7, fontWeight: 300 }}>{desc}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ── CTA ── */}
            <section style={{ position: "relative", zIndex: 1, padding: "96px 5%", textAlign: "center" }}>
                <div style={{ maxWidth: 640, margin: "0 auto", background: "var(--card-bg)", border: "1px solid var(--border2)", borderRadius: 28, padding: "60px 44px", backdropFilter: "blur(20px)", position: "relative", overflow: "hidden", boxShadow: "0 0 80px var(--glow), 0 0 30px var(--glow2)" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, var(--accent), var(--accent3), transparent)", boxShadow: "0 0 10px var(--glow)" }} />
                    <div style={{ width: 56, height: 56, borderRadius: 18, background: "linear-gradient(135deg, var(--accent), var(--accent2))", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 0 28px var(--glow)" }}>
                        <Rocket size={26} color="#fff" strokeWidth={2} />
                    </div>
                    <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: 14 }}>
                        Come build with us.<br /><GradText>You'll feel the difference.</GradText>
                    </h2>
                    <p style={{ fontSize: 15.5, color: "var(--text2)", marginBottom: 32, fontWeight: 300, lineHeight: 1.75 }}>
                        No dark patterns. No growth hacks. No pressure. Just an honest tool, built by people who care about their craft.
                    </p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <a href="/signup" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", background: "linear-gradient(135deg, var(--accent), var(--accent2))", color: "#fff", borderRadius: 12, fontSize: 15, fontWeight: 600, boxShadow: "0 6px 24px var(--glow)", transition: "all 0.25s" }}
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 36px var(--glow)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px var(--glow)"; }}>
                            Try free for 30 days <ArrowRight size={15} />
                        </a>
                        <a href="/customers" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", background: "var(--surface)", color: "var(--text2)", border: "1px solid var(--border2)", borderRadius: 12, fontSize: 15, fontWeight: 500, transition: "all 0.2s" }}
                            onMouseEnter={e => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                            onMouseLeave={e => { e.currentTarget.style.color = "var(--text2)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                            <Star size={15} /> Read customer stories
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}