import { Fragment } from "react";
import { type User } from "@/types/types";
import Button from "@/components/UI/Button";

type UserCardProps = User;

/**
 * Card to display and/or modify a club member
 */

export default function AdminUserCard({
    _id,
    username,
    email,
    password,
    userStatus,
    createdAt,
    updatedAt
}: UserCardProps) {
    return (
        <div className="transition-300 w-full rounded-2xl border border-grey3 px-6 pb-8 pt-7 text-center hover:border-grey2 3xs:w-[240px] xl:w-[280px] xl:rounded-4xl">
            <h4 className="mb-2.5 text-xl font-semibold text-white xl:text-2xl">
                {username}
            </h4>
            <p className="mb-4 font-medium text-grey2 xl:text-lg">User Status: {userStatus}</p>
            <Fragment>
                <div className="text-white">
                    <p>Date Created: {createdAt.toDateString()}</p>
                    {updatedAt && <p>Date Updated: {updatedAt.toDateString()}</p>}
                    <p>Email: {email}</p>
                </div>
            </Fragment>
            <div className="py-3">
                <Button
                    type="route"
                    href="#edit-member"
                    hierarchy="secondary"
                    font="font-bold"
                >
                    Edit Membership
                </Button>
                <Button
                    type="route"
                    href="#remove-member"
                    hierarchy="secondary"
                    font="font-bold"
                >
                    Remove Membership
                </Button>
            </div>
        </div>
    );
}
