const SLICES = 14

// Small flag on a pole that waves in the wind. The flag image is cut into vertical slices that bob
// out of phase, and each slice moves further than the one before so the edge by the pole stays put.
export default function WavingFlag({ src, ratio = 1.5, height = 26, label }) {
  const width = Math.round(height * ratio)
  const slice = width / SLICES

  return (
    <span role="img" aria-label={label} className="relative inline-flex items-start pl-[3px]">
      <span className="absolute left-0 -top-1 w-[3px] h-[calc(100%+14px)] rounded-full bg-gradient-to-b from-slate-300 to-slate-500" />
      <span className="flex drop-shadow-sm" style={{ width, height }}>
        {Array.from({ length: SLICES }, (_, i) => (
          <span
            key={i}
            className="flag-wave h-full shrink-0"
            style={{
              // A hair of overlap stops seams showing between the moving slices.
              width: slice + 0.5,
              marginRight: -0.5,
              backgroundImage: `url(${src})`,
              backgroundSize: `${width}px ${height}px`,
              backgroundPosition: `${-i * slice}px 0`,
              animationDelay: `${-i * 0.09}s`,
              '--flag-amp': `${((i + 1) / SLICES) * 2.5}px`,
            }}
          />
        ))}
      </span>
    </span>
  )
}
