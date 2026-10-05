import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { Arrow } from '../shared/Glyphs.jsx'
import { EASE, Heading } from '../site/motion.jsx'
import { btn, size } from '../site/ui.js'
import { ROUTES, img } from '../site/links.js'

// Quotes are taken verbatim from assets/Student Testimonials.docx. `focus` is the object-position that keeps
// each student's face in frame when the photo is cropped to the stage.
const students = [
  {
    name: 'Aditya Miriyala',
    photo: 'aditya-m.jpg',
    focus: '62% 22%',
    school: 'Milwaukee School of Engineering, USA',
    stat: { pre: '₹', value: 2.4, decimals: 2, post: ' Cr', label: 'Presidential Scholarship' },
    scores: ['SAT 1500/1600', 'IELTS 8.0/9'],
    tone: 'cobalt',
    quote:
      'I appreciate the support of Invicta Career Consultancy in securing my admission to the Milwaukee School of Engineering, USA, with Rs.2.4 crore scholarship. The teachers’ excellent coaching helped me achieve strong IELTS and SAT scores, boosting my application.',
  },
  {
    name: 'Yukta Tata Koganti',
    photo: 'yuktha-tata.jpg',
    focus: '50% 30%',
    school: 'Drexel University, USA',
    stat: { pre: '₹', value: 1.03, decimals: 2, post: ' Cr', label: 'Scholarship' },
    scores: ['SAT 1490/1600', 'IELTS 8.0/9'],
    tone: 'gold',
    quote:
      'Sri. Murty has given me a direction and shown the path. The trainers are so good that every student secured high scores in SAT & IELTS. Just in six months I have secured admission in several universities with high scholarships.',
  },
  {
    name: 'Faizah Shaik',
    photo: 'faizah-shaik.jpg',
    focus: '50% 45%',
    school: 'Bryn Mawr College, USA',
    stat: { pre: '₹', value: 2.4, decimals: 2, post: ' Cr', label: 'Scholarship' },
    scores: ['ACT 34/36', 'SAT 1470/1600', 'Duolingo 150/160'],
    tone: 'gold',
    quote:
      'We were mesmerized with the way Mr. Murty took us through the entire process and we joined Invicta. Now, with a 2.40 crores scholarship from Bryn Mawr College (USA) and having secured my F-1 visa, my joy knows no bounds.',
  },
  {
    name: 'Akarsh Chittineni',
    photo: 'akarsh-chittineni.jpg',
    focus: '57% 20%',
    school: 'Duke University · Boston University · Rice University',
    stat: { pre: '', value: 3, decimals: 0, post: ' admits', label: 'Duke · BU · Rice' },
    scores: ['SAT 1530/1600', 'IELTS 8.5/9'],
    tone: 'cobalt',
    quote:
      'Gaining admission to my dream university, a vision I once held close, became a reality only through Invicta’s holistic and meticulously crafted approach to college applications. I am forever grateful.',
  },
  {
    name: 'Shiva Aditya Velagapudi',
    photo: 'shiva-aditya.jpg',
    focus: '50% 22%',
    school: 'Top universities, USA',
    stat: { pre: '', value: 1460, decimals: 0, post: '', label: 'SAT score' },
    scores: ['SAT 1460/1600', 'IELTS 8.0/9'],
    tone: 'cobalt',
    quote:
      'I immediately started my training at Invicta and achieved great results in the SAT and IELTS. I secured admission to top universities in the USA with scholarships. I am very grateful to Murty Sir and the entire ICC team.',
  },
]

