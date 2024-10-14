import ApiClient from "@/helpers/api.helper";
import axios from "@/helpers/http.helper";

class Auth extends ApiClient {
  constructor() {
    super("auth");
  }

  login(data) {
    return axios.post(
      "http://127.0.0.1:8090/api/admins/auth-with-password",
      data
    );
  }

  logout() {
    return axios.post(`${this.url}/logout`);
  }
}

export default new Auth();
