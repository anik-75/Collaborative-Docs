import axios from "axios";

class AuthService {
  async login(credentials) {
    try {
      const response = await axios.post(`/api/users/login`, credentials, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async register(credentials) {
    try {
      const data = await axios.post(`/api/users/register`, credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

const authService = new AuthService();
export default authService;
