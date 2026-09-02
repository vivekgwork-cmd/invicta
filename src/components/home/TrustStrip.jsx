import Reveal from '../shared/Reveal.jsx'

const partners = ['MIT, USA', 'SEU Georgia', 'University of Bologna', 'Griffith University', 'Berlin School of Business', 'Toronto Metropolitan']

export default function TrustStrip() {
  return (
    <section className="bg-paper-dim/60 border-y border-ink/5 py-8 overflow-hidden">
      <Reveal direction="fade" className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-center text-xs font-semibold tracking-[0.2em] text-slate uppercase mb-6">
          Academic Collaborations &amp; University Partners
        </p>
      </Reveal>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-paper-dim to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-paper-dim to-transparent z-10" />
        <div className="flex gap-16 w-max animate-[marquee_28s_linear_infinite]">
          {[...partners, ...partners].map((p, i) => (
            <span key={i} className="font-display text-xl sm:text-2xl text-ink/35 whitespace-nowrap">
              {p}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
