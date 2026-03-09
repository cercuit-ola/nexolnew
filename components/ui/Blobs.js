// Ambient floating gradient blobs — fixed behind all content
export default function Blobs() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0,
      pointerEvents: 'none', overflow: 'hidden',
    }}>
      {/* Top-right blob */}
      <div className="blob1" style={{
        position: 'absolute',
        width: 500, height: 500,
        top: -150, right: -100,
        borderRadius: '50%',
        background: 'radial-gradient(circle, #00D98B, transparent 65%)',
        filter: 'blur(80px)',
        opacity: 0.35,
      }} />

      {/* Bottom-left blob */}
      <div className="blob2" style={{
        position: 'absolute',
        width: 400, height: 400,
        bottom: '10%', left: -100,
        borderRadius: '50%',
        background: 'radial-gradient(circle, #00B674, transparent 65%)',
        filter: 'blur(80px)',
        opacity: 0.35,
      }} />

      {/* Center subtle blob */}
      <div className="blob3" style={{
        position: 'absolute',
        width: 300, height: 300,
        top: '50%', left: '50%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, #00D98B, transparent 65%)',
        filter: 'blur(80px)',
        opacity: 0.12,
      }} />
    </div>
  )
}
