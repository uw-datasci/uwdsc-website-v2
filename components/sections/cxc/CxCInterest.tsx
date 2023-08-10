import { useFormik } from "formik";

import Button from "@/components/UI/Button";
import Banner from "@/components/layout/Banner";
import GradientBorder from "@/components/UI/GradientBorder";

export default function CxCInterest() {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <section className="mb-section relative overflow-hidden">
      <Banner>
        <div className="pt-8 pb-12 2xs:pt-10 2xs:pb-14 sm:pt-12 sm:pb-18 lg:pt-18 lg:pb-24 2xl:pt-24 2xl:pb-36">
          <h2 className="font-bold text-center text-white text-xl 3xs:text-2xl max-w-[420px] mx-auto 2xs:text-3xl mb-4 xs:text-4xl xs:max-w-[420px] sm:text-5xl sm:max-w-[500px] md:mb-6 md:text-6xl md:max-w-[600px] xl:max-w-[700px] xl:text-7xl 2xl:text-8xl 2xl:mb-9">
            Interested in Sponsoring CxC?
          </h2>
          <div className="max-w-[580px] mx-auto flex justify-around">
            <Button
              type="button"
              hierarchy="primary"
              font="font-bold"
              text="xl:text-lg"
              padding="px-4 xl:px-6 mx-2 md:mx-0"
              rounded="rounded-md"
              classes="right-1 inset-y-1 xl:right-2 xl:inset-y-2 h-16"
            >
              Set Up a Meeting
            </Button>
            <GradientBorder rounded="rounded-md" classes="mx-2 md:mx-0">
              <Button
                href="https://twitter.com"
                type="link"
                hierarchy="secondary"
                font="font-bold"
                text="xl:text-lg"
                padding="px-4 xl:px-6 py-2 md:py-4"
                rounded="rounded-md"
                classes="h-16"
              >
                Download Sponsorship Package
              </Button>
            </GradientBorder>
          </div>
        </div>
      </Banner>
    </section>
  );
}
