import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const presentationCurrentSlice = createSlice({
  name: "presentationCurrent",
  initialState,
  reducers: {
    setPresentationCurrent: (state, action) => {
      return action.payload;
    },
  },
});

export const { setPresentationCurrent } = presentationCurrentSlice.actions;
export default presentationCurrentSlice.reducer;
