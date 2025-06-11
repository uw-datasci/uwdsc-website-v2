import { Fragment } from "react";

import ContactForm from "@/components/sections/templates/ContactForm";

export default function ContactUs() {
  return (
    <ContactForm
      title="Contact Us"
      id="contact"
      includeSideInfo={true}
      description={
        <Fragment>
          Have a question or interested in sponsoring us? Send us a message
          through our social medias, or even visit our office at{" "}
          <span className="font-bold">MC 3031</span>. We&apos;ll get back to you
          ASAP!
        </Fragment>
      }
    />
  );
}
