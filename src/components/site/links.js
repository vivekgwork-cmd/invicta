// Shared routes for the Homepage, Study Abroad and Test Prep pages.
export const ROUTES = {
  home: '/',
  studyAbroad: '/study-abroad',
  testPrep: '/test-prep',
  about: '/about',
  counselling: '/study-abroad#evaluation-form',
  testPrepForm: '/test-prep#book-diagnostic',
}

// Placeholder booking link until the client shares their real Calendly URL.
export const CALENDLY_URL = 'https://calendly.com/invicta-demo/30min'

export const NAV_LINKS = [
  { label: 'Home', to: ROUTES.home },
  { label: 'Study Abroad', to: ROUTES.studyAbroad },
  { label: 'Test Prep', to: ROUTES.testPrep },
  { label: 'Success Stories', to: '/#stories' },
  { label: 'About Us', to: ROUTES.about },
]

export const img = (file) => `${import.meta.env.BASE_URL}images/${file}`
