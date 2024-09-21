import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@/components/UI/Button";
import { resendVerification } from "@/utils/api-calls";
import { moveDown as signUpMoveDown } from "@/store/slices/signUpPageSlice";

export default function ResendVerificationPage() {
  const [email, setEmail] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string|null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleResend = async () => {
    setIsSubmitting(true);
    try {
      await resendVerification({email}); // API call to trigger email resend
      setStatusMessage("A new verification email has been sent!");
    } catch (error) {
      setStatusMessage("Failed to send verification email. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold">Resend Verification Email</h1>
      <p className="mb-4">Enter your email to resend the verification link.</p>
      
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your UW email"
        className="px-4 py-2 border rounded-md mb-4 w-80"
      />
      
      <Button
        onClick={handleResend}
        hierarchy="primary"
        type="button"
        font="font-bold"
        text="lg:text-lg"
        padding="py-3 sm:px-7"
        rounded="rounded-lg"
        classes="w-80"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Resending..." : "Resend Verification Email"}
      </Button>

      {statusMessage && (
        <p className="mt-4 text-sm text-center text-red-500">{statusMessage}</p>
      )}
      
      <p className="mt-4 text-gray-500 cursor-pointer hover:underline" onClick={() => dispatch(signUpMoveDown())}>
        Go back to Sign Up
      </p>
    </div>
  );
}
