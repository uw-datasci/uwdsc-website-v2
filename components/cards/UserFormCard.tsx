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
    const [paymentStatus, setPaymentStatus] = useState('');
    const [paymentSource, setPaymentSource] = useState('');
    const [paymentType, setPaymentType] = useState('');
    const [verifiedBy, setVerifiedBy] = useState('');

    const resetValues = () => {
        if (initialUserData) {
            setUserId(initialUserData._id)
            setUsername(initialUserData.username);
            setEmail(initialUserData.email);
            setPassword(initialUserData.password);
            setUserStatus(initialUserData.userStatus);
            setPaymentStatus(initialUserData.paymentStatus);
            setPaymentSource(initialUserData.paymentSource);
            setPaymentType(initialUserData.paymentType);
            setVerifiedBy(initialUserData.verifiedBy);

        } else {
            setUsername('');
            setEmail('');
            setPassword('');
            setUserStatus("member");
            setPaymentStatus('');
            setPaymentSource('');
            setPaymentType('');
            setVerifiedBy('');
        }

    }

    useEffect(() => {
        resetValues();
    }, [initialUserData]);

    const handleUserStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUserStatus(e.target.value);
    };
    const handlePaymentStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPaymentStatus(e.target.value);
    };
    const handlePaymentSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPaymentSource(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newUser: User = { _id, username, email, password, userStatus, paymentSource, paymentStatus, paymentType, verifiedBy};
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
                            options={['member', 'admin']}
                            value={userStatus}
                            onChange={handleUserStatusChange}
                            classes="w-full"
                        />
                    </div>
                    <div className="flex flex-col mb-4 w-full">
                        <p className="font-medium text-grey2 xl:text-lg">Payment Status</p>
                        <Dropdown
                            id="paymentStatus"
                            name="paymentStatus"
                            placeholder="Select"
                            options={['Paid', 'Unpaid']}
                            value={paymentStatus}
                            onChange={handlePaymentStatusChange}
                            classes="w-full"
                        />
                    </div>
                    <div className="flex flex-col mb-4 w-full">
                        <p className="font-medium text-grey2 xl:text-lg">Payment Source</p>
                        <Dropdown
                            id="paymentSource"
                            name="paymentSource"
                            placeholder="Select"
                            options={['Cash', 'In Person']}
                            value={paymentSource}
                            onChange={handlePaymentSourceChange}
                            classes="w-full"
                        />
                    </div>
                    <div className="flex flex-col mb-4 w-full">
                        <p className="font-medium text-grey2 xl:text-lg">Payment Type</p>
                        <input
                            type="text"
                            placeholder="Select"
                            value={paymentType}
                            onChange={(e) => setPaymentType(e.target.value)}
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
                            value={verifiedBy}
                            onChange={(e) => setVerifiedBy(e.target.value)}
                            className="input w-full"
                            required
                            autoComplete="off"
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
