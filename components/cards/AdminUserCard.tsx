import React, { useState } from "react";
import { type User } from "@/types/types";
import Button from "@/components/UI/Button";
import AddUserFormCard from "@/components/cards/UserFormCard";

type UserCardProps = {
    userData: User;
    onAction: () => void;
};

/**
 * Card to display and/or modify a club member
 */

export default function AdminUserCard({ userData, onAction }: UserCardProps) {
    const [isEditFormVisible, setIsEditFormVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    // to test this separately, run a sign-in call manually and copy the token here
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiYWRtaW4xIiwiZW1haWwiOiJhZG1pbjFAZ21haWwuY29tIiwiaWQiOiI2Njc3MGVjY2IyYjNkNzg0MDAyZGI5YWYiLCJ1c2VyU3RhdHVzIjoiYWRtaW4ifSwiaWF0IjoxNzIwODc5NDU1LCJleHAiOjE3MjExMzg2NTV9.Xip1P9r4BHhiNY7rQIisgPT2qQONBp8-Bp-IbXYXBSk"
    // const token = localStorage.getItem('token');

    const handleDelete = async () => {
        const isConfirmed = window.confirm("Are you sure you want to delete this user?");
        if (!isConfirmed) return;

        try {
            const response = await fetch(`http://localhost:5001/api/admin/deleteUserById/${userData._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            onAction();
            console.log('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEdit = () => {
        setCurrentUser(userData);
        setIsEditFormVisible(true);
    };

    const editUser = async (newUser: User) => {
        try {
            const response = await fetch(`http://localhost:5001/api/admin/updateUserById/${userData._id}`, {
                method: 'PUT',
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
                throw new Error('Failed to edit user');
            }

            onAction();
            console.log("done edit")
            setIsEditFormVisible(false);
        } catch (error) {
            console.log('Error creating user:', error);
        }
    }

    return (
        <>
            <div className="transition-300 w-full rounded-2xl border border-grey3 px-6 pb-8 pt-7 text-center hover:border-grey2 3xs:w-[240px] xl:w-[280px] xl:rounded-4xl">
                <h4 className="mb-2.5 text-xl font-semibold text-white xl:text-2xl">
                    {userData.username}
                </h4>
                <p className="mb-4 font-medium text-grey2 xl:text-lg">User Status: {userData.userStatus}</p>
                <div className="text-white">
                    <p>Date Created: {userData.createdAt ? new Date(userData.createdAt).toDateString() : ""}</p>
                    {userData.updatedAt && <p>Date Updated: {new Date(userData.updatedAt).toDateString()}</p>}
                    <p>Email: {userData.email}</p>
                </div>
                <div className="py-3">
                    <Button
                        type="button"
                        onClick={handleEdit}
                        hierarchy="secondary"
                        font="font-bold"
                    >
                        Edit Membership
                    </Button>
                    <Button
                        type="button"
                        onClick={handleDelete}
                        hierarchy="secondary"
                        font="font-bold"
                    >
                        Remove Membership
                    </Button>
                </div>
            </div>
            {isEditFormVisible && currentUser && (
                <AddUserFormCard
                    initialUserData={currentUser}
                    onFormSubmit={editUser}
                    onCancel={() => setIsEditFormVisible(false)}
                />
            )}
        </>
    );
}
