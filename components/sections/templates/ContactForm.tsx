import { useFormik } from "formik";
import { Mail, Instagram } from "react-feather";
import { RxDiscordLogo } from "react-icons/rx";

import TextInput from "@/components/UI/TextInput";
import Dropdown from "@/components/UI/Dropdown";
import TextArea from "@/components/UI/TextArea";
import Button from "@/components/UI/Button";
import Chip from "@/components/UI/Chip";

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
    label: "discord.gg/Mnpt72VGN4",
    href: "https://discord.gg/Mnpt72VGN4",
    icon: <RxDiscordLogo size={24} className="text-white" />,
  },
];

type ContactProps = {
  title: string;
  description: React.ReactNode;
  fields: ContactField[];
};

export default function ContactForm({
  title,
  description,
  fields,
}: ContactProps) {
  const formik = useFormik({
    initialValues: fields.reduce((acc: Record<string, string>, field) => {
      acc[field.name] = "";
      return acc;
    }, {}),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <section
      id="contact"
      className="mb-section mx-container grid gap-10 lg:grid-cols-2 lg:gap-16"
    >
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
      <form onSubmit={formik.handleSubmit}>
        {fields.map((field, i) => {
          switch (field.type) {
            case "input":
              return (
                <TextInput
                  id={field.id}
                  name={field.name}
                  type="text"
                  placeholder={field.placeholder}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  classes={i === fields.length - 1 ? "mb-14" : "mb-6"}
                  key={field.id}
                />
              );
            case "textarea":
              return (
                <TextArea
                  id={field.id}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  classes={i === fields.length - 1 ? "mb-14" : "mb-6"}
                  key={field.id}
                />
              );
            case "dropdown":
              return (
                <Dropdown
                  id={field.id}
                  name={field.name}
                  placeholder={field.placeholder}
                  options={field.options as string[]}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  classes={i === fields.length - 1 ? "mb-14" : "mb-6"}
                  key={field.id}
                />
              );
          }
        })}
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
      </form>
    </section>
  );
}
