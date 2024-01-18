import { createSlice } from "@reduxjs/toolkit";
import * as api from "../../Api/index";

export const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: [],
    loading: false,
    error: [],
  },
  reducers: {
    getContacts: (state, action) => {
      state.contacts = action.payload;
    },
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        (contact) => contact._id !== action.payload
      );
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { getContacts, addContact, deleteContact, setError, setLoading } =
  contactsSlice.actions;

export default contactsSlice.reducer;

export const getContactsAsync = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await api.getContacts();
    const data = response.data;
    dispatch(getContacts(data.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const addContactAsync = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await api.addContact(data);
    const result = response.data;
    dispatch(addContact(result.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const deleteContactAsync = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await api.deleteContact(id);
    dispatch(deleteContact(id));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
  }
};
