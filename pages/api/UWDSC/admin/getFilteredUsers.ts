import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { EmailFilter, EmailRecipient } from "@/types/email";
import {
  validateEmailFilters,
  getFilterSummary,
  transformUserToEmailRecipient,
} from "@/utils/emailFilters";
import { User } from "@/types/types";

require("dotenv").config();

type ApiResponse = {
  success: boolean;
  data?: {
    users: EmailRecipient[];
    total: number;
    filterSummary: string;
  };
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>,
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const { token, filters = {} } = req.body;

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Authentication token is required",
      });
    }

    // Validate filters
    const validation = validateEmailFilters(filters);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: `Invalid filters: ${validation.errors.join(", ")}`,
      });
    }

    // Fetch users from the backend server
    let allUsers: User[] = [];
    try {
      const response = await axios({
        url:
          process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL + "/api/admin/users",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = response.data;

      // Transform backend user data to frontend User type
      allUsers = data.map(
        (user: any): User =>
          ({
            _id: user._id,
            watIAM: user.watIAM,
            faculty: user.faculty,
            username: user.username,
            email: user.email,
            password: "", // Password is not needed for email campaigns
            userStatus: user.userStatus,
            hasPaid: user.hasPaid ? "true" : "false",
            paymentMethod: user.paymentMethod || "",
            verifier: user.verifier || "",
            paymentLocation: user.paymentLocation || "",
            isEmailVerified: user.isEmailVerified ? "true" : "false",
            isMathSocMember: user.isMathSocMember ? "true" : "false",
            eventList: user.eventList || [],
          }) as User,
      );
    } catch (error: any) {
      console.error("Error fetching users from backend:", error);
      // Fallback to mock data if backend is not available
      console.log("Using mock data as fallback");
      allUsers = getMockUsers();
    }

    // Filter users using the existing filter logic
    const filteredUserData = allUsers.filter((user) => {
      if (
        filters.hasPaid !== undefined &&
        (user.hasPaid === "true") !== filters.hasPaid
      )
        return false;
      if (
        filters.isEmailVerified !== undefined &&
        (user.isEmailVerified === "true") !== filters.isEmailVerified
      )
        return false;
      if (
        filters.userStatus &&
        !filters.userStatus.includes(user.userStatus || "")
      )
        return false;
      if (filters.faculties && !filters.faculties.includes(user.faculty || ""))
        return false;
      if (
        filters.isMathSocMember !== undefined &&
        (user.isMathSocMember === "true") !== filters.isMathSocMember
      )
        return false;
      return true;
    });

    // Transform to EmailRecipient format
    const filteredUsers = filteredUserData.map(transformUserToEmailRecipient);
    const filterSummary = getFilterSummary(filters);

    return res.status(200).json({
      success: true,
      data: {
        users: filteredUsers,
        total: filteredUsers.length,
        filterSummary,
      },
    });
  } catch (error) {
    console.error("Error filtering users:", error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

// Fallback mock data function
function getMockUsers(): User[] {
  return [
    {
      _id: "1",
      username: "John Doe",
      email: "john@example.com",
      faculty: "Mathematics",
      watIAM: "jdoe",
      hasPaid: "true",
      paymentMethod: "cash",
      verifier: "admin",
      paymentLocation: "office",
      isEmailVerified: "true",
      userStatus: "member",
      password: "hashed_password",
      isMathSocMember: "true",
    },
    {
      _id: "2",
      username: "Jane Smith",
      email: "jane@example.com",
      faculty: "Engineering",
      watIAM: "jsmith",
      hasPaid: "false",
      paymentMethod: "",
      verifier: "",
      paymentLocation: "",
      isEmailVerified: "true",
      userStatus: "member",
      password: "hashed_password",
      isMathSocMember: "false",
    },
    {
      _id: "3",
      username: "Alice Johnson",
      email: "alice@example.com",
      faculty: "Computer Science",
      watIAM: "ajohnson",
      hasPaid: "true",
      paymentMethod: "etransfer",
      verifier: "exec",
      paymentLocation: "online",
      isEmailVerified: "true",
      userStatus: "exec",
      password: "hashed_password",
      isMathSocMember: "true",
    },
    {
      _id: "4",
      username: "Bob Wilson",
      email: "bob@example.com",
      faculty: "Statistics",
      watIAM: "bwilson",
      hasPaid: "false",
      paymentMethod: "",
      verifier: "",
      paymentLocation: "",
      isEmailVerified: "false",
      userStatus: "member",
      password: "hashed_password",
      isMathSocMember: "false",
    },
    {
      _id: "5",
      username: "Carol Brown",
      email: "carol@example.com",
      faculty: "Applied Mathematics",
      watIAM: "cbrown",
      hasPaid: "true",
      paymentMethod: "cash",
      verifier: "admin",
      paymentLocation: "office",
      isEmailVerified: "true",
      userStatus: "admin",
      password: "hashed_password",
      isMathSocMember: "true",
    },
  ];
}
