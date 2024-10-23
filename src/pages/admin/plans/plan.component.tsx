import { FunctionComponent, useEffect, useState } from "react";
import CustomInput from "../../../components/forms/customInput/customInput";
import Spinners from '../../../assets/svg/SvgSpinners180Ring.svg';
import { useForm } from "react-hook-form";
import { Divider } from "antd";
import { Accordion, Table,Button, Modal  } from "react-bootstrap";
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import QuestionForm from "../questions/question.component";
import ChapterForm from "../chapters/chapter.component";
import { isDate } from "date-fns";
import { ChapterFilter } from "../../../common/models/filters/chapter.filter";
import { ChapterService } from "../../../common/http/api/chapterService";
import { ChapterModel } from "../../../common/models/chapter.model";
import { QuestionFilter } from "../../../common/models/filters/question.filter";
import { QuestionService } from "../../../common/http/api/questionService";
import { QuestionModel } from "../../../common/models/question.model";
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

interface PlanFormProps{
  handleModal(isOpen:boolean):void
}


const PlanForm =(props:PlanFormProps) =>{

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chapters, setChapters] = useState<ChapterModel[]>([]);
  const [isFormModalOpenPergunta, setIsFormModalOpenPergunta] = useState<boolean>(false);
  const _chapterService = new ChapterService();
  const[isFormModalOpenCapitulo,SetFormModalOpenCapitulo]  = useState<boolean>(false);
  const _questionService = new QuestionService();
  const [questions, setQuestions] = useState<QuestionModel[]>([]);

  //* handlers **/
  const handlerSelectAll=(e:any)=>{
    const myNextList = [...questions];
    const newQuestions = myNextList.map((question:QuestionModel)=>{
      question.selected = e.target.checked;
      return question;
    })
   
    setQuestions(newQuestions);
    
    
  }
  const handleCloseModalCapitulo =(isClose:boolean) =>{
    SetFormModalOpenCapitulo(isClose)
  }
  const handleCloseModalPergunta= (isClose:boolean) => {
    setIsFormModalOpenPergunta(isClose)
  };
  const onSubmit = async (data: any) => {
  }
  const handlerClickCapitulo=(event:any, item:ChapterModel)=>{
    
    event.preventDefault();
    setQuestions([])
    getQuestions(
      new QuestionFilter({
        chapterId: item.id
        
      }),
    );
    
    
  }
  const confirmaSalvarCapitulo=()=>{
    getChapters(); 
  }
  const confirmaSalvarPergunta=()=>{
    //getQuestions(); 
  }
  const handlerCheckPergunta=(pergunta:QuestionModel,e:any)=>{
    setQuestions(questions.map(question =>
      question.id === pergunta.id ? { ...question, selected: e.target.checked } : question
    ));
  }
  //* end handlers **/
  useEffect(() => {
    getChapters();
  }, []);

 
  function getQuestions (filter?: QuestionFilter)  {
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

  interface ItemTableProps{
      pergunta:QuestionModel;
  }
  const ItemTable: FunctionComponent<ItemTableProps> = (props) => {
    return (
      <>
        <tr>
          <td>{props.pergunta.id}</td>
          <td>{props.pergunta.title}</td>
          <td>{ format(new Date(props.pergunta.createdAt), "dd/MM/yyyy", { locale: pt })}</td>
          <td>
              <input className="form-check-input" onChange={(e)=> handlerCheckPergunta(props.pergunta,e)} 
              type="checkbox" checked={props.pergunta.selected} id="flexCheckDefault" />
          </td>
        </tr>
      </>
    );

  }

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 
    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <hr />
          <div className="row pt-0 px-4">
            <CustomInput
              type="text"
              disabled={isLoading}
              placeholder="Título do plano"
              register={register}
              errors={errors.title}
              name="title"
              setValue={setValue}
              divClassName="col-12 mt-4"
              validationSchema={{
                required: "Título do plano é obrigatório",
                maxLength: {
                  value: 100,
                  message: "Título deve conter no máximo 100 caracteres",
                },
              }}
              maxLength={500}
            />
            <CustomInput
              type="number"
              disabled={isLoading}
              placeholder="Preço do plano"
              register={register}
              errors={errors.price}
              name="price"
              setValue={setValue}
              divClassName="col-4 mt-4"
              validationSchema={{
                required: "Preço do plano é obrigatório",
              }}
              customValidation={(value) =>
                (!isNaN(Number(value)) &&
                  Number(value) > 0 &&
                  Number(value) < 100000) ||
                "Valor deve ser um número entre 1 e 100000"
              }
            />
            <CustomInput
              type="text"
              disabled={isLoading}
              placeholder="Moeda"
              register={register}
              errors={errors.currency}
              name="currency"
              setValue={setValue}
              divClassName="col-4 mt-4"
              validationSchema={{
                required: "Moeda do plano é obrigatório",
                maxLength: {
                  value: 2,
                  message: "Moeda do plano deve conter no máximo 2 caracteres",
                },
              }}
            />

            <CustomInput
              type="number"
              disabled={isLoading}
              placeholder="Limite max envio IA"
              register={register}
              errors={errors.maxLimitSendDataIA}
              name="maxLimitSendDataIA"
              setValue={setValue}
              divClassName="col-4 mt-4"
              validationSchema={{
                required: "Limite máximo de envio a IA é obrigatório",
              }}
              customValidation={(value) =>
                (!isNaN(Number(value)) &&
                  Number(value) > 0 &&
                  Number(value) < 1000000) ||
                "Valor deve ser um número entre 1 e 1000000"
              }
            />
            <CustomInput
              type="date"
              disabled={isLoading}
              placeholder="Validade inicial"
              register={register}
              errors={errors.initialValidityPeriod}
              name="initialValidityPeriod"
              setValue={setValue}
              divClassName="col-4 mt-4"
              validationSchema={{
                required: "Data de início de vigência obrigatória",
              }}
              customValidation={(value) =>
                (!isDate(value) && new Date(value) > new Date()) ||
                "Data inicial de vigência deve ser maior que hoje"
              }
            />
            <CustomInput
              type="date"
              disabled={isLoading}
              placeholder="Validade final"
              register={register}
              errors={errors.finalValidityPeriod}
              name="finalValidityPeriod"
              setValue={setValue}
              divClassName="col-4 mt-4"
              validationSchema={{
                required: "Data de vigência final obrigatória",
              }}
              customValidation={(value) =>
                (!isDate(value) && new Date(value) > new Date()) ||
                "Data de vigência final deve ser maior que hoje"
              }
            />
            <Divider className="mt-2 " />
            <div className="col-11">
              <h4>Capítulos</h4>
            </div>
            <div className="col-1">
              <Button
                className="btn btn-primary rounded-5 mb-1 "
                size="sm"
                disabled={isLoading}
                onClick={() => handleCloseModalCapitulo(true)}
              >
                <FontAwesomeIcon icon={faAdd} className="mx-2" />
              </Button>
            </div>

            {isLoading? 
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <img src={Spinners} style={{ width: '50px', height: '50px' }} alt="Loading spinner" />
        </div>
          :
            <Accordion >
              {chapters.filter(r=>r.isActive==true).sort((a,b)=>a.chapterNumber-b.chapterNumber).map((item: ChapterModel, i: number) => {
                return (
                  <>
                    <Accordion.Item eventKey={i.toString()} key={i.toString()}  >
                      <Accordion.Header onClick={(e)=> handlerClickCapitulo(e,item)} >{item.chapterNumber} - {item.title}</Accordion.Header>
                      <Accordion.Body >
                        <div className="col-12">
                          <Table striped bordered hover size="sm" >
                            <thead>
                              <tr>
                                <th>ID</th>

                                <th>Pergunta</th>
                                <th>Criada em</th>
                                <th>
                                  {" "}
                                  <div className="form-check">
                                    <input onClick={(e)=>handlerSelectAll(e)} className="form-check-input" type="checkbox" value="" 
                                    id="flexCheckDefault"/>
                                    </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody>

                              {
                                questions?.filter(r=>r.isActive==true).map((pergunta:QuestionModel,i:number)=>{
                                  return(
                                    <ItemTable pergunta={pergunta} key={i.toString()} />
                                  )
                                })
                              }

                              
                            </tbody>
                          </Table>
                        </div>

                        <div className="col-12 text-end">
                          <Button
                            className="btn btn-primary rounded-5 mb-1 "
                            size="sm"
                            disabled={isLoading}
                            onClick={() => setIsFormModalOpenPergunta(true)}
                          >
                            <FontAwesomeIcon icon={faAdd} className="mx-2" />
                          </Button>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </>
                );
              })}
            </Accordion>
            }
          </div>



          <div className="d-flex justify-content-end mt-4">
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
              Salvar Informações
              {isLoading && (
                <span
                  className="spinner-border spinner-border-sm text-light ms-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
            </button>
          </div>
        </form>
        <Modal
          show={isFormModalOpenPergunta}
          onHide={() => handleCloseModalPergunta(false)}
          centered
          size="lg"
          backdrop="static"
        >
          <Modal.Header closeButton className="bg-white border-0 pb-0">
            <Modal.Title>Criar nova pergunta</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-white pt-0">
            {
              //@ts-ignore
              <QuestionForm question={null} confirmaSalvar={confirmaSalvarPergunta}
                handleClose={(c) => handleCloseModalPergunta(false)}
              />
            }
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
            <Modal.Title>Criar novo capítulo</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-white pt-0">
            <ChapterForm
              chapter={undefined}
              confirmaSalvar={confirmaSalvarCapitulo}
              handleClose={(c) => handleCloseModalCapitulo(false)}
            />
          </Modal.Body>
        </Modal>
      </>
    );
}
export default PlanForm;