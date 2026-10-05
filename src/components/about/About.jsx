import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Arrow } from '../shared/Glyphs.jsx'
import { EASE, fadeUp } from '../site/motion.jsx'
import { btn, size } from '../site/ui.js'
import { ROUTES, img } from '../site/links.js'

// The About Us page reads as a letter from the Director: serif type on warm paper, a portrait that
// stays in view beside the letter, and none of the cards, stats or dark bands used on the
// marketing pages.
const pillars = [
  {
    title: 'A strategy built around each student',
    body: "Every roadmap is shaped around the student's own interests, strengths and the one thing that makes their profile stand out.",
  },
  {
    title: 'Ivy-level standards',
    body: 'Mentorship from former admissions evaluators at top-50 universities and certified counsellors.',
  },
  {
    title: 'Honest, accessible counselling',
    body: 'Transparent guidance focused on student welfare, programs worth the investment and real scholarship wins.',
  },
]

const NUMERALS = ['I', 'II', 'III']

const stagger = { show: { transition: { staggerChildren: 0.12 } } }

export default function AboutLetter() {
  return (
    <div className="bg-[#faf7f0] text-obsidian-950">
      <header className="px-5 sm:px-6 lg:px-12 pt-16 lg:pt-24 pb-12 lg:pb-16">
        <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-6xl mx-auto">
          <motion.p variants={fadeUp} className="font-grotesk text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 mb-6">
            About Us
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display font-semibold text-5xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight max-w-4xl text-balance"
          >
            A message from our <em className="italic font-normal text-amber-700">Director.</em>
          </motion.h1>
          <motion.div
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.1, ease: EASE } } }}
            className="mt-12 h-px origin-left bg-obsidian-950/15"
          />
        </motion.div>
      </header>

      <section className="px-5 sm:px-6 lg:px-12 pb-24 lg:pb-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="lg:col-span-5 lg:sticky lg:top-28 self-start w-full max-w-sm mx-auto lg:max-w-none"
          >
            <div className="relative">
              <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-amber-700/30" />
              <img
                src={img('director-vivekananda-murty.jpg')}
                alt="Vivekananda Murty, Founder and Director"
                className="relative w-full aspect-[4/5] object-cover object-top rounded-2xl shadow-xl bg-slate-200"
              />
            </div>
            <figcaption className="mt-8">
              <p className="font-display font-semibold text-2xl">Vivekananda Murty</p>
              <p className="font-grotesk text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-700 mt-1.5">
                Founder &amp; Director, Invicta
              </p>
            </figcaption>
          </motion.figure>

          <motion.article
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } } }}
            className="lg:col-span-7"
          >
            <motion.blockquote variants={fadeUp} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-2 -top-10 sm:-left-10 sm:-top-8 font-display text-[7rem] leading-none text-amber-700/25 select-none"
              >
                “
              </span>
              <p className="relative font-display text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.25] tracking-tight text-balance">
                Every young mind has an extraordinary story. Our mission is to refine it, articulate it and present it to
                the best universities in the world.
              </p>
            </motion.blockquote>

            <motion.h2
              variants={fadeUp}
              className="mt-16 mb-2 font-grotesk text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
            >
              Our promise to every student
            </motion.h2>

            <ol>
              {pillars.map((p, i) => (
                <motion.li
                  key={p.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="grid grid-cols-[3.5rem_1fr] gap-4 py-8 border-b border-obsidian-950/10"
                >
                  <span className="font-display italic text-2xl text-amber-700 leading-tight">{NUMERALS[i]}.</span>
                  <div>
                    <h3 className="font-display font-semibold text-2xl leading-snug mb-2">{p.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{p.body}</p>
                  </div>
                </motion.li>
              ))}
            </ol>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mt-14 flex flex-col sm:flex-row sm:items-end justify-between gap-8"
            >
              <div>
                <p className="font-display italic text-4xl text-obsidian-950">Vivekananda Murty</p>
                <p className="text-sm text-slate-500 mt-2">Founder &amp; Director, Invicta</p>
              </div>
              <Link to={ROUTES.counselling} className={`${btn.dark} ${size.sm} self-start sm:self-auto`}>
                Contact me
                <Arrow />
              </Link>
            </motion.div>
          </motion.article>
        </div>
      </section>
    </div>
  )
}
