import { arrowLeft, arrowRight } from "../../assets/svg";
import { BookModel } from "../../common/models/book.model";
import { PlanModel } from "../../common/models/plan.model";
import { QuestionUserAnswerModel } from "../../common/models/question-user-answer.model";
import './book-viewer.scss'

export interface BookViewerProps{
    book:BookModel;
    questionAnsewers:QuestionUserAnswerModel[];
    plan:PlanModel;
}

const BookViewer = (props:BookViewerProps) =>{
    const clickRight =()=>{
      alert('direita')
    }
    const clickLeft =()=>{
      alert('left')
    }
  
    return (
      <>
        <div className="row">
          <div className="col-1  "></div>               
          <div className="col-10 text-center"><h4>{props.book.title}</h4></div>
          <div className="col-1  "></div>
        </div>

        <div className="row ">
          <div className="col-1  align-self-center">
            <img alt="Left" style={{cursor:'pointer'}} onClick={()=>clickLeft()} src={arrowLeft} />
          </div>
          <div className="col-5 page-left ">teste</div>
          <div className="col-5 page-right">teste</div>
          <div className="col-1  align-self-center">
            <img alt="Left" style={{cursor:'pointer'}} onClick={()=>clickRight()} src={arrowRight} />
          </div>
        </div>
      </>
    );
}
export default BookViewer;