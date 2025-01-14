import Stats from '@/components/sections/templates/Stats';
import statsheading from "@/public/cxc/graphics/StatsHeading.png"
import Image from 'next/image';

import { CXC_STATS } from '@/constants/stats';

export default function CxCStats() {
  return (
    <div>
      <div className="mb-5 flex justify-center">
        <Image src={statsheading} alt="Stats Heading" />
      </div>  
      <Stats title="" stats={CXC_STATS} />
    </div>
  )
}
