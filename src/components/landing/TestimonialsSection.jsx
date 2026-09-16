import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from '../shared/Reveal.jsx'
import { PlayPill } from '../shared/Glyphs.jsx'

// Real student video testimonials, self-hosted under public/videos so playback is a plain
// <video> element — no third-party chrome, no controls, no way to navigate off the page.
// Only the small poster JPEG loads up front; the video file itself is fetched on click.
const testimonials = [
  { name: 'Akhila Narra', tenure: 'Georgian National University SEU', slug: 'akhila-narra' },
  { name: 'Chakravathi Peddireddy', tenure: 'Georgian National University SEU', slug: 'chakravathi-peddireddy' },
  { name: 'Rithika Gullapali', tenure: 'Georgian National University SEU', slug: 'rithika-gullapali' },
  { name: 'Dev Sharma', tenure: 'Rajasthan', slug: 'dev-sharma' },
  { name: 'Rohan Sandy', tenure: 'Vijayawada', slug: 'rohan-sandy' },
  { name: 'Vaishnavi', tenure: 'Vijayawada', slug: 'vaishnavi' },
  { name: 'Satwik', tenure: 'Visakhapatnam', slug: 'satwik' },
  { name: 'Srinidhi', tenure: 'Student Testimonial', slug: 'srinidhi' },
  { name: 'Mohith', tenure: 'Student Testimonial', slug: 'mohith' },
]

// Three lanes of three, so each column loops a different trio.
const lanes = [
  [testimonials[0], testimonials[3], testimonials[6]],
  [testimonials[1], testimonials[4], testimonials[7]],
  [testimonials[2], testimonials[5], testimonials[8]],
]

function TestimonialCard({ t, playing, onToggle }) {
  const base = import.meta.env.BASE_URL

  return (
    <div className="group/card w-full rounded-2xl overflow-hidden border border-primary/10 bg-white">
      <div className="relative aspect-[4/5] overflow-hidden bg-primary">
        {playing ? (
          <video
            src={`${base}videos/${t.slug}.mp4`}
            className="absolute inset-0 w-full h-full object-cover cursor-pointer"
            autoPlay
            playsInline
            onClick={onToggle}
            onEnded={onToggle}
          />
        ) : (
          <>
            <img
              src={`${base}videos/posters/${t.slug}.jpg`}
              alt={`${t.name}, ${t.tenure}`}
              loading="lazy"
              className="w-full h-full object-cover transition-all duration-500 group-hover/card:scale-105 group-hover/card:brightness-[0.55]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/25 to-primary/15" />

            <button
              type="button"
              onClick={onToggle}
              aria-label={`Play ${t.name}'s testimonial video`}
              className="absolute inset-0 grid place-items-center"
            >
              <span className="transition-all duration-300 opacity-90 scale-95 group-hover/card:opacity-100 group-hover/card:scale-100">
                <PlayPill label="Play Video" />
              </span>
            </button>

            <div className="absolute bottom-4 left-5 right-5">
              <span className="font-display text-lg text-white leading-tight block">{t.name}</span>
              <span className="text-xs text-white/60">{t.tenure}</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// One vertical lane: its 3 cards loop endlessly upward (the list is rendered twice back to
// back and translated by exactly one set's height, so the loop point is invisible), softly
// fading in/out at the top and bottom edge via a mask rather than scrolling — there is no
// scrollbar and nothing for a visitor to manually scroll. Clicking a card freezes the whole
// lane in place (so the clicked card stays put) and plays its video inline.
function TestimonialLane({ items, duration, onActivityChange }) {
  const [playingSlug, setPlayingSlug] = useState(null)
  const paused = playingSlug !== null
  const track = [...items, ...items]

  const handleToggle = (slug) => {
    setPlayingSlug((cur) => {
      const next = cur === slug ? null : slug
      onActivityChange?.(next !== null)
      return next
    })
  }

  return (
    <div className="lp-lane-mask relative h-[500px] sm:h-[620px] lg:h-[720px] overflow-hidden">
      <div
        className="lp-lane-track flex flex-col gap-5"
        style={{ animationDuration: `${duration}s`, animationPlayState: paused ? 'paused' : 'running' }}
      >
        {track.map((t, i) => (
          <div key={`${t.slug}-${i}`} className="shrink-0">
            <TestimonialCard t={t} playing={playingSlug === t.slug} onToggle={() => handleToggle(t.slug)} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  const [activeLanes, setActiveLanes] = useState([false, false, false])
  const anyPlaying = activeLanes.some(Boolean)

  const setLaneActive = (i) => (active) =>
    setActiveLanes((cur) => {
      const next = [...cur]
      next[i] = active
      return next
    })

  return (
    <section className="relative py-24 bg-secondary overflow-hidden">
      {/* Oversized background wordmark, drifting in a slow horizontal loop — in the spirit of
          the coachsportifecublens.com testimonial wall. Freezes the moment a video plays. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-8 sm:top-2 overflow-hidden pointer-events-none select-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="lp-marquee flex whitespace-nowrap font-display font-semibold text-primary/[0.05] leading-none"
          style={{ fontSize: 'clamp(5rem, 16vw, 13rem)', animationPlayState: anyPlaying ? 'paused' : 'running' }}
        >
          <span className="pr-16">Real Results</span>
          <span className="pr-16">Real Results</span>
        </div>
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-gold-deep tracking-[2px]" aria-hidden="true">★★★★★</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-3 text-primary text-balance">
            Our Students Get <span className="text-gold-deep">Real Results</span>
          </h2>
          <p className="mt-4 text-slate leading-relaxed">
            Hear it directly from students who made the move to SEU x MIT.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {lanes.map((items, i) => (
            <TestimonialLane
              key={i}
              items={items}
              duration={24 + i * 5}
              onActivityChange={setLaneActive(i)}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes lp-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .lp-marquee {
          width: max-content;
          animation: lp-marquee 26s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
        }
        .lp-lane-mask {
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%);
          mask-image: linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%);
        }
        .lp-lane-track {
          animation-name: lp-lane-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
          backface-visibility: hidden;
        }
        @keyframes lp-lane-scroll {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .lp-marquee, .lp-lane-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
