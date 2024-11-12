export class QuestionUserAnswerModel {
  id!: number;
  createdAt!: string;
  questionId!: number;
  userId!: number;
  bookId!: number;
  answer!: string;
  qtdCallIASugestionsUsed!: number;

  constructor(j?: any) {
    if (j) {
      this.id = j.id;
      this.createdAt = j.createdAt;
      this.questionId = j.questionId;
      this.userId = j.userId;
      this.bookId = j.bookId;
      this.answer = j.answer;
      this.qtdCallIASugestionsUsed = j.qtdCallIASugestionsUsed;
    }
  }
}