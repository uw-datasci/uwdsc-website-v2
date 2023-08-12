type InputFeedbackProps = {
  state: "success" | "error";
  children: React.ReactNode;
};

export default function InputFeedback({ state, children }: InputFeedbackProps) {
  return (
    <p
      className={`mt-2 leading-relaxed md:mt-4 ${
        state === "success" ? "text-green" : "text-red"
      }`}
    >
      {children}
    </p>
  );
}
