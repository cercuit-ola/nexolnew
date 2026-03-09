import { colors, alpha, fonts } from '@/lib/tokens'

const ITEMS = [
  ['⬆', '$900M',   'Nigeria gift card market annually'],
  ['⚡', '60s',     'automated redemption pipeline'],
  ['⬆', '$400M',   'monthly P2P crypto volume NG'],
  ['📊', '57%',     'salary spent in week 1'],
  ['🔒', '6.1%',   'APY on 1-year vault lock'],
  ['⬇', '$0.001', 'avg transaction fee on Base'],
  ['⬆', '20%',    'flat platform redemption fee'],
  ['⚡', '2s',     'Base L2 block finality'],
]

// Double for seamless infinite loop
const doubled = [...ITEMS, ...ITEMS]

export default function Ticker() {
  return (
    <div style={{
      overflow: 'hidden', padding: '16px 0',
      borderTop: `1px solid ${alpha.mintLine}`,
      borderBottom: `1px solid ${alpha.mintLine}`,
      background: 'rgba(255,255,255,0.5)',
      backdropFilter: 'blur(8px)',
      position: 'relative', zIndex: 1,
    }}>
      <div className="ticker-track">
        {doubled.map(([arr, val, lbl], i) => (
          <div key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '0 32px',
            fontFamily: fonts.mono, fontSize: 11,
            borderRight: `1px solid ${alpha.mintLine}`,
            whiteSpace: 'nowrap',
          }}>
            <span style={{ color: colors.mint }}>{arr}</span>
            <span style={{ fontWeight: 700, color: colors.mintD }}>{val}</span>
            <span style={{ color: colors.muted }}>{lbl}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
