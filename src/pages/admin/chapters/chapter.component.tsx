import { useEffect, useState } from "react";
import CustomInput from "../../../components/forms/customInput/customInput";
import { useForm } from 'react-hook-form';
import Spinners from '../../../assets/svg/SvgSpinners180Ring.svg';
import { ChapterModel } from "../../../common/models/chapter.model";
import { ChapterService } from "../../../common/http/api/chapterService";
import { toast } from 'react-toastify';


export interface ChapterFormProps {
    chapter: ChapterModel | null;
    handleClose: (c?: boolean) => void;
  }

const ChapterForm =(p:ChapterFormProps) =>{
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const _chapterService = new ChapterService();

    useEffect(() => {
        setValue('title', p.chapter?.title);
        setValue('chapterNumber', p.chapter?.chapterNumber);
       
      }, []);

    const {
        setValue,
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        watch,
      } = useForm();

      const onSubmit = async (data: any) => {
        
        let chapter = new ChapterModel({
            ...data,
            id:p.chapter?.id
          });
        
        setIsLoading(true)
       
        if(chapter.id===undefined){
            //update
            _chapterService
          .post(chapter)
          .then(() => {
            toast.success('Capitulo criado com sucesso!', {
              position: 'top-center',
              style: { minWidth: 400 }
            });
            p.handleClose(false);
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
        }else{
            _chapterService
            .put(chapter)
            .then(() => {
              toast.success('Capitulo atualizado com sucesso!', {
                position: 'top-center',
                style: { minWidth: 400 }
              });
              p.handleClose(false);
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
        }
        

        setIsLoading(false)
      }
    return (<>
        
        <hr/>
        <form onSubmit={handleSubmit(onSubmit)}>
      <div className='row pt-0 px-4'>

        <div className='col'>
          <div className='row'>
            <div className='col-12 pr-0'>
              <CustomInput
                type='text'
                disabled={isLoading}
                label='Título *'
                placeholder='Título'
                register={register}
                errors={errors.title}
                name='title'
                setValue={setValue}
                divClassName='col-12 mt-4'
                validationSchema={{
                  required: 'Título é obrigatório',
                  maxLength: { value: 500, message: "Título deve conter no máximo 500 caracteres" }
                }}
                maxLength={500}
              />
            </div>

          </div>

          <div className='row'>
            <div className='col-12 pr-0 mt-2'>
            <CustomInput
                type='text'
                disabled={isLoading}
                label='Número do capítulo '
                placeholder='Nr do capítulo'
                register={register}
                errors={errors.chapterNumber}
                name='chapterNumber'
                setValue={setValue}
                divClassName='col-12 mt-4'
                validationSchema={{
                  maxLength: { value: 100, message: "Título deve conter no máximo 100 caracteres" }
                }}
                maxLength={100}
              />
            </div>
           
          </div>
        </div>

      </div>

      {isLoading &&
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <img src={Spinners} style={{ width: '50px', height: '50px' }} alt="Loading spinner" />
        </div>
      }



      <div className='d-flex justify-content-end mt-5'>
        <button className="btn border-1 btn-white text-dark py-2 px-4 mx-2" disabled={isLoading}
         
          onClick={(e) => {
            e.preventDefault();
            p.handleClose(false);
          }}
        >
          Cancelar
        </button>
        <button type="submit" className="btn btn-success text-white fw-bold  py-2 px-4" disabled={isLoading}>
          Salvar
        </button>
      </div>

    </form>
       
     </>
  )
}
export default ChapterForm;