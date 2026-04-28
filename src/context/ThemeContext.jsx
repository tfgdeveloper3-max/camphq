import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const [dark, setDark] = useState(true);
    const toggle = () => setDark(d => !d);

    const css = dark ? {
        "--bg": "#05050d",
        "--bg2": "#080812",
        "--bg3": "#0c0c1a",
        "--surface": "#0f0f20",
        "--surface2": "#151528",
        "--surface3": "#1a1a32",
        "--border": "rgba(120,100,255,0.10)",
        "--border2": "rgba(120,100,255,0.20)",
        "--border3": "rgba(120,100,255,0.35)",
        "--text": "#eeeeff",
        "--text2": "#8888bb",
        "--text3": "#44446a",
        "--accent": "#7B5EFF",
        "--accent2": "#FF4D8D",
        "--accent3": "#00FFB3",
        "--accent4": "#FFD166",
        "--accent5": "#00C8FF",
        "--glow": "rgba(123,94,255,0.28)",
        "--glow2": "rgba(255,77,141,0.18)",
        "--glow3": "rgba(0,255,179,0.14)",
        "--card-bg": "rgba(15,15,32,0.85)",
        "--card-border": "rgba(120,100,255,0.16)",
        "--nav-bg": "rgba(5,5,13,0.82)",
        "--tag-bg": "rgba(123,94,255,0.14)",
        "--tag-text": "#b0a0ff",
    } : {
        "--bg": "#f8f7ff",
        "--bg2": "#f0eeff",
        "--bg3": "#e8e5ff",
        "--surface": "#ffffff",
        "--surface2": "#f3f1ff",
        "--surface3": "#edeaff",
        "--border": "rgba(90,60,200,0.10)",
        "--border2": "rgba(90,60,200,0.18)",
        "--border3": "rgba(90,60,200,0.30)",
        "--text": "#0e0e24",
        "--text2": "#4a4a7a",
        "--text3": "#9090c0",
        "--accent": "#5a3be8",
        "--accent2": "#e8185e",
        "--accent3": "#00a87a",
        "--accent4": "#c87800",
        "--accent5": "#006cc8",
        "--glow": "rgba(90,59,232,0.15)",
        "--glow2": "rgba(232,24,94,0.10)",
        "--glow3": "rgba(0,168,122,0.10)",
        "--card-bg": "rgba(255,255,255,0.92)",
        "--card-border": "rgba(90,59,232,0.12)",
        "--nav-bg": "rgba(248,247,255,0.88)",
        "--tag-bg": "rgba(90,59,232,0.08)",
        "--tag-text": "#5a3be8",
    };

    return (
        <ThemeContext.Provider value={{ dark, toggle, css }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}