import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import Dropdown from 'react-bootstrap/Dropdown';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { AuthenticatedUserModel } from '../../common/models/authenticated.model';
import Sidebar from '../../components/nav/sidebar.component';
import NavUserOptions from '../../components/nav/nav-user-options.component';
import { IAService } from '../../common/http/api/iaService';
import { PlanService } from '../../common/http/api/planService';
import { QuestionService } from '../../common/http/api/questionService';
//import { BookModel } from '../../common/models/book.model';
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

const NewHistory = () => {
  const navigate = useNavigate();
  const [imgRandomSrc, setImgRandomSrc] = useState('1');
  //const [book, setBook] = useState<BookModel>(new BookModel({title: 'Título História'}));
  const _iaService = new IAService();
  const _planService = new PlanService();
  const _questionService = new QuestionService();
  const [plan, setUserPlan] = useState<PlanModel>(new PlanModel())
  const [isLoading1, setIsLoading1] = useState<boolean>(false);
  const [isLoading2, setIsLoading2] = useState<boolean>(false);
  const isLoading = isLoading1 || isLoading2;
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState('Título História');
  const [theme, setTheme] = useState('');
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isIAModalOpen, setIsIAModalOpen] = useState(false);
  const [isBookPreviewModalOpen, setIsBookPreviewModalOpen] = useState(false);
  const [chapter, setChapter] = useState(new ChapterModel());
  const [question, setQuestion] = useState(new QuestionModel());
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isFirstQuestion, setIsFirstQuestion] = useState(true);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [qtdCallIASugestionsUsed, setQtdCallIASugestionsUsed] = useState(0);
  const [questionAnswer, setQuestionAnswer] = useState('');
  const [IAText, setIAText] = useState('');
  const [bookText, setBookText] = useState('');
  // const [bookText, setBookText] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac ultricies lorem. Mauris pulvinar, neque vitae fringilla pharetra, nunc  nibh viverra ipsum, eget viverra metus augue eget nulla. Maecenas tempus imperdiet nisl ac ullamcorper. Class aptent taciti sociosqu ad litora  torquent per conubia nostra, per inceptos himenaeos. Aenean blandit  malesuada velit sit amet maximus. Donec euismod, urna vitae porta  laoreet, est elit viverra est, lobortis congue est massa ut dolor. Donec non dignissim enim.'+
  // ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac ultricies lorem. Mauris pulvinar, neque vitae fringilla pharetra, nunc  nibh viverra ipsum, eget viverra metus augue eget nulla. Maecenas tempus imperdiet nisl ac ullamcorper. Class aptent taciti sociosqu ad litora  torquent per conubia nostra, per inceptos himenaeos. Aenean blandit  malesuada velit sit amet maximus. Donec euismod, urna vitae porta  laoreet, est elit viverra est, lobortis congue est massa ut dolor. Donec non dignissim enim.'+
  // ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac ultricies lorem. Mauris pulvinar, neque vitae fringilla pharetra, nunc  nibh viverra ipsum, eget viverra metus augue eget nulla. Maecenas tempus imperdiet nisl ac ullamcorper. Class aptent taciti sociosqu ad litora  torquent per conubia nostra, per inceptos himenaeos. Aenean blandit  malesuada velit sit amet maximus. Donec euismod, urna vitae porta  laoreet, est elit viverra est, lobortis congue est massa ut dolor. Donec non dignissim enim.'+
  // ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac ultricies lorem. Mauris pulvinar, neque vitae fringilla pharetra, nunc  nibh viverra ipsum, eget viverra metus augue eget nulla. Maecenas tempus imperdiet nisl ac ullamcorper. Class aptent taciti sociosqu ad litora  torquent per conubia nostra, per inceptos himenaeos. Aenean blandit  malesuada velit sit amet maximus. Donec euismod, urna vitae porta  laoreet, est elit viverra est, lobortis congue est massa ut dolor. Donec non dignissim enim.');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 16);// Gera um número entre 0 e 15
    setImgRandomSrc(horizontalImgs[randomIndex]);
    getPlan();
  }, []);

  const getPlan = () => {
    setIsLoading1(true);
    const user = AuthenticatedUserModel.fromLocalStorage();
    _planService
      .getChaptersAndQuestionsByPlanId(user?.planId ?? 4)
      .then((response: any) => {
        setUserPlan(response);
        setChapter(response.chapters[0]);
        setIsFirstQuestion(true);
        const questionRes = response.chapters[0].questions[0];
        setQuestion(questionRes);
        setQuestionIndex(0);
        setQuestionAnswer(questionRes.questionUserAnswer?.answer ?? '');
        setQtdCallIASugestionsUsed(questionRes.questionUserAnswer.qtdCallIASugestionsUsed);
      })
      .catch((e: any) => {
        let message = "Error ao obter plano.";
        if (e.response?.data?.length > 0 && e.response.data[0].message)
          message = e.response.data[0].message;
        if (e.response?.data?.detail) message = e.response?.data?.detail;
        console.log("Erro: ", message, e);
      })
      .finally(() => {
        setIsLoading1(false);
      });
  };

  const handleChapterClick = (c: ChapterModel) => {
    setChapter(c);
    const questionC = c.questions![0];
    setQuestion(questionC);
    setQuestionIndex(0);
    setQuestionAnswer(questionC.questionUserAnswer?.answer ?? '');
    setQtdCallIASugestionsUsed(questionC.questionUserAnswer.qtdCallIASugestionsUsed);

    const chapterIndex = plan.chapters!.findIndex(f => f.id == c.id);
    setIsFirstQuestion(chapterIndex === 0);
  };

  const handleSuggestionClick = () => {
    if (questionAnswer.length === 0) {
      toast.error('Digite sua resposta para consultar!', {
        position: 'top-center',
        style: { width: 450 }
      });
      return;
    }

    if (questionAnswer.length < question.minLimitCharacters) {
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
    postIASugestion();
  };

  const postIASugestion = () => {
    setIsLoading2(true);
    _iaService
      .post({
        question: question.title,
        questionAnswer,
        theme,
        maxCaracters: question.maxLimitCharacters
      })
      .then((response: any) => {
        setIAText(response.text);
        setQtdCallIASugestionsUsed(qtdCallIASugestionsUsed+1);
        saveQuestionAnswer();
      })
      .catch((e) => {
        let message = 'Error ao obter dados de participante.';
        if (e.response?.data?.length > 0 && e.response.data[0].message) message = e.response.data[0].message;
        if (e.response?.data?.detail) message = e.response?.data?.detail;
        console.log('Erro: ', message, e);
      })
      .finally(() => {
        setIsLoading2(false);
      });
  }

  const handleIAAccept = () => {
    setIsIAModalOpen(false);
    setBookText(IAText);
    setQuestionAnswer(IAText);
    saveQuestionAnswer();
  };

  const handleBeforeQuestionClick = () => {
    setIsLastQuestion(false);

    const isFirstQuestion = questionIndex == 0;
    const chapterIndex = plan.chapters!.findIndex(f => f.id == chapter.id);
    const isFirstChapter = chapterIndex == 0;

    if (isFirstQuestion && isFirstChapter) {
      setIsFirstQuestion(true);
      return;
    }

    if (isFirstQuestion) {
      handleChapterClick(plan.chapters![chapterIndex - 1]);
      return;
    }

    const questionB = chapter.questions![questionIndex - 1];
    setQuestion(questionB)
    setQuestionIndex(questionIndex - 1);
    setQuestionAnswer(questionB.questionUserAnswer?.answer ?? '');
    setQtdCallIASugestionsUsed(questionB.questionUserAnswer.qtdCallIASugestionsUsed);
  };

  const handleNextQuestionClick = (save: boolean = false) => {
    setIsFirstQuestion(false);

    if (save && questionAnswer.length > 0) {
      saveQuestionAnswer();
    }

    const isLastQuestion = questionIndex + 1 == chapter.questions!.length;
    const chapterIndex = plan.chapters!.findIndex(f => f.id == chapter.id);
    const isLastChapter = chapterIndex + 1 == plan.chapters!.length;

    if (isLastQuestion && isLastChapter)
    {
      setIsLastQuestion(true);
      //finalizado
      return;
    }

    if (isLastQuestion) {
      handleChapterClick(plan.chapters![chapterIndex + 1]);
      return;
    }

    const questionN = chapter.questions![questionIndex + 1];
    setQuestion(questionN)
    setQuestionIndex(questionIndex + 1);
    setQuestionAnswer(questionN.questionUserAnswer?.answer ?? '');
    setQtdCallIASugestionsUsed(questionN.questionUserAnswer.qtdCallIASugestionsUsed);
  };

  const saveQuestionAnswer = () => {
    setIsLoading2(true);
    const user = AuthenticatedUserModel.fromLocalStorage();
    _questionService
      .upsertQuestionUserAnswer(new QuestionUserAnswerModel({
        ...question.questionUserAnswer,
        questionId: question.id,
        userId: user!.id,
        bookId: user!.id,
        answer: questionAnswer,
        qtdCallIASugestionsUsed
      }))
      .then(() => {
        //
      })
      .catch((e) => {
        let message = 'Error ao obter dados de participante.';
        if (e.response?.data?.length > 0 && e.response.data[0].message) message = e.response.data[0].message;
        if (e.response?.data?.detail) message = e.response?.data?.detail;
        console.log('Erro: ', message, e);
      })
      .finally(() => {
        setIsLoading2(false);
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
                    onBlur={() => { setIsEditingTitle(false); }}
                    onKeyDown={(e) => { e.key === 'Enter' && setIsEditingTitle(false); }}
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

                {isLoading1 && <div className='d-flex justify-content-center align-items-center' style={{ height: '20%', borderRadius: '9px' }}>
                  <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                    <span className="sr-only">Carregando...</span>
                  </div>
                </div>}

                {/* Capítulos */}
                {plan.chapters?.map((c, index) => {
                  return (
                    <div key={index}
                      className={`border-bottom p-3 ${chapter.id === c.id ? 'bg-iautor' : ''}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => { handleChapterClick(c) }}
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
                    <img src={imgRandomSrc} style={{ width: '380px', height: '250px', objectFit: 'cover', borderRadius: '5px' }} />
                  </div>
                  <div className='d-flex justify-content-center mt-2 p-2'>
                    <b className='f-16'>Uma História mais Completa</b>
                  </div>
                  <div className='d-flex text-center f-14 px-4'>
                    Formate a escrita, edite a capa e crie histórias com mais detalhes e momentos.
                  </div>
                  <div className='d-flex justify-content-center p-4'>
                    <a href='#' className='btn bg-secondary text-white rounded-5 f-12 px-4 py-2 w-50'
                      style={{ fontWeight: 'bold' }}
                    >
                      Ver Planos
                    </a>
                  </div>
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
                {isLoading1 ?
                  <div className='d-flex justify-content-center align-items-center' style={{ height: '20%', borderRadius: '9px' }}>
                    <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                      <span className="sr-only">Carregando...</span>
                    </div>
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
                    onChange={(e) => { setQuestionAnswer(e.target.value) }}
                    value={questionAnswer}
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
                  <span className='text-muted f-14'>{questionAnswer.length} / {question.maxLimitCharacters}</span>

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
                    onClick={handleSuggestionClick}
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

                  <div className={`d-flex btn bg-disabled text-icon align-items-center justify-content-center rounded-5 p-3
                    ${isLastQuestion ? ' disabled' : ''}`}
                    onClick={() => { handleNextQuestionClick(false) }}
                  >
                    <span className='material-symbols-outlined' style={{ fontSize: '24px' }}>swipe_right</span>
                  </div>

                  <div className={`d-flex btn bg-disabled text-icon align-items-center justify-content-center rounded-5 p-3
                    ${questionAnswer.length > 0 ? ' bg-black text-white' : ' bg-disabled text-icon'}`}
                    style={{ height: '48px', minWidth: '140px' }}
                    onClick={() => { handleNextQuestionClick(true) }}
                  >
                    <b className='f-16'>Salvar</b>
                    <span className='material-symbols-outlined ps-2' style={{ fontSize: '24px' }}>play_lesson</span>
                  </div>
                </div>
                <div className='d-flex text-icon justify-content-center f-14 pt-2'>Pular Pergunta</div>

              </div>

              {/* 3 - Preview */}
              <div className='col-md bg-iautor p-0'>

                <div className='d-flex bg-white justify-content-center px-4 py-3'
                  style={{ borderBottom: '3px solid #db3737' }}
                >
                  <div className='f-14'>Preview do Livro</div>
                </div>

                <div className='d-flex bg-white shadow rounded-3 align-items-center mx-5 my-4 p-4'>
                  <div className='d-flex f-14 px-5'>Ferramentas de Edição</div>
                  <div className='d-flex text-icon ps-4'>
                    {/* add icons */}
                    <span className='material-symbols-outlined px-2' style={{ fontSize: '24px', cursor: 'pointer' }} title='Inserir foto'>add_photo_alternate</span>
                    <span className='material-symbols-outlined px-2' style={{ fontSize: '24px', cursor: 'pointer' }} title='Editar fonte'>draw</span>
                    <span className='material-symbols-outlined px-2' style={{ fontSize: '24px', cursor: 'pointer', color: '#db3737' }}
                      onClick={() => { setIsBookPreviewModalOpen(true) }}
                      title='Visualizar livro'
                    >
                      auto_stories
                    </span>
                    <span className='material-symbols-outlined px-2' style={{ fontSize: '24px', cursor: 'pointer' }} title='Download'>file_save</span>
                    <span className='material-symbols-outlined px-2 pe-4' style={{ fontSize: '24px', cursor: 'pointer' }} title='Presentear'>featured_seasonal_and_gifts</span>
                  </div>
                </div>

                <div className='d-flex justify-content-center pb-4'>
                  {bookText.length === 0
                    ? <img src={previewCapaLivro} />
                    : <img src={previewCapaLivroBranca} />
                  }
                  {bookText.length > 0 &&
                    <div className='d-flex position-absolute f-10'
                      style={{
                        paddingTop: '2%',
                        paddingLeft: '9%',
                        paddingRight: '9%',
                        fontFamily: 'Times New Roman',
                        fontSize: '13px',
                        lineHeight: '16px'
                      }}
                    >
                      {bookText}
                    </div>
                  }
                </div>

              </div>

            </div>
          </div>
        </main>

        <Modal show={isHelpModalOpen} onHide={() => setIsHelpModalOpen(false)} centered={true}>
          <Modal.Body>
            ?
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
                  onChange={(e) => { setQuestionAnswer(e.target.value) }}
                  name='questionAnswer'
                  value={questionAnswer}
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
                  <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                    <span className="sr-only">Carregando...</span>
                  </div>
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

        <Modal show={isBookPreviewModalOpen} onHide={() => setIsBookPreviewModalOpen(false)} size='xl'>
          <Modal.Body className='justify-content-center f-20'
            style={{
              paddingTop: '3%',
              paddingLeft: '10%',
              paddingRight: '10%'
            }}
          >
            <div className='d-flex justify-content-center'>
              Capítulo {chapter.chapterNumber}
            </div>
            <div className='d-flex justify-content-center'>
              <b className='f-28'>{chapter.title}</b>
            </div>
            <div className='pt-3'>
              {bookText}
            </div>
          </Modal.Body>
        </Modal>

      </section>
    </div>
  );
};

export default NewHistory;
