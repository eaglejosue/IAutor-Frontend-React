import SearchInput from "../../../components/forms/searchInput/searchInput";
import CustomButton from "../../../components/forms/customButton/customButton";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from 'react-toastify';
import { QuestionService } from "../../../common/http/api/questionService";
import { QuestionModel } from "../../../common/models/question.model";
import { QuestionFilter } from "../../../common/models/filters/question.filter";
import QuestionTable, { QuestionMode } from "./question.table";
import QuestionForm from "./question.component";
import NavUserOptions from "../../../components/nav/nav-user-options.component";

const Questions = () => {
  const _questionService = new QuestionService();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isExitConfirmationModalOpen, setIsExitConfirmationModalOpen] = useState(false);
  const [questions, setQuestions] = useState<QuestionModel[]>([]);
  const [questionEdit, setQuestionEdit] = useState<QuestionModel>();
  const [questionDeleteId, setQuestionDeleteId] = useState<number>(0);

  const [inactivationModalOpen, setInactivationModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = (filter?: QuestionFilter) => {
    setIsLoading(true);
    _questionService
      .getAll(filter ?? new QuestionFilter())
      .then((response: any) => {
        setQuestions(response?.length ? response : []);
      })
      .catch((e: any) => {
        let message = "Error ao obter capitulos.";
        if (e.response?.data?.length > 0 && e.response.data[0].message)
          message = e.response.data[0].message;
        if (e.response?.data?.detail) message = e.response?.data?.detail;
        console.log("Erro: ", message, e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSearchClick = () => {
    getQuestions(
      new QuestionFilter({
        title: searchTerm,
      }),
    );
  };

  const handleAddClick = () => {
    setQuestionEdit(undefined);
    setIsFormModalOpen(true);
  };

  const handleCloseModal = (c: boolean = true) => {
    if (c) setIsExitConfirmationModalOpen(true);
    else handleExitConfirm();
  };

  const handleExitCancel = () => {
    setIsExitConfirmationModalOpen(false);
  };

  const handleExitConfirm = () => {
    setIsFormModalOpen(false);
    setIsExitConfirmationModalOpen(false);
  };

  const handlerEdit = (question: QuestionModel) => {
    setQuestionEdit(question);
    setIsFormModalOpen(true);
  };

  const handlerDeleteCancel = () => {
    setInactivationModalOpen(false);
  };

  const handlerDelete = (id: number) => {
    setInactivationModalOpen(true);
    setQuestionDeleteId(id)
  }

  const handlerDeleteCancelConfirm = () => {
    setIsLoading(true);

    _questionService
      .delete(questionDeleteId)
      .then(() => {
        toast.success('Capitulo inativado com sucesso!', {
          position: 'top-center',
          style: { minWidth: 400 }
        });
      })
      .catch((e) => {
        let message = 'Error ao salvar dados.';
        if (e.response?.data?.length > 0 && e.response.data[0].message) message = e.response.data[0].message;
        if (e.response?.data?.detail) message = e.response?.data?.detail;
        toast.error(message, {
          position: 'top-center',
          style: { minWidth: 400 }
        });
      })
      .finally(() => {
        setIsLoading(false);
      });

    setInactivationModalOpen(false);
  }


  return (
    <>
      <NavUserOptions />

      <main
        className="main bg-iautorpb-4"
        style={{ minHeight: "676px", flex: 1 }}
      >
        <section className="container" id="title">
          <div className="row">
            <p className="mt-4 p-0 f-12">
              <span className="fw-bold">Home/ </span>Perguntas
            </p>
            <h1 className="mt-0 p-0">Perguntas</h1>
          </div>
        </section>
        <section className="container border-top" id="filter">
          <div className="row my-4">
            <div
              className="col-8 col-md-3 col-sm-6"
              style={{ paddingLeft: "0" }}
            >
              <SearchInput
                placeholder="Buscar pergunta"
                onChange={(e) => setSearchTerm(e)}
                onEnter={handleSearchClick}
              />
            </div>
            <div className="col-auto me-auto">
              <CustomButton onClick={handleSearchClick} disabled={isLoading} />
            </div>
            <div className="col-auto" style={{ paddingRight: "0" }}>
              <CustomButton
                onClick={handleAddClick}
                disabled={isLoading}
                text="Novo"
                materialText="add"
              />
            </div>
          </div>
        </section>

        <section className="container mt-3 px-0" id="table-perfis">
          <QuestionTable
            data={questions}
            isLoading={isLoading}
            handlerEdit={handlerEdit}
            handlerDelete={handlerDelete}
            mode={QuestionMode.registerQuestion} addItemsPlan={()=>{}}            
          />
        </section>

        <Modal show={isFormModalOpen} onHide={() => handleCloseModal(false)} centered size="lg" backdrop="static">
          <Modal.Header closeButton className="bg-white border-0 pb-0">
            <Modal.Title>
              {questionEdit == undefined ? "Criar nova pergunta" : "Editar pergunta"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-white pt-0">
            <QuestionForm  question={questionEdit} handleClose={(c) => handleCloseModal(c)} confirmaSalvar={function (): void | null {
              throw new Error("Function not implemented.");
            } } />
          </Modal.Body>
        </Modal>

        <Modal show={inactivationModalOpen} onHide={() => setInactivationModalOpen(false)} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Inativação</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Você tem certeza que deseja inativar esta pergunta?</p>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn border-1 rounded-5 f-14 px-4 py-2"
              style={{ border: '1px solid #dee2e6' }}
              onClick={handlerDeleteCancel}>
              Não
            </button>
            <button
               className="btn btn-primary text-white rounded-5 f-14 px-4 py-2"
              onClick={handlerDeleteCancelConfirm}>
              Sim
            </button>
          </Modal.Footer>
        </Modal>

        <Modal show={isExitConfirmationModalOpen} onHide={() => setIsExitConfirmationModalOpen(false)} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Saída</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <p className='mb-1'>Você tem certeza que deseja sair?</p>
            <p className='mb-1'>Todas as alterações não salvas serão perdidas.</p>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn border-1 rounded-5 f-14 px-4 py-2"
              style={{ border: '1px solid #dee2e6' }}
              onClick={handleExitCancel}>
              Não
            </button>
            <button
              className="btn btn-primary text-white rounded-5 f-14 px-4 py-2"
              onClick={handleExitConfirm}>
              Sim
            </button>
          </Modal.Footer>
        </Modal>
      </main>
    </>
  );
};

export default Questions;
