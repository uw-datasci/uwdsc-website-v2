import SectionTitle from "@/components/UI/SectionTitle";
import AdminUserCard from "@/components/cards/AdminUserCard";
import { type User} from "@/types/types";
import Button from "@/components/UI/Button";
import { useEffect, useState } from "react";


const FakeUsers: User[] = [
    {
        userId: "abc",
        dateCreated: new Date(),
        firstAndLastName: "My Name",
        isPaidMember: true,
        WatIAM: "abc123",
        waterlooEmail: "me2@email.com",
        faculties: ["math", "env"],
        term: "2B",
        reasonOfJoining: "fun",
        suggestion: ""
    },
    {
        userId: "abc1",
        dateCreated: new Date(),
        firstAndLastName: "My Name 2",
        isPaidMember: true,
        WatIAM: "abc123",
        waterlooEmail: "me@email.com",
        faculties: ["maths"],
        term: "1B",
        reasonOfJoining: "fun!",
        suggestion: ""
    },
    {
        userId: "abc2",
        dateCreated: new Date(),
        firstAndLastName: "3My Name",
        isPaidMember: true,
        WatIAM: "abc123",
        waterlooEmail: "me@email.com",
        faculties: ["math"],
        term: "4B",
        reasonOfJoining: "fun",
        suggestion: ""
    },
    {
        userId: "a4bc",
        dateCreated: new Date(),
        firstAndLastName: "4My Name",
        isPaidMember: true,
        WatIAM: "abc123",
        waterlooEmail: "me@email.com",
        faculties: ["math"],
        term: "8B",
        reasonOfJoining: "fun",
        suggestion: ""
    }
];

export default function Admin() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        // to test this separately, run a sign-in call manually and copy the token here
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiYWRtaW4xIiwiZW1haWwiOiJhZG1pbjFAZ21haWwuY29tIiwiaWQiOiI2Njc3MGVjY2IyYjNkNzg0MDAyZGI5YWYiLCJ1c2VyU3RhdHVzIjoiYWRtaW4ifSwiaWF0IjoxNzE5Njg1MjYwLCJleHAiOjE3MTk5NDQ0NjB9.1K9ue1woU5L6KZW8pOM3DUhxCFbOHLAgm-AENoc5VdE";
        // const token = localStorage.getItem('token');
        
        fetch('http://localhost:5001/api/admin/getAllUsers', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(error => console.error('Error fetching users:', error));
    }, []);

    console.log(users);

    return (
        <>
            <section className="mx-container mb-section mt-14 lg:mt-20">
                <h1 className="mb-14 text-center text-3xl font-bold text-white 3xs:text-6xl sm:text-8xl lg:text-10xl 2xl:text-12xl">
                    Admin
                </h1>
                <div className="grid gap-12">
                    <SectionTitle mb="mb-12">Memberships</SectionTitle>
                    <div className="flex flex-col gap-5 sm:flex-row sm:justify-center sm:gap-12">
                        <Button
                            type="route"
                            href="#add-member"
                            hierarchy="primary"
                            font="font-bold"
                            text="sm:text-lg 2xl:text-xl"
                            padding="py-3 sm:px-7 sm:py-4"
                            rounded="rounded-lg"
                        >
                            Add Membership
                        </Button>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8 3xs:gap-12 xl:gap-20">
                        {FakeUsers.map((user) => (
                            <AdminUserCard {...user} key={user.userId} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
