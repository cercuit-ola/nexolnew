'use client'
import { useState, useEffect } from 'react'
import { colors, alpha, fonts } from '@/lib/tokens'

const NAV_LINKS = [
  { label: 'Features',     href: '#features'    },
  { label: 'How It Works', href: '#howitworks'  },
  { label: 'Pricing',      href: '#pricing'     },
]

export default function Nav() {
  const [stuck, setStuck]         = useState(false)
  const [hovered, setHovered]     = useState(null)
  const [ctaHover, setCtaHover]   = useState(false)

  useEffect(() => {
    const fn = () => setStuck(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      height: 64,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 20px',
      background: 'rgba(242,253,248,0.88)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderBottom: stuck ? `1px solid ${alpha.mintLine}` : '1px solid transparent',
      transition: 'border-color 0.4s',
      fontFamily: fonts.body,
    }}>
      {/* Logo */}
      <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10,
          background: `linear-gradient(135deg,${colors.mint},${colors.mintB})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, fontWeight: 800, color: '#fff',
          fontFamily: fonts.display,
          boxShadow: `0 4px 16px ${alpha.mintGlow}`,
          flexShrink: 0,
        }}>N</div>
        <span style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 800, color: colors.ink, letterSpacing: -0.5 }}>
          NexolPay
        </span>
      </a>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {/* Nav links — hidden on mobile */}
        {NAV_LINKS.map(l => (
          <a key={l.label} href={l.href}
            onMouseEnter={() => setHovered(l.label)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: 'none',
              fontSize: 13, fontWeight: 500, color: hovered === l.label ? colors.mintD : colors.slate,
              textDecoration: 'none', padding: '6px 12px', borderRadius: 100,
              background: hovered === l.label ? alpha.mintSoft : 'transparent',
              transition: 'all 0.2s',
              // Show on sm+ via CSS — inline styles can't do media queries
              // We use a trick: render but hide, CSS in globals shows it
            }}
            className="nav-link-item"
          >{l.label}</a>
        ))}

        {/* CTA */}
        <a href="#waitlist"
          onMouseEnter={() => setCtaHover(true)}
          onMouseLeave={() => setCtaHover(false)}
          style={{
            padding: '9px 20px', borderRadius: 100,
            background: ctaHover ? colors.mintB : colors.mint,
            color: colors.ink,
            fontFamily: fonts.display, fontSize: 13, fontWeight: 700,
            textDecoration: 'none', letterSpacing: 0.3,
            boxShadow: `0 4px 20px ${alpha.mintGlow}`,
            transform: ctaHover ? 'translateY(-1px)' : 'none',
            transition: 'all 0.25s',
          }}>
          Get Early Access
        </a>
      </div>
    </nav>
  )
}
