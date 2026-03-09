import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────
   GOOGLE FONTS INJECTION
───────────────────────────────────────── */
const FontInjector = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&family=JetBrains+Mono:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);
  return null;
};

/* ─────────────────────────────────────────
   TOKENS / DESIGN SYSTEM
───────────────────────────────────────── */
const T = {
  g0: "#F2FDF8",
  g1: "#E6FAF0",
  mint: "#00D98B",
  mintB: "#00B674",
  mintD: "#008F5A",
  mintGlow: "rgba(0,217,139,0.22)",
  mintSoft: "rgba(0,217,139,0.09)",
  mintLine: "rgba(0,182,116,0.18)",
  ink: "#061C14",
  ink2: "#0D2E1F",
  slate: "#2E5040",
  mid: "#5A8070",
  muted: "#92ADA0",
  dim: "#C4D8CF",
  white: "#FFFFFF",
  cardBg: "rgba(255,255,255,0.72)",
  cardBorder: "rgba(0,182,116,0.15)",
  shadow: "0 8px 48px rgba(0,100,60,0.10)",
  shadowL: "0 24px 80px rgba(0,100,60,0.14)",
};

/* ─────────────────────────────────────────
   GLOBAL STYLES (injected once)
───────────────────────────────────────── */
const GlobalStyle = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { background: ${T.g0}; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
      ::-webkit-scrollbar { width: 3px; }
      ::-webkit-scrollbar-track { background: ${T.g0}; }
      ::-webkit-scrollbar-thumb { background: ${T.mint}; border-radius: 2px; }
      @keyframes driftA {
        0%,100%{transform:translate(0,0) scale(1)}
        33%{transform:translate(-40px,60px) scale(1.1)}
        66%{transform:translate(30px,-30px) scale(0.95)}
      }
      @keyframes driftB {
        0%,100%{transform:translate(0,0) scale(1)}
        50%{transform:translate(50px,-40px) scale(1.08)}
      }
      @keyframes driftC {
        0%,100%{transform:translate(-50%,-50%) scale(1)}
        50%{transform:translate(-50%,-50%) scale(1.3)}
      }
      @keyframes floatMain {
        0%,100%{transform:translateY(-20px)}
        50%{transform:translateY(-34px)}
      }
      @keyframes floatLeft {
        0%,100%{transform:translateX(30px) rotate(-4deg)}
        50%{transform:translateX(30px) rotate(-4deg) translateY(-10px)}
      }
      @keyframes floatRight {
        0%,100%{transform:translateX(-30px) rotate(4deg)}
        50%{transform:translateX(-30px) rotate(4deg) translateY(-8px)}
      }
      @keyframes ticker {
        from{transform:translateX(0)}
        to{transform:translateX(-50%)}
      }
      @keyframes breathe {
        0%,100%{opacity:1;transform:scale(1)}
        50%{opacity:0.5;transform:scale(0.7)}
      }
      @keyframes fadeUp {
        from{opacity:0;transform:translateY(24px)}
        to{opacity:1;transform:translateY(0)}
      }
      @keyframes lineGrow {
        from{transform:scaleX(0)}
        to{transform:scaleX(1)}
      }
      .reveal-el {
        opacity: 0;
        transform: translateY(28px);
        transition: opacity 0.65s ease, transform 0.65s ease;
      }
      .reveal-el.visible {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  return null;
};

/* ─────────────────────────────────────────
   REVEAL HOOK
───────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("reveal-el");
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─────────────────────────────────────────
   AMBIENT BLOBS
───────────────────────────────────────── */
const Blobs = () => (
  <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
    {[
      { w: 500, h: 500, top: -150, right: -100, left: "auto", anim: "driftA 18s ease-in-out infinite", opacity: 0.35 },
      { w: 400, h: 400, bottom: "10%", left: -100, top: "auto", right: "auto", anim: "driftB 22s ease-in-out infinite", opacity: 0.35 },
      { w: 300, h: 300, top: "50%", left: "50%", anim: "driftC 15s ease-in-out infinite", opacity: 0.15, transform: "translate(-50%,-50%)" },
    ].map((b, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          width: b.w, height: b.h,
          top: b.top ?? "auto", right: b.right ?? "auto",
          bottom: b.bottom ?? "auto", left: b.left ?? "auto",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${T.mint}, transparent 65%)`,
          filter: "blur(80px)",
          opacity: b.opacity,
          animation: b.anim,
          transform: b.transform,
        }}
      />
    ))}
  </div>
);

/* ─────────────────────────────────────────
   NAV
───────────────────────────────────────── */
const Nav = () => {
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const fn = () => setStuck(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 20px",
      background: "rgba(242,253,248,0.88)",
      backdropFilter: "blur(20px) saturate(180%)",
      WebkitBackdropFilter: "blur(20px) saturate(180%)",
      borderBottom: stuck ? `1px solid ${T.mintLine}` : "1px solid transparent",
      transition: "border-color 0.4s",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <a href="#top" style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, color: T.ink, textDecoration: "none", letterSpacing: -0.5, display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{
          width: 32, height: 32, borderRadius: 10,
          background: `linear-gradient(135deg,${T.mint},${T.mintB})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, fontWeight: 800, color: "#fff",
          boxShadow: `0 4px 16px ${T.mintGlow}`,
          fontFamily: "'Syne',sans-serif",
        }}>N</span>
        NexolPay
      </a>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {["Features", "How It Works", "Pricing"].map(l => (
          <a key={l} href={`#${l.toLowerCase().replace(/\s/g, "")}`}
            style={{ fontSize: 13, fontWeight: 500, color: T.slate, textDecoration: "none", padding: "6px 12px", borderRadius: 100, display: window.innerWidth < 640 ? "none" : "block" }}
            onMouseEnter={e => { e.target.style.background = T.mintSoft; e.target.style.color = T.mintD; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = T.slate; }}
          >{l}</a>
        ))}
        <a href="#waitlist" style={{
          padding: "9px 20px", borderRadius: 100,
          background: T.mint, color: T.ink,
          fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 700,
          textDecoration: "none", letterSpacing: 0.3,
          boxShadow: `0 4px 20px ${T.mintGlow}`,
          transition: "all 0.25s",
        }}
          onMouseEnter={e => { e.target.style.background = T.mintB; e.target.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.target.style.background = T.mint; e.target.style.transform = "none"; }}
        >Get Early Access</a>
      </div>
    </nav>
  );
};

