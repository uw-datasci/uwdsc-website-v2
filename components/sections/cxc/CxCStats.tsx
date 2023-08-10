import Stats from '@/components/sections/templates/Stats';

import { CXC_STATS } from '@/constants/stats';

export default function CxCStats() {
  return <Stats title="CXC STATS" stats={CXC_STATS} />;
}
