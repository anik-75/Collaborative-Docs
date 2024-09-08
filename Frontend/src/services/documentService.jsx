import axios from "axios";

class DocumentService {
  async getDocument(documentId) {
    try {
      const response = await axios.get(`/api/documents/${documentId}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        return response.data.document;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async createDocument() {
    try {
      const response = await axios.post(
        `/api/documents/create`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async updateDocument(documentId, content, docTitle, collaboratorsRole) {
    // save data to DB
    try {
      const response = await axios.put(
        `/api/documents/${documentId}`,
        {
          title: docTitle,
          content: content,
          collaboratorsRole,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteDocument(documentId) {
    try {
      const response = await axios.delete(`/api/documents/${documentId}`);
      return response;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  async getAllDocuments() {
    try {
      const response = await axios.get(`/api/documents`, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

const documentService = new DocumentService();
export default documentService;
