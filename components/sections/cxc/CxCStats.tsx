import Stats from '@/components/sections/templates/Stats';

import { type Stat } from '@/types/types';

const STATS: Stat[] = [
  {
    id: 'participants',
    title: 'Participants',
    stat: 300,
  },
  {
    id: 'collaborating-companies',
    title: 'Collaborating Companies',
    stat: 10,
  },
  {
    id: 'hackathons-hosted',
    title: 'Hackathons Hosted',
    stat: 4,
  },
];

export default function CxCStats() {
  return <Stats title='CXC STATS' stats={STATS} />;
}
