'use client'
import { useState } from 'react'
import { useReveal } from '@/lib/useReveal'
import { colors, alpha, fonts, shadows } from '@/lib/tokens'

const TRUST_PILLS = ['🔒 Encrypted', '🌍 Built for Africa', '⚡ Launching Q3 2025', '📩 No spam']

export default function Waitlist() {
  const [email,  setEmail]  = useState('')
  const [status, setStatus] = useState('idle') // idle | error | success

  const ref = useReveal()

  function submit() {
    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 1800)
      return
    }
    setStatus('success')
    setEmail('')
    setTimeout(() => setStatus('idle'), 4000)
  }

  const boxBorder =
    status === 'error'   ? '#ff6b6b' :
    status === 'success' ? colors.mint :
    alpha.mintLine

  const boxShadow =
    status === 'error'   ? '0 0 0 4px rgba(255,107,107,0.12)' :
    status === 'success' ? `0 0 0 4px rgba(0,217,139,0.12)` :
    shadows.sm

  return (
    <section id="waitlist" style={{ padding: '80px 20px 100px', textAlign: 'center', position: 'relative', zIndex: 1, fontFamily: fonts.body }}>
      <div ref={ref} style={{ maxWidth: 460, margin: '0 auto' }}>

        {/* Eyebrow */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: fonts.mono, fontSize: 9, fontWeight: 600, color: colors.mintD, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 24, padding: '4px 12px', borderRadius: 100, background: alpha.mintSoft, border: `1px solid ${alpha.mintLine}` }}>
          Early Access
        </div>

        {/* Heading */}
        <h2 style={{ fontFamily: fonts.display, fontSize: 'clamp(34px,9vw,56px)', fontWeight: 800, letterSpacing: -2, lineHeight: 1.03, color: colors.ink, marginBottom: 16 }}>
          Your salary.<br />Finally working<br />
          <em style={{ fontStyle: 'normal', color: colors.mintD }}>for you.</em>
        </h2>

        <p style={{ fontSize: 16, color: colors.slate, fontWeight: 300, lineHeight: 1.65, marginBottom: 36 }}>
          Be among the first when NexolPay launches in Lagos. No spam. Just your spot in line.
        </p>

        {/* Form box */}
        <div style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(16px)', border: `1.5px solid ${boxBorder}`, borderRadius: 20, padding: 20, marginBottom: 20, boxShadow, transition: 'border-color 0.3s, box-shadow 0.3s' }}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
            style={{ width: '100%', padding: '12px 16px', border: `1.5px solid ${alpha.mintLine}`, borderRadius: 12, background: 'rgba(255,255,255,0.8)', color: colors.ink, fontFamily: fonts.body, fontSize: 15, outline: 'none', marginBottom: 10 }}
          />
          <button
            onClick={submit}
            style={{
              width: '100%', padding: 15, borderRadius: 12,
              background: status === 'success'
                ? `linear-gradient(135deg,${colors.mintB},${colors.mintD})`
                : `linear-gradient(135deg,${colors.mint},${colors.mintB})`,
              color: colors.ink,
              fontFamily: fonts.display, fontSize: 15, fontWeight: 700,
              border: 'none', cursor: 'pointer', letterSpacing: 0.3,
              boxShadow: `0 6px 24px ${alpha.mintGlow}`,
              transition: 'all 0.25s',
            }}
          >
            {status === 'success' ? "✓ You're on the list!" : 'Get Early Access →'}
          </button>
        </div>

        {/* Trust pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
          {TRUST_PILLS.map(t => (
            <div key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 100, background: 'rgba(255,255,255,0.6)', border: `1px solid ${alpha.mintLine}`, fontSize: 11, color: colors.muted, backdropFilter: 'blur(8px)' }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
