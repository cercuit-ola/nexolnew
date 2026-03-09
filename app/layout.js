import './globals.css'
import './responsive.css'

export const metadata = {
  title: 'NexolPay — Redeem. Convert. Move.',
  description:
    'Gift cards to USDT in 60 seconds. Crypto off-ramp to your Nigerian bank account. Income scheduler that hard-locks your salary on Base L2.',
  keywords: 'fintech, Nigeria, gift card, USDT, crypto, offramp, savings, Base, Lagos',
  openGraph: {
    title: 'NexolPay — Redeem. Convert. Move.',
    description:
      'Gift cards to USDT in 60 seconds. Crypto off-ramp to your bank. Hard-lock savings on Base L2.',
    url: 'https://nexolpay.com',
    siteName: 'NexolPay',
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexolPay — Your income. Your rules. Your future.',
    description: 'Built for West Africa. Powered by Base L2.',
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