/* ─────────────────────────────────────────
   PHONE MOCKUP
───────────────────────────────────────── */
const Phone = ({ type, size = "center" }) => {
  const widths = { center: 220, left: 190, right: 190 };
  const w = widths[size];
  const anims = {
    center: "floatMain 7s ease-in-out infinite",
    left: "floatLeft 8s ease-in-out infinite",
    right: "floatRight 9s ease-in-out infinite",
  };
  const transforms = {
    center: "translateY(-20px)",
    left: "translateX(30px) rotate(-4deg)",
    right: "translateX(-30px) rotate(4deg)",
  };

  return (
    <div style={{
      width: w,
      background: "linear-gradient(160deg,#0C2E20,#061C14)",
      borderRadius: 32, border: "1px solid rgba(0,217,139,0.18)",
      overflow: "hidden", flexShrink: 0,
      boxShadow: size === "center"
        ? "0 50px 100px rgba(6,28,20,0.4),0 0 60px rgba(0,217,139,0.1),inset 0 1px 0 rgba(255,255,255,0.1)"
        : "0 40px 80px rgba(6,28,20,0.35),inset 0 1px 0 rgba(255,255,255,0.08)",
      animation: anims[size],
      transform: transforms[size],
      zIndex: size === "center" ? 3 : 2,
      paddingBottom: 16,
    }}>
      <div style={{ width: 80, height: 22, background: "#020D0A", borderRadius: "0 0 14px 14px", margin: "8px auto 0" }} />
      <div style={{ padding: "10px 12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'JetBrains Mono',monospace", fontSize: 8, color: "rgba(255,255,255,0.35)", marginBottom: 10 }}>
          <span>9:41</span><span>▲▲▲</span>
        </div>
        {type === "dashboard" && <DashboardScreen />}
        {type === "giftcards" && <GiftCardsScreen />}
        {type === "vault" && <VaultScreen />}
      </div>
    </div>
  );
};

const DashboardScreen = () => (
  <>
    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 7, letterSpacing: 2, textTransform: "uppercase", color: "rgba(0,217,139,0.6)", marginBottom: 4 }}>Total Balance</div>
    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 800, color: T.mint, letterSpacing: -1, lineHeight: 1 }}>$1,250.00</div>
    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginBottom: 10, marginTop: 3 }}>≈ ₦1,993,750</div>
    <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
      {[["USDC", "$820.00"], ["NGN", "₦685,000"]].map(([l, v]) => (
        <div key={l} style={{ flex: 1, padding: "6px 8px", background: "rgba(0,217,139,0.08)", border: "1px solid rgba(0,217,139,0.12)", borderRadius: 8 }}>
          <div style={{ fontSize: 6, color: "rgba(255,255,255,0.35)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: 1 }}>{l} Wallet</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>{v}</div>
        </div>
      ))}
    </div>
    <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
      {[["⇄","Swap"],["＋","Deposit"],["🎁","Card"],["📋","Bills"]].map(([ico, lbl]) => (
        <div key={lbl} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <div style={{ width: 26, height: 26, borderRadius: 8, background: "rgba(0,217,139,0.1)", border: "1px solid rgba(0,217,139,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>{ico}</div>
          <div style={{ fontSize: 6, color: "rgba(255,255,255,0.4)", textAlign: "center" }}>{lbl}</div>
        </div>
      ))}
    </div>
    {[["Amazon Giftcard", "+$80.00", T.mint], ["USDC → NGN", "-$200.00", "#ff6b6b"], ["Apple Giftcard", "+$40.00", T.mint]].map(([n, a, c]) => (
      <div key={n} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <span style={{ fontSize: 8, color: "rgba(255,255,255,0.6)" }}>{n}</span>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, fontWeight: 600, color: c }}>{a}</span>
      </div>
    ))}
  </>
);

const GiftCardsScreen = () => (
  <>
    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 11, fontWeight: 700, color: "#fff", textAlign: "center", marginBottom: 10 }}>Buy Gift Cards</div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
      {[
        ["Amazon", "₦1,550/$1", "linear-gradient(135deg,#FF9900,#F90)"],
        ["Apple", "₦1,520/$1", "linear-gradient(135deg,#1d1d1f,#3a3a3a)"],
        ["Google Play", "₦1,480/$1", "linear-gradient(135deg,#01875f,#34A853)"],
        ["Netflix", "₦1,500/$1", "linear-gradient(135deg,#E50914,#B20710)"],
      ].map(([brand, rate, bg]) => (
        <div key={brand} style={{ borderRadius: 8, overflow: "hidden" }}>
          <div style={{ padding: 8, display: "flex", flexDirection: "column", justifyContent: "flex-end", height: 52, background: bg }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 7, fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>{brand}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 6, color: "rgba(255,255,255,0.6)", marginTop: 1 }}>{rate}</div>
          </div>
        </div>
      ))}
    </div>
  </>
);

