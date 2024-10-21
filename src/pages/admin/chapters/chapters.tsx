import SearchInput from "../../../components/forms/searchInput/searchInput";
import Nav from "../../../components/nav/nav.component";
import CustomButton from "../../../components/forms/customButton/customButton";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ChapterForm from "./chapter.component";
import { ChapterFilter } from "../../../common/models/filters/chapter.filter";
import { ChapterService } from "../../../common/http/api/chapterService";
import { ChapterModel } from "../../../common/models/chapter.model";
import ChapterTable from "./chapters.table";
import { toast } from 'react-toastify';

const Chapters = () => {
  const _chapterService = new ChapterService();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isExitConfirmationModalOpen, setIsExitConfirmationModalOpen] = useState(false);
  const [chapters, setChapters] = useState<ChapterModel[]>([]);
  const [chapterEdit, setChapterEdit] = useState<ChapterModel>();
  const [chapterDeleteId, setChapterDeleteId] = useState<number>(0);

  const [inactivationModalOpen, setInactivationModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    getChapters();
  }, []);

  const getChapters = (filter?: ChapterFilter) => {
    setIsLoading(true);
    _chapterService
      .getAll(filter ?? new ChapterFilter())
      .then((response: any) => {
        setChapters(response?.length ? response : []);
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
    getChapters(
      new ChapterFilter({
        title: searchTerm,
      }),
    );
  };

  const handleAddClick = () => {
    setChapterEdit(undefined);
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

  const handlerEdit = (chapter: ChapterModel) => {
    setChapterEdit(chapter);
    setIsFormModalOpen(true);
  };

  const handlerDeleteCancel = () => {
    setInactivationModalOpen(false);
  };

  const handlerDelete = (id: number) => {
    setInactivationModalOpen(true);
    setChapterDeleteId(id)
  }

  const handlerDeleteCancelConfirm = () => {
    setIsLoading(true);

    _chapterService
      .delete(chapterDeleteId)
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
      <Nav />
      <main
        className="main bg-iautorpb-4"
        style={{ minHeight: "676px", flex: 1 }}
      >
        <section className="container" id="title">
          <div className="row">
            <p className="mt-4 p-0 f-12">
              <span className="fw-bold">Home/ </span>Capítulos
            </p>
            <h1 className="mt-0 p-0">Capítulos</h1>
          </div>
        </section>
        <section className="container border-top" id="filter">
          <div className="row my-4">
            <div
              className="col-8 col-md-3 col-sm-6"
              style={{ paddingLeft: "0" }}
            >
              <SearchInput
                placeholder="Buscar Capítulo"
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
          <ChapterTable
            data={chapters}
            isLoading={isLoading}
            handlerEdit={handlerEdit}
            handlerDelete={handlerDelete}
          />
        </section>

        <Modal show={isFormModalOpen} onHide={() => handleCloseModal(false)} centered size="lg" backdrop="static">
          <Modal.Header closeButton className="bg-white border-0 pb-0">
            <Modal.Title>
              {chapterEdit == undefined ? "Criar novo capítulo" : "Editar capítulo"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-white pt-0">
            <ChapterForm chapter={chapterEdit} handleClose={(c) => handleCloseModal(c)}  />
          </Modal.Body>
        </Modal>

        <Modal show={inactivationModalOpen} onHide={() => setInactivationModalOpen(false)} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Inativação</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Você tem certeza que deseja inativar este capítulo?</p>
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

export default Chapters;
