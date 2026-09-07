import { useEffect, useMemo, useState } from 'react'

function getParts(target) {
  const diff = Math.max(0, target.getTime() - Date.now())
  const totalSeconds = Math.floor(diff / 1000)
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

export default function Countdown({ target, className = '', unitClassName = '', labelClassName = '' }) {
  const targetDate = useMemo(() => (target instanceof Date ? target : new Date(target)), [target])
  const [parts, setParts] = useState(() => getParts(targetDate))

  useEffect(() => {
    const id = setInterval(() => setParts(getParts(targetDate)), 1000)
    return () => clearInterval(id)
  }, [targetDate])

  const units = [
    { value: parts.days, label: 'Days' },
    { value: parts.hours, label: 'Hrs' },
    { value: parts.minutes, label: 'Min' },
    { value: parts.seconds, label: 'Sec' },
  ]

  return (
    <div className={`flex items-center gap-3 sm:gap-4 ${className}`}>
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-3 sm:gap-4">
          <div className="text-center">
            <div className={`font-display text-2xl sm:text-3xl tabular-nums ${unitClassName}`}>
              {String(u.value).padStart(2, '0')}
            </div>
            <div className={`text-[11px] uppercase tracking-wide mt-0.5 ${labelClassName}`}>{u.label}</div>
          </div>
          {i < units.length - 1 && <span className="text-current/20 -mt-3">:</span>}
        </div>
      ))}
    </div>
  )
}
