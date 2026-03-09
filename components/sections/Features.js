'use client'
import { useReveal } from '@/lib/useReveal'
import SectionHead from '@/components/ui/SectionHead'
import { colors, alpha, fonts, shadows } from '@/lib/tokens'

/* ── Dark mock: Redemption ───────────────── */
function RedemptionMock() {
  const rows = [
    ['Amazon Card',        '$100.00',     'rgba(255,255,255,0.9)'],
    ['Platform Fee (20%)', '− $20.00',    '#ff6b6b'],
    ['You Receive',        '$80.00 USDC', colors.mint],
    ['NGN Equivalent',     '≈ ₦127,840',  colors.mint],
  ]
  return (
    <div style={{ margin: '0 20px 20px', background: 'linear-gradient(135deg,#0C2E20,#061C14)', border: '1px solid rgba(0,217,139,0.2)', borderRadius: 16, padding: 16 }}>
      {rows.map(([k, v, c]) => (
        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: 12 }}>
          <span style={{ color: 'rgba(255,255,255,0.45)', fontFamily: fonts.body }}>{k}</span>
          <span style={{ fontFamily: fonts.mono, fontWeight: 600, color: c }}>{v}</span>
        </div>
      ))}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 12, padding: '7px 14px', borderRadius: 100, background: colors.mint, color: colors.ink, fontFamily: fonts.mono, fontSize: 11, fontWeight: 700 }}>
        ⚡ Credited in 47 seconds
      </div>
    </div>
  )
}

