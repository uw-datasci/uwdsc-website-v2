import { User } from "@/types/types";
import { EmailFilter } from "@/types/email";

export function filterUsers(users: User[], filters: EmailFilter): User[] {
  return users.filter((user) => {
    // Filter by payment status
    if (filters.hasPaid !== undefined) {
      const userHasPaid = user.hasPaid === "True";
      if (userHasPaid !== filters.hasPaid) {
        return false;
      }
    }

    // Filter by email verification status
    if (filters.isEmailVerified !== undefined) {
      const userIsVerified = user.isEmailVerified === "True";
      if (userIsVerified !== filters.isEmailVerified) {
        return false;
      }
    }

    // Filter by user status/role
    if (filters.userStatus && filters.userStatus.length > 0) {
      if (!filters.userStatus.includes(user.userStatus)) {
        return false;
      }
    }

    // Filter by faculty
    if (filters.faculties && filters.faculties.length > 0) {
      if (!filters.faculties.includes(user.faculty)) {
        return false;
      }
    }

    // Filter by Math Society membership
    if (filters.isMathSocMember !== undefined) {
      const userIsMathSoc = user.isMathSocMember === "True";
      if (userIsMathSoc !== filters.isMathSocMember) {
        return false;
      }
    }

    // Filter by custom user IDs (for manual selection)
    if (filters.customUserIds && filters.customUserIds.length > 0) {
      if (!filters.customUserIds.includes(user._id)) {
        return false;
      }
    }

    return true;
  });
}

export function validateEmailFilters(filters: EmailFilter): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Validate faculties if provided
  if (filters.faculties && filters.faculties.length > 0) {
    const validFaculties = [
      "Mathematics",
      "Engineering",
      "Science",
      "Arts",
      "Environment",
      "Health",
      "Applied Health Sciences",
    ];

    const invalidFaculties = filters.faculties.filter(
      (f) => !validFaculties.includes(f),
    );
    if (invalidFaculties.length > 0) {
      errors.push(`Invalid faculties: ${invalidFaculties.join(", ")}`);
    }
  }

  // Validate user status if provided
  if (filters.userStatus && filters.userStatus.length > 0) {
    const validStatuses = ["member", "exec", "admin"];
    const invalidStatuses = filters.userStatus.filter(
      (s) => !validStatuses.includes(s),
    );
    if (invalidStatuses.length > 0) {
      errors.push(`Invalid user statuses: ${invalidStatuses.join(", ")}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function getFilterSummary(filters: EmailFilter): string {
  const parts: string[] = [];

  if (filters.hasPaid !== undefined) {
    parts.push(`Payment Status: ${filters.hasPaid ? "Paid" : "Unpaid"}`);
  }

  if (filters.isEmailVerified !== undefined) {
    parts.push(`Email Verified: ${filters.isEmailVerified ? "Yes" : "No"}`);
  }

  if (filters.userStatus && filters.userStatus.length > 0) {
    parts.push(`User Roles: ${filters.userStatus.join(", ")}`);
  }

  if (filters.faculties && filters.faculties.length > 0) {
    parts.push(`Faculties: ${filters.faculties.join(", ")}`);
  }

  if (filters.isMathSocMember !== undefined) {
    parts.push(
      `Math Society Member: ${filters.isMathSocMember ? "Yes" : "No"}`,
    );
  }

  if (filters.customUserIds && filters.customUserIds.length > 0) {
    parts.push(
      `Custom Selection: ${filters.customUserIds.length} specific users`,
    );
  }

  return parts.length > 0 ? parts.join(" | ") : "All users";
}

export function transformUserToEmailRecipient(
  user: User,
): import("@/types/email").EmailRecipient {
  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    faculty: user.faculty,
    watIAM: user.watIAM,
    hasPaid: user.hasPaid === "True",
    isEmailVerified: user.isEmailVerified === "True",
    userStatus: user.userStatus,
    isMathSocMember: user.isMathSocMember === "True",
    paymentMethod: user.paymentMethod,
    verifier: user.verifier,
    paymentLocation: user.paymentLocation,
  };
}
