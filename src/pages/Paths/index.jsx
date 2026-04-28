import { useState } from "react";
import {
    ArrowRight, Check, ChevronDown, ChevronRight,
    Building2, Layers, Users, Briefcase, Megaphone,
    Code2, Palette, ShoppingBag, Globe, GraduationCap,
    Heart, Zap, Shield, BarChart3, MessageSquare,
    FolderOpen, Kanban, Bell, Sparkles, Star,
    CheckCircle2, Clock, TrendingUp, Lock,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useReveal } from "../../hooks/useReveal";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// ─── HELPERS ──────────────────────────────────────────────────────────────────
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

// ─── PATH CARD (main expandable) ─────────────────────────────────────────────
const PathCard = ({ icon: Icon, title, subtitle, desc, color, features, quote, quoteName, quoteRole, steps, delay }) => {
    const [ref, visible] = useReveal();
    const [open, setOpen] = useState(false);
    const [hov, setHov] = useState(false);

    return (
        <div ref={ref} style={{
            border: `1px solid ${open ? color + "50" : hov ? "var(--border2)" : "var(--card-border)"}`,
            borderRadius: 22, overflow: "hidden", backdropFilter: "blur(16px)",
            background: open ? `${color}08` : "var(--card-bg)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, border-color 0.25s, background 0.3s, box-shadow 0.3s`,
            boxShadow: open
                ? `0 0 0 1px ${color}30, 0 24px 70px ${color}14, 0 8px 30px rgba(0,0,0,0.3)`
                : hov ? "0 8px 32px rgba(0,0,0,0.25)" : "0 2px 16px rgba(0,0,0,0.15)",
        }}>

            {/* header — always visible */}
            <div
                onClick={() => setOpen(o => !o)}
                onMouseEnter={() => setHov(true)}
                onMouseLeave={() => setHov(false)}
                style={{ padding: "26px 28px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 18 }}>

                {/* icon */}
                <div style={{ width: 52, height: 52, borderRadius: 15, background: `${color}16`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: open ? `0 0 20px ${color}40` : "none", transition: "box-shadow 0.3s" }}>
                    <Icon size={24} color={color} strokeWidth={1.8} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: "var(--text)", letterSpacing: "-0.02em" }}>{title}</div>
                        <div style={{ fontSize: 11, padding: "3px 9px", background: `${color}14`, color, borderRadius: 100, fontWeight: 700, border: `1px solid ${color}25`, whiteSpace: "nowrap" }}>
                            {subtitle}
                        </div>
                    </div>
                    <div style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, fontWeight: 300 }}>{desc}</div>
                </div>

                {/* chevron */}
                <div style={{ width: 32, height: 32, borderRadius: 9, background: open ? `${color}18` : "var(--surface2)", border: `1px solid ${open ? color + "30" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.25s" }}>
                    <ChevronDown size={16} color={open ? color : "var(--text3)"} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.3s" }} />
                </div>
            </div>

            {/* expanded content */}
            <div style={{ maxHeight: open ? 1000 : 0, overflow: "hidden", transition: "max-height 0.5s cubic-bezier(0.4,0,0.2,1)" }}>
                <div style={{ padding: "0 28px 28px", borderTop: `1px solid ${color}20` }}>

                    {/* how it helps grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 24 }}>

                        {/* features list */}
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>How CampHQ helps</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                {features.map((f, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                                        <div style={{ marginTop: 1, flexShrink: 0 }}>
                                            <Check size={14} color={color} strokeWidth={2.5} style={{ filter: `drop-shadow(0 0 4px ${color}80)` }} />
                                        </div>
                                        <span style={{ fontSize: 13.5, color: "var(--text2)", lineHeight: 1.6 }}>{f}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* steps */}
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>Getting started</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                                {steps.map((s, i) => (
                                    <div key={i} style={{ display: "flex", gap: 12, paddingBottom: 12 }}>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                                            <div style={{ width: 22, height: 22, borderRadius: "50%", background: `${color}16`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color, flexShrink: 0 }}>{i + 1}</div>
                                            {i < steps.length - 1 && <div style={{ width: 1, flex: 1, background: `${color}25`, minHeight: 12, marginTop: 3 }} />}
                                        </div>
                                        <div style={{ paddingTop: 2, paddingBottom: 4 }}>
                                            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>{s.title}</div>
                                            <div style={{ fontSize: 12.5, color: "var(--text3)", lineHeight: 1.6 }}>{s.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* quote */}
                    <div style={{ marginTop: 22, padding: "18px 20px", background: `${color}08`, border: `1px solid ${color}18`, borderRadius: 14 }}>
                        <p style={{ fontSize: 14, fontStyle: "italic", color: "var(--text2)", lineHeight: 1.75, marginBottom: 12 }}>"{quote}"</p>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 30, height: 30, borderRadius: "50%", background: `linear-gradient(135deg, ${color}, var(--accent2))`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                                {quoteName[0]}
                            </div>
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{quoteName}</div>
                                <div style={{ fontSize: 11.5, color: "var(--text3)" }}>{quoteRole}</div>
                            </div>
                            <div style={{ marginLeft: "auto", display: "flex", gap: 2 }}>
                                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="var(--accent4)" color="var(--accent4)" />)}
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
                        <a href="/signup" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "11px 22px", background: `linear-gradient(135deg, ${color}, var(--accent2))`, color: "#fff", borderRadius: 10, fontSize: 14, fontWeight: 600, transition: "all 0.2s", boxShadow: `0 4px 18px ${color}40` }}
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = `0 8px 28px ${color}50`; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 4px 18px ${color}40`; }}>
                            Start free <ArrowRight size={14} strokeWidth={2.5} />
                        </a>
                        <a href="/features" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "11px 20px", background: "var(--surface)", color: "var(--text2)", border: "1px solid var(--border2)", borderRadius: 10, fontSize: 14, fontWeight: 500, transition: "all 0.2s" }}
                            onMouseEnter={e => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.borderColor = color; }}
                            onMouseLeave={e => { e.currentTarget.style.color = "var(--text2)"; e.currentTarget.style.borderColor = "var(--border2)"; }}>
                            See all features <ChevronRight size={14} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── COMPARE ROW ──────────────────────────────────────────────────────────────
