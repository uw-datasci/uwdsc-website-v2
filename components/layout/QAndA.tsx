import { Fragment, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { ChevronDown } from 'react-feather';

type QAndAProps = {
  questions: { question: string; answer: string }[];
};

export default function QAndA({ questions }: QAndAProps) {
  const [heights, setHeights] = useState(Array(questions.length).fill(0));

  const toggleHeight = (i: number) => {
    const newHeights = [...heights];
    newHeights[i] = heights[i] === 0 ? 'auto' : 0;
    setHeights(newHeights);
  };

  return (
    <div>
      {questions.map((question, i) => (
        <Fragment key={`question-${i}`}>
          <div
            className={`cursor-pointer ${
              i === questions.length - 1 ? '' : 'pb-7'
            } ${i === 0 ? '' : 'pt-7'}`}
            onClick={() => toggleHeight(i)}
          >
            <div className='flex items-center justify-between gap-6'>
              <h3 className='font-semibold text-white xs:text-lg 2xl:text-xl leading-loose'>
                {question.question}
              </h3>
              <ChevronDown
                className={`transition-300 text-white w-6 ${
                  heights[i] === 0 ? 'rotate-0' : 'rotate-180'
                }`}
              />
            </div>
            <AnimateHeight duration={300} height={heights[i]}>
              <p className='mt-4 text-grey1 2xl:text-lg leading-loose'>
                {question.answer}
              </p>
            </AnimateHeight>
          </div>
          {i !== questions.length - 1 && (
            <hr className='border-b-1 border-grey3' />
          )}
        </Fragment>
      ))}
    </div>
  );
}
