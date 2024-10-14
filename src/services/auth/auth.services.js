import ApiClient from "@/helpers/api.helper";
import axios from "@/helpers/http.helper";

class Auth extends ApiClient {
  constructor() {
    super("admins");
  }

  login(data) {
    return axios.post(`${this.url}/auth-with-password`, data);
  }
  getMe() {
    return axios.post(`${this.url}/auth-refresh`);
  }

  logout() {
    return axios.post(`${this.url}/logout`);
  }
}

export default new Auth();
