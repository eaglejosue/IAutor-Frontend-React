import { useEffect, useState } from 'react';

import { AuthenticatedUserModel } from '../../common/models/authenticated.model';
import { Button } from 'react-bootstrap';
import { BookService } from '../../common/http/api/bookService';
import { BookModel } from '../../common/models/book.model';
import { Modal as ModalResponsive } from 'react-responsive-modal';
import { PlanService } from '../../common/http/api/planService';
import { PlanModel } from '../../common/models/plan.model';
import { ChapterModel } from '../../common/models/chapter.model';
import { QuestionUserAnswerModel } from '../../common/models/question-user-answer.model';

import Sidebar from '../../components/nav/sidebar.component';
import NavUserOptions from '../../components/nav/nav-user-options.component';
import EmptyHomeLogged from './sections/empty-logged.section';
import BooksHistory from './sections/books-history-section';
import BookViewer from '../new-history/book-viewer';

import './home-logged.scss'

const HomeLogged = () => {
  const user = AuthenticatedUserModel.fromLocalStorage();
  const _bookService = new BookService();
  const _planService = new PlanService();
  const [book, setBook] = useState<BookModel>(new BookModel({ title: 'Alterar Título da História' }));
  const [plan, setPlan] = useState<PlanModel>(new PlanModel())
  const [questionUserAnswers, setQuestionUserAnswers] = useState<QuestionUserAnswerModel[]>([new QuestionUserAnswerModel()]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isBookPreviewModalOpen, setIsBookPreviewModalOpen] = useState(false);

  useEffect(() => {
    if (!user) return

    setIsLoading(true);
    _bookService
      .getById(user?.lastBookId)
      .then((response: any) => {
        if (response) {
          setBook(response);
          getPlanChaptersQuestions(response.planId, user?.lastBookId);
        }
      })
      .catch((e: any) => {
        let message = "Error ao obter plano.";
        if (e.response?.data?.length > 0 && e.response.data[0].message)
          message = e.response.data[0].message;
        if (e.response?.data?.detail) message = e.response?.data?.detail;
        console.log("Erro: ", message, e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [])

  const handlerSelect = () => {
    setIsBookPreviewModalOpen(true);
  }

  const getPlanChaptersQuestions = async (planId: number, bookId: number) => {
    setIsLoading(true);
    await _planService
      .getChaptersAndQuestionsByPlanIdAndBookId(planId, bookId)
      .then((response: any) => {
        setPlan(response);

        const allQuestionUserAnswers = response.chapters!.flatMap((c: ChapterModel) =>
          c.questions!.flatMap(q => q.questionUserAnswers)
        );
        setQuestionUserAnswers(allQuestionUserAnswers ?? [new QuestionUserAnswerModel()]);
      })
      .catch((e: any) => {
        let message = "Error ao obter plano, capitulos e perguntas.";
        if (e.response?.data?.length > 0 && e.response.data[0].message)
          message = e.response.data[0].message;
        if (e.response?.data?.detail) message = e.response?.data?.detail;
        console.log("Erro: ", message, e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const closeIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_693_22769" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_693_22769)">
        <path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z" fill="white" />
      </g>
    </svg>
  );

  return (
    <>
      <div className="d-flex" style={{ height: "100vh" }}>
        <Sidebar navItem="home" />
        <section className="flex-grow-1">

          <header className="bg-white border-bottom p-3">
            <div className="row align-items-center justify-content-beetwen">
              <div className="col-auto fw-bold f-18 pe-0">IAutor /</div>
              <div className="col-auto f-18 ps-1">Home</div>
              <div className="col">
                <NavUserOptions />
              </div>
            </div>
          </header>

          <main className="main">
            <div className="container-fluid">
              <div className="row m-5">

                {isLoading ? (
                  <div className='d-flex justify-content-center align-items-center' style={{ height: '100%', borderRadius: '9px' }}>
                    <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status" />
                  </div>
                ) : (
                  book == null ?
                    <EmptyHomeLogged user={user} /> :
                    <BooksHistory book={book} plan={plan} user={user} handlerSelect={handlerSelect} />
                )
                }
              </div>

              <div className="row ">
                <div className="col-12">
                  <div className="row home-explore m-5 mt-0 bg-white p-5 border rounded">
                    <div className="col-12 mb-4">
                      <h4>
                        <strong>Explore o IAutor</strong>
                      </h4>
                    </div>

                    <div className="col-5 explore-left p-5">
                      <span>
                        <strong>Saiba mais sobre o IAutor</strong>
                      </span>
                      <p className="mt-2">
                        Conheça nossa história, valores <br></br>e propósitos.
                      </p>
                      <Button
                        variant=" btn-secondary"
                        className=" rounded-5  f-14  p-3"
                      >
                        <strong>Clique aqui</strong>
                      </Button>
                    </div>
                    <div className="col-2 "></div>
                    <div className="col-5 explore-right p-5 ">
                      <span>
                        <strong>FAQ</strong>
                      </span>
                      <p className="mt-2">
                        Encontre respostas rápidas para<br></br> suas dúvidas mais
                        comuns.
                      </p>
                      <Button
                        variant=" btn-secondary"
                        className=" rounded-5  f-14  p-3"
                      >
                        <strong>Clique aqui</strong>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

        </section>
      </div>

      <ModalResponsive open={isBookPreviewModalOpen} closeIcon={closeIcon} center
        classNames={{ overlay: 'customOverlay', modal: 'customModal' }}
        onClose={() => setIsBookPreviewModalOpen(false)}
      >
        <BookViewer book={book} plan={plan} questionUserAnswers={questionUserAnswers} />
      </ModalResponsive>
    </>
  );
};

export default HomeLogged;