import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { Modal, ModalHeader } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Dropdown from 'react-bootstrap/Dropdown';

import { Modal as ModalResponsive } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import Sidebar from '../../components/nav/sidebar.component';
import NavUserOptions from '../../components/nav/nav-user-options.component';

import { BookService } from '../../common/http/api/bookService';
import { PlanService } from '../../common/http/api/planService';
import { QuestionService } from '../../common/http/api/questionService';
import { IAService } from '../../common/http/api/iaService';
import { BookModel } from '../../common/models/book.model';
import { PlanModel } from '../../common/models/plan.model';
import { ChapterModel } from '../../common/models/chapter.model';
import { QuestionModel } from '../../common/models/question.model';
import { QuestionUserAnswerModel } from '../../common/models/question-user-answer.model';

import paths from '../../routes/paths';
import horizontalImgs from '../../assets/horizontal-imgs';
import previewCapaLivro from '../../assets/img/preview-capa-livro.png';
import previewCapaLivroBranca from '../../assets/img/Preview-capa-livro-branca.png';
import artificialInteligence from '../../assets/svg/artificial-inteligence.svg';
import openBook from '../../assets/svg/open-book.svg';
import life from '../../assets/svg/life.svg';
import clownWithHat from '../../assets/svg/face-of-clown-with-hat.svg';
import theater from '../../assets/svg/theater.svg';
import hearts from '../../assets/svg/hearts.svg';
import BookViewer from './book-viewer';
import UploadPhotosContainer from './photos/upload-photos.container';

