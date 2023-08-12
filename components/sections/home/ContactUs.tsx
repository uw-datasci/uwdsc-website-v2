import { Fragment } from "react";

import ContactForm from "@/components/sections/templates/ContactForm";

import { validateContactForm } from "@/utils/formValidation";
import { sendContactEmail } from "@/utils/emails";
import { CONTACT_FORM_FIELDS } from "@/constants/forms";

export default function ContactUs() {
  return (
    <ContactForm
      title="Contact Us"
      description={
        <Fragment>
          Have a question or interested in sponsoring us? Send us a message
          here, through our social medias, or even visit our office at{" "}
          <span className="font-bold">MC 3034</span>. We&apos;ll get back to you
          ASAP!
        </Fragment>
      }
      fields={CONTACT_FORM_FIELDS}
      validate={validateContactForm}
      onSubmit={sendContactEmail}
    />
  );
}
