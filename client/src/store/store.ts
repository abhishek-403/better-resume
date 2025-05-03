import { configureStore } from "@reduxjs/toolkit";
import resumeReducer from "./slices/resume-data";
export const store = configureStore({
  reducer: {
    resumeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;