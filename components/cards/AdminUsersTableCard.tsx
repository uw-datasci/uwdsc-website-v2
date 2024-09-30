import React, { useState, ChangeEvent } from "react";
import { User } from "@/types/types";

require('dotenv').config()

interface AdminUserTableProps {
    users: User[];
    name: string;
    token: string;
    onAction: () => void;
}

const headers = [
    "Email", "Password", "Status", "Email Verified", "Paid Member", "Payment Method", "Verified By", "Payment Location",  "Actions"
];

const headerParam = (()=> {
    let result: { [key: string]: boolean } = {};
    headers.forEach((param) => {result[param] = true});
    return result;
})();

export default function AdminUserTable({ users, token, name, onAction }: AdminUserTableProps) {
    const [editingUserId, setEditingUserId] = useState<string | null>(null);
    const [editFormData, setEditFormData] = useState<User | null>(null);
    const [displayParam, setDisplayParam] = useState<Record<string,boolean>>(headerParam);

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
            console.log(newUser.isEmailVerified);
            const response = await fetch(`${process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL}/api/admin/updateUserById/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: newUser.email,
                    password: newUser.password,
                    userStatus: newUser.userStatus,
                    isEmailVerified: (newUser.isEmailVerified == "True"? true : false),
                    hasPaid: (newUser.hasPaid == "True"? true : false),    
                    paymentMethod: (newUser.paymentMethod == ""? "EMPTY_FIELD" : newUser.paymentMethod),
                    verifier: (newUser.verifier == ""? "EMPTY_FIELD" : newUser.verifier),
                    paymentLocation: (newUser.paymentLocation == ""? "EMPTY_FIELD" : newUser.paymentLocation)
                })
            });
            const responseData = await response.json();  
            console.log("Server response:", responseData);

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

    const handleInputChange = (e: ChangeEvent<any>) => {
        const { name, value } = e.target;
        setEditFormData((prevData) => (prevData ? { ...prevData, [name]: value } : null));
    };

    const handleSaveClick = async () => {
        if (!editFormData) {
            return;
        }
        
        const { hasPaid, paymentMethod, verifier, paymentLocation } = editFormData;
        
        if (hasPaid == "True" && (!paymentMethod || !verifier || !paymentLocation)) {
            alert("If member has paid, you need to fill out the method, verifier, and location.");
            return;
        }

        if (hasPaid == "False" && (paymentMethod || verifier || paymentLocation)) {
            alert("If member has not paid, the payment method, verifier, and location should be empty.");
            return;
        }
        
        await editUser(editingUserId!, editFormData, onAction);
        setEditingUserId(null);
    };

    const handleCancelClick = () => {
        setEditingUserId(null);
        setEditFormData(null);
    };

    return (
        <>
            {/* <div className="flex flex-row">
                {headers.map((header) => (
                    <input type="checkbox" id={header} value={displayParam.}>
                    <label for="vehicle1"> I have a bike</label><br>
                ))}
            </div> */}
            <div className="overflow-x-auto mx-auto min-w-[110%]">
                <table className="min-w-full divide-y divide-gray-200 mx-auto table-fixed">
                    <thead>
                        <tr>
                            {headers.map((header) => (
                                <th
                                    key={header}
                                    className="px-6 py-3 bg-white text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-5"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user._id}>
                                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 fixed-width">
                                    {editingUserId === user._id ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={editFormData?.username || ""}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded input-fixed-width"
                                        />
                                    ) : (
                                        user.username
                                    )}
                                </td> */}
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
                                            name="password"
                                            value={editFormData?.password || ""}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded input-fixed-width"
                                        />
                                    ) : (
                                        "********"
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 fixed-width">
                                    {editingUserId === user._id ? (
                                        <select
                                            name="userStatus"
                                            value={editFormData?.userStatus || ""}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded input-fixed-width"
                                        >
                                            <option value="admin">admin</option>
                                            <option value="member">member</option>
                                        </select>
                                    ) : (
                                        user.userStatus
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 fixed-width">
                                    {editingUserId === user._id ? (
                                        <select
                                            name="isEmailVerified"
                                            value={editFormData?.isEmailVerified || ""}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded"
                                        >
                                            <option value="True">True</option>
                                            <option value="False">False</option>
                                        </select>
                                    ) : (
                                        user.isEmailVerified
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 fixed-width">
                                    {editingUserId === user._id ? (
                                        <select
                                            name="hasPaid"
                                            value={editFormData?.hasPaid || ""}
                                            onChange={(e) => {
                                                const {value} = e.target;
                                                if (value == "True" && editFormData?.paymentMethod == "" && editFormData.verifier == "" && editFormData.paymentLocation == "") {
                                                    setEditFormData((prevData) => (prevData ? { ...prevData, ["hasPaid"]: value, ["verifier"]: name } : null)); 
                                                } else if (value == "True") {
                                                    setEditFormData((prevData) => (prevData ? { ...prevData, ["hasPaid"]: value} : null)); 
                                                } else {
                                                    setEditFormData((prevData) => (prevData ? { ...prevData, ["hasPaid"]: value, ["paymentMethod"]: "", ["verifier"]: "", ["paymentLocation"]: "" } : null)); 
                                                }
                                            }}
                                            className="w-full border border-gray-300 rounded"
                                        >
                                            <option value="True">True</option>
                                            <option value="False">False</option>
                                        </select>
                                    ) : (
                                        user.hasPaid
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 fixed-width">
                                    {editingUserId === user._id ? (
                                        <select
                                            name="paymentMethod"
                                            value={editFormData?.paymentMethod || ""}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded"
                                        >
                                            <option value="">N/A</option>
                                            <option value="Cash">Cash</option>
                                            <option value="Online">Online</option>
                                            <option value="MathSoc">MathSoc</option>
                                        </select>
                                    ) : (
                                        user.paymentMethod
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 fixed-width">
                                    {editingUserId === user._id ? (
                                        <input
                                            type="text"
                                            name="verifier"
                                            value={editFormData?.verifier || ""}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded"
                                        />
                                    ) : (
                                        user.verifier
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 fixed-width">
                                    {editingUserId === user._id ? (
                                        <input
                                            type="text"
                                            name="paymentLocation"
                                            value={editFormData?.paymentLocation || ""}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded"
                                        />
                                    ) : (
                                        user.paymentLocation
                                    )}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium fixed-width">
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
