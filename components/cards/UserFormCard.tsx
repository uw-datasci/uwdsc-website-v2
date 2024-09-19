import { useEffect, useState } from 'react';
import Button from '@/components/UI/Button';
import Dropdown from '@/components/UI/Dropdown';
import { User } from '@/types/types';

type UserFormProps = {
    initialUserData?: User;
    onFormSubmit: (user: User) => void;
    onCancel: () => void;
};

export default function UserFormCard({ initialUserData, onFormSubmit, onCancel }: UserFormProps) {
    const [_id, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userStatus, setUserStatus] = useState("member");
    const [hasPaid, setHasPaid] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentLocation, setPaymentLocation] = useState('');
    const [verifier, setVerifier] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState('');

    const resetValues = () => {
        if (initialUserData) {
            setUserId(initialUserData._id)
            setUsername(initialUserData.username);
            setEmail(initialUserData.email);
            setPassword(initialUserData.password);
            setUserStatus(initialUserData.userStatus);
            setHasPaid(initialUserData.hasPaid);
            setPaymentMethod(initialUserData.paymentMethod);
            setPaymentLocation(initialUserData.paymentLocation);
            setVerifier(initialUserData.verifier);
            setIsEmailVerified(initialUserData.isEmailVerified);

        } else {
            setUsername('');
            setEmail('');
            setPassword('');
            setUserStatus("member");
            setHasPaid('');
            setPaymentMethod('');
            setPaymentLocation('');
            setVerifier('');
        }

    }

    useEffect(() => {
        resetValues();
    }, [initialUserData]);

    const handleUserStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUserStatus(e.target.value);
    };
    const handleHasPaidChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setHasPaid(e.target.value);
    };
    const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPaymentMethod(e.target.value);
    };
    const handleIsEmailVerifiedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPaymentMethod(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newUser: User = { _id, username, email, password, userStatus, paymentMethod, hasPaid, paymentLocation, verifier, isEmailVerified };
        console.log('Form Submitted', newUser);
        onFormSubmit(newUser);
        resetValues();
    };

    return (
        <div className="flex flex-col gap-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-5 sm:flex-row sm:justify-center sm:gap-12">
                    <div className="flex flex-col mb-4 w-full">
                        <p className="font-medium text-grey2 xl:text-lg">Username</p>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input w-full"
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="flex flex-col mb-4 w-full">
                        <p className="font-medium text-grey2 xl:text-lg">Email</p>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input w-full"
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="flex flex-col mb-4 w-full">
                        <p className="font-medium text-grey2 xl:text-lg">Password</p>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                            value={userStatus}
                            onChange={handleUserStatusChange}
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
                            value={hasPaid}
                            onChange={handleHasPaidChange}
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
                            value={paymentMethod}
                            onChange={handlePaymentMethodChange}
                            classes="w-full"
                        />
                    </div>
                    <div className="flex flex-col mb-4 w-full">
                        <p className="font-medium text-grey2 xl:text-lg">Payment Type</p>
                        <input
                            type="text"
                            placeholder="Select"
                            value={paymentLocation}
                            onChange={(e) => setPaymentLocation(e.target.value)}
                            className="input w-full"
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="flex flex-col mb-4 w-full">
                        <p className="font-medium text-grey2 xl:text-lg">Verified By</p>
                        <input
                            type="text"
                            placeholder="Verifier's Name"
                            value={verifier}
                            onChange={(e) => setVerifier(e.target.value)}
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
                            value={isEmailVerified}
                            onChange={handleIsEmailVerifiedChange}
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
