'use client'
import { useReveal } from '@/lib/useReveal'
import SectionHead from '@/components/ui/SectionHead'
import { colors, alpha, fonts, shadows } from '@/lib/tokens'

const PLANS = [
  {
    name: 'Free', price: '0', hot: false,
    desc: 'Start building better financial habits today.',
    feats: [
      'Weekly income scheduling',
      '1 active savings vault',
      'Basic USDC off-ramp',
      'Transaction history',
    ],
  },
  {
    name: 'Pro', price: '3', hot: true,
    desc: 'The full NexolPay experience. Every feature unlocked.',
    feats: [
      'Unlimited savings vaults',
      'Gift card redemption (Amazon + Apple)',
      'Virtual spend card',
      '6-month vault · 4.2% APY yield',
      '1-year vault · 6.1% APY yield',
      'Priority off-ramp payouts',
    ],
  },
]

function PlanCard({ plan, delay }) {
  const ref = useReveal(delay)

  return (
    <div ref={ref} className="card-hover" style={{
      flex: 1,
      background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(16px)',
      border: `1px solid ${plan.hot ? colors.mint : alpha.cardBorder}`,
      borderRadius: 24, padding: 28, position: 'relative',
      boxShadow: plan.hot
        ? `0 0 0 1px ${colors.mint}, ${shadows.lg}, 0 0 40px rgba(0,217,139,0.12)`
        : shadows.sm,
    }}>
      {plan.hot && (
        <div style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', background: `linear-gradient(90deg,${colors.mint},${colors.mintB})`, color: colors.ink, fontFamily: fonts.display, fontSize: 10, fontWeight: 700, padding: '5px 18px', borderRadius: 100, whiteSpace: 'nowrap', letterSpacing: 0.5 }}>
          Most Popular
        </div>
      )}

      <div style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 600, color: colors.muted, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 8 }}>{plan.name}</div>

      <div style={{ fontFamily: fonts.mono, fontSize: 52, fontWeight: 700, color: colors.ink, letterSpacing: -3, lineHeight: 1, marginBottom: 6 }}>
        <sup style={{ fontSize: 22 }}>$</sup>{plan.price}
        <span style={{ fontSize: 15, color: colors.muted, fontWeight: 400, letterSpacing: 0, fontFamily: fonts.body }}>/mo</span>
      </div>

      <div style={{ fontSize: 13, color: colors.slate, marginBottom: 22, lineHeight: 1.6, fontFamily: fonts.body }}>{plan.desc}</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
        {plan.feats.map(f => (
          <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: colors.slate, fontFamily: fonts.body }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: alpha.mintSoft, border: `1px solid ${alpha.mintLine}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: colors.mintD, flexShrink: 0, fontWeight: 700 }}>✓</div>
            {f}
          </div>
        ))}
      </div>

      <a href="#waitlist" style={{
        display: 'block', width: '100%', padding: 14, borderRadius: 100, textAlign: 'center',
        fontFamily: fonts.display, fontSize: 14, fontWeight: 700, textDecoration: 'none', letterSpacing: 0.3,
        background: plan.hot ? `linear-gradient(135deg,${colors.mint},${colors.mintB})` : 'transparent',
        color: plan.hot ? colors.ink : colors.mintD,
        border: plan.hot ? 'none' : `1.5px solid ${alpha.mintLine}`,
        boxShadow: plan.hot ? `0 6px 24px ${alpha.mintGlow}` : 'none',
      }}>
        {plan.hot ? 'Join Waitlist →' : 'Get Started Free'}
      </a>
    </div>
  )
}

export default function Pricing() {
  return (
    <section id="pricing" style={{ padding: '80px 20px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <SectionHead
          eyebrow="Pricing"
          title="Straightforward.<br/>No hidden fees."
          center
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 40 }}>
          {PLANS.map((p, i) => <PlanCard key={i} plan={p} delay={i * 0.1} />)}
        </div>

        <p style={{ fontSize: 12, color: colors.muted, textAlign: 'center', marginTop: 16, lineHeight: 1.6, fontFamily: fonts.body }}>
          Gift card redemptions charged at 20% per transaction on all plans.<br />
          Yield powered by Aave on Base L2.
        </p>
      </div>
    </section>
  )
}
