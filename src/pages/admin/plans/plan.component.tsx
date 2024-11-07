import { FunctionComponent, useEffect, useState } from "react";
import CustomInput from "../../../components/forms/customInput/customInput";
import Spinners from '../../../assets/svg/SvgSpinners180Ring.svg';
import { useForm } from "react-hook-form";
import { Divider } from "antd";
import { Accordion, Table, Button, Modal } from "react-bootstrap";
import { faAdd, faRemove } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isDate } from "date-fns";
import { ChapterFilter } from "../../../common/models/filters/chapter.filter";
import { ChapterService } from "../../../common/http/api/chapterService";
import { ChapterModel } from "../../../common/models/chapter.model";
import { QuestionFilter } from "../../../common/models/filters/question.filter";
import { QuestionService } from "../../../common/http/api/questionService";
import { QuestionModel } from "../../../common/models/question.model";
import ChapterTable, { ChapterMode } from "../chapters/chapters.table";
import QuestionTable, { QuestionMode } from "../questions/question.table";
import SearchInput from "../../../components/forms/searchInput/searchInput";
import CustomButton from "../../../components/forms/customButton/customButton";
import { ChapterQuestions, PlanModel, PlanModelChapterQuestions } from "../../../common/models/plan.model";
import { toast } from 'react-toastify';
import { PlanService } from "../../../common/http/api/planService";
import { PlanChapterService } from "../../../common/http/api/planChapterService";

interface PlanFormProps {
  handleModal(isOpen: boolean): void
  planEdit: PlanModel
}

interface PlanChapterQuestion {
  ChapterId: number | undefined;
  Questions: [QuestionModel]
}

