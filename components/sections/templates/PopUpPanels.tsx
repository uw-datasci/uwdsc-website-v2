import { ReactElement } from "react";
import GradientBorder from "@/components/UI/GradientBorder";
import Button from "@/components/UI/Button";
import { ChevronDown } from "react-feather";

type PopUpProps = {
  isPopUp: boolean;
  moveUpFunc?: () => void;
  moveDownFunc: () => void;
  panelIndex: number;
  panels: ReactElement[];
};

export default function PopUpPanels({
  isPopUp,
  moveUpFunc,
  moveDownFunc,
  panelIndex,
  panels,
}: PopUpProps) {
  let width = "";
  let translate = "";

  //Full keywords needed to pre-render for tailwind, there is most likely a better fix but this will have to do
  switch (panels.length) {
    case 1:
      width = "w-[100%]";
      break;
    case 2:
      width = "w-[200%]";
      if (panelIndex == 1) {
        translate = "translate-x-[-50%]";
      }
      break;
    case 3:
      width = "w-[300%]";
      if (panelIndex == 1) {
        translate = "translate-x-[-33.33%]";
      } else if (panelIndex == 2) {
        translate = "translate-x-[-66.66%]";
      }
      break;
    default:
      width = "w-full";
  }

  return (
    <section
      className={
        "fixed right-0 top-0 z-50 h-screen w-screen transition-transform duration-500 ease-in-out " +
        (isPopUp ? "translate-y-[0vh]" : "translate-y-[100vh]")
      }
    >
      <div className="flex h-full w-full flex-col bg-black p-4 lg:p-8">
        <div className="flex flex-col-reverse justify-between p-2 lg:flex-row lg:px-5 lg:py-3">
          <div className="my-auto h-fit w-fit">
            <h2
              className={
                isPopUp
                  ? "hidden animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-3 text-2xl font-bold text-white lg:block"
                  : ""
              }
            >
              UW Data Science Club
            </h2>
          </div>
          <GradientBorder
            rounded="rounded-lg"
            classes={
              "duration-1000 transition-opacity ease-in-out ml-auto lg:ml-none w-fit h-fit hidden lg:inline-block " +
              (isPopUp ? "opacity-100" : "opacity-0")
            }
          >
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
          <ChevronDown
            className="ml-auto w-6 text-white lg:hidden"
            onClick={moveDownFunc}
          ></ChevronDown>
        </div>
        <div
          className={
            "mb-[1%] mt-[2%] h-full overflow-hidden transition-opacity duration-1000 ease-in-out lg:mx-[10%] " +
            (isPopUp ? "opacity-100" : "opacity-0")
          }
        >
          <div
            className={
              width +
              " flex h-full flex-row transition-transform duration-500 ease-in-out " +
              translate
            }
          >
            {panels.map((panel, i) => (
              <div key={panel.key ?? i}>{panel}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
