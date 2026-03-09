import { colors, fonts } from '@/lib/tokens'

const NAV_COLS = [
  {
    title: 'Product',
    links: ['Gift Card Redemption', 'Crypto Off-Ramp', 'Income Scheduler', 'NexolPay Vault'],
    hrefs: ['#features', '#features', '#features', '#features'],
  },
  {
    title: 'Company',
    links: ['About', 'Blog', 'Careers', 'Contact'],
    hrefs: ['#', '#', '#', '#'],
  },
  {
    title: 'Legal',
    links: ['Privacy', 'Terms', 'Cookies'],
    hrefs: ['#', '#', '#'],
  },
]

export default function Footer() {
  return (
    <footer style={{ background: colors.ink2, padding: '48px 20px 32px', fontFamily: fonts.body }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>

        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: 9, background: `linear-gradient(135deg,${colors.mint},${colors.mintB})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#fff', fontFamily: fonts.display }}>N</div>
          <span style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 800, color: '#fff' }}>NexolPay</span>
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginBottom: 32, lineHeight: 1.6 }}>
          Your income. Your rules. Your future.<br />Built on Base · Made for Africa.
        </div>

        {/* Nav columns */}
        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', marginBottom: 32 }}>
          {NAV_COLS.map(col => (
            <div key={col.title}>
              <div style={{ fontFamily: fonts.display, fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.25)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 12 }}>
                {col.title}
              </div>
              {col.links.map((l, i) => (
                <a key={l} href={col.hrefs[i]} style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', marginBottom: 8, transition: 'color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = colors.mint }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}
                >{l}</a>
              ))}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 20 }} />

        {/* Bottom row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>NexolPay © 2025 · All rights reserved</div>
          <div style={{ fontFamily: fonts.mono, fontSize: 10, color: 'rgba(255,255,255,0.18)' }}>
            Built on <em style={{ fontStyle: 'normal', color: colors.mint }}>Base</em>
            {' · '}Powered by <em style={{ fontStyle: 'normal', color: colors.mint }}>Coinbase CDP</em>
          </div>
        </div>
      </div>
    </footer>
  )
}
