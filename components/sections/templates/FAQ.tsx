import { Fragment, useState } from "react";
import AnimateHeight from "react-animate-height";
import { ChevronDown } from "react-feather";

import { QandA } from "@/types/types";

type FAQProps = {
  questions: QandA[];
};

export default function FAQ({ questions }: FAQProps) {
  const [heights, setHeights] = useState(Array(questions.length).fill(0));

  const toggleHeight = (i: number) => {
    const newHeights = [...heights];
    newHeights[i] = heights[i] === 0 ? "auto" : 0;
    setHeights(newHeights);
  };

  return (
    <section className="mb-section mx-container grid gap-8 xl:grid-cols-[4fr_5fr] xl:gap-14">
      <h2 className="text-4xl font-bold text-white md:text-8xl xl:-mt-6 xl:text-8xl">
        Frequently Asked Questions
      </h2>
      <div>
        {questions.map((question, i) => (
          <Fragment key={`question-${i}`}>
            <div
              className={`cursor-pointer ${
                i === questions.length - 1 ? "" : "pb-7"
              } ${i === 0 ? "" : "pt-7"}`}
              onClick={() => toggleHeight(i)}
            >
              <div className="flex items-center justify-between gap-6">
                <h3 className="font-semibold leading-loose text-white xs:text-lg 2xl:text-xl">
                  {question.question}
                </h3>
                <ChevronDown
                  className={`transition-300 w-6 text-white ${
                    heights[i] === 0 ? "rotate-0" : "rotate-180"
                  }`}
                />
              </div>
              <AnimateHeight duration={300} height={heights[i]}>
                <p className="mt-4 leading-loose text-grey1 2xl:text-lg">
                  {question.answer}
                </p>
              </AnimateHeight>
            </div>
            {i !== questions.length - 1 && (
              <hr className="border-b-1 border-grey3" />
            )}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
