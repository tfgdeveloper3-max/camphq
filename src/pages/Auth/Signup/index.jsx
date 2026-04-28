import { useState } from "react";
import { Eye, EyeOff, ArrowRight, ArrowLeft, Layers, Mail, Lock, User, Building2, Zap, Rocket, Check, AlertCircle } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import { Link } from "react-router-dom";

const STEPS = ["Account", "Company", "Plan"];

export default function SignupPage() {
    const { dark, css } = useTheme();
    const [step, setStep] = useState(0);
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [focused, setFocused] = useState("");
    const [error, setError] = useState("");
    const [plan, setPlan] = useState("plus");

    const [form, setForm] = useState({
        name: "", email: "", password: "",
        company: "", role: "", size: "",
    });

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const validate = () => {
        if (step === 0) {
            if (!form.name) return "Please enter your full name.";
            if (!form.email) return "Please enter your email.";
            if (!form.password || form.password.length < 8) return "Password must be at least 8 characters.";
        }
        if (step === 1) {
            if (!form.company) return "Please enter your company name.";
        }
        return "";
    };

    const next = () => {
        const err = validate();
        if (err) { setError(err); return; }
        setError("");
        if (step < 2) setStep(s => s + 1);
        else {
            setLoading(true);
            setTimeout(() => setLoading(false), 2000);
        }
    };

    const inputStyle = (name) => ({
        width: "100%", padding: "13px 16px 13px 44px",
        background: "var(--surface)", border: `1px solid ${focused === name ? "var(--accent)" : "var(--border2)"}`,
        borderRadius: 12, color: "var(--text)", fontSize: 14.5, outline: "none",
        fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
        boxShadow: focused === name ? "0 0 0 3px var(--glow)" : "none",
    });

    const selectStyle = (name) => ({
        width: "100%", padding: "13px 16px",
        background: "var(--surface)", border: `1px solid ${focused === name ? "var(--accent)" : "var(--border2)"}`,
        borderRadius: 12, color: form[name] ? "var(--text)" : "var(--text3)", fontSize: 14.5, outline: "none",
        fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s", cursor: "pointer",
        WebkitAppearance: "none", appearance: "none",
    });

    const plans = [
        { id: "free", label: "Free", price: "$0", desc: "1 project · 20 users", icon: Rocket, color: dark ? "#00FFB3" : "#00a87a" },
        { id: "plus", label: "Plus", price: "$15", desc: "Unlimited · $15/user/mo", icon: Zap, color: dark ? "#7B5EFF" : "#5a3be8" },
        { id: "pro", label: "Pro Unlimited", price: "$299", desc: "Fixed price · entire org", icon: Building2, color: dark ? "#FF4D8D" : "#e8185e" },
    ];

    const passwordStrength = (p) => {
        if (!p) return 0;
        let s = 0;
        if (p.length >= 8) s++;
        if (/[A-Z]/.test(p)) s++;
        if (/[0-9]/.test(p)) s++;
        if (/[^A-Za-z0-9]/.test(p)) s++;
        return s;
    };
    const strength = passwordStrength(form.password);
    const strengthColors = ["", "#FF4D8D", "#FFD166", "#00FFB3", "#00FFB3"];
    const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];

    return (
        <div style={{ ...css, minHeight: "100vh", background: "var(--bg)", color: "var(--text)", fontFamily: "'DM Sans', sans-serif", display: "flex", flexDirection: "column", transition: "background 0.4s, color 0.4s", overflowX: "hidden" }}>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        @keyframes fadeUp   { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeSlide{ from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
        @keyframes orbFloat { from{transform:translate(0,0)scale(1)} to{transform:translate(16px,12px)scale(1.05)} }
        @keyframes spin     { to{transform:rotate(360deg)} }
        @keyframes shake    { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-5px)} 40%,80%{transform:translateX(5px)} }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        ::selection{background:var(--accent);color:#fff}
        a{text-decoration:none}
        input::placeholder{color:var(--text3)}
        select option{background:var(--surface);color:var(--text)}
        input:-webkit-autofill{-webkit-box-shadow:0 0 0 100px var(--surface) inset !important;-webkit-text-fill-color:var(--text) !important}
      `}</style>

            {/* BG */}
            <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
                {dark && [...Array(30)].map((_, i) => (
                    <div key={i} style={{ position: "absolute", width: Math.random() * 2 + 1, height: Math.random() * 2 + 1, borderRadius: "50%", background: "#fff", opacity: Math.random() * 0.5 + 0.08, top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }} />
                ))}
                <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,255,179,0.14) 0%, transparent 65%)", top: "-15%", right: "-10%", animation: "orbFloat 12s ease-in-out infinite alternate", filter: "blur(60px)" }} />
                <div style={{ position: "absolute", width: 450, height: 450, borderRadius: "50%", background: "radial-gradient(circle, rgba(123,94,255,0.18) 0%, transparent 65%)", bottom: "-10%", left: "-8%", animation: "orbFloat 16s ease-in-out infinite alternate", animationDelay: "-5s", filter: "blur(70px)" }} />
                {dark && <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(123,94,255,0.012) 2px, rgba(123,94,255,0.012) 4px)" }} />}
            </div>

            {/* top nav */}
            <div style={{ position: "relative", zIndex: 10, padding: "20px 5%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Link to="/" style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg, var(--accent), var(--accent2))", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 16px var(--glow)" }}>
                        <Layers size={15} color="#fff" strokeWidth={2.5} />
                    </div>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: "var(--text)", letterSpacing: "-0.02em" }}>
                        Camp<span style={{ color: "var(--accent)" }}>HQ</span>
                    </span>
                </Link>
                <span style={{ fontSize: 14, color: "var(--text2)" }}>
                    Already have an account?{" "}
                    <Link to="/login" style={{ color: "var(--accent)", fontWeight: 600 }}
                        onMouseEnter={e => e.target.style.textDecoration = "underline"}
                        onMouseLeave={e => e.target.style.textDecoration = "none"}>
                        Sign in
                    </Link>
                </span>
            </div>

            {/* main */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 5%", position: "relative", zIndex: 1 }}>
                <div style={{ width: "100%", maxWidth: step === 2 ? 560 : 440, animation: "fadeUp 0.5s ease both", transition: "max-width 0.4s ease" }}>

                    {/* step indicator */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 32 }}>
                        {STEPS.map((s, i) => (
                            <div key={s} style={{ display: "flex", alignItems: "center" }}>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                                    <div style={{
                                        width: 36, height: 36, borderRadius: "50%",
                                        background: i < step ? "var(--accent3)" : i === step ? "linear-gradient(135deg, var(--accent), var(--accent2))" : "var(--surface2)",
                                        border: i === step ? "none" : `1px solid ${i < step ? "var(--accent3)" : "var(--border2)"}`,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        boxShadow: i === step ? "0 0 18px var(--glow)" : i < step ? "0 0 10px rgba(0,255,179,0.3)" : "none",
                                        transition: "all 0.3s",
                                    }}>
                                        {i < step
                                            ? <Check size={16} color="#000" strokeWidth={2.5} />
                                            : <span style={{ fontSize: 13, fontWeight: 700, color: i === step ? "#fff" : "var(--text3)" }}>{i + 1}</span>}
                                    </div>
                                    <span style={{ fontSize: 11.5, fontWeight: i === step ? 600 : 400, color: i === step ? "var(--text)" : "var(--text3)", whiteSpace: "nowrap", transition: "color 0.3s" }}>{s}</span>
                                </div>
                                {i < STEPS.length - 1 && (
                                    <div style={{ width: 60, height: 1, background: i < step ? "var(--accent3)" : "var(--border)", margin: "0 8px", marginBottom: 22, transition: "background 0.3s" }} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* card */}
                    <div style={{ background: "var(--card-bg)", border: "1px solid var(--border2)", borderRadius: 24, padding: "36px", backdropFilter: "blur(20px)", boxShadow: "0 0 60px var(--glow), 0 20px 60px rgba(0,0,0,0.3)", position: "relative", overflow: "hidden", animation: "fadeSlide 0.35s ease both" }} key={step}>
                        <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: "linear-gradient(90deg, transparent, var(--accent3), var(--accent), transparent)", boxShadow: "0 0 10px var(--glow)" }} />

                        {/* error */}
                        {error && (
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 14px", background: "rgba(255,77,141,0.1)", border: "1px solid rgba(255,77,141,0.25)", borderRadius: 10, marginBottom: 20, animation: "shake 0.4s ease" }}>
                                <AlertCircle size={15} color="var(--accent2)" strokeWidth={2} style={{ flexShrink: 0 }} />
                                <span style={{ fontSize: 13.5, color: "var(--accent2)" }}>{error}</span>
                            </div>
                        )}

                        {/* ── STEP 0: ACCOUNT ── */}
                        {step === 0 && (
                            <>
                                <div style={{ textAlign: "center", marginBottom: 28 }}>
                                    <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 24, letterSpacing: "-0.02em", marginBottom: 6 }}>Create your account</h2>
                                    <p style={{ fontSize: 14, color: "var(--text2)", fontWeight: 300 }}>Free forever. No credit card required.</p>
                                </div>

                                {/* social */}
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 22 }}>
                                    {[
                                        { icon: <svg width="17" height="17" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>, label: "Google" },
                                        { icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: "var(--text2)"}}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>, label: "GitHub" },
                                    ].map(({ icon, label }) => (
                                        <button key={label} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "11px 0", background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 10, fontSize: 13.5, color: "var(--text2)", cursor: "pointer", fontWeight: 500, fontFamily: "inherit", transition: "all 0.2s" }}
                                            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.boxShadow = "0 0 10px var(--glow)"; }}
                                            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.color = "var(--text2)"; e.currentTarget.style.boxShadow = "none"; }}>
                                            {icon} {label}
                                        </button>
                                    ))}
                                </div>

                                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                                    <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                                    <span style={{ fontSize: 12, color: "var(--text3)" }}>or with email</span>
                                    <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                    {/* name */}
                                    <div style={{ position: "relative" }}>
                                        <User size={15} color={focused === "name" ? "var(--accent)" : "var(--text3)"} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", transition: "color 0.2s" }} />
                                        <input type="text" placeholder="Full name" value={form.name} onChange={e => set("name", e.target.value)}
                                            onFocus={() => setFocused("name")} onBlur={() => setFocused("")} style={inputStyle("name")} />
                                    </div>
                                    {/* email */}
                                    <div style={{ position: "relative" }}>
                                        <Mail size={15} color={focused === "email" ? "var(--accent)" : "var(--text3)"} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", transition: "color 0.2s" }} />
                                        <input type="email" placeholder="Work email" value={form.email} onChange={e => set("email", e.target.value)}
                                            onFocus={() => setFocused("email")} onBlur={() => setFocused("")} style={inputStyle("email")} />
                                    </div>
                                    {/* password */}
                                    <div>
                                        <div style={{ position: "relative" }}>
                                            <Lock size={15} color={focused === "password" ? "var(--accent)" : "var(--text3)"} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", transition: "color 0.2s" }} />
                                            <input type={showPass ? "text" : "password"} placeholder="Password (min 8 chars)" value={form.password} onChange={e => set("password", e.target.value)}
                                                onFocus={() => setFocused("password")} onBlur={() => setFocused("")} style={{ ...inputStyle("password"), paddingRight: 44 }} />
                                            <button type="button" onClick={() => setShowPass(s => !s)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text3)", padding: 0, display: "flex" }}>
                                                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                                            </button>
                                        </div>
                                        {/* strength bar */}
                                        {form.password && (
                                            <div style={{ marginTop: 8 }}>
                                                <div style={{ display: "flex", gap: 4 }}>
                                                    {[1, 2, 3, 4].map(i => (
                                                        <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= strength ? strengthColors[strength] : "var(--border)", transition: "background 0.3s", boxShadow: i <= strength ? `0 0 6px ${strengthColors[strength]}60` : "none" }} />
                                                    ))}
                                                </div>
                                                <div style={{ fontSize: 11.5, color: strengthColors[strength], marginTop: 5, fontWeight: 600 }}>{strengthLabels[strength]}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}

                        {/* ── STEP 1: COMPANY ── */}
                        {step === 1 && (
                            <>
                                <div style={{ textAlign: "center", marginBottom: 28 }}>
                                    <div style={{ width: 48, height: 48, borderRadius: 14, background: "var(--tag-bg)", border: "1px solid var(--border2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", boxShadow: "0 0 16px var(--glow)" }}>
                                        <Building2 size={22} color="var(--accent)" strokeWidth={1.8} />
                                    </div>
                                    <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 24, letterSpacing: "-0.02em", marginBottom: 6 }}>Set up your company</h2>
                                    <p style={{ fontSize: 14, color: "var(--text2)", fontWeight: 300 }}>Tell us a bit about your organization.</p>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                    {/* company name */}
                                    <div style={{ position: "relative" }}>
                                        <Building2 size={15} color={focused === "company" ? "var(--accent)" : "var(--text3)"} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", transition: "color 0.2s" }} />
                                        <input type="text" placeholder="Company name" value={form.company} onChange={e => set("company", e.target.value)}
                                            onFocus={() => setFocused("company")} onBlur={() => setFocused("")} style={inputStyle("company")} />
                                    </div>
                                    {/* role */}
                                    <div style={{ position: "relative" }}>
                                        <User size={15} color={focused === "role" ? "var(--accent)" : "var(--text3)"} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", transition: "color 0.2s", zIndex: 1 }} />
                                        <select value={form.role} onChange={e => set("role", e.target.value)}
                                            onFocus={() => setFocused("role")} onBlur={() => setFocused("")}
                                            style={{ ...selectStyle("role"), paddingLeft: 44 }}>
                                            <option value="" disabled>Your role</option>
                                            {["CEO / Founder", "CTO", "Product Manager", "Project Manager", "Designer", "Developer", "Marketing", "Operations", "Other"].map(r => <option key={r} value={r}>{r}</option>)}
                                        </select>
                                    </div>
                                    {/* team size */}
                                    <div style={{ position: "relative" }}>
                                        <select value={form.size} onChange={e => set("size", e.target.value)}
                                            onFocus={() => setFocused("size")} onBlur={() => setFocused("")}
                                            style={selectStyle("size")}>
                                            <option value="" disabled>Team size</option>
                                            {["Just me", "2–5", "6–10", "11–25", "26–50", "51–100", "100+"].map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div style={{ marginTop: 20, padding: "14px 16px", background: "var(--tag-bg)", border: "1px solid var(--border2)", borderRadius: 12, fontSize: 13.5, color: "var(--text2)", lineHeight: 1.65 }}>
                                    <strong style={{ color: "var(--text)" }}>Hi {form.name.split(" ")[0] || "there"}!</strong> You can add brands and invite team members after setup.
                                </div>
                            </>
                        )}

                        {/* ── STEP 2: PLAN ── */}
                        {step === 2 && (
                            <>
                                <div style={{ textAlign: "center", marginBottom: 28 }}>
                                    <div style={{ width: 48, height: 48, borderRadius: 14, background: "var(--tag-bg)", border: "1px solid var(--border2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", boxShadow: "0 0 16px var(--glow)" }}>
                                        <Zap size={22} color="var(--accent)" strokeWidth={1.8} />
                                    </div>
                                    <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 24, letterSpacing: "-0.02em", marginBottom: 6 }}>Choose your plan</h2>
                                    <p style={{ fontSize: 14, color: "var(--text2)", fontWeight: 300 }}>You can always upgrade or downgrade later.</p>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                    {plans.map(({ id, label, price, desc, icon: Icon, color }) => (
                                        <div key={id} onClick={() => setPlan(id)} style={{
                                            display: "flex", alignItems: "center", gap: 14,
                                            padding: "16px 18px", borderRadius: 14, cursor: "pointer",
                                            background: plan === id ? `${color}10` : "var(--surface)",
                                            border: `2px solid ${plan === id ? color : "var(--border)"}`,
                                            transition: "all 0.25s",
                                            boxShadow: plan === id ? `0 0 20px ${color}20` : "none",
                                        }}>
                                            <div style={{ width: 40, height: 40, borderRadius: 11, background: `${color}16`, border: `1px solid ${color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: plan === id ? `0 0 12px ${color}40` : "none", transition: "box-shadow 0.25s" }}>
                                                <Icon size={18} color={color} strokeWidth={1.8} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "var(--text)" }}>{label}</span>
                                                    {id === "plus" && <span style={{ fontSize: 10, padding: "2px 8px", background: "var(--tag-bg)", color: "var(--tag-text)", borderRadius: 100, fontWeight: 700 }}>Popular</span>}
                                                </div>
                                                <div style={{ fontSize: 12.5, color: "var(--text3)", marginTop: 2 }}>{desc}</div>
                                            </div>
                                            <div style={{ textAlign: "right", flexShrink: 0 }}>
                                                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16, color: plan === id ? color : "var(--text)", filter: plan === id ? `drop-shadow(0 0 8px ${color}60)` : "none", transition: "all 0.25s" }}>{price}</div>
                                                {id !== "free" && <div style={{ fontSize: 11, color: "var(--text3)" }}>/ mo</div>}
                                            </div>
                                            <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${plan === id ? color : "var(--border2)"}`, background: plan === id ? color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.25s", boxShadow: plan === id ? `0 0 10px ${color}60` : "none" }}>
                                                {plan === id && <Check size={12} color="#fff" strokeWidth={3} />}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ marginTop: 16, fontSize: 12.5, color: "var(--text3)", textAlign: "center", lineHeight: 1.6 }}>
                                    Plus & Pro start with a free trial — no card needed until you're ready.
                                </div>
                            </>
                        )}

                        {/* nav buttons */}
                        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                            {step > 0 && (
                                <button onClick={() => { setStep(s => s - 1); setError(""); }} style={{ display: "flex", alignItems: "center", gap: 6, padding: "13px 20px", background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 12, fontSize: 14.5, fontWeight: 500, color: "var(--text2)", cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--text)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.color = "var(--text2)"; }}>
                                    <ArrowLeft size={15} /> Back
                                </button>
                            )}
                            <button onClick={next} disabled={loading} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px 0", background: loading ? "var(--surface2)" : "linear-gradient(135deg, var(--accent), var(--accent2))", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", transition: "all 0.25s", boxShadow: loading ? "none" : "0 6px 24px var(--glow)", fontFamily: "inherit" }}
                                onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 10px 32px var(--glow)"; } }}
                                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = loading ? "none" : "0 6px 24px var(--glow)"; }}>
                                {loading ? (
                                    <><div style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} /> Creating account…</>
                                ) : step < 2 ? (
                                    <>Continue <ArrowRight size={16} strokeWidth={2.5} /></>
                                ) : (
                                    <>Create account <ArrowRight size={16} strokeWidth={2.5} /></>
                                )}
                            </button>
                        </div>
                    </div>

                    {step === 0 && (
                        <p style={{ textAlign: "center", fontSize: 14, color: "var(--text2)", marginTop: 20 }}>
                            Already have an account?{" "}
                            <Link to="/login" style={{ color: "var(--accent)", fontWeight: 600 }}>Sign in</Link>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}