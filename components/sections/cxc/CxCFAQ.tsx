import QAndA from '@/components/layout/QAndA';

const QUESTIONS = [
  {
    question: 'What is CxC?',
    answer:
      'CxC is a Data Hackathon in which you (and your group) have the opportunity to work with company-provided problems.',
  },
  {
    question: 'Why is CxC 2 weeks long?',
    answer:
      'Cleaning data, training model and investigation take time. We are providing ample time for you to iterate and improve your solutions.',
  },
  {
    question: 'What are some previous company challenges?',
    answer:
      'In CxC II, Intact provided a dataset to identify the specific field of medicine given medical reports. Cyclica (now under Recursion) extracted features of proteins to identify whether a site is drug-binding or not.',
  }
];

export default function CxCFAQ() {
  return (
    <section className='mb-section mx-container grid gap-8 xl:gap-14 xl:grid-cols-[4fr_5fr]'>
      <h2 className='text-white font-bold text-4xl md:text-8xl xl:text-8xl xl:-mt-6'>
        Frequently Asked Questions
      </h2>
      <QAndA questions={QUESTIONS} />
    </section>
  );
}
