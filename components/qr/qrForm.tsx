import { useEffect, useState, ChangeEvent } from "react";
import Button from "@/components/UI/Button";
import { User } from "@/types/types";
import { MdOutlineCancel, MdRefresh } from "react-icons/md";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

type UserFormProps = {
  initialUserData?: User | null;
  onFormSubmit: (user: User) => void;
  onCancel: () => void;
};

export default function QrFormCard({
  initialUserData,
  onFormSubmit,
  onCancel,
}: UserFormProps) {
  const [newUser, setNewUser] = useState<User | null>(null);
  const signedIn = useSelector((state: RootState) => state.loginToken.name);

  const resetValues = () => {
    if (initialUserData) {
      setNewUser({ ...initialUserData, verifier: signedIn });
    } else {
      setNewUser({
        _id: "",
        watIAM: "",
        username: "",
        email: "",
        password: "",
        userStatus: "",
        isEmailVerified: "",
        hasPaid: "",
        paymentMethod: "",
        verifier: "",
        paymentLocation: "",
      });
    }
  };

  useEffect(() => {
    resetValues();
  }, [initialUserData]);

  const handleInputChange = (e: ChangeEvent<any>) => {
    const { name, value } = e.target;
    setNewUser((prevData) =>
      prevData ? { ...prevData, [name]: value } : null,
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newUser) {
      onFormSubmit(newUser);
      resetValues();
    } else {
      console.log("error creating user");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h1 className="mb-3 text-center text-2xl font-bold text-white 3xs:text-4xl sm:text-6xl lg:text-8xl 2xl:text-10xl">
        Mark as Paid
      </h1>
      <div className="mx-auto flex flex-col justify-center text-grey2">
        <div className="flex flex-col justify-center sm:flex-row sm:gap-12">
          <div className="flex flex-col">
            <div className="mb-4">
              <p>Username</p>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={newUser?.username || ""}
                onChange={handleInputChange}
                className="rounded h-10 w-full rounded-sm border p-1"
                required
                autoComplete="off"
                disabled
              />
            </div>
            <div className="mb-4">
              <p>Email</p>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newUser?.email || ""}
                onChange={handleInputChange}
                className="rounded h-10 w-full rounded-sm border p-1"
                required
                autoComplete="off"
                disabled
              />
            </div>
          </div>
          <div>
            <div className="mb-4">
              <p>Verified By</p>
              <input
                type="text"
                name="verifier"
                placeholder="Verifier's Name"
                value={newUser?.verifier || ""}
                onChange={handleInputChange}
                className="rounded h-10 w-full rounded-sm border p-1"
                required
                autoComplete="off"
                disabled
              />
            </div>
            <div className="mb-4">
              <p>Payment Location</p>
              <input
                type="text"
                name="paymentLocation"
                placeholder="Select"
                value={newUser?.paymentLocation || ""}
                onChange={handleInputChange}
                className="rounded h-10 w-full rounded-sm border p-1"
                required
                autoComplete="off"
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <p>Payment Method</p>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={newUser?.paymentMethod || ""}
            onChange={handleInputChange}
            className="rounded h-10 w-full rounded-sm border p-1"
          >
            <option value="" disabled>
              Select
            </option>
            <option value="Cash">Cash</option>
            <option value="Online">Online</option>
            <option value="MathSoc">MathSoc</option>
          </select>
        </div>
      </div>

      <div className="mx-8 flex gap-5">
        <Button
          type="submit"
          hierarchy="primary"
          font="font-bold"
          text="text-lg"
          padding="py-3 sm:px-7 sm:py-4"
          rounded="rounded-sm md:rounded-lg"
          classes="grow h-15"
        >
          Submit
        </Button>
        <button
          onClick={resetValues}
          className="h-15 rounded-sm bg-grey2 px-4 py-2 font-bold"
        >
          <MdRefresh className="h-6 w-6" />
        </button>
        <button
          onClick={onCancel}
          className="h-15 rounded-sm bg-grey2 px-4 py-2 font-bold"
        >
          <MdOutlineCancel className="h-6 w-6" />
        </button>
      </div>
    </form>
  );
}
