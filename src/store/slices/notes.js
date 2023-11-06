import { createSlice } from "@reduxjs/toolkit";

export const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    status: null,
    error: null,
  },
  reducers: {
    getNotes: (state, action) => {
      state.notes = action.payload;
    },
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },
    updateNote: (state, action) => {
      const index = state.notes.findIndex(
        (note) => note._id === action.payload._id
      );
      state.notes[index] = action.payload;
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note._id !== action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const {
  getNotes,
  addNote,
  updateNote,
  deleteNote,
  setError,
  setLoading,
} = notesSlice.actions;

export default notesSlice.reducer;
