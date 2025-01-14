import {
  DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS,
  useState,
} from "react";
import { useFormik } from "formik";
import { Mail, Instagram } from "react-feather";
import { RxDiscordLogo } from "react-icons/rx";
import { ObjectSchema } from "yup";

import TextInput from "@/components/UI/TextInput";
import Dropdown from "@/components/UI/Dropdown";
import TextArea from "@/components/UI/TextArea";
import Button from "@/components/UI/Button";
import Chip from "@/components/UI/Chip";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import InputFeedback from "@/components/UI/InputFeedback";

import { ContactField } from "@/types/types";

const CHIPS = [
  {
    label: "contact@uwdatascience.ca",
    href: "mailto:contact@uwdatascience.ca",
    icon: <Mail className="w-5 text-white" />,
  },
  {
    label: "@uwaterloodsc",
    href: "https://www.instagram.com/uwaterloodsc/",
    icon: <Instagram className="w-5 text-white" />,
  },
  {
    label: "discord.gg/VFVkyP5mgm",
    href: "https://discord.gg/VFVkyP5mgm",
    icon: <RxDiscordLogo size={24} className="text-white" />,
  },
];

type ContactProps = {
  title: string;
  id: string;
  getFormik?: (formik: any) => void;
  includeSideInfo: boolean;
  description: React.ReactNode;
  fields: ContactField[];
  validationSchema: ObjectSchema<any>;
  onSubmit: (values: Record<string, string>) => Promise<void>;
  errorMessage: string;
  successMessage: string;
  successCallback?: () => void;
  resetForm: boolean;
  formClasses?: string;
  inputFeedbackClasses?: string;
  customButton?: React.ReactNode;
};

export default function ContactForm({
  title,
  id,
  getFormik,
  includeSideInfo,
  description,
  fields,
  validationSchema,
  onSubmit,
  errorMessage,
  successMessage,
  successCallback,
  resetForm,
  formClasses,
  inputFeedbackClasses,
  customButton,
}: ContactProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessageOveride, setErrorMessageOveride] = useState<string>("");

  const formik = useFormik({
    initialValues: fields.reduce((acc: Record<string, string>, field) => {
      acc[field.name] = "";
      return acc;
    }, {}),
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setSuccess(false);
      setError(false);
      try {
        await onSubmit(values);
        resetForm ? formik.resetForm() : null;
        successCallback ? successCallback() : null;
        setSuccess(true);
        setError(false);
      } catch (error: any) {
        console.error(error);

        const errorData = error.response.data;
        if (
          errorData.hasOwnProperty("customErrorMessage") &&
          errorData.customErrorMessage
        ) {
          setErrorMessageOveride(errorData.error.message);
        } else {
          setErrorMessageOveride("");
        }
        setSuccess(false);
        setError(true);
      } finally {
        setLoading(false);
      }
    },
  });

  if (getFormik) {
    getFormik(formik);
  }

  const submitMessage = (
    <>
      {success && (
        <InputFeedback state="success" classes={inputFeedbackClasses}>
          {successMessage}
        </InputFeedback>
      )}
      {error && (
        <InputFeedback state="error" classes={inputFeedbackClasses}>
          {errorMessageOveride ? errorMessageOveride : errorMessage}
        </InputFeedback>
      )}
    </>
  );

  return (
    <section
      id={id}
      className={
        formClasses
          ? formClasses
          : "mb-section mx-container grid gap-10 lg:grid-cols-2 lg:gap-16"
      }
    >
      {includeSideInfo ? (
        <div>
          <h2 className="mb-3 text-4xl font-bold text-white md:text-8xl lg:-mt-3 xl:text-8xl">
            {title}
          </h2>
          <p className="leading-loose text-white md:text-lg lg:mb-12 lg:text-md xl:text-lg">
            {description}
          </p>
          <div className="hidden flex-wrap gap-6 lg:flex">
            {CHIPS.map((chip, i) => (
              <Chip icon={chip.icon} href={chip.href} key={`chip-${i}`}>
                {chip.label}
              </Chip>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="relative">
        {loading && (
          <LoadingSpinner
            size={60}
            classes="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        )}
        <form
          className={`${loading ? "pointer-events-none opacity-0" : ""}`}
          onSubmit={formik.handleSubmit}
          autoComplete="Off"
        >
          {fields.map((field, i) => {
            switch (field.type) {
              case "input":
                return (
                  <div
                    className={i === fields.length - 1 ? "mb-14" : "mb-6"}
                    key={field.id}
                  >
                    <TextInput
                      id={field.id}
                      name={field.name}
                      type="text"
                      placeholder={field.placeholder}
                      value={formik.values[field.name]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      autoCap={field.autoCap}
                    />
                    {formik.touched[field.name] &&
                      formik.errors[field.name] && (
                        <InputFeedback
                          state="error"
                          classes={inputFeedbackClasses}
                        >
                          {formik.errors[field.name]}
                        </InputFeedback>
                      )}
                    {i === fields.length - 1 && submitMessage}
                  </div>
                );
              case "textarea":
                return (
                  <div
                    className={i === fields.length - 1 ? "mb-14" : "mb-6"}
                    key={field.id}
                  >
                    <TextArea
                      id={field.id}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formik.values[field.name]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      classes={field.classes}
                    />
                    {formik.touched[field.name] &&
                      formik.errors[field.name] && (
                        <InputFeedback
                          state="error"
                          classes={inputFeedbackClasses}
                        >
                          {formik.errors[field.name]}
                        </InputFeedback>
                      )}
                    {i === fields.length - 1 && submitMessage}
                  </div>
                );
              case "dropdown":
                return (
                  <div
                    className={i === fields.length - 1 ? "mb-14" : "mb-6"}
                    key={field.id}
                  >
                    <Dropdown
                      id={field.id}
                      name={field.name}
                      placeholder={field.placeholder}
                      options={field.options as string[]}
                      value={formik.values[field.name]}
                      onChange={formik.handleChange}
                      classes={field.classes as string}
                    />
                    {formik.touched[field.name] &&
                      formik.errors[field.name] && (
                        <InputFeedback
                          state="error"
                          classes={inputFeedbackClasses}
                        >
                          {formik.errors[field.name]}
                        </InputFeedback>
                      )}
                    {i === fields.length - 1 && submitMessage}
                  </div>
                );
            }
          })}
          {customButton ? (
            customButton
          ) : (
            <Button
              type="submit"
              hierarchy="primary"
              font="font-bold"
              text="lg:text-lg"
              padding="py-3 sm:px-7"
              rounded="rounded-lg"
              classes="w-full sm:w-auto"
            >
              Submit
            </Button>
          )}
        </form>
      </div>
    </section>
  );
}
