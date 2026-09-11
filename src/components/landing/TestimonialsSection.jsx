import { useState } from 'react'
import Reveal, { Stagger, StaggerItem } from '../shared/Reveal.jsx'
import { PlayPill } from '../shared/Glyphs.jsx'

// Placeholder quotes and images — Arpit to share the real testimonial videos and one-liners.
const testimonials = [
  {
    name: 'Priya',
    tenure: 'MBA, Batch 2025',
    quote: 'The MIT-mapped curriculum made my resume stand out in every interview.',
    image: 'professional-lady.jpg',
  },
  {
    name: 'Arjun',
    tenure: 'M.Sc. Data Science, Batch 2024',
    quote: 'Tbilisi felt like home within a month. The support team handled everything.',
    image: 'indian-college-students.jpg',
  },
  {
    name: 'Sana',
    tenure: 'M.Sc. FinTech, Batch 2025',
    quote: 'I landed a fintech internship in Europe before I even graduated.',
    image: 'college-pic.jpg',
  },
]

function VideoCard({ t }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="group rounded-2xl overflow-hidden border border-primary/8 bg-white">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={`${import.meta.env.BASE_URL}images/${t.image}`} alt={`${t.name}, ${t.tenure}`} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-[0.55]" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/5 to-transparent" />

        {/* Centered "Play Reel" pill on hover — the coachsportifcublens.com pattern: every
            image/video on the page reveals a CTA like this when the cursor is over it. */}
        <button
          type="button"
          onClick={() => setPlaying((v) => !v)}
          aria-label={playing ? 'Pause testimonial preview' : 'Play testimonial preview'}
          className="absolute inset-0 grid place-items-center"
        >
          <span className="opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
            <PlayPill label={playing ? 'Playing…' : 'Play Reel'} />
          </span>
        </button>

        {playing && (
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white/20">
            <div className="h-full bg-accent animate-[lp-video-progress_6s_linear_infinite]" />
          </div>
        )}

        <div className="absolute bottom-3 left-4 right-4 text-secondary">
          <div className="font-display text-lg leading-none">{t.name}</div>
          <div className="text-[13px] text-secondary/70 mt-1">{t.tenure}</div>
        </div>
      </div>
      <p className="text-sm text-slate leading-relaxed p-4">"{t.quote}"</p>
    </div>
  )
}

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-secondary-dim/50 border-t border-primary/8 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-sm font-semibold text-accent uppercase tracking-wide">Hear It From Them</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-3 text-primary text-balance">
            Our Students Get Real <span className="text-gold-deep">Results</span>
          </h2>
        </Reveal>

        <Stagger className="mt-10 grid sm:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <StaggerItem key={t.name} direction="up">
              <VideoCard t={t} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <style>{`
        @keyframes lp-video-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  )
}