const NewHistory = () => {

  const navigate = useNavigate();
  const param = useParams();

  const _bookService = new BookService();
  const _planService = new PlanService();
  const _questionService = new QuestionService();
  const _iaService = new IAService();

  const [isLoading1, setIsLoading1] = useState<boolean>(false);
  const [isLoading2, setIsLoading2] = useState<boolean>(false);
  const isLoading = isLoading1 || isLoading2;

  const [isLoadingSaveAnswer, setIsLoadingSaveAnswer] = useState<boolean>(false);

  const [imgRandomSrc, setImgRandomSrc] = useState('1');

  const [book, setBook] = useState<BookModel>(new BookModel({ title: 'Alterar Título da História' }))
  const [plan, setPlan] = useState<PlanModel>(new PlanModel())
  const [chapter, setChapter] = useState(new ChapterModel());
  const [question, setQuestion] = useState(new QuestionModel());

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState('Título História');
  const [theme, setTheme] = useState('');

  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isIAModalOpen, setIsIAModalOpen] = useState(false);
  const [isBookPreviewModalOpen, setIsBookPreviewModalOpen] = useState(false);
  const [isPhotoUploadModalOpen, setPhotoUploadModalOpen] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isFirstQuestion, setIsFirstQuestion] = useState(true);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [questionUserAnswers, setQuestionUserAnswers] = useState<QuestionUserAnswerModel[]>([new QuestionUserAnswerModel()]);
  const [answer, setAnswer] = useState('');
  const [answerChanged, setAnswerChanged] = useState<boolean>(false);
  const [qtdCallIASugestionsUsed, setQtdCallIASugestionsUsed] = useState(0);
  const [IAText, setIAText] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 16);// Gera um número entre 0 e 15
    setImgRandomSrc(horizontalImgs[randomIndex]);
    getBook(parseInt(param.id!));
  }, []);

  const closeIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_693_22769"  maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
    <rect width="24" height="24" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_693_22769)">
    <path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z" fill="white"/>
    </g>
    </svg>
  );

  const getBook = (id: number) => {
    setIsLoading1(true);
     _bookService
      .getById(id)
      .then((response: any) => {
        setBook(response);
        setTitle(response.title);
        setQuestionUserAnswers(response.questionUserAnswers);
        getPlanChaptersQuestions(response.planId, id);
      })
      .catch((e: any) => {
        let message = "Error ao obter livro.";
        if (e.response?.data?.length > 0 && e.response.data[0].message)
          message = e.response.data[0].message;
        if (e.response?.data?.detail) message = e.response?.data?.detail;
        console.log("Erro: ", message, e);
      })
      .finally(() => {
        setIsLoading1(false);
      });
  };

  const saveBook = async () => {
    await _bookService
      .put(new BookModel({...book, title: title}))
      .then(() => {
      })
      .catch((e: any) => {
        let message = "Error ao salvar livro.";
        if (e.response?.data?.length > 0 && e.response.data[0].message)
          message = e.response.data[0].message;
        if (e.response?.data?.detail) message = e.response?.data?.detail;
        console.log("Erro: ", message, e);
      })
      .finally(() => {
      });
  };

  const getPlanChaptersQuestions = async (planId: number, bookId: number) => {
    setIsLoading2(true);
    await _planService
      .getChaptersAndQuestionsByPlanIdAndBookId(planId, bookId)
      .then((response: any) => {
        setPlan(response);
        setChapter(response.chapters[0]);
        setIsFirstQuestion(true);
        const questionRes = response.chapters[0].questions[0];
        setQuestion(questionRes);
        setQuestionIndex(0);
        setAnswer(questionRes.questionUserAnswer?.answer ?? '');
        setQtdCallIASugestionsUsed(questionRes.questionUserAnswer?.qtdCallIASugestionsUsed ?? 0);
        //setChapters(response.chapters)
      })
      .catch((e: any) => {
        let message = "Error ao obter plano, capitulos e perguntas.";
        if (e.response?.data?.length > 0 && e.response.data[0].message)
          message = e.response.data[0].message;
        if (e.response?.data?.detail) message = e.response?.data?.detail;
        console.log("Erro: ", message, e);
      })
      .finally(() => {
        setIsLoading2(false);
      });
  };

  const handleQuestionUserAnswer = (questionId: number) => {
    const questionUserAnswer = questionUserAnswers.find(f => f.questionId == questionId);
    setAnswer(questionUserAnswer?.answer ?? '');
    setQtdCallIASugestionsUsed(questionUserAnswer?.qtdCallIASugestionsUsed ?? 0);
  };

  const handleIASuggestionClick = () => {
    if (answer.length == 0) {
      toast.error('Digite sua resposta para consultar!', {
        position: 'top-center',
        style: { width: 450 }
      });
      return;
    }

    if (answer.length < question.minLimitCharacters) {
      toast.error(`Resposta deve conter no mínimo ${question.minLimitCharacters} caracteres!`, {
        position: 'top-center',
        style: { width: 450 }
      });
      return;
    }

    if (qtdCallIASugestionsUsed === plan.maxQtdCallIASugestions) {
      toast.error('Você não possui mais sugestões de texto do IAutor!', {
        position: 'top-center',
        style: { width: 450 }
      });
      return;
    }

    setIsIAModalOpen(true);
    setIAText('');
    postIASugestion();
  };

  const postIASugestion = async () => {
    setIsLoading1(true);
    await _iaService
      .post({
        question: question.title,
        questionAnswer: answer,
        theme,
        maxCaracters: question.maxLimitCharacters
      })
      .then((response: any) => {
        setIAText(response.text);
        const qtd = qtdCallIASugestionsUsed + 1
        setQtdCallIASugestionsUsed(qtd);
        saveQuestionAnswer(undefined, qtd, false);
      })
      .catch((e) => {
        let message = 'Error ao obter dados de participante.';
        if (e.response?.data?.length > 0 && e.response.data[0].message) message = e.response.data[0].message;
        if (e.response?.data?.detail) message = e.response?.data?.detail;
        console.log('Erro: ', message, e);
      })
      .finally(() => {
        setIsLoading1(false);
      });
  }

  const handleIAAccept = () => {
    setIsIAModalOpen(false);
    setAnswer(IAText);
    saveQuestionAnswer(IAText);
  };

  const handleChapterClick = (id: number, fromBeforeClick: boolean = false) => {
    setAnswerChanged(false);

    const chapterC = plan.chapters!.find(f => f.id == id);
    setChapter(chapterC!);

    const questionsLength = chapterC!.questions!.length;
    const questionC = fromBeforeClick ? chapterC!.questions![questionsLength-1] : chapterC!.questions![0];
    setQuestion(questionC);
    const questionCIndex = fromBeforeClick ? questionsLength-1 : 0;
    setQuestionIndex(questionCIndex);
    handleQuestionUserAnswer(questionC.id);

    const chapterIndex = plan.chapters!.findIndex(f => f.id == id);
    setIsFirstQuestion(chapterIndex == 0 && questionCIndex == 0);
  };

  const handleBeforeQuestionClick = () => {
    setIsLastQuestion(false);
    setAnswerChanged(false);

    const isFirstQuestionB = questionIndex == 0;
    const chapterIndex = plan.chapters!.findIndex(f => f.id == chapter.id);
    const isFirstChapter = chapterIndex == 0;

    if (isFirstQuestionB && isFirstChapter) {
      setIsFirstQuestion(true);
      return;
    }

    if (isFirstQuestionB) {
      handleChapterClick(plan.chapters![chapterIndex - 1].id, true);
      return;
    }

    const questionB = chapter.questions![questionIndex - 1];
    setQuestion(questionB)
    setQuestionIndex(questionIndex - 1);
    handleQuestionUserAnswer(questionB.id);
  };

  const handleNextQuestionClick = () => {
    if (answerChanged) {
      saveQuestionAnswer();
    }

    setIsFirstQuestion(false);
    setAnswerChanged(false);

    const isLastQuestionN = questionIndex + 1 == chapter.questions!.length;
    const chapterIndex = plan.chapters!.findIndex(f => f.id == chapter.id);
    const isLastChapter = chapterIndex + 1 == plan.chapters!.length;

    if (isLastQuestionN && isLastChapter)
    {
      setIsLastQuestion(true);
      //finalizado
      return;
    }

    if (isLastQuestionN) {
      handleChapterClick(plan.chapters![chapterIndex + 1].id);
      return;
    }

    const questionN = chapter.questions![questionIndex + 1];
    setQuestion(questionN)
    setQuestionIndex(questionIndex + 1);
    handleQuestionUserAnswer(questionN.id);
  };

  useEffect(() => {
    if (!answerChanged) return; // Não faz nada se `answerChanged` for falso.

    const handler = setTimeout(() => {
      saveQuestionAnswer(undefined, undefined, true);
      setAnswerChanged(false); // Marca como salvo.
    }, 10000); // Aguarda 10 segundos após a última digitação.

    // Limpa o temporizador se o usuário continuar digitando.
    return () => clearTimeout(handler);
  }, [answerChanged, answer]);

  const updateUserAnsewers = () => {
    setPhotoUploadModalOpen(false)
    window.location.reload();
  }

  const saveQuestionAnswer = async (txt?: string, qtd?: number, fromAutomatic: boolean = false) => {
    if (answer.length == 0) {
      if (!fromAutomatic) {
        toast.error('Digite sua resposta para consultar!', {
          position: 'top-center',
          style: { width: 450 }
        });
      }
      return;
    }

    if (answer.length < question.minLimitCharacters) {
      if (!fromAutomatic) {
        toast.error(`Resposta deve conter no mínimo ${question.minLimitCharacters} caracteres!`, {
          position: 'top-center',
          style: { width: 450 }
        });
      }
      return;
    }

    const newQuestionUserAnswerModel = new QuestionUserAnswerModel({
      questionId: question.id,
      chapterId: chapter.id,
      userId: book.userId,
      bookId: book.id,
      answer: txt ?? answer,
      qtdCallIASugestionsUsed: qtd ?? qtdCallIASugestionsUsed
    });

    setIsLoadingSaveAnswer(true);
    await _questionService
      .upsertQuestionUserAnswer(newQuestionUserAnswerModel)
      .then(() => {
        const questionUserAnswersFiltered = questionUserAnswers.filter(f => f.questionId != question.id);
        setQuestionUserAnswers([...questionUserAnswersFiltered, newQuestionUserAnswerModel]);
      })
      .catch((e) => {
        let message = 'Error ao obter dados de participante.';
        if (e.response?.data?.length > 0 && e.response.data[0].message) message = e.response.data[0].message;
        if (e.response?.data?.detail) message = e.response?.data?.detail;
        console.log('Erro: ', message, e);
      })
      .finally(() => {
        setIsLoadingSaveAnswer(false);
      });
  }

  return (
    <div className='d-flex'
      style={{ height: '100vh' }}
    >
      <Sidebar navItem='book' />
      <section className='flex-grow-1'>

        <header className='bg-white border-bottom p-3'>
          <div className='row align-items-center justify-content-center'>

            {/* Nav título página */}
            <div className='col-md-4 f-18'>

              <div className='d-flex align-items-center'>
                <div className='fw-bold'>
                  Criar História /
                </div>
                <div className='d-flex bg-primary align-items-center justify-content-center mx-2'
                  style={{ width: '16px', height: '16px', borderRadius: '100%' }}
                >
                  <span className='material-symbols-outlined'
                    style={{ fontSize: '10px', color: 'white', cursor: 'pointer' }}
                    onClick={() => { setIsEditingTitle(true); }}
                  >
                    edit
                  </span>
                </div>
                {/* Input de título para editar */}
                {isEditingTitle ? (
                  <input
                    type='text'
                    value={title}
                    onChange={(e) => { setTitle(e.target.value); }}
                    onBlur={() => {
                      setIsEditingTitle(false);
                      saveBook();
                    }}
                    onKeyDown={(e) => {
                      if (e.key !== 'Enter') return;
                      setIsEditingTitle(false);
                      saveBook();
                    }}
                    autoFocus
                    className='form-control'
                    style={{ width: 'auto' }}
                  />
                ) : (
                  <div>{title}</div>
                )}
              </div>

            </div>

            {/* Nav center */}
            <div className='col-md ms-5'>
              <div className='row align-items-center'>
                <div className='col-auto'>
                  <b className='bg-pink text-primary rounded-5 f-12 px-4 py-1'>
                    Criação
                  </b>
                </div>
                <div className='col-auto f-12'>
                  <FontAwesomeIcon icon={faChevronRight} style={{ color: '#7F7F8B' }} />
                </div>
                <div className='col-auto'>
                  <b className='bg-disabled text-icon rounded-5 f-12 px-4 py-1'>
                    Finalizar
                  </b>
                </div>
              </div>
            </div>

            {/* Nav user */}
            <div className='col-md-5'>
              <div className='row align-items-center justify-content-end'>
                <div className='col-auto'>
                  <a href='#' className='btn btn-outline-secondary disabled rounded-5 f-12 px-4 py-2'
                    style={{ fontWeight: 'bold' }}
                  >
                    Livro Degustação | Tradicional
                  </a>
                </div>
                <div className='col-auto'>
                  <a className='btn bg-secondary text-white rounded-5 f-12 px-4 py-2'
                    style={{ fontWeight: 'bold' }}
                    onClick={() => navigate(paths.HOME_LOGGED)}
                  >
                    Ver Planos
                  </a>
                </div>
                <NavUserOptions />
              </div>
            </div>

          </div>
        </header>

        <main className='main bg-white'>
          <div className='container-fluid'>
            <div className='row'>

              {/* 1 - Capítulos */}
              <div className='col-md-3 border-end p-4'>

                <div className='d-flex align-items-center justify-content-between border-bottom px-4 pb-4'>
                  <b className='f-16'>Capítulos</b>
                  <div className='text-primary fw-bold rounded-5 f-10 px-4 py-1' style={{ border: '1px solid #db3737' }}>
                    {plan.chapters?.length} Capítulo{(plan.chapters?.length ?? 1) > 1 ? 's' : ''}
                  </div>
                </div>

                {isLoading2 && <div className='d-flex justify-content-center align-items-center' style={{ height: '20%', borderRadius: '9px' }}>
                  <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status" />
                </div>}

                {/* Capítulos */}
                {plan.chapters?.map((c, index) => {
                  return (
                    <div key={index}
                      className={`border-bottom p-3 ${chapter.id === c.id ? 'bg-iautor-color' : ''}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => { handleChapterClick(c.id) }}
                    >
                      <div className='f-10'>Capítulo {c.chapterNumber}</div>
                      <b className='f-13'>{c.title}</b>
                      <div className='d-flex align-items-center text-icon f-10'>
                        <span className='material-symbols-outlined'
                          style={{ fontSize: '12px', color: '#db3737', marginRight: '3px' }}
                        >
                          quiz
                        </span>
                        {c.questions?.length} Pergunta{(c.questions?.length ?? 1) > 1 ? 's' : ''}
                      </div>
                    </div>
                  )
                })}

                {/* Img baixo */}
                <div id='img-baixo' className='pb-2 mt-5'>
                  <div className='d-flex justify-content-center'>
                    <img src={imgRandomSrc} style={{ minWidth: '314px', height: '200px', objectFit: 'cover', borderRadius: '5px' }} />
                  </div>
                  <div className='d-flex justify-content-center mt-2 p-2'>
                    <b className='f-16'>Uma História mais Completa</b>
                  </div>
                  <div className='d-flex text-center f-14 px-4'>
                    Formate a escrita, edite a capa e crie histórias com mais detalhes e momentos.
                  </div>
                  {plan && plan.title && plan.title.toLowerCase().includes('degust') &&
                    <div className='d-flex justify-content-center p-4'>
                      <a href='#' className='btn bg-secondary text-white rounded-5 f-12 px-4 py-2 w-50'
                        style={{ fontWeight: 'bold' }}
                      >
                        Ver Planos
                      </a>
                    </div>
                  }
                </div>

              </div>

              {/* 2 - Perguntas */}
              <div className='col-md border-end p-0'>

                <div className='d-flex align-items-center border-bottom px-4 py-3'>
                  <div className='d-flex bg-primary align-items-center justify-content-center'
                    style={{ width: '32px', height: '32px', borderRadius: '100%', marginRight: '15px' }}
                  >
                    <span className='material-symbols-outlined' style={{ fontSize: '16px', color: 'white' }}>quiz</span>
                  </div>
                  <div className='f-14'>
                    <b>Perguntas</b>
                    <div>Responda as perguntas abaixo para criar sua história</div>
                  </div>
                </div>

                {/* Contador de perguntas */}
                {isLoading ?
                  <div className='d-flex justify-content-center align-items-center' style={{ height: '20%', borderRadius: '9px' }}>
                    <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status" />
                  </div> :
                  <>
                    <div className='d-flex align-items-center justify-content-between px-5 pt-5'>
                      <div>
                        <div className='f-14'>Capítulo {chapter.chapterNumber}</div>
                        <b className='f-16'>{chapter.title}</b>
                      </div>
                      <div className='text-primary fw-bold rounded-5 f-10 px-4 py-1'
                        style={{ border: '1px solid #db3737' }}
                      >
                        Pergunta {questionIndex + 1}/{chapter.questions?.length}
                      </div>
                    </div>
                    <div className='d-flex align-items-center justify-content-between px-5 pt-3'>
                      <div>
                        <span className='text-primary'>{questionIndex + 1} - </span>{question.title}
                      </div>
                    </div>
                  </>
                }

                {/* Área resposta */}
                <div className='d-flex px-5 pt-4'>
                  <TextareaAutosize
                    onChange={(e) => {
                      setAnswer(e.target.value);
                      setAnswerChanged(true);
                    }}
                    value={answer}
                    disabled={isLoading}
                    placeholder='Digite sua resposta aqui...'
                    style={{
                      width: '100%',
                      minHeight: '300px',
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #757575',
                    }}
                    minLength={question.minLimitCharacters}
                    maxLength={question.maxLimitCharacters}
                  />
                </div>

                {/* Limite caracter, temas e botão IA */}
                <div className='d-flex align-items-center justify-content-between px-5 py-3'>
                  <span className='text-muted f-14'>{answer.length} / {question.maxLimitCharacters}</span>

                  <div className='d-flex justify-content-center'>

                    <div className='d-flex btn bg-pink text-primary align-items-center justify-content-center rounded-5 me-4'
                      style={{ width: '32px', height: '32px', cursor: 'pointer' }}
                      onClick={() => { setIsHelpModalOpen(true) }}
                    >
                      <span className='material-symbols-outlined' style={{ fontSize: '16px' }}>help</span>
                    </div>

                    <Dropdown drop='up'>
                      <Dropdown.Toggle
                        className="btn bg-pink text-primary d-flex align-items-center justify-content-center rounded-5"
                        style={{ width: '68px', height: '32px' }}
                        id="dropdown-basic"
                      >
                        {theme === 'Tradicional' ?
                          <img className='me-2' src={openBook} style={{ height: '18px', width: '18px' }} />
                          : theme === 'Bibliográfico' ?
                            <img className='me-2' src={life} style={{ height: '18px', width: '18px' }} />
                            : theme === 'Cômico' ?
                              <img className='me-2' src={clownWithHat} style={{ height: '18px', width: '18px' }} />
                              : theme === 'Dramático' ?
                                <img className='me-2' src={theater} style={{ height: '18px', width: '18px' }} />
                                : theme === 'Romântico' ?
                                  <img className='me-2' src={hearts} style={{ height: '18px', width: '18px' }} />
                                  : <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>mood</span>}
                      </Dropdown.Toggle>

                      <Dropdown.Menu className='f-14'>
                        <Dropdown.Item className='d-flex align-items-center' onClick={() => setTheme('Tradicional')}>
                          <img className='me-2' src={openBook} style={{ height: '20px', width: '20px' }} />
                          Tradicional
                        </Dropdown.Item>
                        <Dropdown.Item className='d-flex align-items-center' onClick={() => setTheme('Bibliográfico')}>
                          <img className='me-2' src={life} style={{ height: '20px', width: '20px' }} />
                          Bibliográfico
                        </Dropdown.Item>
                        <Dropdown.Item className='d-flex align-items-center' onClick={() => setTheme('Cômico')}>
                          <img className='me-2' src={clownWithHat} style={{ height: '20px', width: '20px' }} />
                          Cômico
                        </Dropdown.Item>
                        <Dropdown.Item className='d-flex align-items-center' onClick={() => setTheme('Dramático')}>
                          <img className='me-2' src={theater} style={{ height: '20px', width: '20px' }} />
                          Dramático
                        </Dropdown.Item>
                        <Dropdown.Item className='d-flex align-items-center' onClick={() => setTheme('Romântico')}>
                          <img className='me-2' src={hearts} style={{ height: '20px', width: '20px' }} />
                          Romântico
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                  </div>

                  <div className={`d-flex btn bg-pink text-primary align-items-center justify-content-center rounded-5
                    ${(plan.maxQtdCallIASugestions - qtdCallIASugestionsUsed) == 0 ? ' disabled' : ''}`}
                    style={{ height: '32px' }}
                    onClick={handleIASuggestionClick}
                  >
                    <b className='f-12'>Texto sugerido pelo IAutor</b>
                    <img className='ps-1' src={artificialInteligence} />
                  </div>
                </div>

                {/* Botões navegação das perguntas */}
                <div className='d-flex align-items-center justify-content-between px-5 pt-3'>

                  <div className={`d-flex btn bg-disabled text-icon align-items-center justify-content-center rounded-5 p-3
                    ${isFirstQuestion ? ' disabled' : ''}`}
                    style={{ height: '48px', minWidth: '140px' }}
                    onClick={handleBeforeQuestionClick}
                  >
                    <span className='material-symbols-outlined pe-2' style={{ fontSize: '24px' }}>arrow_left_alt</span>
                    <b className='f-16'>Voltar</b>
                  </div>

                  <div className={`d-flex btn bg-white text-black align-items-center justify-content-center rounded-5 ${isLastQuestion ? ' disabled' : ''}`}
                    style={{ border: '1px solid black', padding: '0.7rem' }}
                    onClick={() => { saveQuestionAnswer() }}
                  >
                    {isLoadingSaveAnswer ?
                      <span className="spinner-border spinner-border-sm text-black" role="status" aria-hidden="true"></span> :
                      <span className='material-symbols-outlined' style={{ fontSize: '24px' }}>save</span>
                    }
                  </div>

                  <div className='d-flex btn bg-disabled text-icon align-items-center justify-content-center rounded-5 p-3 bg-black text-white'
                    style={{ height: '48px', minWidth: '140px' }}
                    onClick={() => { handleNextQuestionClick() }}
                  >
                    <b className='f-16'>{isLastQuestion ? 'Finalizar' : 'Avançar'}</b>
                    <span className='material-symbols-outlined ps-2' style={{ fontSize: '24px' }}>arrow_right_alt</span>
                  </div>

                </div>
                <div className='d-flex text-black justify-content-center f-14 pt-2'>Salvar Resposta</div>

              </div>

              {/* 3 - Preview */}
              <div className='col-md bg-iautor-color p-0'>

                <div className='d-flex bg-white justify-content-center px-4 py-3'
                  style={{ borderBottom: '3px solid #db3737' }}
                >
                  <div className='f-14'>Preview do Livro</div>
                </div>

                <div className='d-flex justify-content-center align-items-center bg-white shadow rounded-3 mx-5 my-4 p-4'>
                  <div className='d-flex f-14'>Ferramentas de Edição</div>
                  <div className='d-flex text-icon ps-4'>
                    <span className='material-symbols-outlined px-2'
                      style={{ fontSize: '24px', cursor: 'pointer', color: '#db3737' }}
                      onClick={() => setIsBookPreviewModalOpen(true) }
                      title='Visualizar livro'>
                      auto_stories
                    </span>
                    <span className='material-symbols-outlined px-2'
                      style={{ fontSize: '24px', cursor: 'pointer', color: '#db3737' }}
                      onClick={() => setPhotoUploadModalOpen(true)}
                      title='Inserir/Alterar foto'>
                      add_photo_alternate
                    </span>
                    <span className='material-symbols-outlined px-2'
                      style={{ fontSize: '24px', cursor: 'pointer' }}
                      title='Alterar fonte'>
                      draw
                    </span>
                    <span className='material-symbols-outlined px-2'
                      style={{ fontSize: '24px', cursor: 'pointer' }}
                      title='Download'>
                      file_save
                    </span>
                    <span className='material-symbols-outlined px-2'
                      style={{ fontSize: '24px', cursor: 'pointer' }}
                      title='Presentear'>
                      featured_seasonal_and_gifts
                    </span>
                  </div>
                </div>

                <div className='d-flex justify-content-center pb-4'>
                  {answer.length == 0
                    ? <img src={previewCapaLivro} />
                    : <img src={previewCapaLivroBranca} />
                  }
                  {answer.length > 0 &&
                    <>
                      <div id='chapter' className='d-flex position-absolute text-center f-11'
                        style={{ fontFamily: 'Times New Roman', marginTop: '6vh' }}
                      >
                        Capítulo {chapter.chapterNumber}
                      </div>
                      <div id='title' className='d-flex position-absolute text-center f-18'
                        style={{ fontFamily: 'Times New Roman', marginTop: '8vh' }}
                      >
                        <b>{chapter.title}</b>
                      </div>

                      <div className='d-flex position-absolute f-13'
                        style={{
                          fontFamily: 'Times New Roman', lineHeight: '16px',
                          marginTop: '13vh', marginLeft: '9%', marginRight: '9%'
                        }}
                      >
                        {answer.substring(0, 1400)}
                      </div>
                    </>
                  }
                </div>

              </div>

            </div>
          </div>
        </main>

        <Modal show={isHelpModalOpen} onHide={() => setIsHelpModalOpen(false)} size='lg' centered={true}>
          <Modal.Body className='text-center justify-content-center f-18 p-5'
            style={{
              paddingTop: '3%',
              paddingLeft: '10%',
              paddingRight: '10%'
            }}
          >
            <div className='d-flex justify-content-center'>
              <b className='f-28'>Ajuda</b>
            </div>
            <div className='pt-3'>
              Na resposta, é importante que você seja o mais sincero possível, e conte todos os detalhes que puder se lembrar, aqui vale vale a regra: quanto mais informação, melhor!
            </div>
            <div className='pt-3'>
              Lembre-se não nunca expor informações  intimos e/ou sensíveis que você não gostaria de compartilhar com outras pessoas.
            </div>
            <div className='pt-3'>
              Após finalizar o texto, escolha uma característica que mais se associa à sua resposta (humor, romantico, etc), e utilize inteligencia artificial do IAutor para revisa-lo  para você.
            </div>
            <div className='pt-3'>
              Não se preocupe, se não gostar da revisão, você consegue voltar atrás, e fazer novas tentativas.
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={isIAModalOpen} onHide={() => setIsIAModalOpen(false)} size='lg' backdrop="static" keyboard={false}>
          <Modal.Body>
            <div className='d-flex justify-content-center'>
              <b className='f-28'>Texto Sugerido Pelo IAutor</b>
            </div>

            <div className='d-flex justify-content-center f-16'>
              Visualize abaixo o texto sugerido pela IA e o substitua pelo seu.
            </div>

            <div className='d-flex align-items-center justify-content-center mt-3'>
              <div className='d-flex bg-pink text-primary rounded-5 px-4 py-2'>
                <b className='f-12'>Você ainda possui {plan.maxQtdCallIASugestions - qtdCallIASugestionsUsed} sugestões de texto</b>
                <img className='ps-1' src={artificialInteligence} />
              </div>
            </div>

            <div className='px-4 pt-1'>
              <div className='d-flex text-icon'>
                <b className='f-12 ms-2'>Texto Escrito pelo Autor</b>
              </div>

              <div className='d-flex'>
                <TextareaAutosize
                  onChange={(e) => { setAnswer(e.target.value) }}
                  name='questionAnswer'
                  value={answer}
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    minHeight: '230px',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #757575',
                  }}
                />
              </div>

              <div className='d-flex text-primary mt-2'>
                <b className='f-12 ms-2 me-1'>Texto Sugerido pelo IAutor</b>
                <img src={artificialInteligence} />
              </div>

              {isLoading ? (
                <div className='d-flex justify-content-center align-items-center' style={{ height: '100%', borderRadius: '9px' }}>
                  <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status" />
                </div>
              ) : (
                <div className='d-flex'>
                  <TextareaAutosize
                    onChange={(e) => { setIAText(e.target.value) }}
                    name='IAText'
                    value={IAText}
                    style={{
                      width: '100%',
                      minHeight: '280px',
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #757575',
                    }}
                  />
                </div>
              )
              }
            </div>
          </Modal.Body>
          <Modal.Footer className='justify-content-center border-0'>
            <button className="btn btn-primary text-white rounded-5 f-14 px-5 py-2 me-2"
              onClick={() => setIsIAModalOpen(false)}
              disabled={isLoading}
            >
              Recusar
            </button>
            <button className="btn btn-secondary text-white rounded-5 f-14 px-5 py-2"
              onClick={handleIAAccept}
              disabled={isLoading}
            >
              Aceitar
            </button>
          </Modal.Footer>
        </Modal>

        <ModalResponsive open={isBookPreviewModalOpen} closeIcon={closeIcon} center
          classNames={{ overlay: 'customOverlay', modal: 'customModal' }}
          onClose={() => setIsBookPreviewModalOpen(false)}
        >
          <BookViewer book={book} plan={plan} questionAnsewers={questionUserAnswers} />
        </ModalResponsive>

        <Modal show={isPhotoUploadModalOpen} onHide={() => setPhotoUploadModalOpen(false)} size='lg' backdrop="static" keyboard={false}>
          <ModalHeader closeButton><span className='text-primary'><strong>Upload de fotos - Capitulo {chapter.chapterNumber}</strong></span></ModalHeader>
          <Modal.Body>
            <UploadPhotosContainer closeModal={() => { updateUserAnsewers() }} book={book} questionAnsewers={questionUserAnswers} plan={plan} question={question} />
          </Modal.Body>
        </Modal>

      </section>
    </div>
  );
};

export default NewHistory;
