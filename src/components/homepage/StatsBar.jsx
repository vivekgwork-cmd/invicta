import { motion } from 'framer-motion'
import { Counter, EASE, Heading, Panel } from '../site/motion.jsx'

const stats = [
  { value: '10,000+', label: 'Students placed' },
  { value: 'Top 50', label: 'QS-ranked universities' },
  { value: '500+', label: 'Partner universities' },
  { value: '30+', label: 'Years of experience', gold: true },
]

export default function StatsBar() {
  return (
    <Panel className="w-full bg-obsidian-950 text-white py-20 px-5 sm:px-6 lg:px-12 relative overflow-hidden">
      <div className="absolute inset-0 site-grid-dots opacity-25" />
      <div className="absolute -top-40 left-1/3 w-[500px] h-[300px] bg-cobalt-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <Heading
          dark
          align="left"
          title="Three decades of getting students into great universities."
          className="mb-14"
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-obsidian-800">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              className="group relative border-r border-b border-obsidian-800 p-6 sm:p-8 hover:bg-obsidian-900/70 transition-colors"
            >
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: EASE }}
                className={`absolute top-0 left-0 h-[2px] w-full origin-left ${s.gold ? 'bg-champagne-500' : 'bg-cobalt-500'}`}
              />
              <p className={`font-outfit font-extrabold text-4xl sm:text-5xl tracking-tight ${s.gold ? 'text-champagne-400' : 'text-white'}`}>
                <Counter value={s.value} />
              </p>
              <p className="font-grotesk text-[11px] uppercase tracking-wider text-slate-400 mt-3">{s.label}</p>
            </motion.div>
          ))}
        </div>
        <p className="mt-6 text-xs sm:text-sm text-slate-500">
          Every student also gets a dedicated 1:1 counsellor for career planning.
        </p>
      </div>
    </Panel>
  )
}
