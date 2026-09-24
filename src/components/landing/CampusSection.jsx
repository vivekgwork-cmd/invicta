import Reveal, { Stagger, StaggerItem } from '../shared/Reveal.jsx'
import { motion } from 'framer-motion'

const photos = [
  { src: 'seu-img1.jpg', alt: 'Students celebrating together at SEU campus', label: 'Campus Life', area: 'a' },
  { src: 'seu-img2.jpg', alt: 'SEU Georgian National University building at sunset', label: 'The Campus', area: 'b' },
  { src: 'seu-img4.webp', alt: 'Modern lecture hall at SEU', label: 'Modern Classrooms', area: 'c' },
  { src: 'seu-img6.jpg', alt: 'Student lounge and atrium at SEU', label: 'Student Lounge', area: 'd' },
  { src: 'seu-img5.jpg', alt: 'Student at a cafe in Tbilisi', label: 'Life In Tbilisi', area: 'e' },
  { src: 'seu-img3.jpg', alt: 'Hostel room for Indian students', label: 'Hostel Rooms', area: 'f' },
]

const points = [
  'On-campus life at Georgian National University SEU with an active Indian student community.',
  'Indian food hostels with AC and student amenities.',
  'Modern campus infrastructure, including high-tech lab environments.',
  'Part-time work legally allowed up to 20 hours per week.',
  'Typical living cost about $200 to $300 per month.',
  'A safe, affordable, modern European capital city for international students.',
]

export default function CampusSection() {
  return (
    <section id="campus" className="relative py-20 bg-primary scroll-mt-24 overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-20 h-2 origin-left bg-gradient-to-r from-accent via-gold-soft to-accent shadow-[0_0_24px_rgba(253,194,4,0.7)] pointer-events-none"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute top-0 z-20 h-2 w-1/3 bg-gradient-to-r from-transparent via-white to-transparent blur-[2px] pointer-events-none"
        animate={{ left: ['-35%', '105%'] }}
        transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-80 sm:h-96 overflow-hidden pointer-events-none"
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          src={`${import.meta.env.BASE_URL}images/Tbilisi.jpg`}
          alt=""
          className="w-full h-full object-cover object-center"
          initial={{ scale: 1.2, x: 36 }}
          whileInView={{ scale: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/35 via-transparent to-primary/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/35 to-primary" />
        <svg className="absolute inset-0 w-full h-full opacity-90" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <motion.path
            d="M-30 235 C260 50 430 280 700 165 S1100 30 1470 115"
            fill="none"
            stroke="#fdc204"
            strokeWidth="3"
            strokeDasharray="7 10"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.9 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ pathLength: { duration: 2, delay: 0.5, ease: 'easeInOut' }, opacity: { duration: 0.4, delay: 0.5 } }}
          />
          <motion.circle
            r="6"
            fill="#ff8c5e"
            initial={{ cx: 0, cy: 235, opacity: 0 }}
            whileInView={{ cx: 700, cy: 165, opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
      </motion.div>
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-sm font-semibold text-accent-soft uppercase tracking-wide">Life In Tbilisi</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-3 text-secondary text-balance">Once You Land, <span className="text-gold-soft">Here's Life</span></h2>
          <p className="mt-4 text-secondary/60 leading-relaxed">Georgia becomes home for 18 to 24 months. Here's what that actually looks like day to day.</p>
        </Reveal>

        {/* Puzzle / bento mosaic: six photos of varying size, tiled edge-to-edge (zero gap)
            into one rounded rectangle — a true mosaic, not a grid of separate cards. Desktop
            uses a named-area grid; mobile falls back to a simple stacked column. */}
        <div className="hidden sm:block mt-12 rounded-3xl overflow-hidden">
          <div className="lp-tbilisi-grid grid gap-px bg-primary/60 h-[560px] lg:h-[640px]">
            {photos.map((p, i) => (
              <Reveal
                key={p.src}
                direction="fade"
                delay={i * 0.06}
                className={`lp-gallery-tile lp-tbilisi-${p.area} group relative overflow-hidden cursor-pointer`}
              >
                <img
                  src={`${import.meta.env.BASE_URL}images/${p.src}`}
                  alt={p.alt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />

                <div className="absolute left-4 right-4 bottom-4 flex items-center justify-between transition-transform duration-500 translate-y-1 group-hover:translate-y-0">
                  <span className="font-display text-white text-sm tracking-wide">{p.label}</span>
                  {i !== 1 && (
                    <span className="h-px flex-1 mx-3 bg-gold-soft/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  )}
                  <span className="text-[11px] font-semibold text-gold-soft/80 uppercase tracking-wide">{String(i + 1).padStart(2, '0')}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Mobile fallback: simple stacked gallery */}
        <div className="sm:hidden mt-12 grid grid-cols-2 gap-3">
          {photos.map((p, i) => (
            <Reveal
              key={p.src}
              direction="fade"
              delay={i * 0.06}
              className={`lp-gallery-tile group relative rounded-2xl overflow-hidden cursor-pointer aspect-square ${i === 0 ? 'col-span-2 aspect-[16/10]' : ''}`}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/${p.src}`}
                alt={p.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/10 to-transparent" />
              <div className="absolute left-3 right-3 bottom-3">
                <span className="font-display text-white text-xs tracking-wide">{p.label}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Stagger className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {points.map((p, i) => (
            <StaggerItem key={p}>
              <div className="h-full bg-primary p-6">
                <span className="font-display text-accent-soft/50 text-lg">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-sm text-secondary/70 leading-relaxed mt-3">{p}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <style>{`
        .lp-tbilisi-grid {
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(3, 1fr);
          grid-template-areas:
            "a a b b"
            "a a c d"
            "e e f f";
        }
        .lp-tbilisi-a { grid-area: a; }
        .lp-tbilisi-b { grid-area: b; }
        .lp-tbilisi-c { grid-area: c; }
        .lp-tbilisi-d { grid-area: d; }
        .lp-tbilisi-e { grid-area: e; }
        .lp-tbilisi-f { grid-area: f; }
      `}</style>
    </section>
  )
}
