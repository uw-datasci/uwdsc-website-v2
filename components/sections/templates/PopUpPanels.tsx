import { ReactElement } from "react";
import GradientBorder from "@/components/UI/GradientBorder";
import Button from "@/components/UI/Button";
import { ChevronDown } from "react-feather";

type PopUpProps = {
  isPopUp: boolean,
  moveUpFunc?: () => void,
  moveDownFunc: () => void,
  panelIndex: number,
  panels: ReactElement[]
};

export default function PopUpPanels ({
  isPopUp,
  moveUpFunc,
  moveDownFunc,
  panelIndex,
  panels
} : PopUpProps) {
  let width = ""
  let translate = ""

  //Full keywords needed to pre-render for tailwind, there is most likely a better fix but this will have to do
  switch(panels.length) {
    case 1:
      width = "w-[100%]"
      break;
    case 2:
      width = "w-[200%]"
      if (panelIndex == 1) {
        translate = "translate-x-[-50%]"
      }
      break;
    case 3:
      width = "w-[300%]"
      if (panelIndex == 1) {
        translate = "translate-x-[-33.33%]"
      } else if (panelIndex == 2) {
        translate = "translate-x-[-66.66%]"
      }
      break;
    default: 
      width = "w-full"
  }

  return (
  <section className={"fixed z-50 w-screen h-screen top-0 right-0 duration-500 transition-transform ease-in-out " + (isPopUp?"translate-y-[0vh]":"translate-y-[100vh]")}> 
    <div className="bg-black w-full h-full p-4 lg:p-8 flex flex-col">
      <div className="flex flex-col-reverse lg:flex-row justify-between p-2 lg:py-3 lg:px-5">
        <div className="w-fit h-fit my-auto">
          <h2 className={isPopUp?"animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-3 text-2xl text-white font-bold hidden lg:block":""}>
            UW Data Science Club
          </h2>
        </div>
        <GradientBorder rounded="rounded-lg" classes={"duration-1000 transition-opacity ease-in-out ml-auto lg:ml-none w-fit h-fit hidden lg:inline-block " + (isPopUp?"opacity-100":"opacity-0")}>
          <Button
            type="button"
            hierarchy="secondary"
            font="font-bold"
            rounded="rounded-[15px]"
            classes="w-full"
            onClick={moveDownFunc}
          >
            Close
          </Button>
        </GradientBorder>
        <ChevronDown className="ml-auto w-6 text-white lg:hidden" onClick={moveDownFunc}>
        </ChevronDown>
      </div>
      <div className={"duration-1000 transition-opacity ease-in-out lg:mx-[10%] mt-[2%] mb-[1%] overflow-hidden h-full " + (isPopUp?"opacity-100":"opacity-0")}>
          <div className={width + " h-full flex flex-row duration-500 transition-transform ease-in-out " + translate}>
            {panels.map((panel) => (panel))}
          </div>
      </div>
    </div>
  </section>)
}