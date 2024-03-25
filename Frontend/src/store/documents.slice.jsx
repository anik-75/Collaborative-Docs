import { createSlice } from "@reduxjs/toolkit";
import documentService from "../services/documentService";

const documentSlice = createSlice({
  name: "document",
  initialState: {
    documents: [],
    searchDocuments: [],
  },
  reducers: {
    setAllDocuments: (state, action) => {
      return {
        documents: action.payload,
        searchDocuments: action.payload,
      };
    },
    addDocument: (state, action) => {
      return {
        documents: [...state.documents, action.payload],
        searchDocuments: [...state.documents, action.payload],
      };
    },
    removeDocument: (state, action) => {
      const remainDocs = state.documents.filter(
        (document) => document["_id"] !== action.payload
      );
      return {
        documents: remainDocs,
        searchDocuments: remainDocs,
      };
    },
    findDocuments: (state, action) => {
      const searchDocuments = state.documents.filter((document) => {
        return document.title.includes(action.payload.trim());
      });
      return {
        ...state,
        searchDocuments: searchDocuments,
      };
    },

    sortDocuments: (state, action) => {
      const { sortBy, sortOrder } = action.payload;

      const mapped = state.searchDocuments.map((document) => {
        console.log(document);
        return document;
      });
      if (sortOrder === "ASC") {
        mapped.sort((a, b) => {
          if (sortBy === "title") {
            return a[sortBy].localeCompare(b[sortBy]);
          } else {
            return new Date(a[sortBy]) - new Date(b[sortBy]);
          }
        });
      } else {
        mapped.sort((a, b) => {
          if (sortBy === "title") {
            return b[sortBy].localeCompare(a[sortBy]);
          } else {
            return new Date(b[sortBy]) - new Date(a[sortBy]);
          }
        });
      }

      return {
        ...state,
        searchDocuments: mapped,
      };
    },
  },
});

export const {
  setAllDocuments,
  addDocument,
  removeDocument,
  findDocuments,
  sortDocuments,
} = documentSlice.actions;

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
