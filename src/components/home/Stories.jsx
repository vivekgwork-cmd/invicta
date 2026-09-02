import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Stars } from '../shared/Glyphs.jsx'
import Reveal from '../shared/Reveal.jsx'

const stories = [
  {
    name: 'Ananya Verma',
    program: 'M.Sc. Data Science, SEU Georgia',
    quote:
      'Invicta handled my entire visa file while I focused on my IELTS prep. I landed in Tbilisi knowing exactly where I would stay and who to call.',
    company: 'Now at TBC Bank',
  },
  {
    name: 'Rohit Malhotra',
    program: 'MBA, Berlin School of Business',
    quote:
      "The scholarship negotiation alone saved my family over 8 lakhs. Invicta's counsellors treated my application like it was their own.",
    company: 'Now at EY',
  },
  {
    name: 'Sana Sheikh',
    program: 'M.Sc. AI, SEU Georgia',
    quote:
      'From apostille paperwork to airport pickup in Tbilisi, every step was managed. I never once felt like I was navigating this alone.',
    company: 'Now at EPAM',
  },
]

export default function Stories() {
  const [index, setIndex] = useState(0)
  const story = stories[index]
  const go = (dir) => setIndex((i) => (i + dir + stories.length) % stories.length)

  return (
    <section id="stories" className="py-24 bg-paper-dim/50">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
        <Reveal direction="left" className="relative">
          <div className="rounded-3xl overflow-hidden aspect-[4/5]">
            <img src={`${import.meta.env.BASE_URL}images/college-pic.jpg`} alt="Partner university campus" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl px-5 py-4">
            <Stars />
          </div>
        </Reveal>

        <div>
          <span className="text-sm font-semibold text-brand uppercase tracking-wide">Success Stories</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-3 text-ink text-balance">
            Real Students. Real Offers. Real Careers.
          </h2>

          <div className="mt-10 relative min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="font-display text-5xl text-brand/25 leading-none">“</span>
                <p className="mt-1 text-lg sm:text-xl text-ink leading-relaxed">"{story.quote}"</p>
                <div className="mt-6">
                  <div className="font-semibold text-ink">{story.name}</div>
                  <div className="text-sm text-slate">{story.program} · {story.company}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <button
              onClick={() => go(-1)}
              className="w-11 h-11 grid place-items-center rounded-md border border-ink/15 hover:bg-ink hover:text-white transition-colors"
              aria-label="Previous story"
            >
              <span className="font-display text-lg">‹</span>
            </button>
            <button
              onClick={() => go(1)}
              className="w-11 h-11 grid place-items-center rounded-md border border-ink/15 hover:bg-ink hover:text-white transition-colors"
              aria-label="Next story"
            >
              <span className="font-display text-lg">›</span>
            </button>
            <div className="flex gap-1.5 ml-3">
              {stories.map((_, i) => (
                <span key={i} className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-brand' : 'w-1.5 bg-ink/15'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
