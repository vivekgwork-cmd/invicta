import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Arrow } from '../shared/Glyphs.jsx'
import { EASE, Heading, Panel, Parallax, fadeUp } from '../site/motion.jsx'
import { btn, size } from '../site/ui.js'
import { ROUTES, img } from '../site/links.js'

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

export default function Director() {
  return (
    <Panel
      id="director"
      className="py-24 lg:py-32 px-5 sm:px-6 lg:px-12 bg-obsidian-950 text-white relative overflow-hidden scroll-mt-20"
    >
      <div className="absolute inset-0 site-grid-dots opacity-20 pointer-events-none" />
      <div className="absolute -top-32 right-10 w-[500px] h-[500px] bg-cobalt-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 left-10 w-[500px] h-[500px] bg-champagne-500/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <Heading dark title="A message from our Director." className="mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <motion.div
              variants={{
                hidden: { clipPath: 'inset(100% 0% 0% 0% round 24px)' },
                show: { clipPath: 'inset(0% 0% 0% 0% round 24px)', transition: { duration: 1.1, ease: EASE } },
              }}
              className="w-64 h-72 sm:w-72 sm:h-80 mb-8 overflow-hidden rounded-3xl bg-obsidian-900 shadow-2xl"
            >
              <Parallax offset={24} className="h-[115%] -mt-[7%]">
                <img
                  src={img('director-vivekananda-murty.jpg')}
                  alt="Vivekananda Murty, Founder and Director"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </Parallax>
            </motion.div>
            <motion.h3 variants={fadeUp} className="font-outfit font-bold text-2xl text-white">
              Vivekananda Murty
            </motion.h3>
            <motion.p variants={fadeUp} className="font-grotesk text-xs font-semibold text-champagne-400 uppercase tracking-wider mb-5">
              Founder &amp; Director
            </motion.p>
            <motion.blockquote variants={fadeUp} className="font-outfit text-slate-200 text-lg sm:text-xl leading-relaxed max-w-md mb-8">
              “Every young mind has an extraordinary story. Our mission is to refine it, articulate it and present it to
              the best universities in the world.”
            </motion.blockquote>
            <motion.div variants={fadeUp}>
              <Link to={ROUTES.counselling} className={`${btn.gold} ${size.sm}`}>
                Contact me
                <Arrow />
              </Link>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-7 flex flex-col gap-4">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
                className="group relative rounded-2xl p-6 lg:p-8 bg-obsidian-900/80 border border-obsidian-700 hover:border-champagne-500/50 transition-colors duration-300 overflow-hidden"
              >
                <motion.span
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: EASE }}
                  className="absolute left-0 top-0 bottom-0 w-[3px] origin-top bg-gradient-to-b from-champagne-400 to-amber-600"
                />
                <div className="flex items-start gap-6">
                  <span className="font-grotesk text-3xl font-bold text-champagne-400/80 leading-none shrink-0">0{i + 1}</span>
                  <div>
                    <h4 className="font-outfit font-bold text-lg sm:text-xl text-white mb-2">{p.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{p.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  )
}
