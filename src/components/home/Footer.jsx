import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-ink-soft border-t border-white/10 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="font-display text-xl text-paper">
              Invicta<span className="text-gold-soft">.</span>
            </Link>
            <p className="mt-4 text-sm text-paper/55 leading-relaxed max-w-xs">
              Invicta Global Education is a study-abroad consultancy helping Indian
              students access world-class universities and scholarships.
            </p>
            <div className="flex gap-4 mt-5 text-sm text-paper/55">
              <a href="#" className="hover:text-paper">Instagram</a>
              <a href="#" className="hover:text-paper">LinkedIn</a>
              <a href="#" className="hover:text-paper">YouTube</a>
            </div>
          </div>

          <div>
            <h4 className="text-paper font-semibold text-sm mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm text-paper/55">
              <li><a href="#services" className="hover:text-paper/90">Study Abroad Services</a></li>
              <li><Link to="/landing-page" className="hover:text-paper/90">SEU x MIT Master's</Link></li>
              <li><a href="#stories" className="hover:text-paper/90">Success Stories</a></li>
              <li><a href="#contact" className="hover:text-paper/90">Free Counselling</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-paper font-semibold text-sm mb-4">Destinations</h4>
            <ul className="space-y-2.5 text-sm text-paper/55">
              <li>Georgia</li>
              <li>Germany</li>
              <li>Canada</li>
              <li>Australia</li>
            </ul>
          </div>

          <div>
            <h4 className="text-paper font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm text-paper/55">
              <li>hello@invicta-edu.example</li>
              <li>+91 98765 43210</li>
              <li>Bengaluru, India</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-paper/40">
          <p>© {new Date().getFullYear()} Invicta Global Education. A fictional company created for demo purposes.</p>
          <p>Made for demonstration — not a real institution.</p>
        </div>
      </div>
    </footer>
  )
}
