import { createSlice } from '@reduxjs/toolkit';

export const mobileMenuSlice = createSlice({
  name: 'mobileMenu',
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggleMobileMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleMobileMenu } = mobileMenuSlice.actions;
export default mobileMenuSlice.reducer;
