import { useState } from "react";
import { useFormik } from "formik";
import handleSubmit from "@/utils/form-submission";
import TextInput from "@/components/UI/TextInput";
import Button from "@/components/UI/Button";
import GradientBorder from "@/components/UI/GradientBorder";

type formValuesType = {
  name: string;
  email: string;
  message: string;
};

function validate(values: formValuesType) {
  const errors: { name?: string; email?: string; message?: string } = {};

  if (!values.name) {
    errors.name = "Please enter your name.";
  }

  if (!values.email) {
    errors.email = "Please enter your email address.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.message) {
    errors.message = "Please enter your message.";
  }

  return errors;
}

export default function CxCContact() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validate,
    onSubmit: (values, actions) => {
      handleSubmit("contact", values);
      actions.resetForm();
      setSubmitted(true);
    },
  });

  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="mb-section mx-container relative overflow-hidden flex flex-row xs:flex-col sm:flex-col md:flex-row">
      <div className="text-white mx-4 md:w-1/2">
        <div className="font-bold text-xl 3xs:text-2xl mx-auto 2xs:text-3xl mb-4 xs:text-4xl  sm:text-5xl  md:mb-6 md:text-6xl   xl:text-7xl 2xl:text-8xl 2xl:mb-9">
          Sponsor Form
        </div>
        <div className="pb-8 text-lg">
          Have a question or interested in sponsoring us? Send us a message
          here. We will get back to you ASAP!
        </div>
      </div>
      <form
        name="contact"
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-5 lg:gap-6 md:w-1/2"
        data-netlify="true"
      >
        <div>
          <TextInput
            inputType="textinput"
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={() => setSubmitted(false)}
            value={formik.values.name}
            placeholder="Name"
          />

          {formik.touched.name && formik.errors.name ? (
            <p className="mt-3 text-sm text-red lg:mt-4 lg:text-base">
              {formik.errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <TextInput
            inputType="textinput"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={() => setSubmitted(false)}
            value={formik.values.email}
            placeholder="Email"
          />

          {formik.touched.email && formik.errors.email ? (
            <p className="mt-3 text-sm text-red lg:mt-4 lg:text-base">
              {formik.errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <TextInput
            inputType="textarea"
            id="message"
            name="message"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={() => setSubmitted(false)}
            value={formik.values.message}
            placeholder="Message"
          />

          {formik.touched.message && formik.errors.message ? (
            <p className="mt-3 text-sm text-red lg:mt-4 lg:text-base">
              {formik.errors.message}
            </p>
          ) : null}

          {submitted ? (
            <p className="mt-3 text-sm text-lightGreen lg:mt-4 lg:text-base">
              Success! We will email you back shortly.
            </p>
          ) : null}
        </div>

        <Button
          type="submit"
          hierarchy="primary"
          border="rounded-sm"
          padding="px-9 py-3 md:py-4"
          font="text-lg"
          onClick={formik.handleSubmit}
          classes="text-center"
        >
          Submit
        </Button>
      </form>
    </section>
  );
}
