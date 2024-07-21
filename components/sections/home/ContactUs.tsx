import { Fragment } from "react";

import ContactForm from "@/components/sections/templates/ContactForm";

import { validateContactForm } from "@/utils/formValidation";
import { sendContactEmail } from "@/utils/emails";
import { CONTACT_FORM_FIELDS } from "@/constants/forms";

export default function ContactUs() {
  return (
    <ContactForm
      title="Contact Us"
      id="contact"
      includeSideInfo={true}
      description={
        <Fragment>
          Have a question or interested in sponsoring us? Send us a message
          here, through our social medias, or even visit our office at{" "}
          <span className="font-bold">MC 3031</span>. We&apos;ll get back to you
          ASAP!
        </Fragment>
      }
      fields={CONTACT_FORM_FIELDS}
      validate={validateContactForm}
      onSubmit={sendContactEmail}
      successMessage="Your message has been sent! We will get back to you ASAP."
      errorMessage="There was an error sending your message. Please refresh this page and\ntry again."
      resetForm={true}
    />
  );
}
