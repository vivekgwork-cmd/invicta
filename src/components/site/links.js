// Shared routes for the Homepage, Study Abroad and Test Prep pages.
export const ROUTES = {
  home: '/',
  studyAbroad: '/study-abroad',
  testPrep: '/test-prep',
  counselling: '/study-abroad#evaluation-form',
}

export const NAV_LINKS = [
  { label: 'Home', to: ROUTES.home },
  { label: 'Study Abroad', to: ROUTES.studyAbroad },
  { label: 'Test Prep', to: ROUTES.testPrep },
  { label: 'Success Stories', to: '/#stories' },
  { label: 'About Us', to: '/#director' },
]

export const img = (file) => `${import.meta.env.BASE_URL}images/${file}`
