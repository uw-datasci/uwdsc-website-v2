type InputFeedbackProps = {
  state: "success" | "error";
  children: React.ReactNode;
};

export default function InputFeedback({ state, children }: InputFeedbackProps) {
  return (
    <p
      className={`mt-4 leading-relaxed ${
        state === "success" ? "text-green" : "text-red"
      }`}
    >
      {children}
    </p>
  );
}
