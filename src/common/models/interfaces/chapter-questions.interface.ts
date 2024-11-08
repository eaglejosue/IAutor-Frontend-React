import { QuestionModel } from "../question.model";

export interface ChapterQuestionsInterface {
  ChapterId: number | undefined;
  Questions: [QuestionModel]
}