// The rest of the photos in assets/student photos, shown as a scrolling face wall under the stage.
const more = [
  ['Abhinav Mandali', 'abhinav-mandali.jpg'],
  ['Akhil', 'akhil.jpg'],
  ['Akshaya Velagapudi', 'akshaya-velagapudi.jpg'],
  ['Dakshitha Alla', 'dakshitha-alla.jpg'],
  ['Eekshitha Nimmagadda', 'eekshitha-nimmagadda.jpg'],
  ['Hemanth Aditya', 'hemanth-aditya.jpg'],
  ['Hemanth Ganesh', 'hemanth-ganesh.jpg'],
  ['Joshika Challa', 'joshika-challa.jpg'],
  ['Keerthika Paturi', 'keerthika-paturi.jpg'],
  ['Lakshya', 'lakshya.jpg'],
  ['Nazeer Ahmed', 'nazeer-ahmed.jpg'],
  ['Neeraj Renil', 'neeraj-renil-photo.jpg'],
  ['Prachet', 'prachet.jpg'],
  ['Pranav Rajesh', 'pranav-rajesh.jpg'],
  ['Rithvik Satya Sri Sai Vantipalli', 'rithvik-satya-sri-sai-vantipalli.jpg'],
  ['Sanjana Goel', 'sanjana-goel.jpg'],
  ['Sarvani Gavirneni', 'sarvani-gavirneni.jpg'],
  ['Sashank Chedella', 'sashank-chedella.jpg'],
  ['Sindhu Gatta', 'sindhu-gatta.jpg'],
  ['Suvatsala Sairam', 'suvatsala-sairam.jpg'],
  ['Tejaswini Roy', 'tejaswini-roy.jpg'],
  ['Vaibhav Baba Vemuri', 'vaibhav-baba-vemuri.jpg'],
  ['Varsha Ramesh', 'varsha-ramesh.jpg'],
  ['Vishal Rana Paidi', 'vishal-rana-paidi.jpg'],
  ['Vishnu Chitra', 'vishnu-chitra.jpg'],
]

const SLIDE_SECONDS = 8

// Counts from 0 to `value` every time the active story changes.
function StatNumber({ stat }) {
  const [n, setN] = useState(0)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) return
    const c = animate(0, stat.value, { duration: 1.4, ease: [0.16, 1, 0.3, 1], onUpdate: setN })
    return () => c.stop()
  }, [stat, reduce])
  return (
    <>
      {stat.pre}
      {(reduce ? stat.value : n).toLocaleString('en-IN', { minimumFractionDigits: stat.decimals, maximumFractionDigits: stat.decimals })}
      {stat.post}
    </>
  )
}

// Portrait that tilts toward the cursor and wipes in a new photo when the story changes.
function Stage({ s, index, onSwipe }) {
  const reduce = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [9, -9]), { stiffness: 150, damping: 18 })
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [-7, 7]), { stiffness: 150, damping: 18 })
  const chipX = useSpring(useTransform(px, [-0.5, 0.5], [-18, 18]), { stiffness: 120, damping: 20 })
  const chipY = useSpring(useTransform(py, [-0.5, 0.5], [-14, 14]), { stiffness: 120, damping: 20 })
  const gold = s.tone === 'gold'

  return (
    <div
      className="relative [perspective:1200px]"
      onMouseMove={(e) => {
        if (reduce) return
        const r = e.currentTarget.getBoundingClientRect()
        px.set((e.clientX - r.left) / r.width - 0.5)
        py.set((e.clientY - r.top) / r.height - 0.5)
      }}
      onMouseLeave={() => {
        px.set(0)
        py.set(0)
      }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.25}
        onDragEnd={(_, info) => {
          if (info.offset.x < -60) onSwipe(1)
          else if (info.offset.x > 60) onSwipe(-1)
        }}
        className="relative aspect-[4/5] w-full rounded-[2rem] overflow-hidden bg-obsidian-900 shadow-[0_40px_80px_-30px_rgba(6,9,17,0.55)] cursor-grab active:cursor-grabbing touch-pan-y"
      >
        <AnimatePresence initial={false}>
          <motion.img
            key={s.photo}
            src={img(`students/${s.photo}`)}
            alt={s.name}
            draggable={false}
            style={{ objectPosition: s.focus }}
            initial={{ clipPath: 'inset(0% 0% 0% 100%)', scale: 1.18 }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
            exit={{ opacity: 0.4, scale: 1.04, transition: { duration: 0.9 } }}
            transition={{ duration: 0.9, ease: EASE }}
            className="absolute inset-0 w-full h-full object-cover select-none"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-obsidian-950/5 to-transparent pointer-events-none" />

        <div className="absolute left-5 right-5 bottom-5 flex items-end justify-between gap-3 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={s.name}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="flex flex-wrap gap-1.5"
            >
              {s.scores.map((sc) => (
                <span
                  key={sc}
                  className="px-2.5 py-1 rounded-full text-[11px] font-grotesk font-bold text-white bg-white/15 backdrop-blur-md border border-white/20"
                >
                  {sc}
                </span>
              ))}
            </motion.div>
          </AnimatePresence>
          <span className="font-grotesk text-xs font-bold text-white/70 tabular-nums">
            {String(index + 1).padStart(2, '0')} / {String(students.length).padStart(2, '0')}
          </span>
        </div>
      </motion.div>

      {/* Floating scholarship chip, parallaxed against the tilt so it reads as sitting in front of the photo. */}
      <motion.div
        style={{ x: chipX, y: chipY }}
        className="absolute -right-3 sm:-right-8 top-8 sm:top-12 pointer-events-none"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={s.name}
            initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
            animate={{ scale: 1, opacity: 1, rotate: -3 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.25 }}
            className={`rounded-2xl px-5 py-4 shadow-2xl border backdrop-blur-xl ${
              gold
                ? 'bg-gradient-to-br from-champagne-400 to-amber-600 border-amber-300/60 text-obsidian-950'
                : 'bg-gradient-to-br from-cobalt-500 to-cobalt-800 border-cobalt-400/50 text-white'
            }`}
          >
            <div className="font-outfit font-bold text-3xl sm:text-4xl leading-none tabular-nums">
              <StatNumber stat={s.stat} />
            </div>
            <div className="mt-1.5 font-grotesk text-[10px] sm:text-[11px] font-bold uppercase tracking-wider opacity-80">
              {s.stat.label}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

// Quote revealed word by word, each word sharpening out of a blur.
function Quote({ text }) {
  const reduce = useReducedMotion()
  return (
    <motion.blockquote
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -12, transition: { duration: 0.3 } }}
      variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.014 } } }}
      className="font-outfit text-xl sm:text-2xl lg:text-[1.7rem] leading-snug text-obsidian-950 font-medium text-pretty"
    >
      <span className="text-champagne-500">“</span>
      {text.split(' ').map((w, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, filter: 'blur(10px)', y: 10 },
            show: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.5, ease: EASE } },
          }}
          className="inline-block mr-[0.28em]"
        >
          {w}
        </motion.span>
      ))}
      <span className="text-champagne-500">”</span>
    </motion.blockquote>
  )
}

