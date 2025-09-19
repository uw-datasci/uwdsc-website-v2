import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  totalCount: 0,
  mathSocCount: 0,
};

const paidUsersSlice = createSlice({
  name: "paidUsers",
  initialState,
  reducers: {
    setPaidUsers: (state, action) => {
      state.users = action.payload;
      // The payload should contain only paid users for current use case.
      // Including the filter for hasPaid is just a safety measure for any future use cases.
      state.totalCount = action.payload.filter((user) => user.hasPaid).length;
      state.mathSocCount = action.payload.filter(
        (user) => user.isMathSocMember,
      ).length;
    },
    updateUserPaidStatus: (state, action) => {
      const { userId, hasPaid, isMathSocMember } = action.payload;
      const userIndex = state.users.findIndex((user) => user._id === userId);
      if (userIndex !== -1) {
        // Update existing user
        state.users[userIndex] = {
          ...state.users[userIndex],
          hasPaid,
          isMathSocMember,
        };
      } else if (hasPaid) {
        // Add new paid user
        state.users.push({ _id: userId, hasPaid, isMathSocMember });
      }

      // Recalculate counts
      state.totalCount = state.users.filter((user) => user.hasPaid).length;
      state.mathSocCount = state.users.filter(
        (user) => user.hasPaid && user.isMathSocMember,
      ).length;
    },
  },
});

export const { setPaidUsers, updateUserPaidStatus } = paidUsersSlice.actions;
export default paidUsersSlice.reducer;
