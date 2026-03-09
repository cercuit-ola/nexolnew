'use client'
import { useReveal } from '@/lib/useReveal'
import SectionHead from '@/components/ui/SectionHead'
import { colors, alpha, fonts } from '@/lib/tokens'

const STEPS = [
  { n: '01', title: 'Create your account',    body: 'Sign up with your phone number, complete KYC with BVN/NIN. Your embedded Base wallet is created automatically — no seed phrase required.' },
  { n: '02', title: 'Deposit or redeem',       body: 'Add USDC directly or upload an Amazon / Apple gift card. Automated pipeline verifies and credits your wallet in under 60 seconds.' },
  { n: '03', title: 'Schedule your money',     body: 'Choose your payout rhythm. Weekly allowances, monthly, 6-month or 1-year vault lock. Funds are hard-locked on Base — mathematically unavailable until your date.' },
  { n: '04', title: 'Receive automatically',   body: 'Every Monday your allowance unlocks. Longer locks earn yield. Off-ramp to your Naira bank account anytime. You just live your life.' },
]

export default function HowItWorks() {
  const stepsRef = useReveal()

  return (
    <section id="howitworks" style={{
      padding: '80px 20px',
      background: 'rgba(255,255,255,0.4)',
      backdropFilter: 'blur(8px)',
      position: 'relative', zIndex: 1,
      fontFamily: fonts.body,
    }}>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <SectionHead
          eyebrow="Process"
          title="Simple enough<br/>to start today."
          sub="Four steps. Fully automated after setup."
        />

        {/* Steps */}
        <div ref={stepsRef} style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: 40, position: 'relative' }}>
          {/* Spine line */}
          <div style={{ position: 'absolute', left: 20, top: 28, bottom: 28, width: 2, background: `linear-gradient(to bottom,${colors.mint},${colors.mintB},${colors.mint})`, borderRadius: 2 }} />

          {STEPS.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 20, paddingBottom: i < STEPS.length - 1 ? 32 : 0, position: 'relative' }}>
              {/* Circle number */}
              <div style={{
                width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
                background: '#F2FDF8',
                border: `2px solid ${colors.mint}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, color: colors.mintD,
                boxShadow: `0 0 0 6px rgba(0,217,139,0.08), 0 4px 16px rgba(0,217,139,0.2)`,
                position: 'relative', zIndex: 1,
              }}>
                {s.n}
              </div>

              {/* Text */}
              <div style={{ paddingTop: 10 }}>
                <div style={{ fontFamily: fonts.display, fontSize: 17, fontWeight: 700, color: colors.ink, marginBottom: 6 }}>{s.title}</div>
                <div style={{ fontSize: 14, color: colors.slate, lineHeight: 1.65, fontWeight: 300 }}>{s.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
