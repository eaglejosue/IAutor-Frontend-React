import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

import constParams from '../../../common/constants/constParams';
import { ParamModel } from '../../../common/models/param.model';
import { ParamService } from '../../../common/http/api/paramService';
import NavAdmin from '../../../components/nav/nav-admin.component';

const Terms = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const _paramService = new ParamService();
  const [paramModel, setParamModel] = useState<ParamModel>(new ParamModel());
  const [errorMessage, setErrorMessage] = useState('');

  const {
    handleSubmit,
    register,
    setValue
  } = useForm();

  const getParam = (key: string) => {
    setIsLoading(true);

    _paramService
      .getByKey(key)
      .then((response: any) => {
        setParamModel(new ParamModel(response));
        setValue('value', response.value);
      })
      .catch((e) => {
        let message = 'Error ao obter termos.';
        if (e.response?.data?.length > 0 && e.response.data[0].message) message = e.response.data[0].message;
        if (e.response?.data?.detail) message = e.response?.data?.detail;
        console.log('Erro: ', message, e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getParam(constParams.Terms);
  }, []);

  const onSubmit = async (data: any) => {
    if (data.value.length > 0) {
      setErrorMessage('');

      if (data.value === paramModel.value) {
        toast.warning('Texto sem alterações!', { position: 'top-center' });
        return;
      }
    }
    else {
      setErrorMessage('Antes de prosseguir, por favor, preencha os termos.');
      return;
    }

    setIsLoading(true);

    _paramService
      .put(
        new ParamModel({
          id: paramModel.id,
          key: paramModel.key,
          value: data.value,
        }),
      )
      .then(() => {
        toast.success('Informações salvas com sucesso!', { position: 'top-center' });
      })
      .catch((e) => {
        let message = 'Error ao salvar informações!';
        if (e.response?.data?.length > 0 && e.response.data[0].message) message = e.response.data[0].message;
        if (e.response?.data?.detail) message = e.response?.data?.detail;
        toast.error(message, {
          position: 'top-center',
          style: { maxWidth: 600 }
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <NavAdmin />

      <main className='main bg-iautor px-4 pb-4'>

        <section className='container my-3' id='videos'>
          <div className='row'>

            <div className='col-12 bg-white border rounded p-4' id='terms-form'>

              <div className='border-bottom'>
                <b className='f-18'>Termos</b>
                <p className='f-16'>Visualize ou altere abaixo as informações do Termo.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row mt-4'>
                  <div className='col-12 col-lg-6'
                    style={{ width: '100%' }}
                  >
                    <TextareaAutosize
                      {...register('value')}
                      onChange={(e) => { setValue('value', e.target.value) }}
                      placeholder='Digite aqui os termos de uso...'
                      style={{
                        width: '100%',
                        minHeight: '388px',
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #0580fa',
                      }}
                    />
                  </div>

                  <div className='d-flex justify-content-center align-items-center'>
                    {errorMessage && <span className='text-danger f-14'>{errorMessage}</span>}
                  </div>

                </div>

                <button
                  type='submit'
                  className='btn bg-IAutor mt-4 p-2 fw-bold text-body-bg'
                  disabled={isLoading}
                >
                  Salvar Informações
                  {isLoading && (
                    <span
                      className='spinner-border spinner-border-sm text-light ms-2'
                      role='status'
                      aria-hidden='true'
                    ></span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>

      </main>
    </>
  );
};

export default Terms;
