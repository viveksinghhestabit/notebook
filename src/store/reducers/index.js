import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    notes: [],
    status: null,
    error: null,
    };

const notesSlice = createReducer(initialState, {
    getNotes: async (state, action) => {
        const notes = await api.getNotes();
        const response = await notes.data;
        state.notes = response;
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
});