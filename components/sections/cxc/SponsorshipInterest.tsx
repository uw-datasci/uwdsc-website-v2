import Banner from "@/components/layout/Banner";
import Button from "@/components/UI/Button";
import GradientBorder from "@/components/UI/GradientBorder";

export default function SponsorshipInterest() {
  return (
    <section className="mb-section">
      <Banner>
        <div className="pb-12 pt-8 2xs:pb-14 2xs:pt-10 sm:pb-18 sm:pt-12 lg:pb-24 lg:pt-18 2xl:pb-36 2xl:pt-24">
          <h2 className="mb-4 text-center text-lg font-bold text-white 3xs:text-xl xs:text-3xl sm:text-5xl md:text-7xl xl:text-9xl">
            Interested in sponsoring CxC?
          </h2>
          <p className="mx-auto mb-8 max-w-[500px] text-center leading-loose text-white xs:text-lg sm:mb-12 md:max-w-[600px] md:text-xl">
            Thank you for your interest in collaborating with us! Please set up
            a meeting with us below.
          </p>
          <div className="flex flex-col gap-5 sm:flex-row sm:justify-center sm:gap-12">
            <Button
              type="route"
              href="#contact"
              hierarchy="primary"
              font="font-bold"
              text="sm:text-lg 2xl:text-xl"
              padding="py-3 sm:px-7 sm:py-4"
              rounded="rounded-lg hover:bg-gradient-to-bl "
            >
              Set Up a Meeting
            </Button>
            {/* <GradientBorder rounded="rounded-lg">
              <Button
                type="link"
                href=""
                hierarchy="secondary"
                font="font-bold"
                text="sm:text-lg 2xl:text-xl"
                padding="py-3 sm:px-7 sm:py-4"
                rounded="rounded-[15px]"
                classes="w-full"
              >
                Download Sponsorship Package
              </Button>
            </GradientBorder> */}
          </div>
        </div>
      </Banner>
    </section>
  );
}
