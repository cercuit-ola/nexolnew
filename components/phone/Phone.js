import { DashboardScreen, GiftCardsScreen, VaultScreen } from './PhoneScreens'

const SCREEN_MAP = {
  dashboard: DashboardScreen,
  giftcards: GiftCardsScreen,
  vault:     VaultScreen,
}

/**
 * @param {'dashboard'|'giftcards'|'vault'} type
 * @param {'center'|'left'|'right'}         size
 */
export default function Phone({ type, size = 'center' }) {
  const Screen = SCREEN_MAP[type]

  const widths  = { center: 220, left: 190, right: 190 }
  const classes = { center: 'phone-center', left: 'phone-left', right: 'phone-right' }
  const transforms = {
    center: 'translateY(-20px)',
    left:   'translateX(30px) rotate(-4deg)',
    right:  'translateX(-30px) rotate(4deg)',
  }
  const zIndexes = { center: 3, left: 2, right: 2 }

  const boxShadow = size === 'center'
    ? '0 50px 100px rgba(6,28,20,0.4), 0 0 60px rgba(0,217,139,0.1), inset 0 1px 0 rgba(255,255,255,0.1)'
    : '0 40px 80px rgba(6,28,20,0.35), inset 0 1px 0 rgba(255,255,255,0.08)'

  return (
    <div
      className={classes[size]}
      style={{
        width: widths[size],
        background: 'linear-gradient(160deg,#0C2E20,#061C14)',
        borderRadius: 32,
        border: '1px solid rgba(0,217,139,0.18)',
        overflow: 'hidden',
        flexShrink: 0,
        boxShadow,
        transform: transforms[size],
        zIndex: zIndexes[size],
        paddingBottom: 16,
      }}
    >
      {/* Notch */}
      <div style={{ width: 80, height: 22, background: '#020D0A', borderRadius: '0 0 14px 14px', margin: '8px auto 0' }} />

      {/* Status bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'JetBrains Mono',monospace", fontSize: 8, color: 'rgba(255,255,255,0.35)', margin: '10px 12px 0' }}>
        <span>9:41</span><span>▲▲▲</span>
      </div>

      {/* Screen content */}
      <div style={{ padding: '6px 12px 0' }}>
        <Screen />
      </div>
    </div>
  )
}
