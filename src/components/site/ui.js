// Button styles shared across the Homepage, Study Abroad and Test Prep pages. Pair with the
// <Arrow /> glyph, which slides on hover via the `group` class.
const base = 'group inline-flex items-center justify-center gap-2.5 font-bold rounded-xl transition-all duration-200 hover:-translate-y-0.5'

export const btn = {
  gold: `${base} bg-gradient-to-r from-champagne-500 via-amber-500 to-amber-600 hover:from-champagne-600 hover:to-amber-700 text-obsidian-950 shadow-lg hover:shadow-xl`,
  dark: `${base} bg-obsidian-950 hover:bg-cobalt-600 text-white shadow-md hover:shadow-xl`,
  light: `${base} bg-white border border-slate-200 hover:border-slate-300 text-obsidian-950 shadow-sm hover:shadow-md`,
}

export const size = {
  lg: 'text-sm px-8 py-4',
  sm: 'text-xs uppercase tracking-wider px-6 py-3.5',
}
