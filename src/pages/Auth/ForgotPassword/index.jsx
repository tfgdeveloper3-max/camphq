import { useState } from "react";
import { ArrowRight, ArrowLeft, Layers, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
    const { dark, css } = useTheme();
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [focused, setFocused] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        if (!email || !email.includes("@")) { setError("Please enter a valid email address."); return; }
        setLoading(true);
        setTimeout(() => { setLoading(false); setSent(true); }, 1600);
    };

    return (
        <div style={{ ...css, minHeight: "100vh", background: "var(--bg)", color: "var(--text)", fontFamily: "'DM Sans', sans-serif", display: "flex", flexDirection: "column", transition: "background 0.4s, color 0.4s", overflowX: "hidden" }}>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        @keyframes fadeUp   { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes orbFloat { from{transform:translate(0,0)scale(1)} to{transform:translate(16px,12px)scale(1.05)} }
        @keyframes spin     { to{transform:rotate(360deg)} }
        @keyframes shake    { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-5px)} 40%,80%{transform:translateX(5px)} }
        @keyframes popIn    { 0%{opacity:0;transform:scale(0.7)} 60%{transform:scale(1.1)} 100%{opacity:1;transform:scale(1)} }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        ::selection{background:var(--accent);color:#fff}
        a{text-decoration:none}
        input::placeholder{color:var(--text3)}
        input:-webkit-autofill{-webkit-box-shadow:0 0 0 100px var(--surface) inset !important;-webkit-text-fill-color:var(--text) !important}
      `}</style>

            {/* BG */}
            <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
                {dark && [...Array(25)].map((_, i) => (
                    <div key={i} style={{ position: "absolute", width: Math.random() * 2 + 1, height: Math.random() * 2 + 1, borderRadius: "50%", background: "#fff", opacity: Math.random() * 0.4 + 0.08, top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }} />
                ))}
                <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(123,94,255,0.2) 0%, transparent 65%)", top: "-15%", left: "-10%", animation: "orbFloat 12s ease-in-out infinite alternate", filter: "blur(60px)" }} />
                <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,200,255,0.12) 0%, transparent 65%)", bottom: "-10%", right: "-8%", animation: "orbFloat 16s ease-in-out infinite alternate", animationDelay: "-5s", filter: "blur(70px)" }} />
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
                <Link to="/login" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: "var(--text2)", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
                    onMouseLeave={e => e.currentTarget.style.color = "var(--text2)"}>
                    <ArrowLeft size={15} /> Back to sign in
                </Link>
            </div>

            {/* main */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 5%", position: "relative", zIndex: 1 }}>
                <div style={{ width: "100%", maxWidth: 400, animation: "fadeUp 0.5s ease both" }}>
                    <div style={{ background: "var(--card-bg)", border: "1px solid var(--border2)", borderRadius: 24, padding: "40px 36px", backdropFilter: "blur(20px)", boxShadow: "0 0 60px var(--glow), 0 20px 60px rgba(0,0,0,0.3)", position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: "linear-gradient(90deg, transparent, var(--accent5,var(--accent)), transparent)", boxShadow: "0 0 10px var(--glow)" }} />

                        {!sent ? (
                            <>
                                <div style={{ textAlign: "center", marginBottom: 30 }}>
                                    <div style={{ width: 56, height: 56, borderRadius: 18, background: "var(--tag-bg)", border: "1px solid var(--border2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 0 20px var(--glow)" }}>
                                        <Mail size={26} color="var(--accent)" strokeWidth={1.6} />
                                    </div>
                                    <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 26, letterSpacing: "-0.025em", marginBottom: 8 }}>Forgot password?</h1>
                                    <p style={{ fontSize: 14, color: "var(--text2)", fontWeight: 300, lineHeight: 1.7 }}>
                                        No worries. Enter your email and we'll send you a reset link right away.
                                    </p>
                                </div>

                                {error && (
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 14px", background: "rgba(255,77,141,0.1)", border: "1px solid rgba(255,77,141,0.25)", borderRadius: 10, marginBottom: 18, animation: "shake 0.4s ease" }}>
                                        <AlertCircle size={15} color="var(--accent2)" strokeWidth={2} style={{ flexShrink: 0 }} />
                                        <span style={{ fontSize: 13.5, color: "var(--accent2)" }}>{error}</span>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                    <div style={{ position: "relative" }}>
                                        <Mail size={16} color={focused ? "var(--accent)" : "var(--text3)"} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", transition: "color 0.2s" }} />
                                        <input
                                            type="email" placeholder="Your email address"
                                            value={email} onChange={e => setEmail(e.target.value)}
                                            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                                            style={{
                                                width: "100%", padding: "13px 16px 13px 44px",
                                                background: "var(--surface)", border: `1px solid ${focused ? "var(--accent)" : "var(--border2)"}`,
                                                borderRadius: 12, color: "var(--text)", fontSize: 14.5, outline: "none",
                                                fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
                                                boxShadow: focused ? "0 0 0 3px var(--glow)" : "none",
                                            }} />
                                    </div>

                                    <button type="submit" disabled={loading} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 0", background: loading ? "var(--surface2)" : "linear-gradient(135deg, var(--accent), var(--accent2))", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", transition: "all 0.25s", boxShadow: loading ? "none" : "0 6px 24px var(--glow)", fontFamily: "inherit" }}
                                        onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 10px 32px var(--glow)"; } }}
                                        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = loading ? "none" : "0 6px 24px var(--glow)"; }}>
                                        {loading ? (
                                            <><div style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} /> Sending…</>
                                        ) : (
                                            <>Send reset link <ArrowRight size={16} strokeWidth={2.5} /></>
                                        )}
                                    </button>
                                </form>

                                <div style={{ marginTop: 24, padding: "14px 16px", background: "rgba(0,200,255,0.06)", border: "1px solid rgba(0,200,255,0.15)", borderRadius: 12 }}>
                                    <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.65 }}>
                                        <strong style={{ color: "var(--text)" }}>Check your spam folder</strong> if you don't see the email within a few minutes.
                                    </p>
                                </div>
                            </>
                        ) : (
                            /* ── SUCCESS STATE ── */
                            <div style={{ textAlign: "center", animation: "fadeUp 0.4s ease both" }}>
                                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(0,255,179,0.12)", border: "2px solid rgba(0,255,179,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 0 30px rgba(0,255,179,0.25)", animation: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both" }}>
                                    <CheckCircle2 size={36} color="var(--accent3)" strokeWidth={1.8} style={{ filter: "drop-shadow(0 0 10px rgba(0,255,179,0.6))" }} />
                                </div>
                                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 24, letterSpacing: "-0.025em", marginBottom: 10 }}>Check your inbox</h2>
                                <p style={{ fontSize: 14.5, color: "var(--text2)", lineHeight: 1.75, marginBottom: 24 }}>
                                    We sent a password reset link to{" "}
                                    <strong style={{ color: "var(--accent)", fontWeight: 600 }}>{email}</strong>.
                                    It expires in 30 minutes.
                                </p>

                                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                    <button onClick={() => { setSent(false); setEmail(""); }} style={{ padding: "13px", background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 12, fontSize: 14.5, fontWeight: 500, color: "var(--text2)", cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--text)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.color = "var(--text2)"; }}>
                                        Resend email
                                    </button>
                                    <Link to="/login" style={{ padding: "13px", background: "linear-gradient(135deg, var(--accent), var(--accent2))", borderRadius: 12, fontSize: 14.5, fontWeight: 600, color: "#fff", textAlign: "center", boxShadow: "0 6px 24px var(--glow)", transition: "all 0.2s", display: "block" }}
                                        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 10px 32px var(--glow)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px var(--glow)"; }}>
                                        Back to sign in
                                    </Link>
                                </div>

                                <p style={{ marginTop: 20, fontSize: 12.5, color: "var(--text3)", lineHeight: 1.6 }}>
                                    Didn't get it? Check spam, or{" "}
                                    <a href="/support" style={{ color: "var(--accent)" }}>contact support</a>.
                                </p>
                            </div>
                        )}
                    </div>

                    {!sent && (
                        <p style={{ textAlign: "center", fontSize: 14, color: "var(--text2)", marginTop: 20 }}>
                            Remembered it?{" "}
                            <Link to="/login" style={{ color: "var(--accent)", fontWeight: 600 }}>Back to sign in</Link>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}