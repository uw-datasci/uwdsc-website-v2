import QAndA from '@/components/layout/QAndA';

const QUESTIONS = [
  {
    question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
  },
  {
    question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
  },
  {
    question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
  },
  {
    question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
  },
  {
    question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
  },
  {
    question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
  },
];

export default function FAQ() {
  return (
    <section className='mb-section mx-container grid gap-8 xl:gap-14 xl:grid-cols-[4fr_5fr]'>
      <h2 className='text-white font-bold text-4xl md:text-8xl xl:text-8xl xl:-mt-6'>
        Frequently Asked Questions
      </h2>
      <QAndA questions={QUESTIONS} />
    </section>
  );
}
