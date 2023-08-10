import FAQ from '@/components/sections/templates/FAQ';

import { QandA } from '@/types/types';

const QUESTIONS: QandA[] = [
  {
    id: '1',
    question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
  },
  {
    id: '2',
    question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
  },
  {
    id: '3',
    question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
  },
  {
    id: '4',
    question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
  },
  {
    id: '5',
    question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
  },
  {
    id: '6',
    question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
  },
];

export default function FrequentlyAskedQuestions() {
  return <FAQ questions={QUESTIONS} />;
}
