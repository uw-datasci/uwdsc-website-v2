import Button from "@/components/UI/Button";
import ContactForm from "@/components/sections/templates/ContactForm";
import { sendResetPassRequest } from "@/utils/api-calls";

import { RESET_PASSWORD_FORM_FIELDS } from "@/constants/forms";
import { validateResetPasswordForm } from "@/utils/formValidation";

export default function forgotPassword () {
  // Add loading spinner to wait until promise is received
  const params = new URL(document.location.toString()).searchParams;
  const newPass = "testtest";
  

  const resetPass = async (values: Record<string, string>) => {
    const newValues: Record<string, string> = { id: (params.get("id") || ""), token: (params.get("token") || "") , newPass: values.newPass || ""} // Need to prevent pass from sending if newPass is empty
    console.log(values.newPass);
    try {
      await sendResetPassRequest(newValues);
    } catch (error) {
      console.error('Error:', error); // Handle any errors
      throw error;
    }
  }

  return (
    <>
      <section className="mx-container mb-section mt-14 lg:mt-20">
        <h1 className="mb-14 text-center text-3xl font-bold text-white 3xs:text-6xl sm:text-8xl lg:text-10xl 2xl:text-12xl">
          id: {params.get("id")}
        </h1>
        <h1 className="mb-14 text-center text-3xl font-bold text-white 3xs:text-6xl sm:text-8xl lg:text-10xl 2xl:text-12xl">
        token: {params.get("token")}
        </h1>
        <h1 className="mb-14 text-center text-3xl font-bold text-white 3xs:text-6xl sm:text-8xl lg:text-10xl 2xl:text-12xl">
        New password: {newPass}
        </h1>
          <ContactForm
            title=""
            id=""
            includeSideInfo={false}
            description={<></>}
            fields={RESET_PASSWORD_FORM_FIELDS}
            validate={validateResetPasswordForm}
            onSubmit={resetPass}
            errorMessage="Something went wrong. Please let us know and try again later."
            successMessage="Successfully registered. Check your email!"
            resetForm={true}
            formClasses="mx-container "
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
                  Submit
                </Button>
              </>
            }
          />
      </section>
    </>
  )
}