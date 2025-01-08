import React, { useState } from "react";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import ufo from "@/public/cxc/graphics/UFO.png";
import cityskyline from "@/public/cxc/graphics/CitySkyline.png";
import airplane from "@/public/cxc/graphics/Airplane.png";
import smallcloud from "@/public/cxc/graphics/SmallCloud.png";
import cloudcluster from "@/public/cxc/graphics/CloudCluster.png";
import TextInput from "@/components/cxc/TextInput";
import Dropdown from "@/components/cxc/Dropdown";
import TextArea from "@/components/cxc/TextArea";
import Submit from "@/components/cxc/Submit";
import spacer from "@/public/cxc/asset-spacer.png";
import Checkbox from "@/components/cxc/Checkbox";

const CxC: React.FC = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const pronounOptions = [
    "He/Him",
    "She/Her",
    "They/Them",
    "He/They",
    "She/They",
    "Other",
    "Prefer not to say",
  ];

  const facultyOptions = [
    "Arts",
    "Engineering",
    "Environment",
    "Health",
    "Mathematics",
    "Science",
  ];

  const yesNoOptions = ["Yes", "No"];

  const [consentChecked, setConsentChecked] = useState(false);

  const Star = ({ size = 5, top = 0, left = 0 }) => (
    <div
      className="absolute z-[-1] inline-block bg-white"
      style={{
        top: `${top}%`,
        left: `${left}%`,
        width: `${size}px`,
        height: `${size}px`,
      }}
    ></div>
  );

  return (
    <>
      <div
        className="relative z-10 mx-auto my-0 min-h-screen py-10"
        style={{
          background: "linear-gradient(to bottom, #000211, #03137c)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* UFO, airplane, and clouds only show for desktop and not mobile */}
        {!isMobile && (
          <div>
            <Star size={5} top={4} left={4} />
            <Star size={10} top={3} left={8} />
            <Star size={7} top={8} left={95} />
            <Star size={9} top={4} left={90} />
            <Star size={5} top={6} left={87} />
            <Star size={8} top={17} left={20} />
            <Star size={10} top={20} left={15} />
            <Star size={6} top={22} left={93} />
            <Star size={9} top={38} left={23} />
            <Star size={5} top={33} left={25} />
            <Star size={7} top={35} left={20} />
            <Star size={7} top={48} left={12} />
            <Star size={10} top={50} left={15} />
            <Star size={8} top={53} left={11} />
            <div className="absolute left-[7%] top-[5%] z-[-1] w-[min(25%,200px)] animate-bounce">
              <Image src={ufo} alt="UFO" />
            </div>
            <div className="absolute left-[75%] top-[35%] z-[-1] w-[min(50%,400px)]">
              <Image src={airplane} alt="Airplane" />
            </div>
            <div className="absolute left-[5%] top-[32%] z-[-1] w-[min(50%,200px)] animate-bounce">
              <Image src={smallcloud} alt="Small Cloud" />
            </div>
            <div className="absolute right-0 top-[52%] z-[-1] w-[min(50%,400px)] animate-bounce">
              <Image src={cloudcluster} alt="Cloud Cluster" />
            </div>

            <style jsx>{`
              @keyframes bounceY {
                0%,
                100% {
                  transform: translateY(-10px);
                }
                50% {
                  transform: translateY(10px);
                }
              }
              .animate-bounce {
                animation: bounceY 5s infinite;
              }
            `}</style>
          </div>
        )}

        {/* CXC Title */}
        <div className="relative left-0 top-0 z-[-1] mb-[100px] w-full font-jersey text-white">
          <div className="mx-auto flex flex-col items-center justify-center">
            <div className="text-xl leading-none tracking-[0.05em] lg:text-6xl lg:tracking-[0.1em]">
              UWDSC Presents
            </div>
            <div className="leading-1 text-3xl tracking-[0.1em] lg:text-10xl lg:tracking-[0.2em]">
              A DATA SCIENCE HACKATHON
            </div>
            <div className="flex flex-row items-center justify-center gap-4 text-7xl lg:gap-8 lg:text-[120px]">
              <span>2</span>
              <span>0</span>
              <Image
                src={spacer}
                alt=""
                className="inline-block h-full max-h-[1em] w-auto align-middle"
              />
              <span>C</span>
              <span>x</span>
              <span>C</span>
              <Image
                src={spacer}
                alt=""
                className="inline-block h-full max-h-[1em] w-auto align-middle"
              />
              <span>2</span>
              <span>5</span>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="mx-auto mb-[200px] w-[60%] rounded-[30px] border-2 border-white bg-gradient-to-b from-[rgba(0,9,255,0.5)] to-[rgba(255,150,214,0.5)] p-4 text-center font-jersey font-thin tracking-wider text-white">
          <div className="min-h-screen px-5 py-10 text-white">
            <h1 className="mb-8 text-center text-5xl font-thin tracking-widest md:text-9xl">
              Application Form
            </h1>
            <form className="mx-auto max-w-xl space-y-4">
              {/* First Name and Last Name */}
              <p className="text-left text-xl font-thin tracking-widest">
                Name
              </p>
              <div className="flex gap-4">
                <TextInput placeholder="First Name" />
                <TextInput placeholder="Last Name" />
              </div>
              <p className="text-left text-xl font-thin tracking-widest">
                Pronouns
              </p>
              <Dropdown
                options={pronounOptions}
                placeholder="Select Pronouns"
              />
              <p className="text-left text-xl font-thin tracking-widest">
                Ethnicities
              </p>
              <TextInput placeholder="" />
              <p className="text-left text-xl font-thin tracking-widest">
                Phone Number
              </p>
              <TextInput placeholder="" />
              <p className="text-left text-xl font-thin tracking-widest">
                Email
              </p>
              <TextInput placeholder="e.g. username@uwaterloo.ca" />
              <p className="text-left text-xl font-thin tracking-widest">
                Discord Username
              </p>
              <TextInput placeholder="e.g. @username" />
              <p className="text-left text-xl font-thin tracking-widest">
                Current or most recent study term
              </p>
              <TextInput placeholder="e.g. 1B" />
              <p className="text-left text-xl font-thin tracking-widest">
                Faculty
              </p>
              <Dropdown options={facultyOptions} placeholder="Select Faculty" />
              <p className="text-left text-xl font-thin tracking-widest">
                Program
              </p>
              <TextInput placeholder="" />
              <p className="text-left text-xl font-thin tracking-widest">
                T-shirt Size
              </p>
              <TextInput placeholder="" />
              <p className="text-left text-xl font-thin tracking-widest">
                Resume (Link)
              </p>
              <TextInput placeholder="https://website.com" />
              <p className="text-left text-xl font-thin tracking-widest">
                GitHub (Link)
              </p>
              <TextInput placeholder="https://github.com/username" />
              <p className="text-left text-xl font-thin tracking-widest">
                LinkedIn (Link)
              </p>
              <TextInput placeholder="https://linkedin.com/in/username" />
              <p className="text-left text-xl font-thin tracking-widest">
                Any Other Link (Portfolio, Personal Website, etc.)
              </p>
              <TextInput placeholder="" />
              <p className="text-left text-xl font-thin tracking-widest">
                Have you attended a hackathon before?
              </p>
              <Dropdown options={yesNoOptions} placeholder="Select Yes/No" />
              <p className="text-left text-xl font-thin tracking-widest">
                Number of hackathons attended as a hacker
              </p>
              <TextInput placeholder="" />
              <p className="text-left text-xl font-thin tracking-widest">
                What do you hope to see at CxC this term? Specific workshops,
                games, activities, anything! (500 characters)
              </p>
              <TextArea placeholder="" maxLength={500} />
              <div className="flex justify-start">
                <Checkbox
                  checked={consentChecked}
                  onChange={setConsentChecked}
                  label="I consent to having my email shared with CxC and DSC Sponsors"
                />
              </div>
              <Submit text="Submit" />
            </form>
          </div>
        </div>
        {/* City Skyline and Gradient Overlay */}
        <div className="absolute bottom-0 z-[-1] h-min w-full">
          <Image src={cityskyline} alt="City Skyline" />
          <div className="absolute inset-0 w-full bg-gradient-to-t from-black to-transparent" />
        </div>
      </div>
    </>
  );
};

export default CxC;
