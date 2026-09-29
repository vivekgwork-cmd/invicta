import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Arrow } from '../shared/Glyphs.jsx'
import { Card, Heading, Rise } from '../site/motion.jsx'
import { btn, size } from '../site/ui.js'
import { ROUTES } from '../site/links.js'

const students = [
  {
    initial: 'A',
    name: 'Aditya Miriyala',
    school: 'Milwaukee School of Engineering',
    badge: '2.40 Cr Scholarship',
    score: 'SAT 1500',
    tone: 'cobalt',
    quote: [
      'I appreciate the support of Invicta in securing my admission with a 2.4 Cr scholarship. Special thanks to Mr. Vivekananda Murty for his guidance throughout the process.',
      "Thanks to the teachers' excellent coaching, I got 1500 in the SAT and 8 in IELTS. The team's structured approach made the process smooth, and their expertise in university applications was invaluable.",
    ],
    footer: 'Presidential Scholarship of 2.40 Crores',
  },
  {
    initial: 'Y',
    name: 'Yukta Tata Koganti',
    school: 'Drexel University',
    badge: '1.03 Cr Scholarship',
    score: 'IELTS 8',
    tone: 'gold',
    quote: [
      'The trainers are so good that every student secured high scores in SAT and IELTS. In just 6 months, I got into several universities with high scholarships.',
      'A very big thanks to Mr Murty sir. The way he added value to my profile, my thought process and my critical thinking has changed my attitude, and I have realised my potential.',
    ],
    footer: 'SAT 1490/1600 | IELTS 8.0/9',
  },
  {
    initial: 'A',
    name: 'Akarsh Chittineni',
    school: 'Duke University | Boston University | Rice University',
    badge: 'Multiple Admits',
    score: 'IELTS 8.5',
    tone: 'cobalt',
    quote: [
      "I am deeply honoured to be an Invictar. Gaining admission to my dream university, a vision I once held close, became a reality only through Invicta's holistic and carefully crafted approach to my college applications.",
      "Murty Sir's unwavering optimism, coupled with the faculty's dedication, made this journey both exhilarating and life changing. I am forever grateful.",
    ],
    footer: 'SAT 1530/1600 | IELTS 8.5/9',
  },
]

export default function Stories() {
  return (
    <section id="stories" className="py-24 lg:py-32 px-5 sm:px-6 lg:px-12 w-full scroll-mt-20">
      <Rise className="max-w-7xl mx-auto">
        <Heading
          align="left"
          title="Students who made it."
          body="Your goals aren’t impossible. Meet students who built strong profiles, aced their exams and got into top universities around the world."
          action={
            <Link to={ROUTES.counselling} className={`${btn.gold} ${size.sm}`}>
              Book your 1:1 Counselling Session
              <Arrow />
            </Link>
          }
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {students.map((s, i) => {
            const gold = s.tone === 'gold'
            return (
              <Card
                key={s.name}
                i={i}
                glow={gold ? 'gold' : 'cobalt'}
                className="bg-white rounded-3xl p-6 lg:p-7 border border-slate-200 shadow-card-tech hover:shadow-xl hover:border-slate-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-grotesk font-bold uppercase tracking-wider border ${
                        gold ? 'bg-amber-50 text-amber-700 border-amber-200/70' : 'bg-cobalt-50 text-cobalt-700 border-cobalt-200/70'
                      }`}
                    >
                      {s.badge}
                    </span>
                    <span className="font-grotesk text-xs font-bold bg-slate-100 text-obsidian-950 px-2.5 py-1 rounded-md whitespace-nowrap">
                      {s.score}
                    </span>
                  </div>
                  <div className="flex items-center gap-3.5 mb-5">
                    <motion.div
                      initial={{ scale: 0.4, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.3 + i * 0.1 }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-outfit font-bold text-xl shrink-0 text-white ${
                        gold ? 'bg-gradient-to-br from-champagne-400 to-amber-600' : 'bg-gradient-to-br from-cobalt-500 to-cobalt-800'
                      }`}
                    >
                      {s.initial}
                    </motion.div>
                    <div>
                      <h4 className="font-outfit font-bold text-lg text-obsidian-950 leading-tight">{s.name}</h4>
                      <p className={`text-xs font-semibold mt-0.5 ${gold ? 'text-amber-600' : 'text-cobalt-600'}`}>{s.school}</p>
                    </div>
                  </div>
                  <div className="space-y-4 text-sm text-slate-600 mb-6 leading-relaxed">
                    {s.quote.map((q) => (
                      <p key={q.slice(0, 20)}>{q}</p>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100 font-grotesk text-xs font-semibold text-obsidian-900">{s.footer}</div>
              </Card>
            )
          })}
        </div>
      </Rise>
    </section>
  )
}
