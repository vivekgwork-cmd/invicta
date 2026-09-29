import { Accordion, Heading, Rise } from '../site/motion.jsx'

const faqs = [
  {
    q: 'When should I start?',
    a: 'The earlier the better. Starting 12 to 18 months before you apply gives you time to build real depth, do research or start a project. If deadlines are closer, we assess where you stand honestly and build a faster plan.',
  },
  {
    q: 'Do you guarantee admission or scholarships?',
    a: 'No one can honestly guarantee admission to universities with single-digit acceptance rates. We improve your chances with a sound strategy, a genuine profile and essays that get noticed by admissions committees.',
  },
  {
    q: 'Which countries and universities do you cover?',
    a: 'The United States (Ivy League, top 50 national universities), the United Kingdom (Russell Group, Oxbridge), Canada (U15), Australia (Group of Eight) and leading European universities such as ETH Zurich and TU Munich.',
  },
  {
    q: 'Do you help with the visa?',
    a: 'Yes. We guide you through the whole visa process: DS-160 filing, SEVIS payment, financial documents and mock visa interviews.',
  },
  {
    q: 'What does it cost?',
    a: 'Your free profile evaluation includes an honest review of your profile and a clear breakdown of our packages, so you know exactly what is included. There are no hidden costs.',
  },
]

export default function FAQ() {
  return (
    <section id="faq" className="w-full py-24 lg:py-32 px-5 sm:px-6 lg:px-12 scroll-mt-20">
      <Rise className="max-w-3xl mx-auto">
        <Heading
          title="Frequently asked questions."
          body="Straight answers about timing, costs and how we work."
          className="mb-12"
        />
        <Accordion items={faqs} />
      </Rise>
    </section>
  )
}