const PlanForm = (props: PlanFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [duplicateModalOpen, setDuplicateModalOpen] = useState<boolean>(false);
  const [chapters, setChapters] = useState<ChapterModel[]>([]);
  const [chaptersSelected, setChaptersSelected] = useState<ChapterModel | null>(null);
  const [chaptersPlan, setChaptersPlan] = useState<ChapterModel[]>([]);
  const [perguntaTemaSearch, setSearchPerguntaTema] = useState('')
  const [isFormModalOpenPergunta, setIsFormModalOpenPergunta] = useState<boolean>(false);
  const _chapterService = new ChapterService();
  const [isFormModalOpenCapitulo, SetFormModalOpenCapitulo] = useState<boolean>(false);
  const _questionService = new QuestionService();
  const [questions, setQuestions] = useState<QuestionModel[]>([]);
  const [planChapterQuestion, setPlanChapterQuestion] = useState<PlanChapterQuestion[]>([]);
  const _planService = new PlanService();
  const _planChapterService = new PlanChapterService();

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Abre/fecha modal de capitulo
  const handleCloseModalCapitulo = (isClose: boolean) => {
    SetFormModalOpenCapitulo(isClose)
  }

  //carregar o plano
  useEffect(() => {
    if (props.planEdit) {
      setValue('title', props.planEdit?.title);
      setValue('price', props.planEdit?.price);
      setValue('currency', props.planEdit?.currency);
      setValue('maxLimitSendDataIA', props.planEdit?.maxLimitSendDataIA);
      setValue('initialValidityPeriod', props.planEdit?.initialValidityPeriod.toString().split('T')[0]);
      setValue('finalValidityPeriod', props.planEdit?.finalValidityPeriod.toString().split('T')[0]);
      setValue('caractersLimitFactor', props.planEdit?.caractersLimitFactor);

      setIsLoading(true);
      _planChapterService
        .getById(props.planEdit.id)
        .then((response: any) => {
          //console.log(response)
          if (response?.length) {
            //setChaptersPlan()
            let planChapterList: PlanChapterQuestion[] = []
            var chapters = response.map((r: any) => {
              let chapter = r.chapter;
              chapter.selected = true;
              var questions = r.planChapterQuestions?.map((question: any) => {
                return question.question
              })
              planChapterList.push({ ChapterId: chapter.id, Questions: questions })
              return chapter
            })
            setPlanChapterQuestion(planChapterList)
            setChaptersPlan(chapters)
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
  }, [])

  //abre fecha/modal de pergunta
  const handleCloseModalPergunta = (isClose: boolean) => {
    setIsFormModalOpenPergunta(isClose)
  };

  const handlerConfirmDuplicate = () => {
    setDuplicateModalOpen(false)
    // handleSubmit(onSubmit)
  }
  //salva form
  //@ts-ignore
  const onSubmit = async (data: any) => {
    let plan = new PlanModel({
      ...data,
      price: Number(data.price.toString().replace("R$", "").replace(",", ".")),
      id: props.planEdit?.id
    });

    //@ts-ignore
    const questionPlan: PlanModelChapterQuestions = { ...plan }
    //@ts-ignore
    var arr: [ChapterQuestions] = [];
    questionPlan.chapterPlanQuestion = arr
    planChapterQuestion.map((r: PlanChapterQuestion) => {
      r.Questions.map((a: QuestionModel) => {
        const chapterQuestion: ChapterQuestions = { chapterId: r.ChapterId, questionId: a.id };
        questionPlan.chapterPlanQuestion.push(chapterQuestion)
      })
    })

    if (questionPlan.id === undefined) {
      _planService
        .post(questionPlan)
        .then(() => {
          toast.success('Plano criado com sucesso!', {
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
          props.handleModal(false)
        });
    } else {
      _planService
        .put(questionPlan)
        .then(() => {
          toast.success('Plano atualizado com sucesso!', {
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
          props.handleModal(false)
        });
    }
    setIsLoading(false)


  }
  //adiciona perguntas ao capitulo
  const handlerAddQuestions = (selected: [QuestionModel]) => {
    //console.log(selected,'perguntas selecionadas no capitulo',chaptersSelected)
    handleCloseModalPergunta(false)
    let oldQuestions = [...planChapterQuestion]
    let planChapterFound = oldQuestions?.find(r => r.ChapterId == chaptersSelected?.id);

    if (planChapterFound) {

      selected.map((r: QuestionModel) => {
        if (planChapterFound?.Questions.find(a => a.id == r.id) == null) {
          planChapterFound.Questions.push(r)
        }
      })

      setPlanChapterQuestion(oldQuestions)
      return;
    }

    let chapterPlanQuestion: PlanChapterQuestion = {
      ChapterId: chaptersSelected?.id,
      Questions: selected,
    };
    setPlanChapterQuestion(prevState => ([...prevState, chapterPlanQuestion]))
  }

  //Adiciona os capitulos no accordion
  const handlerCheckChapterCapitulo = (item: ChapterModel, checked: boolean) => {
    item.selected = checked;
    if (checked)
      if (chaptersPlan.find(r => r.id == item.id) == null) {
        setChaptersPlan(prevState => ([...prevState, item]))
      }
      else {
        var array = [...chaptersPlan]; // make a separate copy of the array
        var index = array.indexOf(item)
        if (index !== -1) {
          array.splice(index, 1);
          setChaptersPlan(array);
        }
      }
  }

  //busca peguntas, filtrando por pergunta
  const handleSearchPerguntaTemaClick = () => {
    //@ts-ignore
    getQuestions({ title: perguntaTemaSearch })
  }

  //Click no header do accordion
  const handlerClickCapitulo = (event: any, item: ChapterModel) => {
    event.preventDefault();
    setChaptersSelected(item);
  }

  //remover pergunta capitulo
  const handlerRemoveItemQuestion = (pergunta: QuestionModel, chapter: ChapterModel) => {
    let oldQuestions = [...planChapterQuestion]
    let planChapterFound = oldQuestions?.find(r => r.ChapterId == chapter?.ChapterId);
    if (planChapterFound) {
      var index = planChapterFound.Questions.indexOf(pergunta)
      if (index !== -1) {
        planChapterFound.Questions.splice(index, 1);
      }
      setPlanChapterQuestion(oldQuestions);
    }
  }

  //carrega capitulos
  useEffect(() => {
    //@ts-ignore
    getChapters({ isActive: true });
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

  function getQuestions(filter?: QuestionFilter) {
    //setIsLoading(true);
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
        //setIsLoading(false);
      });
  };


  interface ItemTableProps {
    questions: [QuestionModel];
    chapter: ChapterModel
  }
  const ItemTable: FunctionComponent<ItemTableProps> = (props) => {
    return (
      <>
        {props?.questions?.sort((a, b) => a.id - b.id).map((question: QuestionModel) => {
          return (
            <>
              <tr>
                <td>{question.id}</td>
                <td>{question.title}</td>
                <td>{question.subject}</td>
                <td>
                  <span className="material-symbols-outlined"
                    onClick={() => handlerRemoveItemQuestion(question, props.chapter)}
                    style={{ cursor: "pointer", fontSize: "16px" }}
                    title="Deletar"
                  >
                    delete
                  </span>
                </td>
              </tr>
            </>
          );
        })}
      </>
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <CustomInput
            type="text"
            disabled={isLoading}
            label="Título"
            placeholder="Título do plano"
            register={register}
            errors={errors.title}
            name="title"
            setValue={setValue}
            divClassName="col-8 mt-4"
            validationSchema={{
              required: "Título é obrigatório",
              maxLength: {
                value: 100,
                message: "Título deve conter no máximo 100 caracteres",
              },
            }}
            maxLength={500}
          />
          <CustomInput
            type="money"
            disabled={isLoading}
            label="Preço"
            placeholder="Preço do plano"
            register={register}
            errors={errors.price}
            name="price"
            setValue={setValue}
            divClassName="col-2 mt-4 ps-0"
            validationSchema={{
              required: "Preço é obrigatório",
            }}
          />
          <CustomInput
            type="text"
            disabled={isLoading}
            label="Moeda"
            placeholder="Moeda"
            register={register}
            errors={errors.currency}
            name="currency"
            setValue={setValue}
            divClassName="col-2 mt-4 ps-0"
            validationSchema={{
              required: "Moeda é obrigatório",
              maxLength: {
                value: 2,
                message: "Moeda deve conter no máximo 2 caracteres",
              },
            }}
          />
          <CustomInput
            type="date"
            disabled={isLoading}
            label="Validade inicial"
            placeholder="Validade inicial"
            register={register}
            errors={errors.initialValidityPeriod}
            name="initialValidityPeriod"
            setValue={setValue}
            divClassName="col-2 mt-4"
            validationSchema={{
              required: "Validade inicial obrigatória",
            }}
          />
          <CustomInput
            type="date"
            disabled={isLoading}
            label="Validade final"
            placeholder="Validade final"
            register={register}
            errors={errors.finalValidityPeriod}
            name="finalValidityPeriod"
            setValue={setValue}
            divClassName="col-2 mt-4 ps-0"
            validationSchema={{
              required: "Validade final obrigatória",
            }}
            customValidation={(value) =>
              (!isDate(value) && new Date(value) > new Date()) ||
              "Validade final deve ser maior que hoje"
            }
          />
          <CustomInput
            type="number"
            disabled={isLoading}
            placeholder=""
            register={register}
            label="Limite de requisições a IA por pergunta"
            errors={errors.maxLimitSendDataIA}
            name="maxLimitSendDataIA"
            setValue={setValue}
            divClassName="col-4 mt-4 ps-0"
            validationSchema={{
              required: "Limite máximo é obrigatório",
            }}
            customValidation={(value) =>
              (!isNaN(Number(value)) &&
                Number(value) > 0 &&
                Number(value) < 1000000) ||
              "Valor deve ser um número entre 1 e 1000000"
            }
          />
          <CustomInput
            type="number"
            disabled={isLoading}
            placeholder=""
            register={register}
            label="Fator percentual de retorno de caracteres por pergunta"
            errors={errors.caractersLimitFactor}
            name="caractersLimitFactor"
            setValue={setValue}
            divClassName="col-4 mt-4 ps-0 pb-4"
            validationSchema={{
              required:
                "Fator é obrigatório",
            }}
            customValidation={(value) =>
              (!isNaN(Number(value)) &&
                Number(value) > 0 &&
                Number(value) < 100) ||
              "Valor deve ser um número entre 1 e 1000000"
            }
          />

          <div className="col-auto my-3">
            <h4>Capítulos</h4>
          </div>
          <div className="col-auto my-3">
            <Button
              className="btn btn-primary rounded-5 mb-1 "
              size="sm"
              disabled={isLoading}
              onClick={() => handleCloseModalCapitulo(true)}
            >
              <FontAwesomeIcon icon={faAdd} className="mx-2" />
            </Button>
          </div>
          <hr />

          {isLoading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "200px" }}
            >
              <img
                src={Spinners}
                style={{ width: "50px", height: "50px" }}
                alt="Loading spinner"
              />
            </div>
          ) : (
            <Accordion>
              {chaptersPlan
                .sort((a, b) => a.chapterNumber - b.chapterNumber)
                .map((item: ChapterModel, i: number) => {
                  return (
                    <>
                      <Accordion.Item
                        eventKey={i.toString()}
                        key={i.toString()}
                      >
                        <Accordion.Header
                          onClick={(e) => handlerClickCapitulo(e, item)}
                        >
                          {item.chapterNumber} - {item.title}
                        </Accordion.Header>
                        <Accordion.Body>
                          <div className="col-12 f-12">
                            <Table striped bordered hover size="sm">
                              <thead>
                                <tr>
                                  <th>Id</th>
                                  <th>Pergunta</th>
                                  <th>Tema</th>
                                  <th>
                                    <div className="form-check"></div>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {planChapterQuestion
                                  ?.filter((r) => r.ChapterId == item.id)
                                  .map(
                                    (
                                      item: PlanChapterQuestion,
                                      i: number,
                                    ) => {
                                      return (
                                        <ItemTable
                                          //@ts-ignore
                                          questions={item.Questions}
                                          //@ts-ignore
                                          chapter={item}
                                          key={i.toString()}
                                        />
                                      );
                                    },
                                  )}
                              </tbody>
                            </Table>
                          </div>

                          <div className="col-12 text-end">
                            <Button
                              className="btn btn-primary rounded-5 mb-1"
                              size="sm"
                              disabled={isLoading}
                              onClick={() => setIsFormModalOpenPergunta(true)}
                            >
                              <FontAwesomeIcon className="mx-2" icon={faAdd} />
                            </Button>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </>
                  );
                })}
            </Accordion>
          )}
        </div>

        {chaptersPlan.length > 0 && (
          <>
            <div className="row mt-5">
              <div className="col-6 ">
                <button
                  className="btn btn-primary text-white rounded-5 f-14 px-4 py-2"
                  type="button"
                  hidden={true}
                  onClick={() => setDuplicateModalOpen(true)}
                  disabled={isLoading}
                >
                  Duplicar este plano
                  {isLoading && (
                    <span
                      className="spinner-border spinner-border-sm text-light ms-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                </button>
              </div>
              <div className="col-6 text-end">
                <button
                  className="btn rounded-5 f-14 px-4 py-2 mx-2"
                  type="button"
                  style={{ border: "1px solid #dee2e6" }}
                  disabled={isLoading}
                  onClick={(e) => {
                    e.preventDefault();
                    props.handleModal(false);
                  }}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-primary text-white rounded-5 f-14 px-4 py-2"
                  type="submit"
                  disabled={isLoading}
                >
                  Salvar
                  {isLoading && (
                    <span
                      className="spinner-border spinner-border-sm text-light ms-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </form>

      <Modal
        show={isFormModalOpenPergunta}
        onHide={() => handleCloseModalPergunta(false)}
        centered
        size="lg"
        backdrop="static"
      >
        <Modal.Header closeButton className="bg-white border-0 pb-0">
          <Modal.Title>
            Perguntas do capitulo - {chaptersSelected?.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-white pt-0">
          <section className="container border-top" id="filter">
            <div className="row my-4">
              <div
                className="col-6 col-md-6 col-sm-6"
                style={{ paddingLeft: "0" }}
              >
                <SearchInput
                  placeholder="Buscar pergunta ou tema"
                  onChange={(e) => setSearchPerguntaTema(e)}
                  onEnter={handleSearchPerguntaTemaClick}
                />
              </div>
              <div className="col-auto me-auto">
                <CustomButton
                  onClick={handleSearchPerguntaTemaClick}
                  disabled={isLoading}
                />
              </div>
            </div>
          </section>
          <QuestionTable
            data={questions}
            addItemsPlan={handlerAddQuestions}
            mode={QuestionMode.registerPlan} isLoading={false} handlerDelete={() => { }} handlerEdit={() => { }} />
        </Modal.Body>
      </Modal>

      <Modal
        show={isFormModalOpenCapitulo}
        onHide={() => handleCloseModalCapitulo(false)}
        centered
        size="lg"
        backdrop="static"
      >
        <Modal.Header closeButton className="bg-white border-0 pb-0">
          <Modal.Title>Adicionar capítulos ao plano</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-white pt-0">
          <Divider />
          {
            <ChapterTable
              isLoading={false}
              data={chapters}

              handlerOnChangeAddPlan={handlerCheckChapterCapitulo}
              mode={ChapterMode.registerPlan} handlerDelete={() => { }} handlerEdit={() => { }} />
          }
        </Modal.Body>
      </Modal>

      <Modal
        show={duplicateModalOpen}
        onHide={() => setDuplicateModalOpen(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar duplicação de plano</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Você tem certeza que deseja duplicar este plano?</p>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn border-1 rounded-5 f-14 px-4 py-2"
            style={{ border: "1px solid #dee2e6" }}
            onClick={() => setDuplicateModalOpen(false)}
          >
            Não
          </button>
          <button
            className="btn btn-primary text-white rounded-5 f-14 px-4 py-2"
            type="submit"
            onClick={handlerConfirmDuplicate}
          >
            Sim
          </button>
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default PlanForm;