/* ── Dark mock: Off-ramp ─────────────────── */
function OfframpMock() {
  return (
    <div style={{ margin: '0 20px 20px', background: 'linear-gradient(135deg,#0C2E20,#061C14)', border: '1px solid rgba(0,217,139,0.2)', borderRadius: 16, padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {/* Send row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 8, borderRadius: 10, background: 'rgba(0,217,139,0.08)', border: '1px solid rgba(0,217,139,0.15)' }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(38,161,123,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>💎</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.8)', fontFamily: fonts.body }}>You Send</div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', marginTop: 1, fontFamily: fonts.body }}>NexolPay wallet</div>
        </div>
        <div style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>100 USDC</div>
      </div>
      <div style={{ textAlign: 'center', fontSize: 14, color: colors.mint }}>↓</div>
      {/* Receive row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 8, borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(0,217,139,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>🏦</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.8)', fontFamily: fonts.body }}>GTBank · ****4421</div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', marginTop: 1, fontFamily: fonts.body }}>ETA ~2 minutes</div>
        </div>
        <div style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: colors.mint }}>₦159,800</div>
      </div>
    </div>
  )
}

/* ── Dark mock: Vault ────────────────────── */
function VaultMock() {
  const weeks = [
    { l: 'WEEK 1 · JAN 6',  d: 'Available now', v: '$250', live: true },
    { l: 'WEEK 2 · JAN 13', d: 'Unlocks Monday',  v: '🔒 $250', live: false },
    { l: 'WEEK 3 · JAN 20', d: '2 weeks',          v: '🔒 $250', live: false },
    { l: 'WEEK 4 · JAN 27', d: '3 weeks',          v: '🔒 $250', live: false },
  ]
  return (
    <div style={{ margin: '0 20px 20px', background: 'linear-gradient(135deg,#0C2E20,#061C14)', border: '1px solid rgba(0,217,139,0.2)', borderRadius: 16, padding: 16 }}>
      {weeks.map(w => (
        <div key={w.l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', borderRadius: 8, marginBottom: 5, background: w.live ? 'rgba(0,217,139,0.1)' : 'rgba(255,255,255,0.02)', border: `1px solid ${w.live ? 'rgba(0,217,139,0.22)' : 'rgba(255,255,255,0.05)'}` }}>
          <div>
            <div style={{ fontFamily: fonts.mono, fontSize: 7, color: w.live ? colors.mint : 'rgba(255,255,255,0.25)', letterSpacing: 1 }}>{w.l}</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', marginTop: 1, fontFamily: fonts.body }}>{w.d}</div>
          </div>
          <div style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 700, color: w.live ? colors.mint : 'rgba(255,255,255,0.2)' }}>{w.v}</div>
        </div>
      ))}
      <div style={{ padding: '8px 10px', borderRadius: 8, background: 'rgba(0,217,139,0.07)', border: '1px solid rgba(0,217,139,0.13)', fontSize: 10, color: colors.mint, marginTop: 4, fontFamily: fonts.body }}>
        📈 6-month: <strong style={{ fontFamily: fonts.mono }}>4.2% APY</strong> · 1-year: <strong style={{ fontFamily: fonts.mono }}>6.1% APY</strong>
      </div>
    </div>
  )
}

/* ── Feature data ────────────────────────── */
const FEATURES = [
  {
    num:   '01 · Gift Card Redemption', ico: '🎁',
    title: 'USDT in\n60 seconds.',
    body:  "Nigeria's $900M gift card market runs through WhatsApp traders charging **35–50% haircuts**. NexolPay automates the entire pipeline — verify, redeem, credit — in under 60 seconds. Transparent **20% fee**. Still better than the streets.",
    chips: ['AMAZON', 'APPLE', 'GOOGLE PLAY', 'NETFLIX', 'AUTO 60s'],
    Mock:  RedemptionMock,
  },
  {
    num:   '02 · Crypto Off-Ramp', ico: '💸',
    title: 'USDT to Naira.\nAny bank. Minutes.',
    body:  "Nigeria's formal offramp **collapsed in 2024** after the CBN-Binance shutdown. We are the institutional-grade replacement — convert USDC to NGN and receive it in GTBank, Access, Zenith. Live rates. Full receipt. **No P2P risk.**",
    chips: ['USDC → NGN', 'ANY BANK', 'LIVE RATES', 'BASE L2'],
    Mock:  OfframpMock,
  },
  {
    num:   '03 · Income Scheduler + Vault', ico: '🔒',
    title: 'Pay yourself.\nLock the rest.\nEarn on the wait.',
    body:  'Deposit your salary. Choose your payout rhythm — weekly, monthly, or lock for **6 months or 1 year**. Hard-locked on Base. No early access. No override. Longer locks **earn onchain yield via Aave on Base.**',
    chips: ['WEEKLY', 'MONTHLY', '6M · 4.2% APY', '1YR · 6.1% APY', 'HARD LOCK'],
    Mock:  VaultMock,
  },
]

/* ── Single card ─────────────────────────── */
function FeatureCard({ feat, delay }) {
  const ref = useReveal(delay)

  // Bold markup parser
  const parseBody = (text) =>
    text.split(/(\*\*.+?\*\*)/).map((part, i) =>
      part.startsWith('**')
        ? <strong key={i} style={{ color: colors.ink, fontWeight: 500 }}>{part.slice(2, -2)}</strong>
        : part
    )

  return (
    <div ref={ref} className="card-hover" style={{
      background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(16px)',
      border: `1px solid ${alpha.cardBorder}`, borderRadius: 24,
      overflow: 'hidden', boxShadow: shadows.sm,
    }}>
      {/* Top */}
      <div style={{ padding: 24, display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        <div style={{ width: 52, height: 52, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0, background: `linear-gradient(135deg,${alpha.mintSoft},rgba(0,217,139,0.04))`, border: `1px solid ${alpha.mintLine}`, boxShadow: '0 4px 16px rgba(0,217,139,0.12)' }}>
          {feat.ico}
        </div>
        <div>
          <div style={{ fontFamily: fonts.mono, fontSize: 9, color: colors.mint, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>{feat.num}</div>
          <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 800, color: colors.ink, letterSpacing: -0.5, lineHeight: 1.2, marginBottom: 10, whiteSpace: 'pre-line' }}>{feat.title}</h3>
          <p style={{ fontSize: 14, color: colors.slate, lineHeight: 1.68, fontWeight: 300, fontFamily: fonts.body }}>{parseBody(feat.body)}</p>
        </div>
      </div>

      {/* Chips */}
      <div style={{ padding: '0 24px 20px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {feat.chips.map(c => (
          <span key={c} style={{ padding: '4px 10px', borderRadius: 7, fontFamily: fonts.mono, fontSize: 8, fontWeight: 600, letterSpacing: 0.5, background: alpha.mintSoft, color: colors.mintD, border: `1px solid ${alpha.mintLine}` }}>{c}</span>
        ))}
      </div>

      {/* Dark mock */}
      <feat.Mock />
    </div>
  )
}

/* ── Section ─────────────────────────────── */
export default function Features() {
  return (
    <section id="features" style={{ padding: '80px 20px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <SectionHead
          eyebrow="Core Features"
          title="Three features.<br/>One closed loop."
          sub="Gift cards in. USDT credited. Naira in your bank. Salary locked until you've earned it."
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 48 }}>
          {FEATURES.map((f, i) => <FeatureCard key={i} feat={f} delay={i * 0.08} />)}
        </div>
      </div>
    </section>
  )
}
