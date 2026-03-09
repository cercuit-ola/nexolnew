import { colors, alpha, fonts } from '@/lib/tokens'

/* ── Shared micro styles ──────────────────── */
const mono = { fontFamily: fonts.mono }
const display = { fontFamily: fonts.display }

/* ═══════════════════════════════════════════
   DASHBOARD SCREEN
═══════════════════════════════════════════ */
export function DashboardScreen() {
  return (
    <>
      <div style={{ ...mono, fontSize: 7, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(0,217,139,0.6)', marginBottom: 4 }}>
        Total Balance
      </div>
      <div style={{ ...display, fontSize: 26, fontWeight: 800, color: colors.mint, letterSpacing: -1, lineHeight: 1 }}>
        $1,250.00
      </div>
      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginBottom: 10, marginTop: 3 }}>
        ≈ ₦1,993,750
      </div>

      {/* Wallet row */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
        {[['USDC', '$820.00'], ['NGN', '₦685,000']].map(([l, v]) => (
          <div key={l} style={{ flex: 1, padding: '6px 8px', background: 'rgba(0,217,139,0.08)', border: '1px solid rgba(0,217,139,0.12)', borderRadius: 8 }}>
            <div style={{ ...mono, fontSize: 6, color: 'rgba(255,255,255,0.35)', letterSpacing: 1 }}>{l} Wallet</div>
            <div style={{ ...mono, fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Action icons */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
        {[['⇄', 'Swap'], ['＋', 'Deposit'], ['🎁', 'Card'], ['📋', 'Bills']].map(([ico, lbl]) => (
          <div key={lbl} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <div style={{ width: 26, height: 26, borderRadius: 8, background: 'rgba(0,217,139,0.1)', border: '1px solid rgba(0,217,139,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>{ico}</div>
            <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>{lbl}</div>
          </div>
        ))}
      </div>

      {/* Transactions */}
      {[['Amazon Giftcard', '+$80.00', colors.mint], ['USDC → NGN', '-$200.00', '#ff6b6b'], ['Apple Giftcard', '+$40.00', colors.mint]].map(([n, a, c]) => (
        <div key={n} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.6)' }}>{n}</span>
          <span style={{ ...mono, fontSize: 8, fontWeight: 600, color: c }}>{a}</span>
        </div>
      ))}
    </>
  )
}

/* ═══════════════════════════════════════════
   GIFT CARDS SCREEN
═══════════════════════════════════════════ */
export function GiftCardsScreen() {
  const cards = [
    { brand: 'Amazon',      rate: '₦1,550/$1', bg: 'linear-gradient(135deg,#FF9900,#F90)' },
    { brand: 'Apple',       rate: '₦1,520/$1', bg: 'linear-gradient(135deg,#1d1d1f,#3a3a3a)' },
    { brand: 'Google Play', rate: '₦1,480/$1', bg: 'linear-gradient(135deg,#01875f,#34A853)' },
    { brand: 'Netflix',     rate: '₦1,500/$1', bg: 'linear-gradient(135deg,#E50914,#B20710)' },
  ]

  return (
    <>
      <div style={{ ...display, fontSize: 11, fontWeight: 700, color: '#fff', textAlign: 'center', marginBottom: 10 }}>
        Buy Gift Cards
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
        {cards.map(c => (
          <div key={c.brand} style={{ borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ padding: 8, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: 52, background: c.bg }}>
              <div style={{ ...display, fontSize: 7, fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>{c.brand}</div>
              <div style={{ ...mono, fontSize: 6, color: 'rgba(255,255,255,0.6)', marginTop: 1 }}>{c.rate}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

/* ═══════════════════════════════════════════
   VAULT SCREEN
═══════════════════════════════════════════ */
export function VaultScreen() {
  const weeks = [
    { label: 'WEEK 1 · JAN 6',  date: 'Available now',    val: '$250 ✓',  live: true },
    { label: 'WEEK 2 · JAN 13', date: 'Unlocks Monday',   val: '🔒 $250', live: false },
    { label: 'WEEK 3 · JAN 20', date: 'In 2 weeks',       val: '🔒 $250', live: false },
    { label: 'WEEK 4 · JAN 27', date: 'In 3 weeks',       val: '🔒 $250', live: false },
  ]

  return (
    <>
      <div style={{ ...display, fontSize: 10, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
        NexolPay Vault
      </div>
      {weeks.map(w => (
        <div key={w.label} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '7px 8px', borderRadius: 8, marginBottom: 5,
          background: w.live ? 'rgba(0,217,139,0.1)' : 'rgba(255,255,255,0.02)',
          border: `1px solid ${w.live ? 'rgba(0,217,139,0.22)' : 'rgba(255,255,255,0.05)'}`,
        }}>
          <div>
            <div style={{ ...mono, fontSize: 7, color: w.live ? colors.mint : 'rgba(255,255,255,0.25)', letterSpacing: 1 }}>{w.label}</div>
            <div style={{ fontSize: 8, color: w.live ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)', marginTop: 1 }}>{w.date}</div>
          </div>
          <div style={{ ...mono, fontSize: 10, fontWeight: 700, color: w.live ? colors.mint : 'rgba(255,255,255,0.2)' }}>{w.val}</div>
        </div>
      ))}
      <div style={{ padding: '7px 8px', borderRadius: 8, background: 'rgba(0,217,139,0.07)', border: '1px solid rgba(0,217,139,0.13)', fontSize: 8, color: colors.mint, marginTop: 4 }}>
        📈 1-year lock earns <strong style={mono}>6.1% APY</strong> on Base
      </div>
    </>
  )
}
