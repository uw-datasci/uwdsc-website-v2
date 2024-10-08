import SectionTitle from "@/components/UI/SectionTitle";
import Button from "@/components/UI/Button";
import AdminUsersTableCard from "@/components/cards/AdminUsersTableCard";
import UserFormCard from "@/components/cards/UserFormCard";
import { type User } from "@/types/types";
import Fuse from "fuse.js";

import { useEffect, useState, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import isAdmin from "@/components/permissions/authPage";
import authPage from "@/components/permissions/authPage";

require("dotenv").config();

function Admin() {
  const [users, setUsers] = useState<User[]>([]);
  const [result, setResult] = useState<User[]>([]);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const fuse = new Fuse(users, { keys: ["email", "username"] });

  // to test this separately, run a sign-in call manually and copy the token here
  const token = useSelector((state: RootState) => state.loginToken.token);
  const name = useSelector((state: RootState) => state.loginToken.name);

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async (newUser: User) => {
    console.log("New User:", newUser);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL +
          "/api/admin/createUser",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: newUser.username,
            watIAM: newUser.watIAM,
            email: newUser.email,
            password: newUser.password,
            term: "1A",
            faculty: "Math",
            heardFromWhere: "Placeholder",
            userStatus: newUser.userStatus,
            hasPaid: newUser.hasPaid,
            paymentMethod: newUser.paymentMethod,
            verifier: newUser.verifier,
            paymentLocation: newUser.paymentLocation,
            isEmailVerified: newUser.isEmailVerified,
          }),
        },
      );

      console.log("Response status:", response.status);
      const responseData = await response.json();
      console.log("Response data:", responseData);

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      setShowAddUserForm(false);
      fetchUsers();
    } catch (error) {
      console.log("Error creating user:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL +
          "/api/admin/getAllUsers",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();
      const mappedUsers: User[] = data.map((user: any) => ({
        _id: user._id,
        watIAM: user.watIAM,
        username: user.username,
        email: user.uwEmail,
        userStatus: user.userStatus,
        hasPaid: user.hasPaid ? "True" : "False",
        paymentMethod: user.paymentMethod ? user.paymentMethod : "",
        verifier: user.verifier ? user.verifier : "",
        paymentLocation: user.paymentLocation ? user.paymentLocation : "",
        isEmailVerified: user.isEmailVerified ? "True" : "False",
      }));
      setUsers(mappedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const searchUserByEmail = async (event: ChangeEvent<HTMLInputElement>) => {
    setSearchEmail(event.target.value);
    if (event.target.value) {
      const searchResults = fuse
        .search(event.target.value)
        .map((searchResult) => {
          const user: User = searchResult.item;
          return user;
        });
      setResult(searchResults);
    } else {
      setResult(users);
    }
  };

  const refresh = async () => {
    fetchUsers();
    const searchResults = fuse.search(searchEmail).map((searchResult) => {
      const user: User = searchResult.item;
      return user;
    });
    if (searchResults.length != 0) {
      setResult(searchResults);
    } else {
      setResult(users);
    }
  };

  return (
    <>
      <section className="mx-container mb-section mt-14 lg:mt-20">
        <h1 className="mb-14 text-center text-3xl font-bold text-white 3xs:text-6xl sm:text-8xl lg:text-10xl 2xl:text-12xl">
          Admin
        </h1>
        <div className="flex flex-col gap-2 overflow-visible">
          <SectionTitle mb="mb-12">Memberships</SectionTitle>
          <Button
            type="button"
            onClick={refresh}
            hierarchy="primary"
            font="font-bold"
            text="sm:text-lg 2xl:text-xl"
            padding="py-3 sm:px-7 sm:py-4"
            rounded="rounded-lg"
          >
            Refresh
          </Button>
          <input
            type="text"
            placeholder="Email"
            value={searchEmail}
            onChange={(e) => searchUserByEmail(e)}
            className="input w-full"
            required
            autoComplete="off"
          />
          {token && users.length > 0 && (
            <div className="flex flex-wrap justify-center gap-8 3xs:gap-12 xl:gap-20">
              <AdminUsersTableCard
                users={result}
                token={token}
                name={name}
                onAction={fetchUsers}
              />
            </div>
          )}
          {/* {<div className="flex flex-col gap-5 sm:flex-row sm:justify-center sm:gap-12">
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
                    </div>} */}
          {showAddUserForm && (
            <div className="flex justify-center">
              <UserFormCard
                onFormSubmit={createUser}
                onCancel={() => setShowAddUserForm(false)}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default authPage(Admin, ["admin"]);
