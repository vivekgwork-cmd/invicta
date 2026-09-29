import { motion } from 'framer-motion'
import { Counter, EASE, Heading, Panel, fadeUp } from '../site/motion.jsx'

const checks = ['A clear story that stays with the committee', 'Depth over a long list of activities', 'The right fit for each university']

export default function Problem() {
  return (
    <Panel className="w-full py-24 lg:py-32 px-5 sm:px-6 lg:px-12 bg-obsidian-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 site-grid-dots opacity-20 pointer-events-none" />
      <div className="absolute -bottom-40 right-0 w-[600px] h-[400px] bg-champagne-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7">
          <Heading
            dark
            align="left"
            title="Good grades alone don't get you in anymore."
            body="Top universities see thousands of applicants with near-perfect GPAs and 1500+ SAT scores. The few who get in have a memorable story, a clear area of strength and an application plan that starts well before the early deadline."
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="relative mt-10 pl-6 max-w-2xl"
          >
            <motion.span
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4, ease: EASE }}
              className="absolute left-0 top-0 bottom-0 w-[3px] origin-top bg-gradient-to-b from-champagne-400 to-amber-600 rounded-full"
            />
            <h4 className="font-outfit font-bold text-lg text-champagne-400 mb-2">Where Invicta comes in</h4>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              We help you build all three: your strength, your story and your scholarship positioning. We also handle
              the paperwork, so you can focus on becoming the student admissions committees want.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="lg:col-span-5 rounded-3xl bg-obsidian-900/80 border border-obsidian-700 p-8 sm:p-10"
        >
          <motion.div variants={fadeUp} className="font-outfit text-7xl sm:text-8xl font-extrabold text-champagne-400 tracking-tight leading-none">
            <Counter value="95%" />
          </motion.div>
          <motion.p variants={fadeUp} className="text-lg font-bold text-white mt-4">
            of rejected Ivy League applicants had qualifying scores
          </motion.p>
          <motion.p variants={fadeUp} className="text-sm text-slate-400 mt-3 leading-relaxed">
            Admissions offices review over 60,000 files a season. Without a clear story, even a 4.0 GPA blends in.
          </motion.p>
          <ul className="mt-8 pt-6 border-t border-obsidian-700 space-y-3">
            {checks.map((c) => (
              <motion.li key={c} variants={fadeUp} className="flex items-center gap-3 text-sm font-semibold text-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-champagne-400 shrink-0" />
                {c}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Panel>
  )
}
