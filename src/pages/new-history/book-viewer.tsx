import { useEffect, useState } from "react";
import { arrowLeft, arrowRight } from "../../assets/svg";
import { BookModel } from "../../common/models/book.model";
import { PlanModel } from "../../common/models/plan.model";
import { ChapterModel } from "../../common/models/chapter.model";
import { QuestionUserAnswerModel } from "../../common/models/question-user-answer.model";

import "./book-viewer.scss";

export interface BookViewerProps {
  book: BookModel;
  questionAnsewers: QuestionUserAnswerModel[];
  plan: PlanModel;
  chapter: ChapterModel;
}

interface BookViewerNavigate {
  idChapter: number;
  chapter: string;
  answer: string;
  subject?: string;
  imageUrl?: string;
  captionPicture?: string;
  idAnserQuestionUser: number;
}
const BookViewer = (props: BookViewerProps) => {
  const [bookViewerAr, setBookViewerAr] = useState<BookViewerNavigate[]>([]);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(1);
  console.log(props.chapter)
  
  const increase = async () => {
    
    setRight(right < bookViewerAr.length-1? right+2:bookViewerAr.length );
    setLeft(left < bookViewerAr.length-1? left+2:bookViewerAr.length-1);
  };

  const decrease = async () => {
    setRight(left==0?1:right-2);
    setLeft(left==0?0:left-2);
  };

  useEffect(() => {
    let arBooks: BookViewerNavigate[] = [];

    props.plan.chapters
      ?.sort((x1, x2) => x1.chapterNumber - x2.chapterNumber)
      .map((r: ChapterModel) => {
        props.questionAnsewers
          .filter((b) => b.chapterId == r.id)
          .sort((n1, n2) => n1.questionId - n2.questionId)
          .map((g: QuestionUserAnswerModel) => {
            let subject = r.questions?.find(f => f.id == g.questionId)?.subject;

            let booksVw: BookViewerNavigate = {
              idChapter: r.chapterNumber,
              chapter: r.title,
              subject: subject,
              answer: g.answer,
              imageUrl: g.imagePhotoUrl,
              captionPicture: g.imagePhotoLabel,
              idAnserQuestionUser: g.id
            };
            arBooks.push(booksVw);
          });
      });

    setBookViewerAr(arBooks);
  }, []);


  return (
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
              <strong>Capítulo - {bookViewerAr[left]?.idChapter} - {bookViewerAr[left]?.chapter}</strong>
            </div>
            <div className="col-12 text-center pt-2"><h3>{bookViewerAr[left]?.subject}</h3></div>
            {bookViewerAr[left]?.imageUrl && <div className="col-12 text-center pt-2"><img className="img-thumbnail" src={bookViewerAr[left]?.imageUrl}></img> </div>}
             {bookViewerAr[left]?.imageUrl &&<div className="col-12 text-center pt-2"><small> {bookViewerAr[left]?.captionPicture} </small> </div>}
            <div className="col-12  text-justify pt-2">{bookViewerAr[left]?.answer}</div>

          </div>

        </div>

        <div className="col-5 page-right">
          <div className="row p-3">
            <div className="col-12 text-center">
              <strong>Capítulo - {bookViewerAr[right]?.idChapter} - {bookViewerAr[right]?.chapter}</strong>
            </div>
            <div className="col-12 text-center pt-2"><h3>{bookViewerAr[right]?.subject}</h3></div>
            {bookViewerAr[right]?.imageUrl && <div className="col-12 text-center pt-2"><img className="img-thumbnail" src={bookViewerAr[right]?.imageUrl}></img> </div>}
             {bookViewerAr[right]?.imageUrl && <div className="col-12 text-center pt-2"><small> {bookViewerAr[right]?.captionPicture} </small> </div>}
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

      <div className="row">
        <div className="col-1   align-self-center text-end"></div>
        <div className="col-5   align-self-center text-center page-left-bg">{left + 1}/{bookViewerAr.length}</div>
        <div className="col-5   align-self-center text-center page-right-bg">{right + 1}/{bookViewerAr.length}</div>
        <div className="col-1   align-self-center text-end"></div>
      </div>

    </div>
  );
};

export default BookViewer;
