// Shown for every route while MAINTENANCE_MODE is on in main.jsx.
export default function Maintenance() {
  return (
    <main className="min-h-screen bg-obsidian-950 text-white font-jakarta flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <img
          src={`${import.meta.env.BASE_URL}images/logo-invitica.png`}
          alt="Invicta Global Education"
          className="h-14 w-auto mx-auto mb-10"
        />
        <p className="font-grotesk text-xs uppercase tracking-[0.3em] text-cobalt-400 mb-4">
          Under maintenance
        </p>
        <h1 className="font-outfit text-4xl sm:text-5xl font-semibold leading-tight mb-6">
          We&rsquo;ll be back shortly
        </h1>
        <p className="text-white/70 text-base sm:text-lg leading-relaxed">
          Our website is currently undergoing scheduled maintenance. We apologise for the
          inconvenience and appreciate your patience.
        </p>
      </div>
    </main>
  )
}