const VaultScreen = () => (
  <>
    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 10, fontWeight: 700, color: "#fff", marginBottom: 8 }}>NexolPay Vault</div>
    {[
      ["WEEK 1 · JAN 6", "Available now", "$250 ✓", true],
      ["WEEK 2 · JAN 13", "Unlocks Monday", "🔒 $250", false],
      ["WEEK 3 · JAN 20", "Unlocks in 2 weeks", "🔒 $250", false],
      ["WEEK 4 · JAN 27", "Unlocks in 3 weeks", "🔒 $250", false],
    ].map(([label, date, val, live]) => (
      <div key={label} style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "7px 8px", borderRadius: 8, marginBottom: 5,
        background: live ? "rgba(0,217,139,0.1)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${live ? "rgba(0,217,139,0.22)" : "rgba(255,255,255,0.05)"}`,
      }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 7, letterSpacing: 1, color: live ? T.mint : "rgba(255,255,255,0.25)" }}>{label}</div>
          <div style={{ fontSize: 8, color: live ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)", marginTop: 1 }}>{date}</div>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, fontWeight: 700, color: live ? T.mint : "rgba(255,255,255,0.2)" }}>{val}</div>
      </div>
    ))}
    <div style={{ padding: "7px 8px", borderRadius: 8, background: "rgba(0,217,139,0.07)", border: "1px solid rgba(0,217,139,0.13)", fontSize: 8, color: T.mint, marginTop: 4 }}>
      📈 1-year lock earns <strong style={{ fontFamily: "'JetBrains Mono',monospace" }}>6.1% APY</strong> on Base
    </div>
  </>
);

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
const Hero = () => (
  <section id="top" style={{
    minHeight: "100svh",
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    padding: "100px 20px 60px",
    textAlign: "center", position: "relative", zIndex: 1,
    fontFamily: "'DM Sans',sans-serif",
  }}>
    {/* Grid lines */}
    {[20, 40, 60, 80].map(t => (
      <div key={t} style={{ position: "absolute", width: "100%", height: 1, top: `${t}%`, background: "rgba(0,182,116,0.06)", pointerEvents: "none" }} />
    ))}
    {[25, 50, 75].map(l => (
      <div key={l} style={{ position: "absolute", height: "100%", width: 1, left: `${l}%`, background: "rgba(0,182,116,0.06)", pointerEvents: "none" }} />
    ))}

    {/* Eyebrow */}
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: "6px 16px", borderRadius: 100,
      background: T.mintSoft, border: `1px solid ${T.mintLine}`,
      fontFamily: "'JetBrains Mono',monospace",
      fontSize: 10, fontWeight: 600, color: T.mintD,
      letterSpacing: "2px", textTransform: "uppercase",
      marginBottom: 24,
      animation: "fadeUp 0.7s ease both",
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.mint, display: "inline-block", animation: "breathe 2s ease-in-out infinite" }} />
      Financial Infrastructure · West Africa
    </div>

    {/* H1 */}
    <h1 style={{
      fontFamily: "'Syne',sans-serif",
      fontSize: "clamp(42px,10vw,76px)",
      fontWeight: 800, lineHeight: 1.04,
      letterSpacing: -2.5, color: T.ink,
      marginBottom: 20,
      animation: "fadeUp 0.7s 0.1s ease both",
    }}>
      Redeem.<br />Convert.<br />
      <span style={{
        background: `linear-gradient(135deg,${T.mintB},${T.mint})`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}>Move.</span>
    </h1>

    {/* Sub */}
    <p style={{
      fontSize: "clamp(15px,3.5vw,18px)", fontWeight: 300, color: T.slate,
      lineHeight: 1.75, maxWidth: 520, margin: "0 auto 36px",
      animation: "fadeUp 0.7s 0.2s ease both",
    }}>
      Gift cards to USDT in <strong style={{ color: T.ink, fontWeight: 500 }}>60 seconds.</strong> Crypto off-ramp to your bank account.
      Income scheduler that <strong style={{ color: T.ink, fontWeight: 500 }}>locks your salary</strong> until you earn access to it.
    </p>

    {/* CTAs */}
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 40, animation: "fadeUp 0.7s 0.3s ease both" }}>
      <a href="#waitlist" style={{
        padding: "15px 30px", borderRadius: 100,
        background: `linear-gradient(135deg,${T.mint},${T.mintB})`,
        color: "#fff", fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700,
        textDecoration: "none", letterSpacing: 0.3,
        boxShadow: `0 8px 32px ${T.mintGlow}`,
        transition: "all 0.25s",
      }}
        onMouseEnter={e => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = `0 14px 48px ${T.mintGlow}`; }}
        onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = `0 8px 32px ${T.mintGlow}`; }}
      >Join the Waitlist →</a>
      <a href="#features" style={{
        padding: "15px 28px", borderRadius: 100,
        background: "rgba(255,255,255,0.7)", color: T.mintD,
        border: `1.5px solid ${T.mintLine}`,
        fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 600,
        textDecoration: "none", backdropFilter: "blur(8px)",
        transition: "all 0.25s",
      }}
        onMouseEnter={e => { e.target.style.background = T.white; e.target.style.borderColor = T.mint; }}
        onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.7)"; e.target.style.borderColor = T.mintLine; }}
      >See Features</a>
    </div>

    {/* Trust */}
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap", animation: "fadeUp 0.7s 0.4s ease both" }}>
      {["⚡ 60s redemption", "🔒 Hard-lock savings", "🌍 Built for Africa"].map((t, i) => (
        <>
          <span key={t} style={{ fontSize: 12, color: T.muted }}>{t}</span>
          {i < 2 && <span key={`sep${i}`} style={{ width: 4, height: 4, borderRadius: "50%", background: T.dim }} />}
        </>
      ))}
    </div>

    {/* Phone Stack */}
    <div style={{ marginTop: 60, position: "relative", height: 360, display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
      <Phone type="giftcards" size="left" />
      <Phone type="dashboard" size="center" />
      <Phone type="vault" size="right" />
      <div style={{
        position: "absolute", bottom: -20, left: "50%", transform: "translateX(-50%)",
        width: 280, height: 60,
        background: "radial-gradient(ellipse,rgba(0,217,139,0.3),transparent 70%)",
        filter: "blur(20px)", pointerEvents: "none", zIndex: 1,
      }} />
    </div>
  </section>
);

/* ─────────────────────────────────────────
   TICKER
───────────────────────────────────────── */
const tickerItems = [
  ["⬆", "$900M", "Nigeria gift card market annually"],
  ["⚡", "60s", "automated redemption pipeline"],
  ["⬆", "$400M", "monthly P2P crypto volume NG"],
  ["📊", "57%", "salary spent in week 1"],
  ["🔒", "6.1%", "APY on 1-year vault lock"],
  ["⬇", "$0.001", "avg transaction fee on Base"],
  ["⬆", "20%", "flat platform redemption fee"],
  ["⚡", "2s", "Base L2 block finality"],
];

const Ticker = () => {
  const doubled = [...tickerItems, ...tickerItems];
  return (
    <div style={{
      overflow: "hidden", padding: "16px 0",
      borderTop: `1px solid ${T.mintLine}`, borderBottom: `1px solid ${T.mintLine}`,
      background: "rgba(255,255,255,0.5)", backdropFilter: "blur(8px)",
      position: "relative", zIndex: 1,
    }}>
      <div style={{ display: "flex", gap: 0, whiteSpace: "nowrap", animation: "ticker 30s linear infinite" }}>
        {doubled.map(([arr, val, lbl], i) => (
          <div key={i} style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "0 32px", fontFamily: "'JetBrains Mono',monospace", fontSize: 11,
            borderRight: `1px solid ${T.mintLine}`,
          }}>
            <span style={{ color: T.mint }}>{arr}</span>
            <span style={{ fontWeight: 700, color: T.mintD }}>{val}</span>
            <span style={{ color: T.muted }}>{lbl}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   EYEBROW + SECTION HEADING
───────────────────────────────────────── */
const SectionHead = ({ eyebrow, title, sub, center = false }) => {
  const ref = useReveal();
  return (
    <div ref={ref} style={{ textAlign: center ? "center" : "left" }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: 9, fontWeight: 600, color: T.mintD,
        letterSpacing: "2.5px", textTransform: "uppercase",
        marginBottom: 16,
        padding: "4px 12px", borderRadius: 100,
        background: T.mintSoft, border: `1px solid ${T.mintLine}`,
      }}>{eyebrow}</div>
      <h2 style={{
        fontFamily: "'Syne',sans-serif",
        fontSize: "clamp(30px,7vw,46px)",
        fontWeight: 800, letterSpacing: -1.5,
        lineHeight: 1.07, color: T.ink, marginBottom: 14,
      }} dangerouslySetInnerHTML={{ __html: title }} />
      {sub && <p style={{ fontSize: 16, fontWeight: 300, color: T.slate, lineHeight: 1.75, maxWidth: center ? 520 : 560, margin: center ? "0 auto" : undefined }}>{sub}</p>}
    </div>
  );
};

/* ─────────────────────────────────────────
   STAT CARDS
───────────────────────────────────────── */
const Stats = () => {
  const items = [
    { num: "$900M", txt: "Nigeria's annual gift card market — 73% traded through WhatsApp traders at 35–50% haircuts with zero protection.", src: "Industry estimates, 2024" },
    { num: "57%", txt: "of Nigerian salary earners exhaust monthly income in week one — before bills, savings, or emergencies.", src: "EFInA Financial Report, 2023" },
    { num: "$400M", txt: "monthly P2P crypto volume in Nigeria with no reliable formal offramp since the 2024 CBN-Binance shutdown.", src: "Chainalysis, 2024" },
  ];
  return (
    <section style={{ padding: "64px 20px 80px", position: "relative", zIndex: 1, fontFamily: "'DM Sans',sans-serif" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <SectionHead eyebrow="The Problem" title="Africa's financial rails<br/>are broken. We're fixing them." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12, marginTop: 48 }}>
          {items.map((s, i) => {
            const ref = useReveal();
            return (
              <div key={i} ref={ref} style={{
                background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)",
                border: `1px solid ${T.cardBorder}`, borderRadius: 20, padding: "24px 20px",
                boxShadow: T.shadow, position: "relative", overflow: "hidden",
                transition: "transform 0.3s, box-shadow 0.3s", cursor: "default",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = T.shadowL; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = T.shadow; }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${T.mint},${T.mintB})`, borderRadius: "20px 20px 0 0" }} />
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "clamp(36px,8vw,48px)", fontWeight: 700, color: T.mintD, letterSpacing: -2, lineHeight: 1, marginBottom: 8 }}>{s.num}</div>
                <div style={{ fontSize: 13, color: T.slate, lineHeight: 1.55 }}>{s.txt}</div>
                <div style={{ fontSize: 10, color: T.muted, marginTop: 6, fontStyle: "italic" }}>{s.src}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────
   FEATURE CARD
───────────────────────────────────────── */
const FeatMockRedemption = () => (
  <div style={{ margin: "0 20px 20px", background: "linear-gradient(135deg,#0C2E20,#061C14)", border: "1px solid rgba(0,217,139,0.2)", borderRadius: 16, padding: 16 }}>
    {[["Amazon Card", "$100.00", T.white], ["Platform Fee (20%)", "− $20.00", "#ff6b6b"], ["You Receive", "$80.00 USDC", T.mint], ["NGN Equivalent", "≈ ₦127,840", T.mint]].map(([k, v, c]) => (
      <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: 12 }}>
        <span style={{ color: "rgba(255,255,255,0.45)" }}>{k}</span>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, color: c }}>{v}</span>
      </div>
    ))}
    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 12, padding: "7px 14px", borderRadius: 100, background: T.mint, color: T.ink, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700 }}>⚡ Credited in 47 seconds</div>
  </div>
);

const FeatMockOfframp = () => (
  <div style={{ margin: "0 20px 20px", background: "linear-gradient(135deg,#0C2E20,#061C14)", border: "1px solid rgba(0,217,139,0.2)", borderRadius: 16, padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
    {[
      { ico: "💎", bg: "rgba(38,161,123,0.15)", label: "You Send", sub: "NexolPay wallet", amt: "100 USDC", col: "rgba(255,255,255,0.8)" },
      { ico: "🏦", bg: "rgba(0,217,139,0.12)", label: "GTBank · ****4421", sub: "ETA ~2 minutes", amt: "₦159,800", col: T.mint },
    ].map((r, i) => (
      <>
        {i === 1 && <div key="arr" style={{ textAlign: "center", fontSize: 16, color: T.mint }}>↓</div>}
        <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: 8, borderRadius: 10, background: i === 0 ? "rgba(0,217,139,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${i === 0 ? "rgba(0,217,139,0.15)" : "rgba(255,255,255,0.06)"}` }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: r.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{r.ico}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: r.col }}>{r.label}</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", marginTop: 1 }}>{r.sub}</div>
          </div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700, color: r.col }}>{r.amt}</div>
        </div>
      </>
    ))}
  </div>
);

