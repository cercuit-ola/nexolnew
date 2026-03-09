'use client'
import { useReveal } from '@/lib/useReveal'
import { colors, fonts } from '@/lib/tokens'

const METRICS = [
  { val: '$0.001', lbl: 'Avg tx fee on Base' },
  { val: '2s',     lbl: 'Block finality'     },
  { val: '6.1%',   lbl: 'APY 1-yr vault'    },
]

export default function BaseSection() {
  const ref = useReveal()

  return (
    <section style={{
      background: 'linear-gradient(160deg,#061C14,#0A2A1A)',
      padding: '80px 20px',
      position: 'relative', overflow: 'hidden', zIndex: 1,
      fontFamily: fonts.body,
    }}>
      {/* Radial overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 0%,rgba(0,217,139,0.08),transparent 60%)', pointerEvents: 'none' }} />

      <div ref={ref} style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Pill */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 18px', borderRadius: 100, border: '1px solid rgba(0,217,139,0.2)', background: 'rgba(0,217,139,0.06)', fontFamily: fonts.mono, fontSize: 9, color: colors.mint, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 28 }}>
          ⬡ Powered by Base · Coinbase L2
        </div>

        <h2 style={{ fontFamily: fonts.display, fontSize: 'clamp(30px,8vw,46px)', fontWeight: 800, letterSpacing: -1.5, color: '#fff', lineHeight: 1.07, marginBottom: 16 }}>
          Institutional infrastructure.<br />Consumer simplicity.
        </h2>

        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.72, fontWeight: 300, marginBottom: 48 }}>
          Every transaction — redemptions, off-ramps, vault locks, yield payouts — settles on Base. $0.001 fees. 2-second finality. Your users never see a seed phrase.
        </p>

        {/* Metric row */}
        <div style={{ display: 'flex', gap: 2 }}>
          {METRICS.map((m, i) => (
            <div key={i} style={{
              flex: 1, padding: '24px 16px', textAlign: 'center',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(0,217,139,0.08)',
              borderRadius: i === 0 ? '16px 0 0 16px' : i === 2 ? '0 16px 16px 0' : 0,
            }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 28, fontWeight: 700, color: colors.mint, letterSpacing: -1, lineHeight: 1, marginBottom: 6 }}>{m.val}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', lineHeight: 1.4 }}>{m.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
