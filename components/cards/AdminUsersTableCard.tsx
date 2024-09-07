import React, { useState, ChangeEvent } from "react";
import { User } from "@/types/types";

require('dotenv').config()

interface AdminUserTableProps {
    users: User[];
    token: string;
    onAction: () => void;
}

const headers = ["Username", "Email", "Status", "Created At", "Updated At", "Actions"];
// to test this separately, run a sign-in call manually and copy the token here


export default function AdminUserTable({ users, token, onAction }: AdminUserTableProps) {
    const [editingUserId, setEditingUserId] = useState<string | null>(null);
    const [editFormData, setEditFormData] = useState<User | null>(null);

    const handleDelete = async (userId: string, onAction: () => void) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this user?");
        if (!isConfirmed) return;

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL}/api/admin/deleteUserById/${userId}`, {
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

    const editUser = async (userId: string, newUser: User, onAction: () => void) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL}/api/admin/updateUserById/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: newUser.username,
                    email: newUser.email,
                    //password: newUser.password,
                    userStatus: newUser.userStatus
                })
            });

            if (!response.ok) {
                throw new Error('Failed to edit user');
            }

            onAction();
            console.log("User edited successfully");
        } catch (error) {
            console.log('Error editing user:', error);
        }
    };

    const handleEditClick = (user: User) => {
        setEditingUserId(user._id);
        setEditFormData(user);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditFormData((prevData) => (prevData ? { ...prevData, [name]: value } : null));
    };

    const handleSaveClick = async () => {
        if (editFormData) {
            await editUser(editingUserId!, editFormData, onAction);
            setEditingUserId(null);
        }
    };

    const handleCancelClick = () => {
        setEditingUserId(null);
        setEditFormData(null);
    };

    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            {headers.map((header) => (
                                <th
                                    key={header}
                                    className="px-6 py-3 bg-white text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 fixed-width">
                                    {editingUserId === user._id ? (
                                        <input
                                            type="text"
                                            name="username"
                                            value={editFormData?.username || ""}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded input-fixed-width"
                                        />
                                    ) : (
                                        user.username
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 fixed-width">
                                    {editingUserId === user._id ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={editFormData?.email || ""}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded input-fixed-width"
                                        />
                                    ) : (
                                        user.email
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 fixed-width">
                                    {editingUserId === user._id ? (
                                        <input
                                            type="text"
                                            name="userStatus"
                                            value={editFormData?.userStatus || ""}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded input-fixed-width"
                                        />
                                    ) : (
                                        user.userStatus
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {user.createdAt && new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {user.updatedAt && new Date(user.updatedAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {editingUserId === user._id ? (
                                        <>
                                            <button
                                                onClick={handleSaveClick}
                                                className="text-green-600 hover:text-green-900"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={handleCancelClick}
                                                className="text-red-600 hover:text-red-900 ml-4"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => handleEditClick(user)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user._id, onAction)}
                                                className="text-red-600 hover:text-red-900 ml-4"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
