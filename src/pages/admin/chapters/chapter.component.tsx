import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import { ChapterModel } from "../../../common/models/chapter.model";
import { ChapterService } from "../../../common/http/api/chapterService";
import CustomInput from "../../../components/forms/customInput/customInput";
import Spinners from '../../../assets/svg/SvgSpinners180Ring.svg';

export interface ChapterFormProps {
  chapter: ChapterModel | undefined;
  handleClose: (c?: boolean) => void;
  confirmaSalvar:()=> void | null;
}

const ChapterForm = (p: ChapterFormProps) => {
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
    formState: { errors }
  } = useForm();

  const onSubmit = async (data: any) => {

    let chapter = new ChapterModel({
      ...data,
      id: p.chapter?.id
    });

    setIsLoading(true)

    if (chapter.id === undefined) {
      _chapterService
        .post(chapter)
        .then(() => {
          toast.success('Capitulo criado com sucesso!', {
            position: 'top-center',
            style: { minWidth: 400 }
          });
          p.handleClose(false);
          if(p.confirmaSalvar!=null){
            p.confirmaSalvar()
          }
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
    } else {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <hr />
      <div className='row pt-0 px-4'>
        <CustomInput
          type='text'
          disabled={isLoading}
          label='Título *'
          placeholder=''
    
          register={register}
          errors={errors.title}
          name='title'
          setValue={setValue}
          divClassName='col-12 mt-4'
          validationSchema={{
            required: 'Título é obrigatório',
            maxLength: { value: 100, message: "Título deve conter no máximo 100 caracteres" }
          }}
          maxLength={500}
        />
        <CustomInput
          type='number'
          disabled={isLoading}
          label='Número do capítulo *'
          placeholder=''
           
          register={register}
          errors={errors.chapterNumber}
          name='chapterNumber'
          setValue={setValue}
          divClassName='col-4 mt-4'
          validationSchema={{
            required: 'Número do capítulo é obrigatório'
          }}
          customValidation={(value) => (!isNaN(Number(value)) && Number(value) > 0 && Number(value) < 100) ||
             'Porcentagem deve ser um número entre 1 e 99'}
        />
      </div>

      {isLoading &&
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <img src={Spinners} style={{ width: '50px', height: '50px' }} alt="Loading spinner" />
        </div>
      }

      <div className='d-flex justify-content-end'>
        <button className='btn rounded-5 f-14 px-4 py-2 mx-2'
          type='button'
          style={{ border: '1px solid #dee2e6' }}
          disabled={isLoading}
          onClick={(e) => {
            e.preventDefault();
            p.handleClose();
          }}
        >
          Cancelar
        </button>
        <button className='btn btn-primary text-white rounded-5 f-14 px-4 py-2'
          type="submit"
          disabled={isLoading}
        >
          Salvar Informações
          {isLoading && <span className="spinner-border spinner-border-sm text-light ms-2" role="status" aria-hidden="true"></span>}
        </button>
      </div>

    </form>
  )
}
export default ChapterForm;