import { useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { QuestionModel } from "../../../common/models/question.model";
import { QuestionUserAnswerModel } from "../../../common/models/question-user-answer.model";
import { PlanModel } from "../../../common/models/plan.model";
import { ChapterModel } from "../../../common/models/chapter.model";
import { QuestionService } from "../../../common/http/api/questionService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {   faCameraRetro, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import CustomTextArea from "../../../components/forms/customTextArea/customTextArea.component";
import 'rsuite/Uploader/styles/index.css';
import { Uploader } from 'rsuite';

export interface UploadPhotosFormProps{
    questionAnsewers: QuestionUserAnswerModel[];
    plan: PlanModel;
    question:QuestionModel;
    closeModal():void;
}
export interface BookViewerNavigate {
    idChapter: number;
    chapter: string;
    answer: string;
    subject?: string;
    idQuestionUserAnwers:number;
  }
const UploadPhotosForm =(props:UploadPhotosFormProps) =>{

    //const [bookViewerAr, setBookViewerAr] = useState<BookViewerNavigate[]>([]);
    const[isLoading,setIsloading] = useState(false)
    const [file, setFile] = useState();
    const [disableFup,setDisableFup] = useState(false)
    const [inactivationModalOpen, setInactivationModalOpen] = useState(false);
    const _questionService = new QuestionService();
    console.log(props.question?.questionUserAnswer)
    const {
        setValue,
        watch,
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      function handleChange(event:any) {
        setFile(event.target.files[0]);
      }
    useEffect(() => {

        let arBooks: BookViewerNavigate[] = [];
        props.plan.chapters
          ?.sort((r) => r.id)
          .map((r: ChapterModel) => {
            props.questionAnsewers
              .filter((b) => b.chapterId == r.id)
              .map((g: QuestionUserAnswerModel) => {
                let subject = r.questions?.find(f => f.id == g.questionId)?.subject;
                let booksVw: BookViewerNavigate = {
                  idChapter: r.id,
                  chapter: r.title,
                  subject: subject,
                  answer: g.answer,
                  idQuestionUserAnwers:g.id
                };
                arBooks.push(booksVw);
              });
          });
    
        //setBookViewerAr(arBooks);
        if( props.question?.questionUserAnswer.imagePhotoUrl!==null){
          setValue('caption', props.question?.questionUserAnswer.imagePhotoLabel);
          setDisableFup(true)
        }
      }, []);

      const handlerDeletePhoto =() =>{
        updatePhoto(true)
      }

      const updatePhoto = async (removePhoto:boolean) => {

        let data:QuestionUserAnswerModel = {
          ...props.question?.questionUserAnswer,
          imagePhotoUrl: removePhoto? '' : props.question?.questionUserAnswer.imagePhotoUrl
        }
        setInactivationModalOpen(false)
        setIsloading(true)
        await _questionService
        .updatePhotoQuestionUserAnswer(data)
        .then(() => {
          setDisableFup(false)
          setValue('caption','');
        })
        .catch((e) => {
          let message = 'Error ao obter dados de participante.';
          if (e.response?.data?.length > 0 && e.response.data[0].message) message = e.response.data[0].message;
          if (e.response?.data?.detail) message = e.response?.data?.detail;
          console.log('Erro: ', message, e);
        })
        .finally(() => {
          setIsloading(false);
        });
      }
    const onSubmit = async (data: any) => {

      if (file == undefined) {
        toast.error("Foto obrigatória", {
          position: "top-center",
          style: { maxWidth: 600 },
        });
        return;
      }
      setIsloading(true)

      _questionService
        .uploadPhotoQuestionUserAnswer({file:file, idQuestionUserAnwser:props.question?.questionUserAnswer?.id,label:data.caption})
        .then(() => {
          toast.success('Upload de foto efetuada com sucesso!', {
            position: 'top-center',
            style: { minWidth: 400 }
          });
        
        })
        .catch((e) => {
          let message = 'Error ao salvar foto.';
          if (e.response?.data?.length > 0 && e.response.data[0].message) message = e.response.data[0].message;
          if (e.response?.data?.detail) message = e.response?.data?.detail;
          toast.error(message, {
            position: 'top-center',
            style: { minWidth: 400 }
          });
        })
        .finally(() => {
          setIsloading(false)
          props.closeModal();
        });

    }

    return (
      <> 
      <form onSubmit={handleSubmit(onSubmit)}>
        <span>Sub-titulo - <strong>{props.question?.subject}</strong></span><br></br>
       
        <span>
           {props.question?.title}
        </span>
        <div className="row rowTopUpload border-top mt-3 pt-3">
          <div className="col-12 mt-2">
           {/* <input
              type="file"
              accept="image/*"
              disabled={disableFup}
              onChange={handleChange}
              id="fup"
              multiple={false}
            ></input>
            */}

           <Uploader locale={{error:'Erro',clear:'Limpar',loading:'Carregando',remove:'Remover',emptyMessage:'Sem mensagem'}}  
            listType="picture" action="//jsonplaceholder.typicode.com/posts/">
            <button>
              <FontAwesomeIcon icon={faCameraRetro}  />
            </button>
          </Uploader>
          </div>
         {
          disableFup && <div className="col-12 mt-2 text-center">
             <img width={250}  className="img-fluid img-thumbnail " src={props.question?.questionUserAnswer.imagePhotoUrl} alt={'Photo'}>
             
             </img>  <FontAwesomeIcon icon={faTrash} onClick={()=>setInactivationModalOpen(true)} 
              className="mx-2 text-primary" style={{cursor:'pointer'}} />
          </div>
          }
        </div>
        <div className="row mt-2 text-end">
          <div className="col-12 ">
            <CustomTextArea 
              type="text"
              rows={3}
              label="Legenda foto"
              placeholder="Legenda foto"
              register={register}
              disabled={disableFup}
              errors={errors.title}
              name="caption"
              setValue={setValue}
              
              divClassName="col-12 "
              validationSchema={{
                maxLength: {
                  value: 200,
                  message: "Legenda foto deve conter no máximo 200 caracteres",
                },
              }}

              maxLength={200}
            />
          </div>
          <small><span>{watch("caption")?.length??0 }/200</span></small>
          <div className="col-12 text-end mt-2">
            <button
              className="btn btn-primary text-white rounded-4 f-14 px-4 py-2"
              type="submit"
              disabled={disableFup}
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
        
        </form>
       
        <Modal show={inactivationModalOpen} onHide={() => setInactivationModalOpen(false)} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar exclusão</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Você tem certeza que deseja excluir a foto?</p>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn border-1 rounded-5 f-14 px-4 py-2"
              style={{ border: '1px solid #dee2e6' }}
              onClick={() => setInactivationModalOpen(false)}>
              Não
            </button>
            <button
              className="btn btn-primary text-white rounded-5 f-14 px-4 py-2"
              onClick={handlerDeletePhoto}>
              Sim
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );

}
export default UploadPhotosForm;