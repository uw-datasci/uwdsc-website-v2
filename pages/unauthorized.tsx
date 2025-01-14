import SectionTitle from "@/components/UI/SectionTitle";

type Props = {};

const unauthorized = (props: Props) => {
  return (
    <div className="m-auto flex h-[65vh] flex-col items-center justify-center text-center text-white">
      <h1 className="gradient-text size-full -mr-2 bg-gradient-to-b from-white to-[#ffffff20] font-display text-9xl font-medium">
        Unauthorized
      </h1>
      <div className="flex flex-col gap-2 overflow-visible">
        <p className="">You are not authorized to view this page!</p>
      </div>
    </div>
  );
};

export default unauthorized;
