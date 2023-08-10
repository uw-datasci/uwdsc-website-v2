import Stats from '@/components/sections/templates/Stats';

import { Stat } from '@/types/types';

const STATS: Stat[] = [
  {
    id: 'workshops-held',
    title: 'Workshops Held',
    stat: 100,
  },
  {
    id: 'current-members',
    title: 'Current Members',
    stat: 400,
  },
  {
    id: 'recruiting-events-held',
    title: 'Recruiting Events Held',
    stat: 100,
  },
];

export default function ClubStats() {
  return <Stats title='Club STATS' stats={STATS} />;
}
