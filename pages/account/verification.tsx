import { sendVerificationInfo } from "@/utils/api-calls";
import Button from "@/components/UI/Button";

export default function verification () {
  // Add loading spinner to wait until promise is received
  const params = new URL(document.location.toString()).searchParams;

  const verifyUser = async () => {
    const values: Record<string, string> = { id: (params.get("id") || ""), token: (params.get("token") || "") }
    try {
      await sendVerificationInfo(values);
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
        <Button
              type="button"
              onClick={verifyUser}
              hierarchy="secondary"
              font="font-bold"
              text="sm:text-lg 2xl:text-xl"
              padding="py-3 sm:px-7 sm:py-4"
              rounded="rounded-[15px]"
              classes="w-full"
            >
              Verify Account
            </Button>
      </section>
    </>
  )
}