const CompareRow = ({ label, values, delay }) => {
    const [ref, visible] = useReveal();
    return (
        <tr ref={ref} style={{ opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${delay}ms` }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--surface)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <td style={{ padding: "13px 20px", fontSize: 13.5, color: "var(--text2)", borderBottom: "1px solid var(--border)" }}>{label}</td>
            {values.map((v, i) => (
                <td key={i} style={{ padding: "13px 20px", textAlign: "center", borderBottom: "1px solid var(--border)", fontSize: 13, color: "var(--text2)" }}>
                    {v === true ? <Check size={15} color="var(--accent3)" strokeWidth={2.5} style={{ margin: "0 auto", display: "block", filter: "drop-shadow(0 0 4px rgba(0,255,179,0.5))" }} />
                        : v === false ? <span style={{ color: "var(--text3)", fontSize: 18, lineHeight: 1 }}>–</span>
                            : <span style={{ fontWeight: 500 }}>{v}</span>}
                </td>
            ))}
        </tr>
    );
};

// ─── FEATURE MINI CARD ────────────────────────────────────────────────────────
const MiniFeature = ({ icon: Icon, label, color }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 11, fontSize: 13, color: "var(--text2)" }}>
        <Icon size={15} color={color} strokeWidth={2} style={{ flexShrink: 0 }} />
        {label}
    </div>
);

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function PathsPage() {
    const { dark, css } = useTheme();
    const [activeFilter, setActiveFilter] = useState("all");
    const t = (d, l) => dark ? d : l;

    const filters = [
        { id: "all", label: "All paths" },
        { id: "agency", label: "Agencies" },
        { id: "brand", label: "Multi-brand" },
        { id: "remote", label: "Remote teams" },
        { id: "creative", label: "Creative teams" },
        { id: "service", label: "Client service" },
    ];

    const paths = [
        {
            id: "agency",
            icon: Briefcase,
            title: "Marketing & Creative Agencies",
            subtitle: "For agencies",
            desc: "Juggling dozens of clients, campaigns, and creatives? CampHQ gives every client their own workspace while keeping your whole agency visible in one place.",
            color: t("#7B5EFF", "#5a3be8"),
            features: [
                "Separate client workspaces — no data crossover",
                "Client portal so clients see only what you want",
                "Campaign-level projects with milestones",
                "Brief → Concept → Revisions → Delivery workflow",
                "File versioning so old drafts never get approved",
                "AI drafts client update emails in their brand's tone",
                "Time tracking per client for accurate billing",
                "End-of-month reports per client, exportable",
            ],
            steps: [
                { title: "Create your agency account", desc: "Sign up and set up your agency as the parent company." },
                { title: "Add each client as a brand", desc: "One workspace per client — isolated, clean, professional." },
                { title: "Invite your team & the client", desc: "Team members see everything; clients see only their brand." },
                { title: "Run campaigns like clockwork", desc: "Projects, to-dos, files, approvals — all in one place." },
            ],
            quote: "We cut our client onboarding time in half. Every new client gets their own workspace, their own files, their own chat. No confusion, no crossed wires.",
            quoteName: "Ahsan K.",
            quoteRole: "Managing Director, LaunchCo Agency",
        },
        {
            id: "brand",
            icon: Building2,
            title: "Multi-Brand Companies",
            subtitle: "For brand portfolios",
            desc: "Running 5, 10, or 20 brands under one company? CampHQ was literally built for this. Brand workspaces keep everything organized without creating silos.",
            color: t("#FF4D8D", "#e8185e"),
            features: [
                "20+ brand workspaces under one company account",
                "Team members assigned to specific brands only",
                "Brand-specific email routing and notifications",
                "Each brand gets its own projects, files, and chat",
                "Company-wide admin view across all brands",
                "AI assistant respects each brand's voice and tone",
                "Cross-brand reporting for leadership",
                "Audit log so you know who changed what, when",
            ],
            steps: [
                { title: "Set up your company", desc: "One account for your entire organization." },
                { title: "Create brand workspaces", desc: "Add as many brands as you need — no extra charge." },
                { title: "Assign team by brand", desc: "Each person works in the brands they handle." },
                { title: "See the full picture", desc: "Admin dashboard shows health across every brand." },
            ],
            quote: "Before CampHQ, managing 12 brands meant 12 Slack workspaces and 12 Asana boards. Now it's all in one place and everyone knows exactly where to go.",
            quoteName: "Sara M.",
            quoteRole: "Head of Operations, BrandHouse PK",
        },
        {
            id: "remote",
            icon: Globe,
            title: "Remote & Distributed Teams",
            subtitle: "For remote teams",
            desc: "Working across time zones? CampHQ is built async-first. Decisions happen in writing. Nobody needs to be online at the same time for things to move forward.",
            color: t("#00FFB3", "#00a87a"),
            features: [
                "Message boards for async announcements & decisions",
                "Automatic check-ins replace status meetings",
                "Campfire chat for real-time when needed",
                "Notifications routed to your preferred timezone",
                "Full activity feed so nobody misses anything",
                "Mobile app — work from anywhere",
                "Hey! notifications separate urgent from noise",
                "Everything searchable — find decisions made months ago",
            ],
            steps: [
                { title: "Invite your distributed team", desc: "No location requirements — CampHQ works everywhere." },
                { title: "Move decisions to message boards", desc: "Write it down once, everyone reads it when ready." },
                { title: "Set up check-ins", desc: "Automatic daily/weekly questions replace status meetings." },
                { title: "Ship calmly", desc: "Less noise, more deep work, better outcomes." },
            ],
            quote: "Our team is spread across 6 countries. CampHQ is the first tool that actually works for us — not just for teams in the same timezone.",
            quoteName: "Rick R.",
            quoteRole: "Engineering Lead, iCONN Systems",
        },
        {
            id: "creative",
            icon: Palette,
            title: "Design & Creative Studios",
            subtitle: "For creatives",
            desc: "Creative work needs structure without rigidity. CampHQ gives designers and studios the right amount of process — enough to ship, not so much that it kills creativity.",
            color: t("#00C8FF", "#006cc8"),
            features: [
                "Project briefs as docs attached directly to projects",
                "File sharing with preview for design assets",
                "Revision rounds tracked in one thread per design",
                "Client approval workflow built in",
                "Card table (Kanban) for design pipeline stages",
                "Schedule view for deadline visualization",
                "Link Figma, InVision, Adobe files directly",
                "Version history so you never lose the 'old logo'",
            ],
            steps: [
                { title: "Create a project per engagement", desc: "Brief, assets, feedback, and delivery all in one place." },
                { title: "Share files with preview", desc: "Clients see and comment on files without downloading." },
                { title: "Track revisions clearly", desc: "Each round of feedback stays attached to that round." },
                { title: "Deliver with confidence", desc: "Final approval is on record before you archive the project." },
            ],
            quote: "We used to lose feedback in email threads. Now every revision round is in CampHQ, attached to the file. Clients love it and we haven't sent an email attachment in months.",
            quoteName: "Kim C.",
            quoteRole: "Creative Director, Kim Curry Design",
        },
        {
            id: "service",
            icon: Users,
            title: "Service Businesses & Consultants",
            subtitle: "For service businesses",
            desc: "Running a consultancy, law firm, or professional services firm? CampHQ structures client engagements so nothing falls through the cracks and clients always know what's happening.",
            color: t("#FFD166", "#c87800"),
            features: [
                "One project per client engagement",
                "Deliverable tracking with due dates and owners",
                "Client-visible and internal-only sections",
                "Automatic weekly progress summaries",
                "Document storage per engagement",
                "Billing-ready time tracking add-on",
                "Knowledge base inside each project",
                "Handover docs so nothing is lost when people leave",
            ],
            steps: [
                { title: "Create an engagement project", desc: "Set scope, deliverables, milestones upfront." },
                { title: "Invite your client selectively", desc: "They see status and deliverables — not your internal notes." },
                { title: "Track every deliverable", desc: "Owners, due dates, and status visible to everyone." },
                { title: "Close and archive cleanly", desc: "Everything documented. Client gets a final summary." },
            ],
            quote: "My consultancy went from chaotic email threads to clean client portals. Clients comment less on things that aren't ready and more on things that are. Night and day.",
            quoteName: "Raza J.",
            quoteRole: "Strategy Consultant, DigitalStack",
        },
        {
            id: "agency",
            icon: ShoppingBag,
            title: "Ecommerce & Retail Brands",
            subtitle: "For retail teams",
            desc: "Product launches, seasonal campaigns, supplier coordination — ecommerce teams have a lot moving at once. CampHQ keeps every launch on track and every team informed.",
            color: t("#FF4D8D", "#e8185e"),
            features: [
                "Product launch project templates",
                "Supplier coordination in dedicated projects",
                "Campaign calendar across all channels",
                "Creative brief → Asset production → Go-live workflow",
                "Inventory and ops coordination via card tables",
                "Agency and freelancer access per project",
                "Post-launch retro docs attached to each campaign",
                "AI drafts campaign briefs and update emails",
            ],
            steps: [
                { title: "Create a launch project", desc: "Timeline, team, assets, and brief in one project." },
                { title: "Coordinate across teams", desc: "Marketing, ops, and suppliers all see what they need." },
                { title: "Track the campaign live", desc: "Card table shows where every asset is in production." },
                { title: "Debrief and improve", desc: "Post-mortems attached to the project. Learn every time." },
            ],
            quote: "Our Q4 launch involved 4 agencies, 2 internal teams, and 6 freelancers. CampHQ was the only reason it didn't fall apart. Every single deliverable was tracked.",
            quoteName: "Zara M.",
            quoteRole: "Marketing Director, RetailHub",
        },
        {
            id: "service",
            icon: GraduationCap,
            title: "Education & Training Organizations",
            subtitle: "For educators",
            desc: "Curriculum development, course delivery, student coordination — education organizations use CampHQ to run structured programs without the chaos of group emails.",
            color: t("#7B5EFF", "#5a3be8"),
            features: [
                "Cohort projects for each class or program",
                "Curriculum docs and resources in one place",
                "Assignment tracking with due dates",
                "Instructor-only and student-visible sections",
                "Message boards for course announcements",
                "Schedule view for semester planning",
                "Feedback threads attached to each submission",
                "Archive programs cleanly for future reference",
            ],
            steps: [
                { title: "Create a cohort project", desc: "One project per course or program intake." },
                { title: "Share resources and curriculum", desc: "Students access only what's relevant to them." },
                { title: "Track progress per student", desc: "Assignments, submissions, and feedback in one place." },
                { title: "Wrap up and archive", desc: "Entire program preserved for reference or reuse." },
            ],
            quote: "Running three certification programs across two cities used to mean three Google Drives and constant WhatsApp confusion. CampHQ changed everything.",
            quoteName: "Ryan S.",
            quoteRole: "Program Director, EduTrack",
        },
        {
            id: "remote",
            icon: Code2,
            title: "Software & Tech Teams",
            subtitle: "For tech teams",
            desc: "CampHQ isn't a Jira replacement — it's what you use alongside your dev tools for everything that isn't a ticket. Roadmaps, stakeholder comms, cross-team coordination.",
            color: t("#00FFB3", "#00a87a"),
            features: [
                "Product roadmap projects with milestones",
                "Stakeholder updates via message boards",
                "Design-dev-QA handoffs in one project",
                "Launch checklist as a to-do list",
                "Postmortem docs attached to projects",
                "API integrations with Jira, GitHub, Slack",
                "Automated check-ins replace daily standups",
                "AI summarizes long discussion threads",
            ],
            steps: [
                { title: "Create your product workspace", desc: "Roadmap, releases, and team comms all in one brand." },
                { title: "Link your dev tools", desc: "Connect GitHub, Jira, or Slack via Doors integrations." },
                { title: "Run launches from CampHQ", desc: "Checklist, stakeholder updates, go/no-go in one place." },
                { title: "Debrief every sprint", desc: "Postmortems and retros documented and searchable forever." },
            ],
            quote: "We use Jira for tickets. We use CampHQ for everything else. It's how our PMs, designers, and stakeholders stay in sync without drowning the devs in Slack.",
            quoteName: "AL",
            quoteName: "Andrea L.",
            quoteRole: "Head of Product, TechCorp",
        },
    ];

    const filteredPaths = activeFilter === "all" ? paths : paths.filter(p => p.id === activeFilter);

    const universalFeatures = [
        { icon: Kanban, label: "Card table", color: t("#7B5EFF", "#5a3be8") },
        { icon: CheckCircle2, label: "To-do lists", color: t("#00FFB3", "#00a87a") },
        { icon: MessageSquare, label: "Campfire chat", color: t("#FF4D8D", "#e8185e") },
        { icon: FolderOpen, label: "Docs & files", color: t("#00C8FF", "#006cc8") },
        { icon: BarChart3, label: "Reports", color: t("#FFD166", "#c87800") },
        { icon: Bell, label: "Hey! notifications", color: t("#7B5EFF", "#5a3be8") },
        { icon: Sparkles, label: "AI assistant", color: t("#FF4D8D", "#e8185e") },
        { icon: Clock, label: "Scheduling", color: t("#00FFB3", "#00a87a") },
        { icon: Shield, label: "2FA & security", color: t("#00C8FF", "#006cc8") },
        { icon: TrendingUp, label: "Analytics", color: t("#FFD166", "#c87800") },
        { icon: Globe, label: "Mobile app", color: t("#7B5EFF", "#5a3be8") },
        { icon: Lock, label: "Client portal", color: t("#FF4D8D", "#e8185e") },
    ];

    return (
        <div style={{ ...css, background: "var(--bg)", color: "var(--text)", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", transition: "background 0.4s, color 0.4s", overflowX: "hidden" }}>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
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
                <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(123,94,255,0.16) 0%, transparent 65%)", top: "-12%", right: "-10%", animation: "orbFloat 13s ease-in-out infinite alternate", filter: "blur(70px)" }} />
                <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,255,179,0.1) 0%, transparent 65%)", bottom: "0%", left: "-8%", animation: "orbFloat 16s ease-in-out infinite alternate", animationDelay: "-6s", filter: "blur(80px)" }} />
                <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,77,141,0.08) 0%, transparent 65%)", top: "40%", left: "35%", animation: "orbFloat 20s ease-in-out infinite alternate", animationDelay: "-10s", filter: "blur(80px)" }} />
                {dark && <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(123,94,255,0.012) 2px, rgba(123,94,255,0.012) 4px)" }} />}
            </div>

            <Navbar />

            {/* ── HERO ── */}
            <section style={{ position: "relative", zIndex: 1, padding: "88px 5% 72px", textAlign: "center" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`, backgroundSize: "56px 56px", maskImage: "radial-gradient(ellipse 70% 55% at 50% 40%, black 20%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 70% 55% at 50% 40%, black 20%, transparent 100%)", pointerEvents: "none" }} />

                <div style={{ position: "relative", zIndex: 2, maxWidth: 720, margin: "0 auto" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 16px", background: "var(--tag-bg)", border: "1px solid var(--border2)", borderRadius: 100, fontSize: 12, color: "var(--tag-text)", fontWeight: 600, marginBottom: 24, animation: "fadeUp 0.5s ease both", boxShadow: "0 0 14px var(--glow)" }}>
                        <Zap size={12} color="var(--accent)" />
                        8 use case guides · Click any path to expand
                    </div>

                    <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.6rem, 6.5vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.07, marginBottom: 20, animation: "fadeUp 0.5s 0.1s ease both", animationFillMode: "both" }}>
                        Find your path<br />
                        <GradText>to better work.</GradText>
                    </h1>

                    <p style={{ fontSize: "clamp(1rem, 1.8vw, 1.12rem)", color: "var(--text2)", maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.8, fontWeight: 300, animation: "fadeUp 0.5s 0.2s ease both", animationFillMode: "both" }}>
                        CampHQ works for teams of every shape. Pick the path that matches how your team works — we'll show you exactly how to get the most out of it.
                    </p>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap", animation: "fadeUp 0.5s 0.3s ease both", animationFillMode: "both" }}>
                        <a href="/signup" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 26px", background: "linear-gradient(135deg, var(--accent), var(--accent2))", color: "#fff", borderRadius: 12, fontSize: 15, fontWeight: 600, boxShadow: "0 8px 28px var(--glow)", transition: "all 0.25s" }}
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 14px 40px var(--glow)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 28px var(--glow)"; }}>
                            Try free for 30 days <ArrowRight size={15} strokeWidth={2.5} />
                        </a>
                        <a href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 26px", background: "var(--surface)", color: "var(--text2)", border: "1px solid var(--border2)", borderRadius: 12, fontSize: 15, fontWeight: 500, transition: "all 0.25s" }}
                            onMouseEnter={e => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                            onMouseLeave={e => { e.currentTarget.style.color = "var(--text2)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                            See pricing
                        </a>
                    </div>
                </div>
            </section>

            {/* ── FILTER TABS ── */}
            <div style={{ position: "sticky", top: 64, zIndex: 90, background: "var(--nav-bg)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)", padding: "12px 5%", display: "flex", gap: 8, overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
                {filters.map(({ id, label }) => (
                    <button key={id} onClick={() => setActiveFilter(id)} style={{
                        padding: "8px 18px", borderRadius: 100, fontSize: 13.5, fontWeight: activeFilter === id ? 600 : 400, cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap", fontFamily: "inherit",
                        background: activeFilter === id ? "linear-gradient(135deg, var(--accent), var(--accent2))" : "var(--surface)",
                        color: activeFilter === id ? "#fff" : "var(--text2)",
                        border: activeFilter === id ? "none" : "1px solid var(--border2)",
                        boxShadow: activeFilter === id ? "0 4px 16px var(--glow)" : "none",
                    }}>
                        {label}
                    </button>
                ))}
            </div>

            {/* ── PATH CARDS ── */}
            <section style={{ position: "relative", zIndex: 1, padding: "56px 5%" }}>
                <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
                    {filteredPaths.map((path, i) => (
                        <PathCard key={`${path.title}-${i}`} {...path} delay={i * 60} />
                    ))}
                </div>
            </section>

            {/* ── UNIVERSAL FEATURES ── */}
            <section style={{ position: "relative", zIndex: 1, padding: "72px 5%", background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
                <div style={{ maxWidth: 900, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 40 }}>
                        <SectionLabel text="Every path includes" />
                        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: 10 }}>
                            The full toolkit, <GradText>no matter your path</GradText>
                        </h2>
                        <p style={{ fontSize: 15, color: "var(--text2)", fontWeight: 300 }}>Every CampHQ plan comes with every core feature — no feature-gating by team type.</p>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(175px, 1fr))", gap: 10 }}>
                        {universalFeatures.map((f, i) => {
                            const [ref, visible] = useReveal();
                            return (
                                <div ref={ref} key={i} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)", transition: `all 0.4s ease ${i * 40}ms` }}>
                                    <MiniFeature {...f} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── NOT SURE SECTION ── */}
            <section style={{ position: "relative", zIndex: 1, padding: "80px 5%" }}>
                <div style={{ maxWidth: 860, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
                    {(() => {
                        const [ref, visible] = useReveal(); return (
                            <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-20px)", transition: "all 0.6s ease" }}>
                                <SectionLabel text="Not sure?" />
                                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.2, marginBottom: 16 }}>
                                    Start free.<br /><GradText>Figure it out as you go.</GradText>
                                </h2>
                                <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.8, fontWeight: 300, marginBottom: 20 }}>
                                    The best way to know if CampHQ is right for you is to use it. Our free plan gives you access to all core tools with no time limit. No credit card. No pressure.
                                </p>
                                <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.8, fontWeight: 300, marginBottom: 28 }}>
                                    Or book a live walkthrough with our team — we'll show you exactly how teams like yours use CampHQ every day.
                                </p>
                                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                                    <a href="/signup" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "12px 24px", background: "linear-gradient(135deg, var(--accent), var(--accent2))", color: "#fff", borderRadius: 11, fontSize: 14.5, fontWeight: 600, boxShadow: "0 6px 22px var(--glow)", transition: "all 0.2s" }}
                                        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
                                        Start free <ArrowRight size={14} />
                                    </a>
                                    <a href="/classes" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "12px 22px", background: "var(--surface)", color: "var(--text2)", border: "1px solid var(--border2)", borderRadius: 11, fontSize: 14.5, fontWeight: 500, transition: "all 0.2s" }}
                                        onMouseEnter={e => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.color = "var(--text2)"; e.currentTarget.style.borderColor = "var(--border2)"; }}>
                                        Book a walkthrough
                                    </a>
                                </div>
                            </div>
                        );
                    })()}

                    {/* quick compare */}
                    {(() => {
                        const [ref, visible] = useReveal(); return (
                            <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(20px)", transition: "all 0.6s ease 0.1s" }}>
                                <div style={{ background: "var(--card-bg)", border: "1px solid var(--border2)", borderRadius: 20, overflow: "hidden", backdropFilter: "blur(16px)", boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}>
                                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                        <thead>
                                            <tr style={{ background: "var(--surface2)" }}>
                                                <td style={{ padding: "14px 18px", fontSize: 12, fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid var(--border2)" }}>Good fit if you…</td>
                                                {["Yes", "No"].map((h, i) => (
                                                    <td key={i} style={{ padding: "14px 16px", textAlign: "center", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: i === 0 ? "var(--accent3)" : "var(--accent2)", borderBottom: "1px solid var(--border2)" }}>{h}</td>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                ["Have more than one project or client", true, false],
                                                ["Need clients to review work", true, false],
                                                ["Want to replace multiple tools", true, false],
                                                ["Need engineering ticket tracking (Jira)", false, true],
                                                ["Run more than 1 brand", true, false],
                                                ["Want async-first communication", true, false],
                                                ["Need real-time collaborative editing", false, true],
                                                ["Want a fixed monthly price for everyone", true, false],
                                            ].map(([label, yes, no], i) => (
                                                <CompareRow key={i} label={label} values={[yes, no]} delay={i * 40} />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        );
                    })()}
                </div>
            </section>

            {/* ── CTA ── */}
            <section style={{ position: "relative", zIndex: 1, padding: "80px 5%", textAlign: "center" }}>
                <div style={{ maxWidth: 620, margin: "0 auto", background: "var(--card-bg)", border: "1px solid var(--border2)", borderRadius: 28, padding: "56px 44px", backdropFilter: "blur(20px)", position: "relative", overflow: "hidden", boxShadow: "0 0 80px var(--glow), 0 0 30px var(--glow2)" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, var(--accent), var(--accent3), transparent)", boxShadow: "0 0 10px var(--glow)" }} />
                    <SectionLabel text="Ready?" />
                    <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: 14 }}>
                        Your path starts <GradText>right here.</GradText>
                    </h2>
                    <p style={{ fontSize: 15.5, color: "var(--text2)", marginBottom: 32, fontWeight: 300, lineHeight: 1.75 }}>
                        Free forever on the Free plan. 30-day trial on Plus. 60-day trial on Pro Unlimited. No card needed.
                    </p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <a href="/signup" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", background: "linear-gradient(135deg, var(--accent), var(--accent2))", color: "#fff", borderRadius: 12, fontSize: 15, fontWeight: 600, boxShadow: "0 6px 24px var(--glow)", transition: "all 0.25s" }}
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 36px var(--glow)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px var(--glow)"; }}>
                            Get started free <ArrowRight size={15} />
                        </a>
                        <a href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", background: "var(--surface)", color: "var(--text2)", border: "1px solid var(--border2)", borderRadius: 12, fontSize: 15, fontWeight: 500, transition: "all 0.2s" }}
                            onMouseEnter={e => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                            onMouseLeave={e => { e.currentTarget.style.color = "var(--text2)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                            See pricing
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}