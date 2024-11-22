export class QuestionUserAnswerModel {
  id!: number;
  createdAt!: string;
  chapterId!: number;
  questionId!: number;
  userId!: number;
  bookId!: number;
  answer!: string;
  qtdCallIASugestionsUsed!: number;

  constructor(j?: any) {
    if (j) {
      this.id = j.id;
      this.createdAt = j.createdAt;
      this.chapterId = j.chapterId;
      this.questionId = j.questionId;
      this.userId = j.userId;
      this.bookId = j.bookId;
      this.answer = j.answer;
      this.qtdCallIASugestionsUsed = j.qtdCallIASugestionsUsed;
    }
  }
}