const FeatMockVault = () => (
  <div style={{ margin: "0 20px 20px", background: "linear-gradient(135deg,#0C2E20,#061C14)", border: "1px solid rgba(0,217,139,0.2)", borderRadius: 16, padding: 16 }}>
    {[["WEEK 1 · JAN 6", "Available now", "$250", true], ["WEEK 2 · JAN 13", "Unlocks Monday", "🔒 $250", false], ["WEEK 3 · JAN 20", "2 weeks", "🔒 $250", false], ["WEEK 4 · JAN 27", "3 weeks", "🔒 $250", false]].map(([lbl, date, val, live]) => (
      <div key={lbl} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", borderRadius: 8, marginBottom: 5, background: live ? "rgba(0,217,139,0.1)" : "rgba(255,255,255,0.02)", border: `1px solid ${live ? "rgba(0,217,139,0.22)" : "rgba(255,255,255,0.05)"}` }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 7, color: live ? T.mint : "rgba(255,255,255,0.25)", letterSpacing: 1 }}>{lbl}</div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", marginTop: 1 }}>{date}</div>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, color: live ? T.mint : "rgba(255,255,255,0.2)" }}>{val}</div>
      </div>
    ))}
    <div style={{ padding: "8px 10px", borderRadius: 8, background: "rgba(0,217,139,0.07)", border: "1px solid rgba(0,217,139,0.13)", fontSize: 10, color: T.mint, marginTop: 4 }}>
      📈 6-month: <strong style={{ fontFamily: "'JetBrains Mono',monospace" }}>4.2% APY</strong> · 1-year: <strong style={{ fontFamily: "'JetBrains Mono',monospace" }}>6.1% APY</strong>
    </div>
  </div>
);

