import Reveal, { Stagger, StaggerItem } from '../shared/Reveal.jsx'
import { PlayPill } from '../shared/Glyphs.jsx'

const photos = [
  { src: 'Tbilisi.jpg', alt: 'Tbilisi Old Town at night', label: 'Life In Tbilisi', span: 'lg:row-span-2' },
  { src: 'SEU.jpg', alt: 'SEU campus building', label: 'The Campus', span: '' },
  { src: 'indian-college-students.jpg', alt: 'Indian students abroad', label: 'Student Life', span: '' },
]

const points = [
  'On-campus life at Georgian National University SEU with an active Indian student community.',
  'Indian food hostels with AC and student amenities.',
  'Modern campus infrastructure, including high-tech lab environments.',
  'Part-time work legally allowed up to 20 hours per week.',
  'Typical living cost about $300 to $400 per month.',
  'A safe, affordable, modern European capital city for international students.',
]

export default function CampusSection() {
  return (
    <section id="campus" className="py-20 bg-primary scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-sm font-semibold text-accent-soft uppercase tracking-wide">Life In Tbilisi</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-3 text-secondary text-balance">Once You Land, <span className="text-gold-soft">Here's Life</span></h2>
          <p className="mt-4 text-secondary/60 leading-relaxed">Georgia becomes home for two years. Here's what that actually looks like day to day.</p>
        </Reveal>

        <div className="mt-12 grid lg:grid-cols-2 gap-4">
          {photos.map((p, i) => (
            <Reveal
              key={p.src}
              direction={i === 0 ? 'left' : 'right'}
              delay={i === 2 ? 0.1 : 0}
              className={`group relative rounded-3xl overflow-hidden ${i === 0 ? 'aspect-[16/11] lg:row-span-2' : 'aspect-[16/9]'} ${p.span}`}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/${p.src}`}
                alt={p.alt}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-[0.6]"
              />
              <div className="absolute inset-0 grid place-items-center">
                <span className="opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                  <PlayPill label={p.label} />
                </span>
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
    </section>
  )
}
