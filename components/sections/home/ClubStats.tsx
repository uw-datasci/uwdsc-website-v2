import Stats from "@/components/sections/templates/Stats";

import { CLUB_STATS } from "@/constants/stats";

export default function ClubStats() {
  return <Stats title="Club STATS" stats={CLUB_STATS} />;
}
