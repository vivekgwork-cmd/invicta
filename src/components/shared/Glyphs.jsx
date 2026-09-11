export function Arrow({ className = '' }) {
  return (
    <span aria-hidden="true" className={`inline-block transition-transform duration-300 group-hover:translate-x-1 ${className}`}>
      →
    </span>
  )
}

export function Burger({ open, className = '' }) {
  return (
    <span className={`relative inline-flex flex-col justify-center items-center w-5 h-4 ${className}`} aria-hidden="true">
      <span
        className="absolute h-px w-5 bg-current transition-all duration-300"
        style={{ transform: open ? 'rotate(45deg)' : 'translateY(-6px)' }}
      />
      <span className="absolute h-px w-5 bg-current transition-all duration-200" style={{ opacity: open ? 0 : 1 }} />
      <span
        className="absolute h-px w-5 bg-current transition-all duration-300"
        style={{ transform: open ? 'rotate(-45deg)' : 'translateY(6px)' }}
      />
    </span>
  )
}

export function PlusMinus({ open, className = '' }) {
  return (
    <span className={`relative inline-flex items-center justify-center w-4 h-4 shrink-0 ${className}`} aria-hidden="true">
      <span className="absolute h-px w-4 bg-current" />
      <span
        className="absolute h-4 w-px bg-current transition-transform duration-300"
        style={{ transform: open ? 'scaleY(0)' : 'scaleY(1)' }}
      />
    </span>
  )
}

export function Check({ className = '' }) {
  return (
    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full shrink-0 ${className}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.5l4.5 4.5L19 7" />
      </svg>
    </span>
  )
}

export function Stars({ count = 5, className = '' }) {
  return (
    <span className={`text-gold tracking-[1px] ${className}`} aria-hidden="true">
      {'★'.repeat(count)}
    </span>
  )
}

export function Logo({ className = '' }) {
  return (
    <span className={`font-display font-semibold tracking-tight ${className}`}>
      Invicta<span className="text-accent">.</span>
    </span>
  )
}

const iconPaths = {
  duration: 'M12 7v5l3.5 2M21 12a9 9 0 1 1-9-9 9 9 0 0 1 9 9Z',
  scholarship: 'M12 3 3 7.5 12 12l9-4.5L12 3ZM3 12l9 4.5 9-4.5M3 16.5l9 4.5 9-4.5',
  fee: 'M12 2v20M17 5.5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  immersion: 'M3.5 19h17M5 19V9.5L12 5l7 4.5V19M9.5 19v-5h5v5',
  intake: 'M7 3v3M17 3v3M4 8.5h16M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z',
  curriculum: 'M7 3h7l4 4v14H7Z M14 3v4h4 M9.5 12h5 M9.5 15.5h5',
  faculty: 'M12 3 2 8l10 5 10-5-10-5Z M6 10.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-5.5',
  degree: 'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z M8.7 10.3 6.2 21l5.8-3 5.8 3-2.5-10.7',
  career: 'M3 17 9.5 10.5l4 4 7.5-7.5 M17.5 6.5H21v3.5',
}

export function ProofIcon({ name, className = '' }) {
  const d = iconPaths[name]
  if (!d) return null
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

/** Centered "PLAY REEL"-style pill, revealed on hover over an image/video — per the
 * coachsportifcublens.com reference: applied wherever a photo or video sits on the page. */
export function PlayPill({ label = 'Play Reel', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 rounded-full bg-white pl-2.5 pr-5 py-2 shadow-xl ${className}`}>
      <span className="grid place-items-center w-7 h-7 rounded-full bg-primary text-white shrink-0">
        <span className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-current ml-0.5" />
      </span>
      <span className="text-xs font-semibold text-primary uppercase tracking-wide whitespace-nowrap">{label}</span>
    </span>
  )
}
