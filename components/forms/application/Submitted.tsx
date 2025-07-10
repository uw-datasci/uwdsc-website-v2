import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "@/components/SEO/SEO";
import Button from "@/components/UI/Button";
import ConfettiEffect from "@/components/UI/Confetti";
import { Check, PartyPopper } from "lucide-react";

export default function Submitted() {
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Trigger confetti when component mounts
    setShowConfetti(true);

    // Clean up after animation (extended for more waves)
    const timer = setTimeout(() => setShowConfetti(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SEO title="Application Submitted" />
      <div className="flex min-h-[60vh] items-center justify-center bg-black px-4">
        {/* Confetti Effect */}
        <AnimatePresence>{showConfetti && <ConfettiEffect />}</AnimatePresence>

        {/* Main content with entrance animation */}
        <motion.div
          className="max-w-lg text-center"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          {/* Animated icon container */}
          <motion.div
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-aquaTextPrimary/20"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 1.2, ease: "easeOut" }}
            >
              <PartyPopper className="h-12 w-12 text-aquaTextPrimary" />
            </motion.div>
          </motion.div>

          {/* Animated title */}
          <motion.h1
            className="mb-4 text-3xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            Application Submitted Successfully!
          </motion.h1>

          {/* Animated description */}
          <motion.p
            className="mb-6 text-lg text-grey1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            Thank you for your interest in joining the DSC Executive Team. We
            have received your application and will review it carefully.
          </motion.p>

          {/* Animated button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            <Button
              type="button"
              hierarchy="primary"
              rounded="rounded-md"
              onClick={() => router.push("/")}
            >
              Go Home
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
