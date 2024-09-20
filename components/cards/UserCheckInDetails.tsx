import { HiCheckCircle, HiXCircle } from "react-icons/hi";

type UserCheckInProps = {
  username: string;
  uwEmail: string;
  faculty: string;
  hasPaid: boolean;
  isCheckedIn: boolean;
};

export default function UserCheckInCard({
  username,
  uwEmail,
  faculty,
  hasPaid,
  isCheckedIn,
}: UserCheckInProps) {
  return (
    <div className="mx-auto max-w-sm rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">{username}</h2>
      <div className="space-y-3">
        <div>
          <strong>UW Email: </strong>
          {uwEmail}
        </div>
        <div>
          <strong>Faculty: </strong>
          {faculty}
        </div>
        <div className="flex items-center">
          <strong>Payment Status: </strong>
          {hasPaid ? <HiCheckCircle /> : <HiXCircle />}
          {hasPaid ? "Paid" : "Not Paid"}
        </div>
        <div className="flex items-center">
          <strong>Check-in Status: </strong>
          {isCheckedIn ? <HiCheckCircle /> : <HiXCircle />}
          {isCheckedIn ? "Checked In" : "Not Checked In"}
        </div>
      </div>
    </div>
  );
}