const features = [
  {
    num: "01 · Gift Card Redemption", ico: "🎁",
    title: "USDT in\n60 seconds.",
    body: "Nigeria's $900M gift card market runs through WhatsApp traders charging **35–50% haircuts**. NexolPay automates the entire pipeline — verify, redeem, credit — in under 60 seconds. Transparent **20% fee**. Still better than the streets.",
    chips: ["AMAZON", "APPLE", "GOOGLE PLAY", "NETFLIX", "AUTO 60s"],
    Mock: FeatMockRedemption,
  },
  {
    num: "02 · Crypto Off-Ramp", ico: "💸",
    title: "USDT to Naira.\nAny bank. Minutes.",
    body: "Nigeria's formal offramp **collapsed in 2024** after the CBN-Binance shutdown. We are the institutional-grade replacement — convert USDC to NGN and receive it in GTBank, Access, Zenith. Live rates. Full receipt. **No P2P risk.**",
    chips: ["USDC → NGN", "ANY BANK", "LIVE RATES", "BASE L2"],
    Mock: FeatMockOfframp,
  },
  {
    num: "03 · Income Scheduler + Vault", ico: "🔒",
    title: "Pay yourself.\nLock the rest.\nEarn on the wait.",
    body: "Deposit your salary. Choose your payout rhythm — weekly, monthly, or lock for **6 months or 1 year**. Hard-locked on Base. No early access. No override. 6-month and 1-year locks **earn onchain yield via Aave on Base.**",
    chips: ["WEEKLY", "MONTHLY", "6M · 4.2% APY", "1YR · 6.1% APY", "HARD LOCK"],
    Mock: FeatMockVault,
  },
];

