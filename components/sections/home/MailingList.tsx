import Image from "next/image";
import { useFormik } from "formik";

import Button from "@/components/UI/Button";
import Banner from "@/components/layout/Banner";

import echo1 from "@/public/graphics/echo-1.png";
import echo2 from "@/public/graphics/echo-2.png";

export default function MailingList() {
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
      <Image
        src={echo1}
        alt="echo 1"
        className="absolute -bottom-[20%] -left-[5%] hidden w-[50%] opacity-20 md:block"
      />
      <Image
        src={echo2}
        alt="echo 2"
        className="absolute -bottom-[5%] -right-[5%] hidden w-[50%] opacity-20 md:block md:w-[35%]"
      />
      <Banner>
        <div className="pb-12 pt-8 2xs:pb-14 2xs:pt-10 sm:pb-18 sm:pt-12 lg:pb-24 lg:pt-18 2xl:pb-36 2xl:pt-24">
          <h2 className="mx-auto mb-4 max-w-[390px] text-center text-xl font-bold text-white 3xs:text-2xl 2xs:text-3xl xs:max-w-[400px] xs:text-5xl sm:max-w-[480px] sm:text-6xl md:mb-6 md:max-w-[540px] md:text-8xl xl:max-w-[640px] xl:text-9xl 2xl:text-10xl">
            Stay up to date on Data Science Club events.
          </h2>
          <p className="mb-8 text-center leading-loose text-white xs:mb-10 xs:text-lg md:mb-12 md:text-xl 2xl:text-2xl">
            Join our mailing list! No spam, we promise.
          </p>
          <form
            onSubmit={formik.handleSubmit}
            className="relative mx-auto max-w-[680px] "
          >
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="transition-300 w-full rounded-md border border-grey1 bg-grey4 py-3.5 pl-4.5 pr-24 text-white outline-none placeholder:text-grey1 focus:border-white xl:px-6 xl:py-4.5 xl:pr-32 xl:text-lg"
            />
            <Button
              type="submit"
              hierarchy="primary"
              font="font-bold"
              text="xl:text-lg"
              padding="px-4 xl:px-6"
              rounded="rounded-sm"
              classes="absolute right-1 inset-y-1 xl:right-2 xl:inset-y-2"
            >
              Submit
            </Button>
          </form>
        </div>
      </Banner>
    </section>
  );
}
