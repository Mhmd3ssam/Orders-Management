import ApiClient from "@/helpers/api.helper";

class OrdersService extends ApiClient {
  constructor() {
    super("collections/orders/records");
  }
  getOrders(params = {}) {
    return axios.get(`${this.url}`, { params });
  }
  addOrder(data) {
    return axios.post(`${this.url}`, { ...data });
  }
  getOrder(orderId) {
    return axios.get(`${this.url}/${orderId}`);
  }
}

export default new OrdersService();
