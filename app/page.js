import Nav        from '@/components/sections/Nav'
import Hero       from '@/components/sections/Hero'
import Ticker     from '@/components/sections/Ticker'
import Stats      from '@/components/sections/Stats'
import Features   from '@/components/sections/Features'
import HowItWorks from '@/components/sections/HowItWorks'
import Calculator from '@/components/sections/Calculator'
import BaseSection from '@/components/sections/BaseSection'
import Pricing    from '@/components/sections/Pricing'
import Waitlist   from '@/components/sections/Waitlist'
import Footer     from '@/components/sections/Footer'
import Blobs      from '@/components/ui/Blobs'

export default function Home() {
  return (
    <>
      {/* Fixed ambient background */}
      <Blobs />

      {/* Page */}
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Stats />
        <Features />
        <HowItWorks />
        <Calculator />
        <BaseSection />
        <Pricing />
        <Waitlist />
      </main>
      <Footer />
    </>
  )
}
