import FAQ from "@/components/sections/templates/FAQ";

import { CXC_FAQ } from "@/constants/faqs";

export default function FrequentlyAskedQuestions() {
  return <FAQ questions={CXC_FAQ} />;
}
