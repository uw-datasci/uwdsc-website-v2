import FAQ from "@/components/sections/templates/FAQ";

import { GENERAL_FAQ } from "@/constants/faqs";

export default function FrequentlyAskedQuestions() {
  return <FAQ questions={GENERAL_FAQ} />;
}
