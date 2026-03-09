'use client'
import { useReveal } from '@/lib/useReveal'
import SectionHead from '@/components/ui/SectionHead'
import { colors, alpha, fonts, shadows } from '@/lib/tokens'

const STATS = [
  { num: '$900M', txt: "Nigeria's annual gift card market — 73% traded through WhatsApp traders at 35–50% haircuts with zero protection.", src: 'Industry estimates, 2024' },
  { num: '57%',   txt: 'of Nigerian salary earners exhaust monthly income in week one — before bills, savings, or emergencies.',           src: 'EFInA Financial Report, 2023' },
  { num: '$400M', txt: 'monthly P2P crypto volume in Nigeria with no reliable formal offramp since the 2024 CBN-Binance shutdown.',        src: 'Chainalysis, 2024' },
]

function StatCard({ stat, delay }) {
  const ref = useReveal(delay)
  return (
    <div ref={ref} className="card-hover" style={{
      background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)',
      border: `1px solid ${alpha.cardBorder}`, borderRadius: 20,
      padding: '24px 20px', boxShadow: shadows.sm,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Mint top bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${colors.mint},${colors.mintB})`, borderRadius: '20px 20px 0 0' }} />
      <div style={{ fontFamily: fonts.mono, fontSize: 'clamp(36px,8vw,48px)', fontWeight: 700, color: colors.mintD, letterSpacing: -2, lineHeight: 1, marginBottom: 8 }}>{stat.num}</div>
      <div style={{ fontSize: 13, color: colors.slate, lineHeight: 1.55, fontFamily: fonts.body }}>{stat.txt}</div>
      <div style={{ fontSize: 10, color: colors.muted, marginTop: 6, fontStyle: 'italic', fontFamily: fonts.body }}>{stat.src}</div>
    </div>
  )
}

export default function Stats() {
  return (
    <section style={{ padding: '64px 20px 80px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <SectionHead
          eyebrow="The Problem"
          title="Africa's financial rails<br/>are broken. We're fixing them."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 12, marginTop: 48 }}>
          {STATS.map((s, i) => <StatCard key={i} stat={s} delay={i * 0.08} />)}
        </div>
      </div>
    </section>
  )
}
