import { useState, useEffect, FunctionComponent } from 'react';

import Sidebar from '../../components/nav/sidebar.component';
import NavUserOptions from '../../components/nav/nav-user-options.component';
import { differenceInDays  } from 'date-fns';
import { Button, Card, Dropdown } from 'react-bootstrap';
import './my-histories.scss'
import { myHistories } from '../../assets/svg';
import React from 'react';
import { BookService } from '../../common/http/api/bookService';
import { AuthenticatedUserModel } from '../../common/models/authenticated.model';
import { BookModel } from '../../common/models/book.model';
import { Modal as ModalResponsive } from 'react-responsive-modal';
import BookViewer from '../new-history/book-viewer';
import { PlanModel } from '../../common/models/plan.model';
import { ChapterModel } from '../../common/models/chapter.model';
import { PlanService } from '../../common/http/api/planService';
import { QuestionUserAnswerModel } from '../../common/models/question-user-answer.model';
import { useNavigate } from 'react-router-dom';
import paths from '../../routes/paths';

const NewHistory = () => {
  const navigate = useNavigate();

  const _bookService = new BookService();
  const _planService = new PlanService();
  const user = AuthenticatedUserModel.fromLocalStorage();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [books,setBooks] = useState<BookModel[]>([]);
  const [isBookPreviewModalOpen, setIsBookPreviewModalOpen] = useState(false);

  const [book, setBook] = useState<BookModel>(new BookModel({ title: 'Alterar Título da História' }));
  const [plan, setPlan] = useState<PlanModel>(new PlanModel())
  const [chapter, setChapter] = useState(new ChapterModel());
  const [questionUserAnswers, setQuestionUserAnswers] = useState<QuestionUserAnswerModel[]>([new QuestionUserAnswerModel()]);


  useEffect(() => {
    if (!user) return

    setIsLoading(true)
    _bookService
     //@ts-ignore
      .getAll({userId:user.id,includeUserBookPlan:true})
      .then((response: any) => {
        if (response) {
          setBooks(response);
        }
      })
      .catch((e: any) => {
        let message = "Error ao obter livros.";
        if (e.response?.data?.length > 0 && e.response.data[0].message)
          message = e.response.data[0].message;
        if (e.response?.data?.detail) message = e.response?.data?.detail;
        console.log("Erro: ", message, e);
      })
      .finally(() => {
        setIsLoading(false)
      });
  }, [])

  const handlerVisualizar =(book:BookModel)=>{
    setBook(book);
    setPlan(book.plan);
    getPlanChaptersQuestions(book.planId,book.id);
    getBookById(book.id)
  }
  const handlerSelect =(e:any)=>{
    console.log(e)
  }
  const CustomToggle = React.forwardRef(({ children, onClick }:any, ref) => (
    <a
      href=""
      style={{textDecoration:'none'}}
      //@ts-ignore
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      <p className="threedots" />
    </a>
  ));
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

  const getPlanChaptersQuestions = async (planId: number, bookId: number) => {
    setIsLoading(true);
    await _planService
      .getChaptersAndQuestionsByPlanIdAndBookId(planId, bookId)
      .then((response: any) => {
        setChapter(response.chapters[0]);
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

  const getBookById =(id:number) =>{
    setIsLoading(true);
    _bookService
      .getById(id)
      .then((response: any) => {
        if (response) {
          setQuestionUserAnswers(response.questionUserAnswers);
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
  }
  interface ItemCardProps {
    book: BookModel;
  }
  const ItemCard: FunctionComponent<ItemCardProps> = (props) => {
    return (
      <>
        <div className="col-3">
          <Card className="border-card">
            <Card.Body>
              <div className="row m-2">
                <div className="col-8">
                  <span className="border rounded-5 text-secondary  py-2 p-2">
                    {props.book?.plan?.title}
                  </span>
                </div>
                <div className="col-4 text-end " style={{ marginTop: "-15px" }}>
                  <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} />
                    <Dropdown.Menu title="">
                      <Dropdown.Item
                        disabled={true}
                        onClick={() => handlerSelect("Editar")}
                      >
                        Editar
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handlerVisualizar(props.book)}
                      >
                        Visualizar
                      </Dropdown.Item>

                      <Dropdown.Item onClick={() => handlerSelect("Baixar")}>
                        Visualizar PDF
                      </Dropdown.Item>
                      <Dropdown.Item
                        disabled={true}
                        onClick={() => handlerSelect("Deletar")}
                      >
                        Deletar
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="col-12">
                  <br></br>
                  <br></br>
                </div>
                <div className="col-12 colIcon  mt-3">
                  <img src={myHistories} alt="My-histories"></img>
                </div>
                <div className="col-12  mt-3 ">
                  {props.book.title}
                </div>
                <div className="col-12   ">
                  <small>{props.book?.updatedAt !=null?  `Última edição há ${differenceInDays(new Date(), props.book?.updatedAt)} dias`: ''}</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </>
    );
  };

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Sidebar navItem="my-histories" />
      <div className="flex-grow-1">
        <header className="bg-white border-bottom p-3">
          <div className="row align-items-center justify-content-beetwen">
            <div className="col-auto fw-bold f-18 pe-0">IAutor /</div>
            <div className="col-auto f-18 ps-1">Minhas Histórias</div>
            <div className="col">
              <NavUserOptions />
            </div>
          </div>
        </header>

        <main className="main ">
          <div className="container-fluid">
            <div className="row m-5">
              <div className="col-8 gx-0">
                <h4>
                  <strong>Minhas histórias </strong>
                </h4>
                <p>
                  <strong>{''.padStart(books?.length>9?0:1,'0') +  books?.length.toString()  }</strong>  História(s) criada(s) até o momento
                </p>
              </div>
              <div className="col-2"></div>
              <div className="col-2">
                <Button
                  variant=" btn-secondary"
                  onClick={() =>{navigate(paths.PRICING_PLANS);}}
                  className=" rounded-5  f-14  p-3"
                >
                  <strong>Criar história</strong>
                </Button>
              </div>
            </div>
            <div className="row m-5">
              <div className="col-1 gx-0 text-primary">
                <strong>Histórias</strong>
                <hr></hr>
              </div>
              <div className="col-11 gx-0">
                &nbsp;
                <hr></hr>
              </div>
            </div>
            <div className="row m-5">
              {
                isLoading?(  <div className='d-flex justify-content-center align-items-center' style={{ height: '100%', borderRadius: '9px' }}>
                  <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status" />
                </div>):(

                    books?.map((r:BookModel)=>{
                      return(ItemCard({book:r}))
                    })

                )
              }

            </div>
          </div>
        </main>
      </div>

    <ModalResponsive open={isBookPreviewModalOpen} closeIcon={closeIcon} center
          classNames={{ overlay: 'customOverlay', modal: 'customModal' }}
          onClose={() => setIsBookPreviewModalOpen(false)}>
            <BookViewer book={book} plan={plan} chapter={chapter} questionUserAnswers={questionUserAnswers} />
        </ModalResponsive>
    </div>


  );
};

export default NewHistory;