function FaceRow({ items, reverse = false, duration }) {
  return (
    <div className={`flex w-max face-marquee ${reverse ? 'face-marquee-reverse' : ''}`} style={{ '--marquee-duration': `${duration}s` }}>
      {[...items, ...items].map(([name, file], i) => (
        <figure
          key={i}
          aria-hidden={i >= items.length}
          className="group/face relative shrink-0 mx-2 w-28 h-36 sm:w-32 sm:h-40 rounded-2xl overflow-hidden bg-slate-200"
        >
          <img
            src={img(`students/${file}`)}
            alt={i < items.length ? name : ''}
            loading="lazy"
            className="w-full h-full object-cover object-top grayscale-[85%] scale-100 transition-all duration-500 group-hover/face:grayscale-0 group-hover/face:scale-110"
          />
          <figcaption className="absolute inset-x-0 bottom-0 p-2.5 pt-8 bg-gradient-to-t from-obsidian-950/85 to-transparent text-white text-[11px] font-semibold leading-tight translate-y-full opacity-0 transition-all duration-300 group-hover/face:translate-y-0 group-hover/face:opacity-100">
            {name}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

export default function Stories() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const inView = useInView(stageRef, { amount: 0.4 })
  const progress = useMotionValue(0)

  const go = (dir) => setActive((a) => (a + dir + students.length) % students.length)

  // A new story always starts its progress bar from empty. Declared before the autoplay effect so it runs first.
  useEffect(() => progress.set(0), [active, progress])

  // Auto-advance: a progress value fills over SLIDE_SECONDS, then moves to the next story.
  // It holds while hovered or off screen and restarts whenever the story changes.
  useEffect(() => {
    if (reduce) return
    if (paused || !inView) return
    const c = animate(progress, 1, {
      duration: SLIDE_SECONDS * (1 - progress.get()),
      ease: 'linear',
      onComplete: () => go(1),
    })
    return () => c.stop()
  }, [active, paused, inView, reduce]) // eslint-disable-line react-hooks/exhaustive-deps

  const select = setActive
  const step = go

  // Giant outlined word drifting behind the stage as the section scrolls past.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const drift = useTransform(scrollYProgress, [0, 1], ['10%', '-35%'])

  const s = students[active]
  const half = Math.ceil(more.length / 2)

  return (
    <section
      ref={sectionRef}
      id="stories"
      className="relative py-24 lg:py-32 w-full overflow-hidden scroll-mt-20"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') step(1)
        if (e.key === 'ArrowLeft') step(-1)
      }}
    >
      <motion.div
        aria-hidden
        style={{ x: drift }}
        className="absolute top-40 left-0 whitespace-nowrap font-outfit font-black text-[9rem] sm:text-[14rem] lg:text-[18rem] leading-none tracking-tighter text-transparent [-webkit-text-stroke:1.5px_rgba(15,23,42,0.07)] pointer-events-none select-none"
      >
        INVICTARS · INVICTARS ·
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
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
          className="mb-14 lg:mb-20"
        />

        <motion.div
          ref={stageRef}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: EASE }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center"
        >
          <div className="lg:col-span-5 max-w-md w-full mx-auto lg:max-w-none pr-6 sm:pr-8 lg:pr-0">
            <Stage s={s} index={active} onSwipe={step} />
          </div>

          <div className="lg:col-span-7 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div key={s.name} className="min-h-[15rem] sm:min-h-[13rem]">
                <Quote text={s.quote} />
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
                  className="mt-7 flex items-center gap-4"
                >
                  <span className={`h-px w-10 ${s.tone === 'gold' ? 'bg-champagne-500' : 'bg-cobalt-600'}`} />
                  <div>
                    <div className="font-outfit font-bold text-lg text-obsidian-950">{s.name}</div>
                    <div className={`text-sm font-semibold ${s.tone === 'gold' ? 'text-amber-600' : 'text-cobalt-600'}`}>
                      {s.school}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Story selector: each thumbnail carries a progress bar while its story is on stage. */}
            <div className="mt-10 lg:mt-14 flex items-center gap-3">
              <div role="tablist" aria-label="Student stories" className="flex-1 grid grid-cols-5 gap-2 sm:gap-3">
                {students.map((st, i) => {
                  const on = i === active
                  return (
                    <button
                      key={st.name}
                      role="tab"
                      aria-selected={on}
                      aria-label={st.name}
                      onClick={() => select(i)}
                      className="group text-left focus:outline-none"
                    >
                      <div
                        className={`relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 ring-offset-2 ${
                          on ? 'ring-2 ring-obsidian-950' : 'opacity-50 grayscale hover:opacity-90 hover:grayscale-0'
                        } group-focus-visible:ring-2 group-focus-visible:ring-cobalt-500`}
                      >
                        <img
                          src={img(`students/${st.photo}`)}
                          alt=""
                          style={{ objectPosition: st.focus }}
                          className={`w-full h-full object-cover transition-transform duration-500 ${on ? 'scale-110' : 'group-hover:scale-110'}`}
                        />
                      </div>
                      <div className="mt-2 h-[3px] rounded-full bg-slate-200 overflow-hidden">
                        {on && (
                          <motion.div
                            style={{ scaleX: reduce ? 1 : progress }}
                            className="h-full origin-left bg-obsidian-950"
                          />
                        )}
                      </div>
                      <div
                        className={`hidden sm:block mt-2 text-[11px] font-semibold leading-tight truncate transition-colors ${
                          on ? 'text-obsidian-950' : 'text-slate-400'
                        }`}
                      >
                        {st.name.split(' ')[0]}
                      </div>
                    </button>
                  )
                })}
              </div>
              <div className="hidden sm:flex flex-col gap-2 self-start">
                {[
                  [-1, 'Previous story', 'rotate-180'],
                  [1, 'Next story', ''],
                ].map(([dir, label, r]) => (
                  <motion.button
                    key={label}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => step(dir)}
                    aria-label={label}
                    className="w-11 h-11 rounded-full border border-slate-300 flex items-center justify-center text-obsidian-950 hover:bg-obsidian-950 hover:text-white hover:border-obsidian-950 transition-colors"
                  >
                    <span className={r}>
                      <Arrow />
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
        className="relative mt-24 lg:mt-32"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 mb-6 flex items-baseline justify-between gap-4">
          <p className="font-outfit font-bold text-xl sm:text-2xl text-obsidian-950">More Invictars, now abroad.</p>
          <p className="hidden sm:block font-grotesk text-xs font-bold uppercase tracking-wider text-slate-400">
            Hover to meet them
          </p>
        </div>
        <div className="face-wall space-y-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <FaceRow items={more.slice(0, half)} duration={70} />
          <FaceRow items={more.slice(half)} duration={80} reverse />
        </div>
      </motion.div>
    </section>
  )
}
