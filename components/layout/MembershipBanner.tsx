import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { RootState } from "@/store/store";
import { X, AlertTriangle } from "react-feather";
import Button from "@/components/UI/Button";
import { getCurrentUser } from "@/utils/apiCalls";

export default function MembershipBanner() {
  const signedIn = useSelector((state: RootState) => state.loginToken.name);
  const token = useSelector((state: RootState) => state.loginToken.token);
  const [hasPaid, setHasPaid] = useState<boolean | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserPaymentStatus = async () => {
      if (!signedIn || !token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await getCurrentUser();
        const userData = response.data.user;
        setHasPaid(userData.hasPaid);
      } catch (error) {
        console.warn("Could not fetch user payment status:", error);
        // If we can't fetch status, don't show the banner to avoid spam
        setHasPaid(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPaymentStatus();
  }, [signedIn, token]);

  // Don't show banner if:
  // - User is not signed in
  // - Still loading payment status
  // - User has paid
  // - User has dismissed the banner
  if (
    !signedIn ||
    isLoading ||
    hasPaid === true ||
    hasPaid === null ||
    isDismissed
  ) {
    return null;
  }

  return (
    <div className="bg-gradient-orange relative text-white">
      <div className="mx-container relative z-10 flex items-center justify-between py-3">
        <div className="flex flex-1 items-center space-x-3">
          <AlertTriangle className="h-5 w-5 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold sm:text-md">
              <strong>Reminder:</strong> Complete your $4 membership fee to
              access all events with free food!
            </p>
            <p className="mt-1 text-2xs opacity-90 sm:text-xs">
              Pay online through{" "}
              <a
                href="https://wusa.ca/product/uw-data-science-club-membership/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-300 underline hover:text-orange"
              >
                WUSA
              </a>{" "}
              or with cash at our events/office hours
            </p>
          </div>
        </div>
        <div className="ml-4 flex items-center space-x-2">
          <Button
            type="button"
            hierarchy="secondary"
            font="font-semibold"
            rounded="rounded-md"
            classes="transition-300 hover:bg-grey2 hover:text-darkBlue text-2xs sm:text-xs px-3 py-1.5"
            onClick={() =>
              window.open(
                "https://wusa.ca/product/uw-data-science-club-membership/",
                "_blank",
              )
            }
          >
            Pay Now
          </Button>
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="transition-300 ml-2 rounded-md p-1 hover:bg-black hover:bg-opacity-20"
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
