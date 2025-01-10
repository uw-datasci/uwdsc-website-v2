import React, { useState } from "react";
import Button from "@/components/UI/Button";
import { sendResetPassRequest } from "@/utils/apiCalls";
import ContactForm from "@/components/sections/templates/ContactForm";
import { RESET_PASSWORD_FORM_FIELDS } from "@/constants/forms";
import { ResetPasswordFormSchema } from "@/utils/formValidation";

export default function ForgotPassword() {
  const params = new URL(document.location.toString()).searchParams;

  const resetPass = async (values: Record<string, string>) => {
    const newValues: Record<string, string> = {
      id: params.get("id") || "",
      token: params.get("token") || "",
      newPass: values.newPass,
    };

    try {
      await sendResetPassRequest(newValues);
    } catch (error) {
      console.error("Error:", error); // Handle any errors
      throw error;
    }
  };

  return (
    <section className="mx-container mb-section mt-14 text-white lg:mt-20">
      <h1 className="text-gray-800 mb-6 text-center text-3xl font-bold 3xs:text-4xl sm:text-5xl lg:text-6xl">
        Reset Password
      </h1>

      <ContactForm
        title=""
        id=""
        includeSideInfo={false}
        description={<></>}
        fields={RESET_PASSWORD_FORM_FIELDS}
        validationSchema={ResetPasswordFormSchema}
        onSubmit={resetPass}
        errorMessage="Something went wrong. Please let us know and try again later."
        successMessage="Successfully reset your password!"
        resetForm={true}
        formClasses="mx-container w-[50%] min-w-[250px] mx-auto"
        inputFeedbackClasses="mt-1 pl-1 leading-relaxed text-s "
        customButton={
          <>
            <Button
              type="submit"
              hierarchy="primary"
              font="font-bold"
              text="lg:text-lg"
              padding="py-3 sm:px-7"
              rounded="rounded-lg"
              classes="w-full"
            >
              Reset Password
            </Button>
          </>
        }
      />
    </section>
  );
}
