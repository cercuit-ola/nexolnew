'use client'
import { useReveal } from '@/lib/useReveal'
import { colors, alpha, fonts } from '@/lib/tokens'

/**
 * Reusable section eyebrow + heading + optional lead paragraph.
 * @param {string}  eyebrow   Small label above the heading
 * @param {string}  title     Main heading (HTML string supported)
 * @param {string}  [sub]     Optional lead paragraph
 * @param {boolean} [center]  Center-align everything
 */
export default function SectionHead({ eyebrow, title, sub, center = false }) {
  const ref = useReveal()

  return (
    <div ref={ref} style={{ textAlign: center ? 'center' : 'left' }}>
      {/* Eyebrow pill */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        fontFamily: fonts.mono,
        fontSize: 9, fontWeight: 600, color: colors.mintD,
        letterSpacing: '2.5px', textTransform: 'uppercase',
        marginBottom: 16,
        padding: '4px 12px', borderRadius: 100,
        background: alpha.mintSoft, border: `1px solid ${alpha.mintLine}`,
      }}>
        {eyebrow}
      </div>

      {/* Heading */}
      <h2
        style={{
          fontFamily: fonts.display,
          fontSize: 'clamp(30px, 7vw, 46px)',
          fontWeight: 800, letterSpacing: '-1.5px',
          lineHeight: 1.07, color: colors.ink, marginBottom: 14,
        }}
        dangerouslySetInnerHTML={{ __html: title }}
      />

      {/* Optional sub */}
      {sub && (
        <p style={{
          fontSize: 16, fontWeight: 300, color: colors.slate,
          lineHeight: 1.75,
          maxWidth: center ? 520 : 580,
          margin: center ? '0 auto' : undefined,
          fontFamily: fonts.body,
        }}>
          {sub}
        </p>
      )}
    </div>
  )
}
