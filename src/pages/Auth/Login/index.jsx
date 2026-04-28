import { useState } from "react";
import { Eye, EyeOff, ArrowRight, Layers, Mail, Lock, AlertCircle } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import { Link } from "react-router-dom";

export default function LoginPage() {
    const { dark, css } = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [focused, setFocused] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        if (!email || !password) { setError("Please fill in all fields."); return; }
        setLoading(true);
        setTimeout(() => { setLoading(false); }, 1800);
    };

    const inputStyle = (name) => ({
        width: "100%", padding: "13px 16px 13px 44px",
        background: "var(--surface)", border: `1px solid ${focused === name ? "var(--accent)" : "var(--border2)"}`,
        borderRadius: 12, color: "var(--text)", fontSize: 14.5, outline: "none",
        fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
        boxShadow: focused === name ? "0 0 0 3px var(--glow)" : "none",
    });

    return (
        <div style={{ ...css, minHeight: "100vh", background: "var(--bg)", color: "var(--text)", fontFamily: "'DM Sans', sans-serif", display: "flex", flexDirection: "column", transition: "background 0.4s, color 0.4s", overflowX: "hidden" }}>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        @keyframes fadeUp   { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes orbFloat { from{transform:translate(0,0)scale(1)} to{transform:translate(16px,12px)scale(1.05)} }
        @keyframes spin     { to{transform:rotate(360deg)} }
        @keyframes shake    { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-6px)} 40%,80%{transform:translateX(6px)} }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        ::selection{background:var(--accent);color:#fff}
        a{text-decoration:none}
        input::placeholder{color:var(--text3)}
        input:-webkit-autofill { -webkit-box-shadow:0 0 0 100px var(--surface) inset !important; -webkit-text-fill-color:var(--text) !important; }
      `}</style>

            {/* BG orbs */}
            <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
                {dark && [...Array(30)].map((_, i) => (
                    <div key={i} style={{ position: "absolute", width: Math.random() * 2 + 1, height: Math.random() * 2 + 1, borderRadius: "50%", background: "#fff", opacity: Math.random() * 0.5 + 0.08, top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }} />
                ))}
                <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(123,94,255,0.22) 0%, transparent 65%)", top: "-15%", left: "-10%", animation: "orbFloat 12s ease-in-out infinite alternate", filter: "blur(60px)" }} />
                <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,77,141,0.14) 0%, transparent 65%)", bottom: "-10%", right: "-10%", animation: "orbFloat 15s ease-in-out infinite alternate", animationDelay: "-5s", filter: "blur(70px)" }} />
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
                    Don't have an account?{" "}
                    <Link to="/signup" style={{ color: "var(--accent)", fontWeight: 600 }}
                        onMouseEnter={e => e.target.style.textDecoration = "underline"}
                        onMouseLeave={e => e.target.style.textDecoration = "none"}>
                        Sign up free
                    </Link>
                </span>
            </div>

            {/* main content */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 5%", position: "relative", zIndex: 1 }}>
                <div style={{ width: "100%", maxWidth: 420, animation: "fadeUp 0.5s ease both" }}>

                    {/* card */}
                    <div style={{ background: "var(--card-bg)", border: "1px solid var(--border2)", borderRadius: 24, padding: "40px 36px", backdropFilter: "blur(20px)", boxShadow: "0 0 60px var(--glow), 0 20px 60px rgba(0,0,0,0.3)", position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: "linear-gradient(90deg, transparent, var(--accent), transparent)", boxShadow: "0 0 10px var(--glow)" }} />

                        <div style={{ textAlign: "center", marginBottom: 32 }}>
                            <div style={{ width: 52, height: 52, borderRadius: 16, background: "linear-gradient(135deg, var(--accent), var(--accent2))", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 0 24px var(--glow), 0 0 10px var(--glow2)" }}>
                                <Layers size={24} color="#fff" strokeWidth={2.5} />
                            </div>
                            <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 26, letterSpacing: "-0.025em", marginBottom: 6 }}>Welcome back</h1>
                            <p style={{ fontSize: 14, color: "var(--text2)", fontWeight: 300 }}>Sign in to your CampHQ account</p>
                        </div>

                        {/* social buttons */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
                            {[
                                { icon: <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>, label: "Google" },
                                { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text2)" }}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>, label: "GitHub" },
                            ].map(({ icon, label }) => (
                                <button key={label} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "11px 0", background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 10, fontSize: 14, color: "var(--text2)", cursor: "pointer", fontWeight: 500, fontFamily: "inherit", transition: "all 0.2s" }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border3,var(--accent))"; e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.boxShadow = "0 0 10px var(--glow)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.color = "var(--text2)"; e.currentTarget.style.boxShadow = "none"; }}>
                                    {icon} Continue with {label}
                                </button>
                            ))}
                        </div>

                        {/* divider */}
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                            <span style={{ fontSize: 12, color: "var(--text3)", fontWeight: 500 }}>or sign in with email</span>
                            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                        </div>

                        {/* error */}
                        {error && (
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 14px", background: "rgba(255,77,141,0.1)", border: "1px solid rgba(255,77,141,0.25)", borderRadius: 10, marginBottom: 18, animation: "shake 0.4s ease" }}>
                                <AlertCircle size={16} color="var(--accent2)" strokeWidth={2} style={{ flexShrink: 0 }} />
                                <span style={{ fontSize: 13.5, color: "var(--accent2)" }}>{error}</span>
                            </div>
                        )}

                        {/* form */}
                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                            {/* email */}
                            <div style={{ position: "relative" }}>
                                <Mail size={16} color={focused === "email" ? "var(--accent)" : "var(--text3)"} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", transition: "color 0.2s", pointerEvents: "none" }} />
                                <input
                                    type="email" placeholder="Work email" value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    onFocus={() => setFocused("email")}
                                    onBlur={() => setFocused("")}
                                    style={inputStyle("email")} />
                            </div>

                            {/* password */}
                            <div style={{ position: "relative" }}>
                                <Lock size={16} color={focused === "pass" ? "var(--accent)" : "var(--text3)"} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", transition: "color 0.2s", pointerEvents: "none" }} />
                                <input
                                    type={showPass ? "text" : "password"} placeholder="Password" value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    onFocus={() => setFocused("pass")}
                                    onBlur={() => setFocused("")}
                                    style={{ ...inputStyle("pass"), paddingRight: 44 }} />
                                <button type="button" onClick={() => setShowPass(s => !s)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text3)", padding: 0, display: "flex" }}>
                                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>

                            {/* remember + forgot */}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13.5, color: "var(--text2)" }}>
                                    <div onClick={() => setRemember(r => !r)} style={{ width: 18, height: 18, borderRadius: 5, border: `2px solid ${remember ? "var(--accent)" : "var(--border2)"}`, background: remember ? "var(--accent)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", cursor: "pointer", boxShadow: remember ? "0 0 8px var(--glow)" : "none", flexShrink: 0 }}>
                                        {remember && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1.5 5l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                    </div>
                                    Remember me
                                </label>
                                <Link to="/forgot" style={{ fontSize: 13.5, color: "var(--accent)", fontWeight: 500 }}
                                    onMouseEnter={e => e.target.style.textDecoration = "underline"}
                                    onMouseLeave={e => e.target.style.textDecoration = "none"}>
                                    Forgot password?
                                </Link>
                            </div>

                            {/* submit */}
                            <button type="submit" disabled={loading} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 0", marginTop: 4, background: loading ? "var(--surface2)" : "linear-gradient(135deg, var(--accent), var(--accent2))", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", transition: "all 0.25s", boxShadow: loading ? "none" : "0 6px 24px var(--glow)", fontFamily: "inherit" }}
                                onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 10px 32px var(--glow)"; } }}
                                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = loading ? "none" : "0 6px 24px var(--glow)"; }}>
                                {loading ? (
                                    <><div style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} /> Signing in…</>
                                ) : (
                                    <>Sign in <ArrowRight size={16} strokeWidth={2.5} /></>
                                )}
                            </button>
                        </form>

                        <p style={{ textAlign: "center", fontSize: 12.5, color: "var(--text3)", marginTop: 22, lineHeight: 1.6 }}>
                            By signing in you agree to our{" "}
                            <a href="/policies" style={{ color: "var(--accent)" }}>Terms</a> and{" "}
                            <a href="/policies" style={{ color: "var(--accent)" }}>Privacy Policy</a>.
                        </p>
                    </div>

                    <p style={{ textAlign: "center", fontSize: 14, color: "var(--text2)", marginTop: 22 }}>
                        New to CampHQ?{" "}
                        <Link to="/signup" style={{ color: "var(--accent)", fontWeight: 600 }}>Create a free account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}