import Button from "@/components/UI/Button";

interface ApplicationIntroProps {
  onStart: () => void;
  appExists?: boolean;
}

export default function AppIntro({
  onStart,
  appExists = false,
}: ApplicationIntroProps) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <div className="bg-gradient-blue mb-8 rounded-lg p-8 shadow-md backdrop-blur-md">
        <h2 className="mb-6 text-2xl font-bold text-white">
          Ready to Join Our Community?
        </h2>
        <div className="space-y-4 text-left text-grey1">
          <p>
            Welcome to the UW Data Science Club application! We&apos;re excited
            that you&apos;re interested in joining our community of data
            enthusiasts.
          </p>
          <p>This application will take you through several sections:</p>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong className="text-white">Personal Details:</strong> Your
              basic information and academic background
            </li>
            <li>
              <strong className="text-white">Experience:</strong> Your previous
              involvement with our club
            </li>
            <li>
              <strong className="text-white">Position Preferences:</strong>{" "}
              Roles you&apos;re interested in
            </li>
            <li>
              <strong className="text-white">Additional Questions:</strong>{" "}
              Resume
            </li>
          </ul>
          <p>
            The entire process should take about 10-15 minutes to complete. You
            can navigate between sections, and your progress will be saved.
          </p>
        </div>
      </div>

      <Button
        type="button"
        hierarchy="primary"
        rounded="rounded-md"
        onClick={onStart}
      >
        {appExists ? "Continue Application" : "Start Application"}
      </Button>
    </div>
  );
}
