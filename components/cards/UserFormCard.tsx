import { useEffect, useState, ChangeEvent } from "react";
import Button from "@/components/UI/Button";
import { User } from "@/types/types";
import { MdOutlineCancel, MdRefresh } from "react-icons/md";

type UserFormProps = {
  initialUserData?: User;
  onFormSubmit: (user: User) => void;
  onCancel: () => void;
};

export default function UserFormCard({
  initialUserData,
  onFormSubmit,
  onCancel,
}: UserFormProps) {
  const [newUser, setNewUser] = useState<User | null>(null);

  const resetValues = () => {
    if (initialUserData) {
      setNewUser(initialUserData);
    } else {
      setNewUser({
        _id: "",
        watIAM: "",
        username: "",
        faculty: "",
        email: "",
        password: "",
        role: "",
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
    <div className=" mx-auto mb-5 w-[70%] rounded-md border-[1px] border-white p-4 text-sm font-medium uppercase shadow-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col justify-center text-grey2 sm:flex-row sm:gap-12">
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
              />
            </div>
            <div className="mb-4">
              <p>WatIAM</p>
              <input
                type="text"
                name="watIAM"
                placeholder="watIAM"
                value={newUser?.watIAM || ""}
                onChange={handleInputChange}
                className="rounded h-10 w-full rounded-sm border p-1"
                required
                autoComplete="off"
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
              />
            </div>
            <div className="mb-4">
              <p>Password</p>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={newUser?.password || ""}
                onChange={handleInputChange}
                className="rounded h-10 w-full rounded-sm border p-1"
                required
                autoComplete="off"
              />
            </div>
            <div className="mb-4">
              <p>User Status</p>
              <select
                id="role"
                name="role"
                value={newUser?.role || ""}
                onChange={handleInputChange}
                className="rounded h-10 w-full rounded-sm border p-1"
              >
                <option value="" disabled>
                  Select User Status
                </option>
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <p>Payment Status</p>
              <select
                id="hasPaid"
                name="hasPaid"
                value={newUser?.hasPaid || ""}
                onChange={handleInputChange}
                className="rounded h-10 w-full rounded-sm border p-1"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="True">True</option>
                <option value="False">False</option>
              </select>
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
            <div className="mb-4">
              <p>Email Verified</p>
              <select
                id="isEmailVerified"
                name="isEmailVerified"
                value={newUser?.isEmailVerified || ""}
                onChange={handleInputChange}
                className="rounded h-10 w-full rounded-sm border p-1"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="True">True</option>
                <option value="False">False</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-5">
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
    </div>
  );
}
