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
