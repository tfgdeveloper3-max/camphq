import { useState } from "react";
import {
    ArrowRight, Check, ChevronRight, Zap,
    MessageSquare, FolderOpen, BarChart3,
    Bell, Kanban, Clock, Users, Shield, Sparkles,
    CheckCircle2, Building2, Globe,
    TrendingUp, Mail, Eye,
    FileText, Calendar, Search, Settings, Link2,
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

// ─── MOCK COMPONENTS ─── //
const TodoMock = ({ color }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Q1 Campaign Tasks</div>
        {[
            { text: "Write campaign brief", done: true },
            { text: "Design banner assets", done: true },
            { text: "Review copy with client", done: false },
            { text: "Schedule social posts", done: false },
            { text: "Launch and monitor week 1", done: false },
        ].map(({ text, done }, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", background: done ? `${color}08` : "var(--surface)", border: `1px solid ${done ? color + "20" : "var(--border)"}`, borderRadius: 9 }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: done ? color : "transparent", border: `2px solid ${done ? color : "var(--border2)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: done ? `0 0 8px ${color}50` : "none" }}>
                    {done && <Check size={10} color="#000" strokeWidth={3} />}
                </div>
                <span style={{ fontSize: 13, color: done ? "var(--text3)" : "var(--text)", textDecoration: done ? "line-through" : "none", flex: 1 }}>{text}</span>
                {!done && <div style={{ fontSize: 10, padding: "2px 7px", background: "var(--tag-bg)", color: "var(--tag-text)", borderRadius: 100, fontWeight: 600 }}>Due fri</div>}
            </div>
        ))}
        <div style={{ display: "flex", gap: 8, marginTop: 4, alignItems: "center" }}>
            <div style={{ flex: 1, height: 3, borderRadius: 2, background: "var(--border)", overflow: "hidden" }}>
                <div style={{ width: "40%", height: "100%", background: color, borderRadius: 2, boxShadow: `0 0 6px ${color}` }} />
            </div>
            <span style={{ fontSize: 11, color: "var(--text3)" }}>2 of 5 done</span>
        </div>
    </div>
);

