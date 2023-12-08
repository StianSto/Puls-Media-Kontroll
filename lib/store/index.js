import { configureStore } from "@reduxjs/toolkit";
import presentationCurrentSlice from "./slices/presentationCurrentSlice";
import presentationSlideIndexSlice from "./slices/presentationSlideIndexSlice";

const store = configureStore({
  reducer: {
    presentationCurrent: presentationCurrentSlice,
    presentationSlideIndex: presentationSlideIndexSlice,
  },
});

export default store;
