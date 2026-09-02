import { Link } from 'react-router-dom'

export default function LPFooter() {
  return (
    <footer className="bg-primary-soft border-t border-white/10 py-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-secondary/40">
        <p>
          © {new Date().getFullYear()} Invicta Global Education. Programs shown in collaboration
          with a fictional "SEU x MIT" partnership, created for demo purposes only.
        </p>
        <Link to="/" className="text-secondary/60 hover:text-secondary font-medium">
          ← Back to Invicta Home
        </Link>
      </div>
    </footer>
  )
}
