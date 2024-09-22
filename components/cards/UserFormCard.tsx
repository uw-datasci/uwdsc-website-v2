import { useEffect, useState, ChangeEvent } from 'react';
import Button from '@/components/UI/Button';
import Dropdown from '@/components/UI/Dropdown';
import { User } from '@/types/types';

type UserFormProps = {
    initialUserData?: User;
    onFormSubmit: (user: User) => void;
    onCancel: () => void;
};

export default function UserFormCard({ initialUserData, onFormSubmit, onCancel }: UserFormProps) {
    const [newUser, setNewUser] = useState<User | null>(null);

    const resetValues = () => {
        if (initialUserData) {
            setNewUser(initialUserData);
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
                paymentLocation: ""
            })
        }

    }

    useEffect(() => {
        resetValues();
    }, [initialUserData]);

    const handleInputChange = (e: ChangeEvent<any>) => {
        const { name, value } = e.target;
        setNewUser((prevData) => (prevData ? { ...prevData, [name]: value } : null));
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
        <div className="flex flex-col gap-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-5 sm:flex-row sm:justify-center sm:gap-12">
                    <div className="flex flex-col mb-4 w-full">
                        <p className="font-medium text-grey2 xl:text-lg">Username</p>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={newUser?.username || ""}
                            onChange={handleInputChange}
                            className="input w-full"
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="flex flex-col mb-4 w-full">
                        <p className="font-medium text-grey2 xl:text-lg">WatIAM</p>
                        <input
                            type="text"
                            name="watIAM"
                            placeholder="watIAM"
                            value={newUser?.watIAM || ""}
                            onChange={handleInputChange}
                            className="input w-full"
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="flex flex-col mb-4 w-full">
                        <p className="font-medium text-grey2 xl:text-lg">Email</p>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={newUser?.email || ""}
                            onChange={handleInputChange}
                            className="input w-full"
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="flex flex-col mb-4 w-full">
                        <p className="font-medium text-grey2 xl:text-lg">Password</p>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={newUser?.password || ""}
                            onChange={handleInputChange}
                            className="input w-full"
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="flex flex-col mb-4 w-full">
                        <p className="font-medium text-grey2 xl:text-lg">User Status</p>
                        <Dropdown
                            id="userStatus"
                            name="userStatus"
                            placeholder="Select User Status"
                            options={['Member', 'Admin']}
                            value={newUser?.userStatus || ""}
                            onChange={handleInputChange}
                            classes="w-full"
                        />
                    </div>
                    <div className="flex flex-col mb-4 w-full">
                        <p className="font-medium text-grey2 xl:text-lg">Payment Status</p>
                        <Dropdown
                            id="hasPaid"
                            name="hasPaid"
                            placeholder="Select"
                            options={['True', 'False']}
                            value={newUser?.hasPaid || ""}
                            onChange={handleInputChange}
                            classes="w-full"
                        />
                    </div>
                    <div className="flex flex-col mb-4 w-full">
                        <p className="font-medium text-grey2 xl:text-lg">Payment Method</p>
                        <Dropdown
                            id="paymentMethod"
                            name="paymentMethod"
                            placeholder="Select"
                            options={['Cash', 'Online', 'MathSoc']}
                            value={newUser?.paymentMethod || ""}
                            onChange={handleInputChange}
                            classes="w-full"
                        />
                    </div>
                    <div className="flex flex-col mb-4 w-full">
                        <p className="font-medium text-grey2 xl:text-lg">Verified By</p>
                        <input
                            type="text"
                            name="verifier"
                            placeholder="Verifier's Name"
                            value={newUser?.verifier || ""}
                            onChange={handleInputChange}
                            className="input w-full"
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="flex flex-col mb-4 w-full">
                        <p className="font-medium text-grey2 xl:text-lg">Payment Location</p>
                        <input
                            type="text"
                            name="paymentLocation"
                            placeholder="Select"
                            value={newUser?.paymentLocation || ""}
                            onChange={handleInputChange}
                            className="input w-full"
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="flex flex-col mb-4 w-full">
                        <p className="font-medium text-grey2 xl:text-lg">Email Verified</p>
                        <Dropdown
                            id="isEmailVerified"
                            name="isEmailVerified"
                            placeholder="Select"
                            options={['True', 'False']}
                            value={newUser?.isEmailVerified || ""}
                            onChange={handleInputChange}
                            classes="w-full"
                        />
                    </div>
                    
                </div>

                <Button
                    type="submit"
                    hierarchy="primary"
                    font="font-bold"
                    text="sm:text-lg 2xl:text-xl"
                    padding="py-3 sm:px-7 sm:py-4"
                    rounded="rounded-lg"
                >
                    Submit
                </Button>
            </form>
            <Button
                type="submit"
                hierarchy="secondary"
                font="font-bold"
                text="sm:text-lg 2xl:text-xl"
                padding="py-3 sm:px-7 sm:py-4"
                rounded="rounded-lg"
                onClick={resetValues}
            >
                Reset
            </Button>
            <Button
                type="submit"
                hierarchy="secondary"
                font="font-bold"
                text="sm:text-lg 2xl:text-xl"
                padding="py-3 sm:px-7 sm:py-4"
                rounded="rounded-lg"
                onClick={onCancel}
            >
                Cancel
            </Button>
        </div>
    );
}
