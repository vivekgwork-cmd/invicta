import Reveal from '../shared/Reveal.jsx'
import PathwayPyramid from './PathwayPyramid.jsx'

export default function PathwaySection() {
  return (
    <section className="bg-secondary py-20 sm:py-24 border-t border-primary/8">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <Reveal direction="left" className="lg:sticky lg:top-28 text-left">
          <span className="text-sm font-semibold text-accent uppercase tracking-wide">Why SEU x MIT</span>
          <h2 className="font-display text-4xl sm:text-5xl mt-3 text-primary text-balance leading-tight">
            Why Settle For Just Another <span className="text-gold-deep">Bachelor's Degree</span>?
          </h2>
          <p className="mt-5 text-slate leading-relaxed max-w-xl">
            Most students chase an ordinary undergraduate degree close to home. Here is a smarter
            path: a global European Bachelor's with real MIT advantage, at a cost that often
            undercuts many private universities in India.
          </p>
          <div className="mt-6 inline-flex items-start gap-3 rounded-xl border border-primary/10 bg-white px-4 py-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-accent mt-0.5">Location</span>
            <span className="text-sm text-primary leading-snug">
              <strong>Tbilisi, Georgia</strong>
              <span className="block text-slate">Georgian National University SEU, Tbilisi, Georgia (on-campus)</span>
            </span>
          </div>
        </Reveal>

        <PathwayPyramid />
      </div>
    </section>
  )
}
