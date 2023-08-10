import FAQ from '@/components/sections/templates/FAQ';

import { type QandA } from '@/types/types';

const QUESTIONS: QandA[] = [
  {
    id: '1',
    question: 'What is CxC?',
    answer:
      'CxC is a Data Hackathon in which you (and your group) have the opportunity to work with company-provided problems.',
  },
  {
    id: '2',
    question: 'Why is CxC 2 weeks long?',
    answer:
      'Cleaning data, training model and investigation take time. We are providing ample time for you to iterate and improve your solutions.',
  },
  {
    id: '3',
    question: 'What are some previous company challenges?',
    answer:
      'In CxC II, Intact provided a dataset to identify the specific field of medicine given medical reports. Cyclica (now under Recursion) extracted features of proteins to identify whether a site is drug-binding or not.',
  },
];

export default function FrequentlyAskedQuestions() {
  return <FAQ questions={QUESTIONS} />;
}
