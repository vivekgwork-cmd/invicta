import { useState } from 'react'
import Reveal, { Stagger, StaggerItem } from '../shared/Reveal.jsx'
import { Check, PlayPill } from '../shared/Glyphs.jsx'

// Placeholder quotes and poster stills — Arpit to share the real testimonial videos and one-liners.
const testimonials = [
  {
    name: 'Priya',
    tenure: 'MBA, Batch 2025',
    quote: 'The MIT-mapped curriculum made my resume stand out in every interview.',
    poster: 'professional-lady.jpg',
    offset: 'sm:mt-0',
  },
  {
    name: 'Arjun',
    tenure: 'M.Sc. Data Science, Batch 2024',
    quote: 'Tbilisi felt like home within a month. The support team handled everything.',
    poster: 'indian-college-students.jpg',
    offset: 'sm:mt-10',
  },
  {
    name: 'Sana',
    tenure: 'M.Sc. FinTech, Batch 2025',
    quote: 'I landed a fintech internship in Europe before I even graduated.',
    poster: 'college-pic.jpg',
    offset: 'sm:-mt-4',
  },
]

function TestimonialCard({ t, isPlaying, onToggle }) {
  return (
    <div className="group/card h-full rounded-2xl overflow-hidden border border-primary/10 bg-white">
      {/* Dummy video card — swap the poster image for a <video> source once Arpit shares the clips */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={`${import.meta.env.BASE_URL}images/${t.poster}`}
          alt={`${t.name}, ${t.tenure}`}
          className="w-full h-full object-cover transition-all duration-500 group-hover/card:scale-105 group-hover/card:brightness-[0.55]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/20 to-primary/10" />

        <button
          type="button"
          onClick={onToggle}
          aria-label={isPlaying ? `Pause ${t.name}'s testimonial video` : `Play ${t.name}'s testimonial video`}
          className="absolute inset-0 grid place-items-center"
        >
          <span
            className={`transition-all duration-300 ${
              isPlaying ? 'opacity-100 scale-100' : 'opacity-0 scale-90 group-hover/card:opacity-100 group-hover/card:scale-100'
            }`}
          >
            <PlayPill label={isPlaying ? 'Playing…' : 'Play Reel'} />
          </span>
        </button>

        {isPlaying && (
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white/20">
            <div className="h-full bg-gold-soft animate-[lp-video-progress_6s_linear_infinite]" />
          </div>
        )}

        <div className="absolute bottom-4 left-5 right-5 flex items-center gap-1.5">
          <span className="font-display text-lg text-white">{t.name}</span>
          <span className="scale-[0.6] origin-left -mx-1">
            <Check className="bg-gold-soft text-primary" />
          </span>
        </div>
      </div>

      <div className="p-5">
        <p className="text-slate leading-relaxed">"{t.quote}"</p>
        <div className="text-xs text-slate/60 mt-3">{t.tenure}</div>
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(null)
  const anyPlaying = activeIndex !== null

  return (
    <section className="relative py-24 bg-secondary overflow-hidden">
      {/* Oversized background wordmark, drifting in a slow horizontal loop — in the spirit of
          the coachsportifecublens.com testimonial wall. Freezes the moment a video plays. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-8 sm:top-2 overflow-hidden pointer-events-none select-none"
      >
        <div
          className="lp-marquee flex whitespace-nowrap font-display font-semibold text-primary/[0.05] leading-none"
          style={{ fontSize: 'clamp(5rem, 16vw, 13rem)', animationPlayState: anyPlaying ? 'paused' : 'running' }}
        >
          <span className="pr-16">Real Results</span>
          <span className="pr-16">Real Results</span>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-gold-deep tracking-[2px]" aria-hidden="true">★★★★★</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-3 text-primary text-balance">
            Our Students Get Real <span className="text-gold-deep">Results</span>
          </h2>
        </Reveal>

        <Stagger className="mt-14 grid sm:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <StaggerItem key={t.name} direction="up" className={t.offset}>
              <div
                className="lp-card-loop h-full"
                style={{ animationDelay: `${i * -2.7}s`, animationPlayState: anyPlaying ? 'paused' : 'running' }}
              >
                <TestimonialCard
                  t={t}
                  isPlaying={activeIndex === i}
                  onToggle={() => setActiveIndex((cur) => (cur === i ? null : i))}
                />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <style>{`
        @keyframes lp-video-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes lp-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes lp-card-loop {
          0%   { transform: translateY(26px); opacity: 0.35; }
          20%  { opacity: 1; }
          50%  { transform: translateY(-26px); opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(26px); opacity: 0.35; }
        }
        .lp-marquee {
          width: max-content;
          animation: lp-marquee 26s linear infinite;
        }
        .lp-card-loop {
          animation: lp-card-loop 8s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .lp-marquee, .lp-card-loop {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
