import { sendVerificationInfo } from "@/utils/apiCalls";
import Button from "@/components/UI/Button";
import { useState } from "react";

export default function Verification () {
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState("");
  const params = new URL(document.location.toString()).searchParams;
  const headings = "mt-0 text-2xl font-bold mx-auto text-white 3xs:text-3xl 2xs:text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:mt-10 lg:mb-7 lg:max-w-[500px] 3xs:text-center lg:text-6xl xl:max-w-[540px] xl:text-9xl 2xl:max-w-[580px] 2xl:text-11xl 3xl:max-w-none 3xl:text-13xl";
  const subTexts = "mt-2 text-center leading-loose sm:text-xs lg:mx-0 lg:mb-14 lg:text-sm xl:text-md";

  const verifyUser = async () => {
    const values: Record<string, string> = { id: (params.get("id") || ""), token: (params.get("token") || "") }
    try {
      setLoading(true);
      await sendVerificationInfo(values);
      setRes("Account verified!")
    } catch (error : any) {
      console.error('Error:', error); // Handle any errors
      setRes(error.response.data.message)
    }
    setLoading(false);
  }
  
  return (
    <>
      <section className="mx-container w-auto text-white mb-section mt-14 lg:mt-20">
        <h1 className={headings}>
          To verify your account click the button below!
        </h1>
        <div className="mx-auto w-fit">
          <Button
            type="button"
            hierarchy="primary"
            font="font-bold"
            text="lg:text-lg"
            padding="py-3 px-3 sm:px-7"
            rounded="rounded-lg"
            classes="w-fit block mt-4"
            onClick={verifyUser}
          >
            {loading? "Verifying..." : "Verify Account"}
          </Button>
        </div>
        <p className={subTexts + (res.match("verified")? " text-green" : " text-red")}>{res}</p>
      </section>
    </>
  )
}