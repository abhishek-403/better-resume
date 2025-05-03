import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface Resume {
  analytics: {};
  file: File | null;
  hasData: boolean;
}

const initialState: Resume = {
  analytics: {},
  file: null,
  hasData: false,
};

const resumeSlice = createSlice({
  name: "resume-data",
  initialState,
  reducers: {
    addResume: (state, action: PayloadAction<Resume>) => {
      state.analytics = action.payload.analytics;
      state.file = action.payload.file;
      state.hasData = action.payload.hasData;
    },
    removeResume: (state) => {
      state.analytics = {};
      state.file = null;
      state.hasData = false;
    },
  },
});

export const { addResume, removeResume } = resumeSlice.actions;
export default resumeSlice.reducer;
