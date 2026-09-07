import Reveal from '../shared/Reveal.jsx'
import PathwayPyramid from './PathwayPyramid.jsx'

export default function PathwaySection() {
  return (
    <section className="bg-secondary">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-24 pb-6 sm:pb-2 overflow-hidden">
        <Reveal direction="left" className="max-w-2xl">
          <span className="text-sm font-semibold text-accent uppercase tracking-wide">Why SEU x MIT</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-3 text-primary text-balance leading-tight">
            Why Settle For Just Another <span className="text-gold-deep">Master's</span>?
          </h2>
          <p className="mt-5 text-slate leading-relaxed max-w-xl">
            Most students chase another ordinary Master's. Here is a smarter path: three
            steps that take you from a recognised European degree to a real global career.
            Scroll on and watch how they stack up.
          </p>

          <div className="mt-8 border-l-2 border-accent pl-4 text-sm text-primary">
            <strong className="font-semibold">Georgian National University SEU</strong>
            <br />
            <span className="text-slate">Tbilisi, Georgia, on-campus</span>
          </div>
        </Reveal>
      </div>

      <PathwayPyramid />
    </section>
  )
}