const ChatMock = ({ color }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}># Brand Alpha — General</div>
        {[
            { from: "AK", text: "Hey team, new brief is uploaded in the files section 👆", time: "9:12am", mine: false },
            { from: "SM", text: "Saw it! Starting on the visuals now", time: "9:18am", mine: false },
            { from: "Me", text: "Copy will be ready by EOD today", time: "9:21am", mine: true },
            { from: "AK", text: "Perfect — let's aim for client review Thursday", time: "9:22am", mine: false },
        ].map(({ from, text, time, mine }, i) => (
            <div key={i} style={{ display: "flex", gap: 8, flexDirection: mine ? "row-reverse" : "row" }}>
                {!mine && (
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: `linear-gradient(135deg, ${color}, var(--accent2))`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                        {from}
                    </div>
                )}
                <div style={{ maxWidth: "75%" }}>
                    <div style={{ padding: "8px 12px", background: mine ? `${color}20` : "var(--surface)", border: `1px solid ${mine ? color + "30" : "var(--border)"}`, borderRadius: mine ? "12px 12px 4px 12px" : "12px 12px 12px 4px", fontSize: 12.5, color: "var(--text)", lineHeight: 1.5 }}>
                        {text}
                    </div>
                    <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 3, textAlign: mine ? "right" : "left" }}>{time}</div>
                </div>
            </div>
        ))}
        <div style={{ display: "flex", gap: 8, marginTop: 4, padding: "8px 12px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10 }}>
            <span style={{ fontSize: 12.5, color: "var(--text3)", flex: 1 }}>Message Brand Alpha…</span>
        </div>
    </div>
);

const BoardMock = ({ color }) => {
    const cols = [
        { label: "Backlog", dotColor: "var(--text3)", items: ["Research phase", "Brand audit"] },
        { label: "In Progress", dotColor: color, items: ["Campaign brief", "Visual assets"] },
        { label: "Review", dotColor: "#FFD166", items: ["Copy deck"] },
        { label: "Done", dotColor: "#00FFB3", items: ["Kickoff call"] },
    ];
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {cols.map(({ label, dotColor, items }) => (
                <div key={label}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: dotColor, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{label}</div>
                    {items.map((item, i) => (
                        <div key={i} style={{ padding: "8px 10px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11.5, color: "var(--text2)", marginBottom: 6, borderLeft: `2px solid ${dotColor}`, lineHeight: 1.4 }}>
                            {item}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

const FileMock = ({ color }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Brand Alpha / Q1 Assets</div>
        {[
            { name: "Campaign Brief v3.pdf", size: "240 KB", iconColor: "#FF4D8D" },
            { name: "Banner_1080x1080.png", size: "1.2 MB", iconColor: "#00C8FF" },
            { name: "Copy Deck Final.docx", size: "88 KB", iconColor: "#7B5EFF" },
            { name: "Brand Guidelines.pdf", size: "4.1 MB", iconColor: "#00FFB3" },
        ].map(({ name, size, iconColor }, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 9 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: `${iconColor}14`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <FileText size={15} color={iconColor} strokeWidth={1.8} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, color: "var(--text)", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</div>
                    <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 1 }}>{size}</div>
                </div>
                <ChevronRight size={13} color="var(--text3)" />
            </div>
        ))}
    </div>
);

const AIMock = ({ color }) => {
    const [active, setActive] = useState(0);
    const actions = ["Use this", "Adjust tone", "Make shorter", "Regenerate"];
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <div style={{ width: 26, height: 26, borderRadius: 8, background: `${color}18`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Sparkles size={13} color={color} strokeWidth={2} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>CampHQ AI</span>
                <span style={{ fontSize: 10, padding: "2px 8px", background: `${color}14`, color, borderRadius: 100, fontWeight: 600, border: `1px solid ${color}25` }}>Claude</span>
            </div>
            <div style={{ padding: "12px 14px", background: `${color}08`, border: `1px solid ${color}20`, borderRadius: 12, fontSize: 13, color: "var(--text2)", lineHeight: 1.7 }}>
                Here's a draft update email for <strong style={{ color: "var(--text)" }}>Brand Alpha</strong> in their professional tone:<br /><br />
                <em>"Hi [Client], here's your weekly update. Campaign assets are 40% complete — banner designs are in review, copy deck is finalized. On track for Thursday delivery."</em>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {actions.map((a, i) => (
                    <button key={a} onClick={() => setActive(i)} style={{ padding: "6px 12px", background: active === i ? `${color}14` : "var(--surface)", border: `1px solid ${active === i ? color + "40" : "var(--border2)"}`, borderRadius: 8, fontSize: 12, color: active === i ? color : "var(--text2)", cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>
                        {a}
                    </button>
                ))}
            </div>
            <div style={{ padding: "10px 12px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 9, fontSize: 12, color: "var(--text3)", display: "flex", alignItems: "center", gap: 8 }}>
                <TrendingUp size={13} color="#00FFB3" />
                3 tasks overdue in Brand Beta — want me to draft a follow-up?
            </div>
        </div>
    );
};

// ─── FEATURE DETAIL SECTION ─── //
const FeatureSection = ({ icon: Icon, title, sub, desc, bullets, color, mockup, flip, delay }) => {
    const [ref, visible] = useReveal();

    const textCol = (
        <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 46, height: 46, borderRadius: 13, background: `${color}16`, border: `1px solid ${color}28`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 16px ${color}30` }}>
                    <Icon size={22} color={color} strokeWidth={1.8} />
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.1em", padding: "3px 10px", background: `${color}12`, borderRadius: 100, border: `1px solid ${color}22` }}>
                    {sub}
                </div>
            </div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.5rem, 2.8vw, 2.1rem)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.15, marginBottom: 14, color: "var(--text)" }}>{title}</h3>
            <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.8, fontWeight: 300, marginBottom: 22 }}>{desc}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {bullets.map((b, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <Check size={14} color={color} strokeWidth={2.5} style={{ marginTop: 2, flexShrink: 0, filter: `drop-shadow(0 0 4px ${color}80)` }} />
                        <span style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6 }}>{b}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    const mockupCol = (
        <div style={{ background: "var(--card-bg)", border: `1px solid ${color}25`, borderRadius: 20, padding: 28, backdropFilter: "blur(16px)", minHeight: 280, boxShadow: `0 8px 40px rgba(0,0,0,0.2), 0 0 20px ${color}10`, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: `linear-gradient(90deg, transparent, ${color}, transparent)`, boxShadow: `0 0 8px ${color}` }} />
            {mockup}
        </div>
    );

    return (
        <div ref={ref} style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center",
            marginBottom: 88,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: `all 0.6s ease ${delay}ms`,
        }}>
            {flip ? mockupCol : textCol}
            {flip ? textCol : mockupCol}
        </div>
    );
};

// ─── MINI CARD ─── //
const MiniCard = ({ icon: Icon, title, desc, color, delay }) => {
    const [ref, visible] = useReveal();
    const [hov, setHov] = useState(false);
    return (
        <div ref={ref}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                background: "var(--card-bg)", border: `1px solid ${hov ? color + "40" : "var(--card-border)"}`,
                borderRadius: 18, padding: "22px 22px 20px", backdropFilter: "blur(16px)",
                opacity: visible ? 1 : 0, transform: visible ? (hov ? "translateY(-4px)" : "translateY(0)") : "translateY(20px)",
                transition: `all 0.4s cubic-bezier(0.34,1.2,0.64,1) ${delay}ms`,
                boxShadow: hov ? `0 12px 36px rgba(0,0,0,0.25), 0 0 16px ${color}12` : "none",
                position: "relative", overflow: "hidden",
            }}>
            {hov && <div style={{ position: "absolute", top: 0, left: "8%", right: "8%", height: 1, background: `linear-gradient(90deg, transparent, ${color}, transparent)`, boxShadow: `0 0 8px ${color}` }} />}
            <div style={{ width: 40, height: 40, borderRadius: 12, background: `${color}14`, border: `1px solid ${color}25`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, transition: "box-shadow 0.3s", boxShadow: hov ? `0 0 14px ${color}30` : "none" }}>
                <Icon size={19} color={color} strokeWidth={1.8} />
            </div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 8, color: "var(--text)" }}>{title}</div>
            <div style={{ fontSize: 13.5, color: "var(--text2)", lineHeight: 1.65, fontWeight: 300 }}>{desc}</div>
        </div>
    );
};

// ─── STAT MINI ──── //
const StatMini = ({ v, l, c }) => {
    const [ref, visible] = useReveal();
    return (
        <div ref={ref} style={{ background: "var(--bg2)", padding: "22px 16px", textAlign: "center", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "all 0.4s ease" }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--surface)"}
            onMouseLeave={e => e.currentTarget.style.background = "var(--bg2)"}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, color: c, filter: `drop-shadow(0 0 10px ${c}50)`, marginBottom: 4 }}>{v}</div>
            <div style={{ fontSize: 13, color: "var(--text2)", fontWeight: 300 }}>{l}</div>
        </div>
    );
};

// ─── MAIN PAGE ──── //
export default function FeaturesPage() {
    const { dark, css } = useTheme();
    const t = (d, l) => dark ? d : l;

    const mainFeatures = [
        {
            icon: CheckCircle2,
            title: "To-dos that actually work",
            sub: "Task management",
            color: t("#00FFB3", "#00a87a"),
            flip: false,
            desc: "Assign tasks to the right people, set real due dates, add subtasks, attach files. Everyone knows what they own and when it's due. AI flags what's falling behind before it becomes a crisis.",
            bullets: [
                "Subtasks and task dependencies",
                "Due dates with calendar sync",
                "Assign to one or multiple people",
                "@mentions for instant notification",
                "AI-powered priority scoring",
                "Mobile task management",
            ],
            mockup: <TodoMock color={t("#00FFB3", "#00a87a")} />,
        },
        {
            icon: MessageSquare,
            title: "Campfire — team chat that stays focused",
            sub: "Real-time chat",
            color: t("#FF4D8D", "#e8185e"),
            flip: true,
            desc: "Brand-specific chat rooms keep conversations in context. DMs for direct messages. Threads for longer discussions. Reactions, file sharing, and search built in. No noise, no distraction.",
            bullets: [
                "Brand-specific chat rooms",
                "Direct messages stay work-only",
                "Threaded replies to keep it clean",
                "File and image sharing in chat",
                "Full message history, always searchable",
                "Desktop and mobile push notifications",
            ],
            mockup: <ChatMock color={t("#FF4D8D", "#e8185e")} />,
        },
        {
            icon: Kanban,
            title: "Card Table — visual project boards",
            sub: "Kanban boards",
            color: t("#7B5EFF", "#5a3be8"),
            flip: false,
            desc: "Drag-and-drop cards across custom columns. Perfect for tracking content pipelines, design stages, hiring funnels, or any process that moves through defined stages.",
            bullets: [
                "Custom columns per workflow",
                "Drag-and-drop card movement",
                "Cards contain tasks, files, and notes",
                "Color labels for quick scanning",
                "Team members assigned per card",
                "Works on desktop and mobile",
            ],
            mockup: <BoardMock color={t("#7B5EFF", "#5a3be8")} />,
        },
        {
            icon: FolderOpen,
            title: "Docs, files & everything in one place",
            sub: "File management",
            color: t("#00C8FF", "#006cc8"),
            flip: true,
            desc: "Upload any file type. Organize by brand and project. Preview PDFs, images, and documents without downloading. Link Figma, Google Docs, or Airtable directly via Doors.",
            bullets: [
                "Upload any file type up to 5 GB",
                "Preview images, PDFs, video in browser",
                "Brand and project-level folders",
                "Version history so nothing is lost",
                "Link external tools via Doors",
                "500 GB storage on Plus, 5 TB on Pro",
            ],
            mockup: <FileMock color={t("#00C8FF", "#006cc8")} />,
        },
        {
            icon: Sparkles,
            title: "AI that actually helps, per brand",
            sub: "AI assistant",
            color: t("#FF4D8D", "#e8185e"),
            flip: false,
            desc: "Powered by Claude AI. Summarize long threads. Draft client emails in each brand's exact tone. Auto-assign tasks. Predict which deadlines are at risk. Respects your brand's voice, not a generic chatbot.",
            bullets: [
                "Thread summarization on demand",
                "Brand-aware email drafting",
                "Smart task assignment suggestions",
                "Deadline risk prediction",
                "Auto check-in question generation",
                "Context-aware per brand workspace",
            ],
            mockup: <AIMock color={t("#FF4D8D", "#e8185e")} />,
        },
    ];

    const additionalFeatures = [
        { icon: BarChart3, title: "Reports & check-ins", desc: "See what's overdue, who owns what, and what shipped. Automatic check-ins collect updates without meetings.", color: t("#FFD166", "#c87800") },
        { icon: Bell, title: "Hey! notifications", desc: "All pings in one focused menu. Separate urgent from noise. No more drowning in Slack-style notification floods.", color: t("#7B5EFF", "#5a3be8") },
        { icon: Calendar, title: "Schedule & milestones", desc: "Project timelines, event scheduling, and deadline visibility across all brands and projects in one calendar view.", color: t("#00FFB3", "#00a87a") },
        { icon: Users, title: "Client access portal", desc: "Invite clients into specific projects. Control exactly what they see. Keep all feedback organized and on the record.", color: t("#FF4D8D", "#e8185e") },
        { icon: Building2, title: "Brand workspaces", desc: "Each brand gets an isolated workspace. Switch in one click. Separate data, files, chat, and team per brand.", color: t("#00C8FF", "#006cc8") },
        { icon: Clock, title: "Timesheet (add-on)", desc: "Track hours spent on tasks, generate time reports, and export for client billing. Included in Pro, add-on for Plus.", color: t("#FFD166", "#c87800") },
        { icon: Globe, title: "Mobile app", desc: "Full-featured iOS and Android apps. Offline mode. Push notifications. Everything you can do on desktop, in your pocket.", color: t("#7B5EFF", "#5a3be8") },
        { icon: Link2, title: "Doors — integrations", desc: "Link Google Drive, Figma, Airtable, GitHub, and 30+ tools. Files appear inline. No copy-pasting between tools.", color: t("#00FFB3", "#00a87a") },
        { icon: Shield, title: "Security & compliance", desc: "2FA, SSO/SAML on Pro, end-to-end encryption, audit logs, and 99.9% uptime SLA. Your data is yours, always.", color: t("#FF4D8D", "#e8185e") },
        { icon: Search, title: "Universal search", desc: "Search across all projects, brands, files, and messages in one place. Find any decision, file, or task ever created.", color: t("#00C8FF", "#006cc8") },
        { icon: Settings, title: "Admin Pro Pack", desc: "Advanced permissions, project templates, team management, and org-wide visibility. Included in Pro, add-on for Plus.", color: t("#FFD166", "#c87800") },
        { icon: Mail, title: "Hey! — work email", desc: "CampHQ's email product for work. Imbox not inbox. Reply-later. Focus and paper trail. Available as an add-on.", color: t("#7B5EFF", "#5a3be8") },
    ];

    const quickStats = [
        { v: "10+", l: "Core tools", c: t("#7B5EFF", "#5a3be8") },
        { v: "∞", l: "Projects on Plus/Pro", c: t("#00FFB3", "#00a87a") },
        { v: "30+", l: "Integrations", c: t("#FF4D8D", "#e8185e") },
        { v: "iOS+Android", l: "Mobile apps", c: t("#00C8FF", "#006cc8") },
        { v: "CampHQ", l: "Powered by", c: t("#FFD166", "#c87800") },
    ];

    return (
        <div style={{ ...css, background: "var(--bg)", color: "var(--text)", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", transition: "background 0.4s, color 0.4s", overflowX: "hidden" }}>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
        @keyframes fadeUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes orbFloat { from{transform:translate(0,0)scale(1)} to{transform:translate(20px,14px)scale(1.05)} }
        *,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:var(--bg); }
        ::-webkit-scrollbar-thumb { background:var(--surface2); border-radius:2px; }
        ::-webkit-scrollbar-thumb:hover { background:var(--accent); }
        a { text-decoration:none; } button { font-family:inherit; }
        ::selection { background:var(--accent); color:#fff; }
      `}</style>

            {/* ── BG ── */}
            <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
                {dark && [...Array(35)].map((_, i) => (
                    <div key={i} style={{ position: "absolute", width: Math.random() * 2 + 1, height: Math.random() * 2 + 1, borderRadius: "50%", background: "#fff", opacity: Math.random() * 0.4 + 0.08, top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }} />
                ))}
                <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(123,94,255,0.16) 0%, transparent 65%)", top: "-12%", right: "-10%", animation: "orbFloat 13s ease-in-out infinite alternate", filter: "blur(70px)" }} />
                <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,255,179,0.1) 0%, transparent 65%)", bottom: "0%", left: "-8%", animation: "orbFloat 17s ease-in-out infinite alternate", animationDelay: "-6s", filter: "blur(80px)" }} />
                {dark && <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(123,94,255,0.012) 2px, rgba(123,94,255,0.012) 4px)" }} />}
            </div>

            <Navbar />

            {/* ── HERO ── */}
            <section style={{ position: "relative", zIndex: 1, padding: "88px 5% 72px", textAlign: "center" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`, backgroundSize: "56px 56px", maskImage: "radial-gradient(ellipse 70% 55% at 50% 40%, black 20%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 70% 55% at 50% 40%, black 20%, transparent 100%)", pointerEvents: "none" }} />
                <div style={{ position: "relative", zIndex: 2, maxWidth: 720, margin: "0 auto" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 16px", background: "var(--tag-bg)", border: "1px solid var(--border2)", borderRadius: 100, fontSize: 12, color: "var(--tag-text)", fontWeight: 600, marginBottom: 24, animation: "fadeUp 0.5s ease both", boxShadow: "0 0 14px var(--glow)" }}>
                        <Zap size={12} color="var(--accent)" />
                        Everything your team needs, nothing they don't
                    </div>
                    <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.6rem, 6.5vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.07, marginBottom: 20, animation: "fadeUp 0.5s 0.1s ease both", animationFillMode: "both" }}>
                        Every feature.<br /><GradText>One honest price.</GradText>
                    </h1>
                    <p style={{ fontSize: "clamp(1rem, 1.8vw, 1.12rem)", color: "var(--text2)", maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.8, fontWeight: 300, animation: "fadeUp 0.5s 0.2s ease both", animationFillMode: "both" }}>
                        No feature tiers. No paywalled tools. Every plan includes every core feature. Pay more only for more storage, more users, or the fixed Pro Unlimited price.
                    </p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap", animation: "fadeUp 0.5s 0.3s ease both", animationFillMode: "both" }}>
                        <a href="/signup" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 26px", background: "linear-gradient(135deg, var(--accent), var(--accent2))", color: "#fff", borderRadius: 12, fontSize: 15, fontWeight: 600, boxShadow: "0 8px 28px var(--glow)", transition: "all 0.25s" }}
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 14px 40px var(--glow)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 28px var(--glow)"; }}>
                            Try all features free <ArrowRight size={15} strokeWidth={2.5} />
                        </a>
                        <a href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 26px", background: "var(--surface)", color: "var(--text2)", border: "1px solid var(--border2)", borderRadius: 12, fontSize: 15, fontWeight: 500, transition: "all 0.25s" }}
                            onMouseEnter={e => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                            onMouseLeave={e => { e.currentTarget.style.color = "var(--text2)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                            See pricing
                        </a>
                    </div>
                </div>
            </section>

            {/* ── QUICK STAT BAR ── */}
            <div style={{ position: "relative", zIndex: 1, margin: "0 5%", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", border: "1px solid var(--border2)", borderRadius: 20, overflow: "hidden", gap: 1, background: "var(--border2)" }}>
                {quickStats.map((s, i) => <StatMini key={i} {...s} />)}
            </div>

            {/* ── MAIN FEATURE SECTIONS ── */}
            <section style={{ position: "relative", zIndex: 1, padding: "96px 5% 16px" }}>
                <div style={{ maxWidth: 1000, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 64 }}>
                        <SectionLabel text="Core features" />
                        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: 12 }}>
                            The tools that make<br /><GradText>teams click.</GradText>
                        </h2>
                        <p style={{ fontSize: 16, color: "var(--text2)", fontWeight: 300 }}>A closer look at what teams use every single day.</p>
                    </div>
                    {mainFeatures.map((f, i) => (
                        <FeatureSection key={i} {...f} delay={0} />
                    ))}
                </div>
            </section>

            {/* ── ADDITIONAL FEATURES GRID ── */}
            <section style={{ position: "relative", zIndex: 1, padding: "72px 5%", background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
                <div style={{ textAlign: "center", marginBottom: 48 }}>
                    <SectionLabel text="Everything else" />
                    <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: 10 }}>
                        And there's <GradText>so much more</GradText>
                    </h2>
                    <p style={{ fontSize: 15, color: "var(--text2)", fontWeight: 300 }}>Every feature ships with every plan. No exceptions.</p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16, maxWidth: 1100, margin: "0 auto" }}>
                    {additionalFeatures.map((f, i) => (
                        <MiniCard key={i} {...f} delay={i * 45} />
                    ))}
                </div>
            </section>

            {/* ── FINAL CTA ── */}
            <section style={{ position: "relative", zIndex: 1, padding: "80px 5%", textAlign: "center" }}>
                <div style={{ maxWidth: 620, margin: "0 auto", background: "var(--card-bg)", border: "1px solid var(--border2)", borderRadius: 28, padding: "52px 40px", backdropFilter: "blur(20px)", position: "relative", overflow: "hidden", boxShadow: "0 0 80px var(--glow), 0 0 30px var(--glow2)" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, var(--accent), var(--accent3), transparent)", boxShadow: "0 0 10px var(--glow)" }} />
                    <SectionLabel text="Ready to see it live?" />
                    <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: 14 }}>
                        Every feature. <GradText>Free to try.</GradText>
                    </h2>
                    <p style={{ fontSize: 15.5, color: "var(--text2)", marginBottom: 36, fontWeight: 300, lineHeight: 1.75 }}>
                        The Free plan gives you all core tools with no time limit. Upgrade when you need more.
                    </p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <a href="/signup" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", background: "linear-gradient(135deg, var(--accent), var(--accent2))", color: "#fff", borderRadius: 12, fontSize: 15, fontWeight: 600, boxShadow: "0 6px 24px var(--glow)", transition: "all 0.25s" }}
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 36px var(--glow)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px var(--glow)"; }}>
                            Start free — no card needed <ArrowRight size={15} />
                        </a>
                        <a href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", background: "var(--surface)", color: "var(--text2)", border: "1px solid var(--border2)", borderRadius: 12, fontSize: 15, fontWeight: 500, transition: "all 0.2s" }}
                            onMouseEnter={e => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                            onMouseLeave={e => { e.currentTarget.style.color = "var(--text2)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                            Compare plans
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}