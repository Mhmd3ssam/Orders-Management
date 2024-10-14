import ApiClient from "@/helpers/api.helper";

class OrdersService extends ApiClient {
  constructor() {
    super("collections/orders/records");
  }
  getOrders(params = {}) {
    return axios.get(`${this.url}`, { params });
  }
}

export default new OrdersService();
