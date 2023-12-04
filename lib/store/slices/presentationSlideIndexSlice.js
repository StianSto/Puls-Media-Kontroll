import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const presentationSlideIndexSlice = createSlice({
  name: "presentationSlideIndex",
  initialState,
  reducers: {
    setPresentationSlideIndex: (state, action) => {
      return action.payload;
    },
  },
});

export const { setPresentationSlideIndex } =
  presentationSlideIndexSlice.actions;
export default presentationSlideIndexSlice.reducer;
