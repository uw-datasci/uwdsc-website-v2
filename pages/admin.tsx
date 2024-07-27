import SectionTitle from "@/components/UI/SectionTitle";
import Button from "@/components/UI/Button";
import AdminUsersTableCard from "@/components/cards/AdminUsersTableCard";
import UserFormCard from "@/components/cards/UserFormCard";
import { type User } from "@/types/types";
import { useEffect, useState } from "react";

export default function Admin() {
    const [users, setUsers] = useState<User[]>([]);
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const [showSearchUserForm, setShowSearchUserForm] = useState(false);
    const [searchEmail, setSearchEmail] = useState('');
    const [showResetSearch, setShowResetSearch] = useState(false);

    // to test this separately, run a sign-in call manually and copy the token here
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiYWRtaW4xIiwiZW1haWwiOiJhZG1pbjFAZ21haWwuY29tIiwiaWQiOiI2Njc3MGVjY2IyYjNkNzg0MDAyZGI5YWYiLCJ1c2VyU3RhdHVzIjoiYWRtaW4ifSwiaWF0IjoxNzIyMDQ0NTQ0LCJleHAiOjE3MjIzMDM3NDR9.h7FL8jXRjqyqLdSi89nIGgTYyB_4M8A0DyEmuB4QyKs"
    // const token = localStorage.getItem('token');

    useEffect(() => {
        fetchUsers();
    }, []);

    const createUser = async (newUser: User) => {
        try {
            const response = await fetch('http://localhost:5001/api/admin/createUser', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: newUser.username,
                    email: newUser.email,
                    password: newUser.password,
                    userStatus: newUser.userStatus
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create user');
            }

            setShowAddUserForm(false);
            fetchUsers();
        } catch (error) {
            console.log('Error creating user:', error);
        }
    }

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/admin/getAllUsers', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            const mappedUsers: User[] = data.map((user: any) => ({
                _id: user._id,
                username: user.username,
                email: user.email,
                password: user.password,
                userStatus: user.userStatus,
                createdAt: new Date(user.createdAt),
                updatedAt: new Date(user.updatedAt)
            }));
            setUsers(mappedUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const searchUserByEmail = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:5001/api/admin/getUserByEmail/${searchEmail}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to create user');
            }

            const data = await response.json();
            if (data) {
                setUsers([data]);
            } else {
                setUsers([]);
            }
            console.log(data);
            console.log(users);
            setShowSearchUserForm(false);
            setShowResetSearch(true);
        } catch (error) {
            console.log('Error creating user:', error);
        }
    };

    return (
        <>
            <section className="mx-container mb-section mt-14 lg:mt-20">
                <h1 className="mb-14 text-center text-3xl font-bold text-white 3xs:text-6xl sm:text-8xl lg:text-10xl 2xl:text-12xl">
                    Admin
                </h1>
                <div className="grid gap-12">
                    <SectionTitle mb="mb-12">Memberships</SectionTitle>
                    {users.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-8 3xs:gap-12 xl:gap-20">
                            <AdminUsersTableCard users={users} onAction={fetchUsers} />
                        </div>
                    )}
                    <div className="flex flex-col gap-5 sm:flex-row sm:justify-center sm:gap-12">
                        <Button
                            type="button"
                            onClick={() => setShowAddUserForm(true)}
                            hierarchy="primary"
                            font="font-bold"
                            text="sm:text-lg 2xl:text-xl"
                            padding="py-3 sm:px-7 sm:py-4"
                            rounded="rounded-lg"
                        >
                            Add Membership
                        </Button>
                    </div>
                    {showAddUserForm && (
                        <div className="flex justify-center">
                            <UserFormCard onFormSubmit={createUser} onCancel={() => setShowAddUserForm(false)} />
                        </div>
                    )}
                    <div className="flex flex-col gap-5 sm:flex-row sm:justify-center sm:gap-12">
                        <Button
                            type="button"
                            onClick={() => setShowSearchUserForm(true)}
                            hierarchy="primary"
                            font="font-bold"
                            text="sm:text-lg 2xl:text-xl"
                            padding="py-3 sm:px-7 sm:py-4"
                            rounded="rounded-lg"
                        >
                            Search Member By Email
                        </Button>
                    </div>
                    {showSearchUserForm && (
                        <form onSubmit={searchUserByEmail} className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-12">
                            <div className="flex flex-col mb-4 w-full">
                                <p className="font-medium text-grey2 xl:text-lg">Email</p>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    value={searchEmail}
                                    onChange={(e) => setSearchEmail(e.target.value)}
                                    className="input w-full"
                                    required
                                    autoComplete="off"
                                />
                            </div>
                            <Button
                                type="submit"
                                hierarchy="primary"
                                font="font-bold"
                                text="sm:text-lg 2xl:text-xl"
                                padding="py-3 sm:px-7 sm:py-4"
                                rounded="rounded-lg">
                                Search
                            </Button>
                        </form>
                    )}
                    {showResetSearch && (
                        <div className="flex flex-col gap-5 sm:flex-row sm:justify-center sm:gap-12">
                            <Button
                                type="submit"
                                hierarchy="primary"
                                font="font-bold"
                                text="sm:text-lg 2xl:text-xl"
                                padding="py-3 sm:px-7 sm:py-4"
                                rounded="rounded-lg"
                                onClick={() => { fetchUsers(); setShowResetSearch(false) }}>
                                Reset
                            </Button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
