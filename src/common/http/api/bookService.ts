import queryString from 'query-string';
import { HttpClient } from "../httpClient";
import { BookModel } from "../../models/book.model";
import { BookFilter } from "../../models/filters/book.filter";

export class BookService {
  private endpoint = "/books";
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

  public async getAll(filter: BookFilter) {
    const response = await this._httpClient.get<string>(
      `${this.endpoint}?${queryString.stringify(filter)}`
    );
    return response.data;
  }

  public async post(data: BookModel) {
    const response = await this._httpClient.post<string>(
      this.endpoint, { data }
    );
    return response.data;
  }

  public async put(data: BookModel) {
    const response = await this._httpClient.put<string>(
      this.endpoint, { data }
    );
    return response.data;
  }

  public async patch(data: BookModel) {
    const response = await this._httpClient.put<string>(
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

  public async bookPDF(id: number) {
    const response = await this._httpClient.post<string>(`${this.endpoint}/${id}/pdf`);
    return response.data;
  }
}

export default new BookService();