const FeatureCard = ({ feat, delay = 0 }) => {
  const ref = useReveal();
  return (
    <div ref={ref} style={{
      background: "rgba(255,255,255,0.75)", backdropFilter: "blur(16px)",
      border: `1px solid ${T.cardBorder}`, borderRadius: 24, overflow: "hidden",
      boxShadow: T.shadow, transition: "transform 0.3s, box-shadow 0.3s",
      transitionDelay: `${delay}s`,
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = T.shadowL; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = T.shadow; }}
    >
      <div style={{ padding: 24, display: "flex", alignItems: "flex-start", gap: 16 }}>
        <div style={{ width: 52, height: 52, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0, background: `linear-gradient(135deg,${T.mintSoft},rgba(0,217,139,0.04))`, border: `1px solid ${T.mintLine}`, boxShadow: `0 4px 16px rgba(0,217,139,0.12)` }}>{feat.ico}</div>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: T.mint, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>{feat.num}</div>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, color: T.ink, letterSpacing: -0.5, lineHeight: 1.2, marginBottom: 10, whiteSpace: "pre-line" }}>{feat.title}</h3>
          <p style={{ fontSize: 14, color: T.slate, lineHeight: 1.68, fontWeight: 300 }}
            dangerouslySetInnerHTML={{ __html: feat.body.replace(/\*\*(.+?)\*\*/g, `<strong style="color:${T.ink};font-weight:500">$1</strong>`) }}
          />
        </div>
      </div>
      <div style={{ padding: "0 24px 20px", display: "flex", gap: 6, flexWrap: "wrap" }}>
        {feat.chips.map(c => (
          <span key={c} style={{ padding: "4px 10px", borderRadius: 7, fontFamily: "'JetBrains Mono',monospace", fontSize: 8, fontWeight: 600, letterSpacing: 0.5, background: T.mintSoft, color: T.mintD, border: `1px solid ${T.mintLine}` }}>{c}</span>
        ))}
      </div>
      <feat.Mock />
    </div>
  );
};

const Features = () => (
  <section id="features" style={{ padding: "80px 20px", position: "relative", zIndex: 1, fontFamily: "'DM Sans',sans-serif" }}>
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <SectionHead eyebrow="Core Features" title="Three features.<br/>One closed loop." sub="Gift cards in. USDT credited. Naira in your bank. Salary locked until you've earned it." />
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 48 }}>
        {features.map((f, i) => <FeatureCard key={i} feat={f} delay={i * 0.08} />)}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────
   HOW IT WORKS
───────────────────────────────────────── */
const steps = [
  { n: "01", title: "Create your account", body: "Sign up with your phone number, complete KYC with BVN/NIN. Your embedded Base wallet is created automatically — no seed phrase required." },
  { n: "02", title: "Deposit or redeem", body: "Add USDC directly or upload an Amazon / Apple gift card. Automated pipeline verifies and credits your wallet in under 60 seconds." },
  { n: "03", title: "Schedule your money", body: "Choose your payout rhythm. Weekly allowances, monthly, 6-month or 1-year vault lock. Funds are hard-locked on Base — mathematically unavailable until your date." },
  { n: "04", title: "Receive automatically", body: "Every Monday your allowance unlocks. Longer locks earn yield. Off-ramp to your Naira bank account anytime. You just live your life." },
];

const HowItWorks = () => {
  const ref = useReveal();
  return (
    <section id="howitworks" style={{ padding: "80px 20px", background: "rgba(255,255,255,0.4)", backdropFilter: "blur(8px)", position: "relative", zIndex: 1, fontFamily: "'DM Sans',sans-serif" }}>
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <SectionHead eyebrow="Process" title="Simple enough<br/>to start today." sub="Four steps. Fully automated after setup." />
        <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 40, position: "relative" }}>
          <div style={{ position: "absolute", left: 20, top: 28, bottom: 28, width: 2, background: `linear-gradient(to bottom,${T.mint},${T.mintB},${T.mint})`, borderRadius: 2 }} />
          {steps.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 20, paddingBottom: i < steps.length - 1 ? 32 : 0, position: "relative" }}>
              <div style={{ width: 42, height: 42, borderRadius: "50%", flexShrink: 0, background: T.g0, border: `2px solid ${T.mint}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 700, color: T.mintD, boxShadow: `0 0 0 6px rgba(0,217,139,0.08),0 4px 16px rgba(0,217,139,0.2)`, position: "relative", zIndex: 1 }}>{s.n}</div>
              <div style={{ paddingTop: 10 }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 17, fontWeight: 700, color: T.ink, marginBottom: 6 }}>{s.title}</div>
                <div style={{ fontSize: 14, color: T.slate, lineHeight: 1.65, fontWeight: 300 }}>{s.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────
   CALCULATOR
───────────────────────────────────────── */
const Calculator = () => {
  const [income, setIncome] = useState(1000);
  const ref = useReveal();
  const weekly = income / 4;
  const fmt = n => "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });

  return (
    <section style={{ padding: "80px 20px", position: "relative", zIndex: 1, fontFamily: "'DM Sans',sans-serif" }}>
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <SectionHead eyebrow="Income Scheduler" title="The only budget<br/>that enforces itself." sub="Type your monthly income. See exactly what unlocks each Monday. Zero willpower required." />
        <div ref={ref} style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(16px)", border: `1px solid ${T.cardBorder}`, borderRadius: 24, padding: 28, boxShadow: T.shadow, marginTop: 36 }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: T.muted, marginBottom: 12 }}>My monthly income is</div>
          <div style={{ display: "flex", border: `1.5px solid ${T.mintLine}`, borderRadius: 14, overflow: "hidden", marginBottom: 24, background: "rgba(255,255,255,0.8)" }}>
            <div style={{ padding: "12px 16px", fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 800, color: T.mintD, borderRight: `1.5px solid ${T.mintLine}` }}>$</div>
            <input
              type="number" value={income} min={10} max={999999}
              onChange={e => setIncome(Math.max(0, parseFloat(e.target.value) || 0))}
              style={{ flex: 1, padding: "12px 14px", border: "none", outline: "none", background: "transparent", fontFamily: "'JetBrains Mono',monospace", fontSize: 24, fontWeight: 700, color: T.ink }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {[
              { label: "Week 1 — Unlocked", sub: "Available Monday", ico: "✅", live: true },
              { label: "Week 2", sub: "Unlocks next Monday", ico: "🔒", live: false },
              { label: "Week 3", sub: "Unlocks in 2 weeks", ico: "🔒", live: false },
              { label: "Week 4", sub: "Unlocks in 3 weeks", ico: "🔒", live: false },
            ].map((w, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderRadius: 14, background: w.live ? "rgba(0,217,139,0.1)" : "rgba(255,255,255,0.5)", border: `1.5px solid ${w.live ? "rgba(0,217,139,0.25)" : T.mintLine}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 18 }}>{w.ico}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: w.live ? T.ink : T.muted }}>{w.label}</div>
                    <div style={{ fontSize: 10, color: T.dim, marginTop: 1 }}>{w.sub}</div>
                  </div>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 17, fontWeight: 700, color: w.live ? T.mintD : T.dim }}>{fmt(weekly)}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", fontSize: 11, color: T.muted, marginTop: 16, lineHeight: 1.6 }}>
            6-month lock earns <strong style={{ color: T.mintD }}>4.2% APY</strong> · 1-year lock earns <strong style={{ color: T.mintD }}>6.1% APY</strong> via Aave on Base
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────
   BASE SECTION
