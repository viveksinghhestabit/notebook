import { createSlice } from "@reduxjs/toolkit";
import * as api from "../../Api/index";

export const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    loading: false,
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
      state.loading = action.payload;
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

export const getNotesAsync = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await api.getNotes();
    const data = response.data;
    dispatch(getNotes(data.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const addNoteAsync = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await api.addNote({
      title: data.title,
      description: data.description,
    });
    const note = response.data;
    dispatch(
      addNote({
        _id: note._id,
        title: note.title,
        description: note.description,
      })
    );
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const updateNoteAsync = (id, data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await api.updateNote(id, {
      title: data.title,
      description: data.description,
    });
    const note = response.data;
    dispatch(
      updateNote({
        _id: note._id,
        title: note.title,
        description: note.description,
      })
    );
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const deleteNoteAsync = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await api.deleteNote(id);
    dispatch(deleteNote(id));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
  }
};
