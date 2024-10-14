import queryString from 'query-string';
import { HttpClient } from "../httpClient";
import { OrderModel } from '../../models/order.model';
import { OrderFilter } from '../../models/filters/order.filter';

export class OrderService {
  private endpoint = "/orders";
  private _httpClient!: HttpClient;

  constructor() {
    this._httpClient = new HttpClient();
  }

  public async getById(id: number) {
    const response = await this._httpClient.get<string>(
      `${this.endpoint}/${id}`
    );
    return response.data;
  }

  public async getAll(filter: OrderFilter) {
    const response = await this._httpClient.get<string>(
      `${this.endpoint}?${queryString.stringify(filter)}`
    );
    return response.data;
  }

  public async post(data: OrderModel) {
    const response = await this._httpClient.post<string>(
      this.endpoint, { data }
    );
    return response.data;
  }

  public async put(data: OrderModel) {
    const response = await this._httpClient.put<string>(
      this.endpoint, { data }
    );
    return response.data;
  }

  public async patch(data: OrderModel) {
    const response = await this._httpClient.patch<string>(
      this.endpoint, { data }
    );
    return response.data;
  }

  public async delete(id: number) {
    const response = await this._httpClient.delete<string>(
      `${this.endpoint}/${id}`
    );
    return response.data;
  }
}

export default new OrderService();
