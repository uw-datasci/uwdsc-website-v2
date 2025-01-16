import Image from "next/image";
import ufo from "@/public/cxc/graphics/UFO.png";
import cityskyline from "@/public/cxc/graphics/CitySkyline.png";
import airplane from "@/public/cxc/graphics/Airplane.png";
import smallcloud from "@/public/cxc/graphics/SmallCloud.png";
import cloudcluster from "@/public/cxc/graphics/CloudCluster.png";

import Star from "@/components/UI/Star";
import { useMediaQuery } from "react-responsive";

export default function CxCBackground() {
  // MARCUS TODO:
  //  Please refrain from useMediaQuery unless absolutely necessary, you can use tailwind props to accomplish this.
  //  Put your tailwind prop as part of stars, and the remaining divs
  //  once you've done that, remove the react-responsive module from npm

  return (
    <div className="w-full">
      {/* UFO, airplane, clouds, and CxC Title */}
      {/* UFO, airplane, and clouds only show for desktop and not mobile */}

      <div className="hidden md:block">
        <Star size={5} top={4} left={4} degrees={25} />
        <Star size={10} top={3} left={8} degrees={25} />
        <Star size={7} top={8} left={95} degrees={25} />
        <Star size={9} top={4} left={90} degrees={25} />
        <Star size={5} top={6} left={87} degrees={25} />
        <Star size={8} top={17} left={20} degrees={25} />
        <Star size={10} top={20} left={15} degrees={25} />
        <Star size={6} top={22} left={93} degrees={25} />
        <Star size={9} top={38} left={23} degrees={25} />
        <Star size={5} top={33} left={25} degrees={25} />
        <Star size={7} top={35} left={20} degrees={25} />
        <Star size={7} top={48} left={12} degrees={25} />
        <Star size={10} top={50} left={15} degrees={25} />
        <Star size={8} top={53} left={11} degrees={25} />
        <div className="absolute left-[7%] top-[5%] z-[-1] w-[min(25%,200px)] animate-slow-bounce">
          <Image src={ufo} alt="UFO" />
        </div>
        <div className="absolute left-[75%] top-[35%] z-[-1] w-[min(50%,400px)]">
          <Image src={airplane} alt="Airplane" />
        </div>
        <div className="absolute left-[5%] top-[32%] z-[-1] w-[min(50%,200px)] animate-slow-bounce">
          <Image src={smallcloud} alt="Small Cloud" />
        </div>
        <div className="absolute right-0 top-[52%] z-[-1] w-[min(50%,400px)] animate-slow-bounce">
          <Image src={cloudcluster} alt="Cloud Cluster" />
        </div>
      </div>

      {/* City Skyline and Gradient Overlay */}
      <div className="absolute bottom-0 z-[-1] h-min w-full">
        <Image src={cityskyline} alt="City Skyline" />
        <div className="absolute inset-0 w-full bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
  );
}
