'use client'
import { useState } from 'react'
import { useReveal } from '@/lib/useReveal'
import SectionHead from '@/components/ui/SectionHead'
import { colors, alpha, fonts, shadows } from '@/lib/tokens'

const fmt = (n) =>
  '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })

const WEEKS = [
  { label: 'Week 1 — Unlocked', sub: 'Available Monday',   ico: '✅', live: true  },
  { label: 'Week 2',            sub: 'Unlocks next Monday', ico: '🔒', live: false },
  { label: 'Week 3',            sub: 'Unlocks in 2 weeks',  ico: '🔒', live: false },
  { label: 'Week 4',            sub: 'Unlocks in 3 weeks',  ico: '🔒', live: false },
]

export default function Calculator() {
  const [income, setIncome] = useState(1000)
  const ref = useReveal(0.1)
  const weekly = income / 4

  return (
    <section style={{ padding: '80px 20px', position: 'relative', zIndex: 1, fontFamily: fonts.body }}>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <SectionHead
          eyebrow="Income Scheduler"
          title="The only budget<br/>that enforces itself."
          sub="Type your monthly income. See exactly what unlocks each Monday. Zero willpower required."
        />

        <div ref={ref} style={{
          background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(16px)',
          border: `1px solid ${alpha.cardBorder}`, borderRadius: 24,
          padding: 28, boxShadow: shadows.sm, marginTop: 36,
        }}>
          {/* Input */}
          <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', color: colors.muted, marginBottom: 12 }}>
            My monthly income is
          </div>
          <div style={{ display: 'flex', border: `1.5px solid ${alpha.mintLine}`, borderRadius: 14, overflow: 'hidden', marginBottom: 24, background: 'rgba(255,255,255,0.8)' }}>
            <div style={{ padding: '12px 16px', fontFamily: fonts.display, fontSize: 24, fontWeight: 800, color: colors.mintD, borderRight: `1.5px solid ${alpha.mintLine}` }}>$</div>
            <input
              type="number"
              value={income}
              min={10} max={999999}
              onChange={e => setIncome(Math.max(0, parseFloat(e.target.value) || 0))}
              style={{ flex: 1, padding: '12px 14px', border: 'none', outline: 'none', background: 'transparent', fontFamily: fonts.mono, fontSize: 24, fontWeight: 700, color: colors.ink }}
            />
          </div>

          {/* Week rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {WEEKS.map((w, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 16px', borderRadius: 14,
                background: w.live ? 'rgba(0,217,139,0.1)' : 'rgba(255,255,255,0.5)',
                border: `1.5px solid ${w.live ? 'rgba(0,217,139,0.25)' : alpha.mintLine}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 18 }}>{w.ico}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: w.live ? colors.ink : colors.muted }}>{w.label}</div>
                    <div style={{ fontSize: 10, color: colors.dim, marginTop: 1 }}>{w.sub}</div>
                  </div>
                </div>
                <div style={{ fontFamily: fonts.mono, fontSize: 17, fontWeight: 700, color: w.live ? colors.mintD : colors.dim }}>
                  {fmt(weekly)}
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <div style={{ textAlign: 'center', fontSize: 11, color: colors.muted, marginTop: 16, lineHeight: 1.6 }}>
            6-month lock earns <strong style={{ color: colors.mintD }}>4.2% APY</strong> · 1-year lock earns <strong style={{ color: colors.mintD }}>6.1% APY</strong> via Aave on Base
          </div>
        </div>
      </div>
    </section>
  )
}
