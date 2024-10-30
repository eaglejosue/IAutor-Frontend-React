import { ChapterFilter } from "../../models/filters/chapter.filter";
import { PlanModelChapterQuestions } from "../../models/plan.model";
import { HttpClient } from "../httpClient";
import queryString from 'query-string';

export class PlanChapterService {
  private endpoint = "/planchapter";
  private _httpClient!: HttpClient;

  constructor() {
    this._httpClient = new HttpClient();
  }

  public async getById(id: number) {
    const response = await this._httpClient.get<string>(
      `${this.endpoint}/${id}`,
    );
    return response.data;
  }

  public async post(data: PlanModelChapterQuestions) {
    const response = await this._httpClient.post<string>(this.endpoint, {
      data,
    });
    return response.data;
  }

  public async put(data: PlanModelChapterQuestions) {
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
  
  public async getAll(filter: ChapterFilter) {
    const response = await this._httpClient.get<string>(
      `${this.endpoint}?${queryString.stringify(filter)}`,
    );
    return response.data;
  }
}