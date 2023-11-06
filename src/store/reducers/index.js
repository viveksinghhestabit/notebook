import { notesSlice } from "../slices/notes";

export const rootReducer = {
  notes: notesSlice.reducer,
};
