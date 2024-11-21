import { useEffect, useState } from "react";
import { arrowLeft, arrowRight } from "../../assets/svg";
import { BookModel } from "../../common/models/book.model";
import { PlanModel } from "../../common/models/plan.model";
import { QuestionUserAnswerModel } from "../../common/models/question-user-answer.model";
import "./book-viewer.scss";
import { ChapterModel } from "../../common/models/chapter.model";

export interface BookViewerProps {
  book: BookModel;
  questionAnsewers: QuestionUserAnswerModel[];
  plan: PlanModel;
}
interface BookViewerNavigate {
  idChapter: number;
  chapter: string;
  answer: string;
}
const BookViewer = (props: BookViewerProps) => {
  const [bookViewerAr, setBookViewerAr] = useState<BookViewerNavigate[]>([]);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(1);

  const increase = () => {
    let value = right < bookViewerAr.length - 1 ? right + 2 : right;
    setRight(value);
    setLeft(value - 1);
  };
  const decrease = () => {
    let value = right - 2 < 0 ? 0 : right - 2;
    setLeft(value);
    setRight(value + 1);
  };

  useEffect(() => {
    let arBooks: BookViewerNavigate[] = [];
    props.plan.chapters
      ?.sort((r) => r.id)
      .map((r: ChapterModel) => {
        props.questionAnsewers
          .filter((b) => b.chapterId == r.id)
          .map((g: QuestionUserAnswerModel) => {
            let booksVw: BookViewerNavigate = {
              idChapter: r.id,
              answer: g.answer,
              chapter: r.title,
            };
            arBooks.push(booksVw);
          });
      });
    setBookViewerAr(arBooks);
  }, []);

  useEffect(() => {
    if (bookViewerAr.length == 0) {
      // setRight(0);
      console.log(bookViewerAr.length);
    }
  }, [bookViewerAr]);

  return (
    <>
    <div className="bgWaterMark">
      <div className="row">
        <div className="col-1  "></div>
        <div className="col-10 text-center">
          <h4>{props.book.title}</h4>
        </div>
        <div className="col-1  "></div>
      </div>

      <div className="row ">
        <div className="col-1   align-self-center text-end">
          <img
            alt="Left"
            style={{ cursor: "pointer" }}
            onClick={() => {
              decrease();
            }}
            src={arrowLeft}
          />
        </div>

        
          <div className="col-5 page-left ">
            <div className="row p-3">
              <div className="col-12 text-center ">
                <strong>Capítulo - {bookViewerAr[left]?.idChapter}</strong>
              </div>
              <div className="col-12 text-center pt-2"><h3>{bookViewerAr[left]?.chapter}</h3></div>
              <div className="col-12  text-justify pt-2">{bookViewerAr[left]?.answer}</div>
            </div>
          </div>
          <div className="col-5 page-right">
            <div className="row p-3">
              <div className="col-12 text-center">
              <strong>Capítulo - {bookViewerAr[right]?.idChapter}</strong>
              </div>
              <div className="col-12 text-center pt-2"><h3>{bookViewerAr[right]?.chapter}</h3></div>
              <div className="col-12 text-justify pt-2">{bookViewerAr[right]?.answer}</div>
            </div>
          </div>
        

        <div className="col-1  align-self-center">
          <img
            alt="Right"
            style={{ cursor: "pointer" }}
            onClick={() => {
              increase();
            }}
            src={arrowRight}
          />
        </div>
      </div>
      </div>
    </>
  );
};
export default BookViewer;
