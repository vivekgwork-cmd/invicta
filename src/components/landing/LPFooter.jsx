export default function LPFooter() {
  return (
    <footer className="bg-primary-soft border-t border-white/10 py-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-xs text-secondary/40">
        <img
          src={`${import.meta.env.BASE_URL}images/logo-invitica.png`}
          alt="Invicta Career Consultancy"
          className="h-7 w-auto shrink-0"
        />
        <p className="text-center sm:text-right">
          © {new Date().getFullYear()} Invicta Global Education. Programs shown in collaboration
          with a fictional "SEU x MIT" partnership, created for demo purposes only.
        </p>
      </div>
    </footer>
  )
}
