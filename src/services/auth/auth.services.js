import ApiClient from "@/helpers/api.helper";
import axios from "@/helpers/http.helper";

class Auth extends ApiClient {
  constructor() {
    super("auth");
  }

  login(data) {
    return axios.post(`${this.url}/login`, data);
  }

  logout() {
    return axios.post(`${this.url}/logout`);
  }
}

export default new Auth();
