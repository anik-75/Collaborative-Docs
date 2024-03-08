import { createSlice } from "@reduxjs/toolkit";
import documentService from "../services/documentService";

const documentSlice = createSlice({
  name: "document",
  initialState: [],
  reducers: {
    setAllDocuments: (state, action) => {
      return action.payload;
    },
    addDocument: (state, action) => {
      return [...state, action.payload];
    },
    removeDocument: (state, action) => {
      return state.filter((document) => document["_id"] !== action.payload);
    },
  },
});

export const { setAllDocuments, addDocument, removeDocument } =
  documentSlice.actions;

export const fetchAllDocuments = () => {
  return async (dispatch) => {
    try {
      const response = await documentService.getAllDocuments();
      if (response.status === 200) {
        dispatch(setAllDocuments(response.data.document));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const createDocument = (successCallback) => {
  return async (dispatch) => {
    try {
      const response = await documentService.createDocument();
      if (response.status === 201 && response.statusText === "Created") {
        dispatch(addDocument(response.data.document));
        successCallback(`/documents/${response.data.id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteDocument = (documentId) => {
  return async (dispatch) => {
    try {
      const response = await documentService.deleteDocument(documentId);
      if (response.status === 200) {
        dispatch(removeDocument(documentId));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export default documentSlice.reducer;
