import Phone from '@/components/phone/Phone'
import { colors, alpha, fonts } from '@/lib/tokens'

export default function Hero() {
  return (
    <section id="top" style={{
      minHeight: '100svh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '100px 20px 60px',
      textAlign: 'center',
      position: 'relative', zIndex: 1,
      fontFamily: fonts.body,
      overflow: 'hidden',
    }}>

      {/* Faint grid lines */}
      {[20, 40, 60, 80].map(t => (
        <div key={`h${t}`} style={{ position: 'absolute', width: '100%', height: 1, top: `${t}%`, background: 'rgba(0,182,116,0.055)', pointerEvents: 'none' }} />
      ))}
      {[25, 50, 75].map(l => (
        <div key={`v${l}`} style={{ position: 'absolute', height: '100%', width: 1, left: `${l}%`, background: 'rgba(0,182,116,0.055)', pointerEvents: 'none' }} />
      ))}

      {/* Eyebrow */}
      <div className="hero-eyebrow" style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '6px 16px', borderRadius: 100,
        background: alpha.mintSoft, border: `1px solid ${alpha.mintLine}`,
        fontFamily: fonts.mono,
        fontSize: 10, fontWeight: 600, color: colors.mintD,
        letterSpacing: '2px', textTransform: 'uppercase',
        marginBottom: 24,
      }}>
        <span className="dot-breathe" style={{ width: 6, height: 6, borderRadius: '50%', background: colors.mint, display: 'inline-block' }} />
        Financial Infrastructure · West Africa
      </div>

      {/* H1 */}
      <h1 className="hero-h1" style={{
        fontFamily: fonts.display,
        fontSize: 'clamp(42px, 10vw, 76px)',
        fontWeight: 800, lineHeight: 1.04,
        letterSpacing: '-2.5px', color: colors.ink,
        marginBottom: 20,
      }}>
        Redeem.<br />Convert.<br />
        <span style={{
          background: `linear-gradient(135deg,${colors.mintB},${colors.mint})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>Move.</span>
      </h1>

      {/* Subheading */}
      <p className="hero-sub" style={{
        fontSize: 'clamp(15px, 3.5vw, 18px)', fontWeight: 300, color: colors.slate,
        lineHeight: 1.75, maxWidth: 520, margin: '0 auto 36px',
      }}>
        Gift cards to USDT in{' '}
        <strong style={{ color: colors.ink, fontWeight: 500 }}>60 seconds.</strong>{' '}
        Crypto off-ramp to your bank account.
        Income scheduler that{' '}
        <strong style={{ color: colors.ink, fontWeight: 500 }}>locks your salary</strong>{' '}
        until you earn access to it.
      </p>

      {/* CTA buttons */}
      <div className="hero-btns" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 40 }}>
        <a href="#waitlist" style={{
          padding: '15px 30px', borderRadius: 100,
          background: `linear-gradient(135deg,${colors.mint},${colors.mintB})`,
          color: '#fff', fontFamily: fonts.display, fontSize: 15, fontWeight: 700,
          textDecoration: 'none', letterSpacing: 0.3,
          boxShadow: `0 8px 32px ${alpha.mintGlow}`,
        }}>
          Join the Waitlist →
        </a>
        <a href="#features" style={{
          padding: '15px 28px', borderRadius: 100,
          background: 'rgba(255,255,255,0.7)', color: colors.mintD,
          border: `1.5px solid ${alpha.mintLine}`,
          fontFamily: fonts.display, fontSize: 15, fontWeight: 600,
          textDecoration: 'none', backdropFilter: 'blur(8px)',
        }}>
          See Features
        </a>
      </div>

      {/* Trust row */}
      <div className="hero-trust" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
        {['⚡ 60s redemption', '🔒 Hard-lock savings', '🌍 Built for Africa'].map((t, i, arr) => (
          <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: colors.muted }}>{t}</span>
            {i < arr.length - 1 && (
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: colors.dim }} />
            )}
          </span>
        ))}
      </div>

      {/* Phone stack */}
      <div className="hero-phones" style={{
        marginTop: 60, position: 'relative',
        height: 360, display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
      }}>
        <Phone type="giftcards" size="left" />
        <Phone type="dashboard" size="center" />
        <Phone type="vault"     size="right" />

        {/* Glow under phones */}
        <div style={{
          position: 'absolute', bottom: -20, left: '50%', transform: 'translateX(-50%)',
          width: 280, height: 60,
          background: 'radial-gradient(ellipse,rgba(0,217,139,0.3),transparent 70%)',
          filter: 'blur(20px)', pointerEvents: 'none', zIndex: 1,
        }} />
      </div>
    </section>
  )
}
