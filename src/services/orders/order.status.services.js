import ApiClient from "@/helpers/api.helper";

class orderStatusService extends ApiClient {
  constructor() {
    super("collections/status/records");
  }
  getStatus(params = {}) {
    return axios.get(`${this.url}`, { params });
  }
}

export default new orderStatusService();
