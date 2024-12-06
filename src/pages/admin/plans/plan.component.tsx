import { FunctionComponent, useEffect, useState } from "react";
import CustomInput from "../../../components/forms/customInput/customInput";
import { useForm } from "react-hook-form";
import { Divider } from "antd";
import { Accordion, Table, Button, Modal, Form } from "react-bootstrap";
import { faAdd,faTrash } from '@fortawesome/free-solid-svg-icons';
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
import { PlanModel, ChapterIdQuestionId, PlanItens } from "../../../common/models/plan.model";
import { toast } from 'react-toastify';
import { PlanService } from "../../../common/http/api/planService";
import { ChapterQuestionsInterface } from "../../../common/models/interfaces/chapter-questions.interface";
import CustomTextArea from "../../../components/forms/customTextArea/customTextArea.component";

interface PlanFormProps {
  handleModal(isOpen: boolean): void
  planEdit: PlanModel
}

const PlanForm = (props: PlanFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [duplicateModalOpen, setDuplicateModalOpen] = useState<boolean>(false);
  const [chapters, setChapters] = useState<ChapterModel[]>([]);
  const [chaptersSelected, setChaptersSelected] = useState<ChapterModel | null>(null);
  const [chaptersPlan, setChaptersPlan] = useState<ChapterModel[]>([]);
  const [perguntaSessaoSearch, setSearchPerguntaSessao] = useState('')
  const [isFormModalOpenPergunta, setIsFormModalOpenPergunta] = useState<boolean>(false);
  const _chapterService = new ChapterService();
  const [isFormModalOpenCapitulo, SetFormModalOpenCapitulo] = useState<boolean>(false);
  const _questionService = new QuestionService();
  const [questions, setQuestions] = useState<QuestionModel[]>([]);
  const [chapterQuestions, setChapterQuestions] = useState<ChapterQuestionsInterface[]>([]);
  const _planService = new PlanService();
  const[openModalItemPlano,setOpenModalItensPlano] = useState(false);
  const [itemPlan,setItemPlan] = useState('');
  const [itensPlan,setItensPlan] = useState<PlanItens[]>([]);

  const {
    setValue,
    register,
    handleSubmit,
    watch,
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
      setValue('qtdMaxCallIASugestions', props.planEdit?.maxQtdCallIASugestions);
      setValue('initialValidityPeriod', props.planEdit?.initialValidityPeriod.toString().split('T')[0]);
      setValue('finalValidityPeriod', props.planEdit?.finalValidityPeriod.toString().split('T')[0]);
      setValue('caractersLimitFactor', props.planEdit?.caractersLimitFactor);
      setValue('planChapters', props.planEdit?.planChapters);
      setValue('description', props.planEdit?.description);

      setIsLoading(true);
      _planService
        .getPlanChaptersByPlanId(props.planEdit.id)

        .then((response: any) => {
          //console.log(response)
          if (response?.length) {
            let chapterQuestionsList: ChapterQuestionsInterface[] = []
            var chapters = response.map((r: any) => {
              let chapter = r.chapter;
              chapter.selected = true;
              var questions = r.planChapterQuestions?.map((question: any) => {
                return question.question
              })
              chapterQuestionsList.push({ ChapterId: chapter.id, Questions: questions })
              return chapter
            })
            setChapterQuestions(chapterQuestionsList)
            setChaptersPlan(chapters)
          }
        })
        .catch((e: any) => {
          let message = "Error ao obter capítulos e perguntas.";
          if (e.response?.data?.length > 0 && e.response.data[0].message)
            message = e.response.data[0].message;
          if (e.response?.data?.detail) message = e.response?.data?.detail;
          console.log("Erro: ", message, e);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if(props.planEdit?.planItems){
      setItensPlan(props.planEdit?.planItems)
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

    setIsLoading(true)
    let plan = new PlanModel({
      ...data,
      price: Number(data.price.toString().replace("R$", "").replace(",", ".")),
      id: props.planEdit?.id,
      maxQtdCallIASugestions:data.qtdMaxCallIASugestions,
      planItems:itensPlan
    });



    //@ts-ignore
    var arr: [ChapterIdQuestionId] = [];
    plan.chapterQuestions = arr;
    chapterQuestions.map((r: ChapterQuestionsInterface) => {
      r.Questions.map((a: QuestionModel) => {
        const chapterQuestion: ChapterIdQuestionId = { chapterId: r.ChapterId, questionId: a.id };
        //@ts-ignore
        plan.chapterQuestions.push(chapterQuestion)
      })
    })


    if (plan.id === undefined) {
      _planService
        .post(plan)
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
        .put(plan)
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
    let oldQuestions = [...chapterQuestions]
    let planChapterFound = oldQuestions?.find(r => r.ChapterId == chaptersSelected?.id);

    if (planChapterFound) {

      selected.map((r: QuestionModel) => {
        if (planChapterFound?.Questions.find(a => a.id == r.id) == null) {
          planChapterFound.Questions.push(r)
        }
      })

      setChapterQuestions(oldQuestions)
      return;
    }

    let chapterPlanQuestion: ChapterQuestionsInterface = {
      ChapterId: chaptersSelected?.id,
      Questions: selected,
    };
    setChapterQuestions(prevState => ([...prevState, chapterPlanQuestion]))
  }

  //Adiciona os capítulos no accordion
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
  const handleSearchPerguntaSessaoClick = () => {
    //@ts-ignore
    getQuestions({ title: perguntaSessaoSearch,isActive:true })
  }

  //Click no header do accordion
  const handlerClickCapitulo = (event: any, item: ChapterModel) => {
    event.preventDefault();
    setChaptersSelected(item);
  }

  //remover pergunta capitulo
  const handlerRemoveItemQuestion = (pergunta: QuestionModel, chapter: ChapterModel) => {


    let oldQuestions = [...chapterQuestions]
    //@ts-ignore
    let planChapterFound = oldQuestions?.find(r => r.ChapterId == chapter.ChapterId);
    if (planChapterFound) {
      var verifica = planChapterFound.Questions.find(r=>r.id == pergunta.id);
      if (verifica !=undefined) {
        planChapterFound.Questions.splice( planChapterFound.Questions.indexOf(verifica) , 1);
      }
      setChapterQuestions(oldQuestions);
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
        let message = "Error ao obter capítulos.";
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
        let message = "Error ao obter capítulos.";
        if (e.response?.data?.length > 0 && e.response.data[0].message)
          message = e.response.data[0].message;
        if (e.response?.data?.detail) message = e.response?.data?.detail;
        console.log("Erro: ", message, e);
      })
      .finally(() => {
        //setIsLoading(false);
      });
  };
  const handleItemChange =(e:any)=>{
    setItemPlan(e.target.value)
  }
  const handlerAddItemPlan=()=>{
    if(!isBlank(itemPlan)){

      setItensPlan((prev)=>[...prev,{description:itemPlan} ])
      setItemPlan('')

    }else{
      toast.error('Item obrigatório', {
        position: 'top-center',
        style: { minWidth: 400 }
      });
    }
  }
  const handlerRemoveItemPlan =(item:any)=>{

    var old  = [...itensPlan];
    old.splice(itensPlan.indexOf(item),1)
    setItensPlan(old)

  }
  function isBlank(str:string) {
    return (!str || /^\s*$/.test(str));
  }
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
            label="Título do plano"
            placeholder="Título do plano"
            register={register}
            errors={errors.title}
            name="title"
            setValue={setValue}
            divClassName="col-8 mt-4"
            validationSchema={{
              required: "Título do plano é obrigatório",
              maxLength: {
                value: 100,
                message: "Título do plano deve conter no máximo 100 caracteres",
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
            errors={errors.qtdMaxCallIASugestions}
            name="qtdMaxCallIASugestions"
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

            <CustomTextArea
              type="text"
              rows={4}
              label="Descrição do plano"
              placeholder="Descrição do plano"
              register={register}
              errors={errors.description}
              name="description"
              setValue={setValue}
              divClassName="col-12 "
              validationSchema={{
                maxLength: {
                  value: 500,
                  message: "Descrição do plano deve conter no máximo 500 caracteres",
                },
              }}
              maxLength={500}
            />
         <div className="col-12 text-end"> <small><span>{watch("description")?.length??0 }/500</span></small></div>

          <div className="col-8 my-3">

            <Button
              className="btn btn-primary rounded-5 mb-1 "
              size="sm"
              disabled={isLoading}
              onClick={() => handleCloseModalCapitulo(true)}
            >
               <span className="fs-6"><>Capítulos</></span> <FontAwesomeIcon icon={faAdd} className="mx-2" />
            </Button>
          </div>

          <div className="col-4 my-3 text-end">
              <button
                className="btn btn-primary text-white rounded-5 f-14 px-4 py-2"
                type="button"
                onClick={()=>setOpenModalItensPlano(true)}
              >
                Itens do plano
              </button>
          </div>
          {isLoading ? (
            <div className='d-flex justify-content-center align-items-center' style={{ height: '100%', borderRadius: '9px' }}>
              <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status" />
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
                                  <th>Sub-título</th>
                                  <th>
                                    <div className="form-check"></div>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {chapterQuestions
                                  ?.filter((r) => r.ChapterId == item.id)
                                  .map(
                                    (
                                      item: ChapterQuestionsInterface,
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
                  placeholder="Buscar pergunta ou sessão"
                  onChange={(e) => setSearchPerguntaSessao(e)}
                  onEnter={handleSearchPerguntaSessaoClick}
                />
              </div>
              <div className="col-auto me-auto">
                <CustomButton
                  onClick={handleSearchPerguntaSessaoClick}
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


      <Modal
        show={openModalItemPlano}
        onHide={() => setOpenModalItensPlano(false)}
        centered
        size="lg"
        backdrop="static"
      >
        <Modal.Header closeButton className="bg-white border-0 pb-0">
          <Modal.Title>Itens do plano</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-white pt-0">
          <Divider />
          <div className="row">
            <div className="col-8">
                <Form.Control type="text" value={itemPlan} onChange={(e)=>handleItemChange(e)}  placeholder="Item" />
            </div>
            <div className="col-4">
                <Button
                  className="btn btn-primary rounded-5 mb-1 "
                  size="sm"
                  disabled={isLoading}
                  onClick={() => handlerAddItemPlan()}
                >
                  <FontAwesomeIcon icon={faAdd} className="mx-2" />
                </Button>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Item</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      itensPlan?.map((r,i:number)=>{
                        return(
                          <tr key={(i).toString()}>
                          <td>{(1+i).toString()}</td>
                          <td>{r.description}</td>
                          <td> <FontAwesomeIcon icon={faTrash} onClick={()=>handlerRemoveItemPlan(r)}
                                    className="mx-2 text-primary" style={{cursor:'pointer'}} /></td>
                        </tr>
                        )
                      })
                    }


                  </tbody>
                </Table>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PlanForm;