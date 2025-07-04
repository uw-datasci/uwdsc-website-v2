import { useRouter } from "next/router";
import SEO from "@/components/SEO/SEO";
import Button from "@/components/UI/Button";

export default function Submitted() {
  const router = useRouter();

  return (
    <>
      <SEO title="Application Submitted" />
      <div className="flex min-h-screen items-center justify-center bg-black px-4">
        <div className="max-w-md text-center">
          <h1 className="mb-4 text-3xl font-bold text-white">
            Application Submitted!
          </h1>
          <p className="mb-6 text-grey1">
            Thank you for applying to the UW Data Science Club. We&apos;ll be in
            touch soon!
          </p>
          <Button
            type="button"
            hierarchy="primary"
            rounded="rounded-md"
            onClick={() => router.push("/")}
          >
            Go Home
          </Button>
        </div>
      </div>
    </>
  );
}
