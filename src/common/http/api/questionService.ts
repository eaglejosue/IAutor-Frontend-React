import { QuestionFilter } from "../../models/filters/question.filter";
import { QuestionUserAnswerModel } from "../../models/question-user-answer.model";
import { QuestionModel } from "../../models/question.model";
import { HttpClient } from "../httpClient";
import queryString from 'query-string';

export class QuestionService {
  private endpoint = "/questions";
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

  public async getAll(filter: QuestionFilter) {
    const response = await this._httpClient.get<string>(
      `${this.endpoint}?${queryString.stringify(filter)}`,
    );
    return response.data;
  }

  public async post(data: QuestionModel) {
    const response = await this._httpClient.post<string>(this.endpoint, {
      data,
    });
    return response.data;
  }

  public async put(data: QuestionModel) {
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

  public async getAllQuestionUserAnswersByBookId(bookId: number) {
    const response = await this._httpClient.get<string>(
      `${this.endpoint}/user-answers-by-book/${bookId}`,
    );
    return response.data;
  }

  public async upsertQuestionUserAnswer(data: QuestionUserAnswerModel) {
    const response = await this._httpClient.post<string>(`${this.endpoint}/user-answers`, {
      data,
    });
    return response.data;
  }
}