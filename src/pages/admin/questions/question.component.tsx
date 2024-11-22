import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import CustomInput from "../../../components/forms/customInput/customInput";
import { QuestionModel } from "../../../common/models/question.model";
import { QuestionService } from "../../../common/http/api/questionService";


export interface QuestionFormProps {
  question: QuestionModel | undefined;
  handleClose: (c?: boolean) => void;
  confirmaSalvar():void | null
}

const QuestionForm = (p: QuestionFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const _questionService = new QuestionService();

  useEffect(() => {
    setValue('title', p.question?.title);
    setValue('maxLimitCharacters', p.question?.maxLimitCharacters);
    setValue('minLimitCharacters', p.question?.minLimitCharacters);
    setValue('subject', p.question?.subject);
  }, []);

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors, submitCount }
  } = useForm();

  const onSubmit = (data: any) => {
    if(submitCount > 0) {
      return;
    }

    setIsLoading(true)

    let question = new QuestionModel({
      ...data,
      id: p.question?.id
    });

    if (question.id === undefined) {
      _questionService
        .post(question)
        .then(() => {
          toast.success('Pergunta criada com sucesso!', {
            position: 'top-center',
            style: { minWidth: 400 }
          });
          p.handleClose(false)
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
      _questionService
        .put(question)
        .then(() => {
          toast.success('Pergunta atualizada com sucesso!', {
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
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <hr />
      <div className='row pt-0 px-4'>
        <CustomInput
          type='text'
          disabled={isLoading}
          label='Pergunta'
          placeholder='Pergunta'
          register={register}
          errors={errors.title}
          name='title'
          setValue={setValue}
          divClassName='col-12 mt-4'
          validationSchema={{
            required: 'Pergunta é obrigatória',
            maxLength: { value: 100, message: "Pergunta deve conter no máximo 100 caracteres" }
          }}
          maxLength={500}
        />
        <CustomInput
          type='text'
          disabled={isLoading}
          label='Sub-título'
          placeholder='Sub-título'
          register={register}
          errors={errors.subject}
          name='subject'
          setValue={setValue}
          divClassName='col-12 mt-4'
          validationSchema={{
            required: 'Sub-título é obrigatório',
            maxLength: { value: 100, message: "Sub-título deve conter no máximo 100 caracteres" }
          }}
          maxLength={500}
        />
        <CustomInput
          type='number'
          disabled={isLoading}
          label='Mínimo de caracteres'
          placeholder='Mínimo de caracteres'
          register={register}
          errors={errors.minLimitCharacters}
          name='minLimitCharacters'
          setValue={setValue}
          divClassName='col-6 mt-4'
          validationSchema={{
            required: 'Mínimo de caracteres é obrigatório'
          }}
          customValidation={(value) => (!isNaN(Number(value)) && Number(value) > 0 && Number(value) < 100000)
            || 'Número deve ser um número entre 1 e 100000'}
        />
        <CustomInput
          type='number'
          disabled={isLoading}
          label='Máximo de caracteres'
          placeholder='Máximo de caracteres'
          register={register}
          errors={errors.maxLimitCharacters}
          name='maxLimitCharacters'
          setValue={setValue}
          divClassName='col-6 mt-4'
          validationSchema={{
            required: 'Máximo de caracteres é obrigatório'
          }}
          customValidation={(value) => (!isNaN(Number(value)) && Number(value) > 0 && Number(value) < 100000)
            || 'Número deve ser um número entre 1 e 100000'}
        />
      </div>

      {isLoading &&
        <div className='d-flex justify-content-center align-items-center' style={{ height: '100%', borderRadius: '9px' }}>
          <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status" />
        </div>
      }

      <div className='d-flex justify-content-end mt-4'>
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
export default QuestionForm;