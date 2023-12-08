import { configureStore } from "@reduxjs/toolkit";
import presentationCurrentSlice from "./slices/presentationCurrentSlice";
import presentationSlideIndexSlice from "./slices/presentationSlideIndexSlice";
import librarySlice from "./slices/librarySlice";

const store = configureStore({
  reducer: {
    library: librarySlice,
    presentationCurrent: presentationCurrentSlice,
    presentationSlideIndex: presentationSlideIndexSlice,
  },
});

export default store;