───────────────────────────────────────── */
const BaseSection = () => {
  const ref = useReveal();
  return (
    <section style={{ background: "linear-gradient(160deg,#061C14,#0A2A1A)", padding: "80px 20px", position: "relative", overflow: "hidden", zIndex: 1, fontFamily: "'DM Sans',sans-serif" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 0%,rgba(0,217,139,0.08),transparent 60%)", pointerEvents: "none" }} />
      <div ref={ref} style={{ maxWidth: 480, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 18px", borderRadius: 100, border: "1px solid rgba(0,217,139,0.2)", background: "rgba(0,217,139,0.06)", fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: T.mint, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 28 }}>⬡ Powered by Base · Coinbase L2</div>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(30px,8vw,46px)", fontWeight: 800, letterSpacing: -1.5, color: "#fff", lineHeight: 1.07, marginBottom: 16 }}>Institutional infrastructure.<br />Consumer simplicity.</h2>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.72, fontWeight: 300, marginBottom: 48 }}>Every transaction — redemptions, off-ramps, vault locks, yield payouts — settles on Base. $0.001 fees. 2-second finality. Your users never see a seed phrase.</p>
        <div style={{ display: "flex", gap: 2 }}>
          {[["$0.001", "Avg tx fee on Base"], ["2s", "Block finality"], ["6.1%", "APY 1-yr vault"]].map(([val, lbl], i) => (
            <div key={i} style={{ flex: 1, padding: "24px 16px", textAlign: "center", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,217,139,0.08)", borderRadius: i === 0 ? "16px 0 0 16px" : i === 2 ? "0 16px 16px 0" : 0 }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 28, fontWeight: 700, color: T.mint, letterSpacing: -1, lineHeight: 1, marginBottom: 6 }}>{val}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", lineHeight: 1.4 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────
   PRICING
───────────────────────────────────────── */
const plans = [
  {
    name: "Free", price: "0", hot: false,
    desc: "Start building better financial habits today.",
    feats: ["Weekly income scheduling", "1 active savings vault", "Basic USDC off-ramp", "Transaction history"],
  },
  {
    name: "Pro", price: "3", hot: true,
    desc: "The full NexolPay experience. Every feature unlocked.",
    feats: ["Unlimited savings vaults", "Gift card redemption (Amazon + Apple)", "Virtual spend card", "6-month vault · 4.2% APY yield", "1-year vault · 6.1% APY yield", "Priority off-ramp payouts"],
  },
];

const Pricing = () => (
  <section id="pricing" style={{ padding: "80px 20px", position: "relative", zIndex: 1, fontFamily: "'DM Sans',sans-serif" }}>
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <SectionHead eyebrow="Pricing" title="Straightforward.<br/>No hidden fees." center />
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 40 }}>
        {plans.map((p, i) => {
          const ref = useReveal();
          return (
            <div key={i} ref={ref} style={{
              background: "rgba(255,255,255,0.75)", backdropFilter: "blur(16px)",
              border: `1px solid ${p.hot ? T.mint : T.cardBorder}`, borderRadius: 24, padding: 28,
              boxShadow: p.hot ? `0 0 0 1px ${T.mint},${T.shadowL},0 0 40px rgba(0,217,139,0.12)` : T.shadow,
              position: "relative", transition: "transform 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; }}
            >
              {p.hot && <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: `linear-gradient(90deg,${T.mint},${T.mintB})`, color: T.ink, fontFamily: "'Syne',sans-serif", fontSize: 10, fontWeight: 700, padding: "5px 18px", borderRadius: 100, whiteSpace: "nowrap", letterSpacing: 0.5 }}>Most Popular</div>}
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, fontWeight: 600, color: T.muted, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 8 }}>{p.name}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 52, fontWeight: 700, color: T.ink, letterSpacing: -3, lineHeight: 1, marginBottom: 6 }}><sup style={{ fontSize: 22 }}>$</sup>{p.price}<span style={{ fontSize: 15, color: T.muted, fontWeight: 400, letterSpacing: 0 }}>/mo</span></div>
              <div style={{ fontSize: 13, color: T.slate, marginBottom: 22, lineHeight: 1.6 }}>{p.desc}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                {p.feats.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: T.slate }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: T.mintSoft, border: `1px solid ${T.mintLine}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: T.mintD, flexShrink: 0, fontWeight: 700 }}>✓</div>
                    {f}
                  </div>
                ))}
              </div>
              <a href="#waitlist" style={{
                display: "block", width: "100%", padding: 14, borderRadius: 100, textAlign: "center",
                fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, textDecoration: "none", letterSpacing: 0.3,
                background: p.hot ? `linear-gradient(135deg,${T.mint},${T.mintB})` : "transparent",
                color: p.hot ? T.ink : T.mintD,
                border: p.hot ? "none" : `1.5px solid ${T.mintLine}`,
                boxShadow: p.hot ? `0 6px 24px ${T.mintGlow}` : "none",
                transition: "all 0.25s",
              }}>{p.hot ? "Join Waitlist →" : "Get Started Free"}</a>
            </div>
          );
        })}
      </div>
      <p style={{ fontSize: 12, color: T.muted, textAlign: "center", marginTop: 16, lineHeight: 1.6 }}>Gift card redemptions charged at 20% per transaction on all plans.<br />Yield powered by Aave on Base L2.</p>
    </div>
  </section>
);

/* ─────────────────────────────────────────
   WAITLIST
───────────────────────────────────────── */
const Waitlist = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const ref = useReveal();

  const submit = () => {
    if (!email || !email.includes("@") || !email.includes(".")) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 1800);
      return;
    }
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section id="waitlist" style={{ padding: "80px 20px 100px", textAlign: "center", position: "relative", zIndex: 1, fontFamily: "'DM Sans',sans-serif" }}>
      <div ref={ref} style={{ maxWidth: 460, margin: "0 auto" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 9, fontWeight: 600, color: T.mintD, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 24, padding: "4px 12px", borderRadius: 100, background: T.mintSoft, border: `1px solid ${T.mintLine}` }}>Early Access</div>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(34px,9vw,56px)", fontWeight: 800, letterSpacing: -2, lineHeight: 1.03, color: T.ink, marginBottom: 16 }}>
          Your salary.<br />Finally working<br />
          <em style={{ fontStyle: "normal", color: T.mintD }}>for you.</em>
        </h2>
        <p style={{ fontSize: 16, color: T.slate, fontWeight: 300, lineHeight: 1.65, marginBottom: 36 }}>Be among the first when NexolPay launches in Lagos. No spam. Just your spot in line.</p>

        <div style={{
          background: "rgba(255,255,255,0.75)", backdropFilter: "blur(16px)",
          border: `1.5px solid ${status === "error" ? "#ff6b6b" : status === "success" ? T.mint : T.mintLine}`,
          borderRadius: 20, padding: 20,
          boxShadow: status === "error" ? "0 0 0 4px rgba(255,107,107,0.12)" : status === "success" ? `0 0 0 4px rgba(0,217,139,0.12)` : T.shadow,
          marginBottom: 20, transition: "border-color 0.3s, box-shadow 0.3s",
        }}>
          <input
            type="email" placeholder="your@email.com" value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyPress={e => e.key === "Enter" && submit()}
            style={{ width: "100%", padding: "12px 16px", border: `1.5px solid ${T.mintLine}`, borderRadius: 12, background: "rgba(255,255,255,0.8)", color: T.ink, fontFamily: "'DM Sans',sans-serif", fontSize: 15, outline: "none", marginBottom: 10 }}
          />
          <button onClick={submit} style={{
            width: "100%", padding: 15, borderRadius: 12,
            background: status === "success" ? `linear-gradient(135deg,${T.mintB},${T.mintD})` : `linear-gradient(135deg,${T.mint},${T.mintB})`,
            color: T.ink, fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700,
            border: "none", cursor: "pointer", letterSpacing: 0.3,
            boxShadow: `0 6px 24px ${T.mintGlow}`, transition: "all 0.25s",
          }}>
            {status === "success" ? "✓ You're on the list!" : "Get Early Access →"}
          </button>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
          {["🔒 Encrypted", "🌍 Built for Africa", "⚡ Launching Q3 2025", "📩 No spam"].map(t => (
            <div key={t} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 100, background: "rgba(255,255,255,0.6)", border: `1px solid ${T.mintLine}`, fontSize: 11, color: T.muted, backdropFilter: "blur(8px)" }}>{t}</div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────
   FOOTER
───────────────────────────────────────── */
const Footer = () => (
  <footer style={{ background: T.ink2, padding: "48px 20px 32px", fontFamily: "'DM Sans',sans-serif" }}>
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div style={{ width: 30, height: 30, borderRadius: 9, background: `linear-gradient(135deg,${T.mint},${T.mintB})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#fff", fontFamily: "'Syne',sans-serif" }}>N</div>
        <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, color: "#fff" }}>NexolPay</span>
      </div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginBottom: 32, lineHeight: 1.6 }}>Your income. Your rules. Your future.<br />Built on Base · Made for Africa.</div>
      <div style={{ display: "flex", gap: 40, flexWrap: "wrap", marginBottom: 32 }}>
        {[
          { title: "Product", links: ["Gift Card Redemption", "Crypto Off-Ramp", "Income Scheduler", "NexolPay Vault"] },
          { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
          { title: "Legal", links: ["Privacy", "Terms", "Cookies"] },
        ].map(col => (
          <div key={col.title}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>{col.title}</div>
            {col.links.map(l => (
              <a key={l} href="#" style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.4)", textDecoration: "none", marginBottom: 8, transition: "color 0.2s" }}
                onMouseEnter={e => { e.target.style.color = T.mint; }}
                onMouseLeave={e => { e.target.style.color = "rgba(255,255,255,0.4)"; }}
              >{l}</a>
            ))}
          </div>
        ))}
      </div>
      <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 20 }} />
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>NexolPay © 2025 · All rights reserved</div>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "rgba(255,255,255,0.18)" }}>Built on <em style={{ fontStyle: "normal", color: T.mint }}>Base</em> · Powered by <em style={{ fontStyle: "normal", color: T.mint }}>Coinbase CDP</em></div>
      </div>
    </div>
  </footer>
);

/* ─────────────────────────────────────────
   APP
───────────────────────────────────────── */
export default function NexolPay() {
  return (
    <>
      <FontInjector />
      <GlobalStyle />
      <Blobs />
      <Nav />
      <Hero />
      <Ticker />
      <Stats />
      <Features />
      <HowItWorks />
      <Calculator />
      <BaseSection />
      <Pricing />
      <Waitlist />
      <Footer />
    </>
  );
}
