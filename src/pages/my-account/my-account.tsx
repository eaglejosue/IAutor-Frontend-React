import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { UserService } from '../../common/http/api/userService';
import { UserModel } from '../../common/models/user.model';
import { AuthenticatedUserModel } from '../../common/models/authenticated.model';
import { CpfValidator } from '../../common/validation/cpfValidator';
import { BirthDateValidator } from '../../common/validation/birthDateValidator';
import Nav from '../../components/nav/nav.component';
import CustomInput from '../../components/forms/customInput/customInput';
import ChangePasswordForm from '../../components/changePasswordForm/changePasswordForm.component';

const MyAccount = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [redirect, setRedirect] = useState('');
  const _userService = new UserService();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserModel>(new UserModel());
  const [urlImgPerfil, setUrlImgPerfil] = useState('');

  useEffect(() => {
    const redirect = params.get('redirect');
    if (redirect) setRedirect(redirect);

    getUser();
  }, []);

  const getUser = () => {
    setIsLoading(true);
    const user = AuthenticatedUserModel.fromLocalStorage();
    _userService
      .getById(user!.id)
      .then((response: any) => {
        const userModel = new UserModel(response);
        setUser(userModel);
        setValue('firstName', userModel.firstName);
        setValue('lastName', userModel.lastName);
        setValue('email', userModel.email);
        setValue('cpf', userModel.cpf);
        setValue('birthDate', userModel.birthDate ? userModel.birthDate.split('T')[0] : '');
        userModel.profileImgUrl && setUrlImgPerfil(userModel.profileImgUrl);
      })
      .catch((e) => {
        let message = 'Error ao obter dados de participante.';
        if (e.response?.data?.length > 0 && e.response.data[0].message) message = e.response.data[0].message;
        if (e.response?.data?.detail) message = e.response?.data?.detail;
        console.log('Erro: ', message, e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    _userService
      .put(new UserModel({
        ...data,
        id: user.id,
        profileImgUrl: urlImgPerfil
      }))
      .then(() => {
        toast.success('Informações salvas com sucesso!', {
          position: 'top-center',
          style: { minWidth: 400 }
        });

        if (data.cpf) {
          const user = AuthenticatedUserModel.fromLocalStorage()!;
          user.isValid = true;
          AuthenticatedUserModel.saveToLocalStorage(user);
        }

        if (redirect) navigate(redirect);
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
      <Nav />

      <main className='main bg-iautor px-4 pb-4'
        style={{ minHeight: '676px' }}
      >

        <section className='container' id='title'>
          <div className='row'>
            <p className='p-0 f-14'>
              <span className='fw-bold'>Minha Conta</span>
            </p>
          </div>
        </section>

        <section className='container my-3' id='videos'>
          <div className='row'>

            <div className='col-lg-4 d-none d-lg-block pe-4 ps-0' id='sub-menu'>
              <div className='d-flex justify-content-between bg-white shadow rounded p-3'>
                <div className='d-flex align-items-center'>
                  <span className="material-symbols-outlined"
                    style={{ borderWidth: '3px', borderStyle: 'solid', borderRadius: '5px' }}
                  >
                    page_info
                  </span>
                  <span className='mx-3'>
                    Dados Pessoais
                  </span>
                </div>
                <span className="material-symbols-outlined" style={{ fontSize: '35px' }}>
                  chevron_right
                </span>
              </div>
            </div>

            <div className='col-12 col-md-12 col-lg-8 bg-white shadow rounded p-4' id='user-form'>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row'>
                  <div className='col-auto'>
                    <p className="m-0 p-0 fw-bold f-20">Dados Pessoais</p>
                    <p className='f-16'>Visualize ou altere abaixo os seus dados pessoais.</p>
                  </div>
                </div>
                <hr className='py-2' />

                <div className='row'>

                  <div className='col-auto mt-2'>
                    <div className="rounded-circle bg-light d-flex justify-content-center align-items-center"
                      style={{ width: '100px', height: '100px', position: 'relative' }}
                    >
                      {urlImgPerfil ? (
                        <img
                          src={urlImgPerfil}
                          alt="User"
                          className="rounded-circle"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <span className="material-symbols-outlined" style={{ fontSize: '45px', color: '#6c63ff' }}>
                          person
                        </span>
                      )}
                    </div>
                  </div>

                  <div className='col'>
                    <div className='row'>
                      <div className='col-12 col-md-4'>
                        <CustomInput
                          type='text'
                          disabled={false}
                          label='Nome *'
                          register={register}
                          errors={errors.firstName}
                          name='firstName'
                          setValue={setValue}
                          validationSchema={{
                            required: 'Nome é obrigatório',
                            maxLength: { value: 15, message: "Nome deve conter no máximo 15 caracteres" }
                          }}
                          maxLength={15}
                          divClassName='col-12 mt-3'
                        />
                      </div>
                      <div className='col-12 col-md-4'>
                        <CustomInput
                          type='text'
                          disabled={false}
                          label='Sobrenome *'
                          register={register}
                          errors={errors.lastName}
                          name='lastName'
                          setValue={setValue}
                          validationSchema={{
                            required: 'Sobrenome é obrigatório',
                            maxLength: { value: 15, message: "Sobrenome deve conter no máximo 15 caracteres" }
                          }}
                          maxLength={15}
                          divClassName='col-12 mt-3'
                        />
                      </div>
                      <div className='col-12 col-md-4'>
                        <CustomInput
                          type='cpf'
                          disabled={isLoading}
                          label='CPF *'
                          placeholder='CPF'
                          register={register}
                          errors={errors.cpf}
                          name='cpf'
                          setValue={setValue}
                          validationSchema={{ required: 'CPF é obrigatório' }}
                          customValidation={(value) => CpfValidator.isValidCPF(value)}
                          divClassName='col-12 mt-3'
                        />
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-12 col-md-8'>
                        <CustomInput
                          type='email'
                          disabled={true}
                          label='E-mail *'
                          register={register}
                          errors={errors.email}
                          name='email'
                          setValue={setValue}
                          validationSchema={{
                            required: 'E-mail é obrigatório',
                            maxLength: { value: 50, message: "E-mail deve conter no máximo 50 caracteres" }
                          }}
                          maxLength={50}
                          divClassName='col-12 mt-3'
                        />
                      </div>
                      <div className='col-12 col-md-4'>
                        <CustomInput
                          type='date'
                          disabled={false}
                          label='Data de Nascimento *'
                          register={register}
                          errors={errors.birthDate}
                          name='birthDate'
                          setValue={setValue}
                          validationSchema={{ required: 'Data é obrigatório' }}
                          customValidation={(value) => BirthDateValidator.isAdult(value)}
                          divClassName='col-12 mt-3'
                        />
                      </div>
                    </div>
                  </div>

                </div>

                <div className='d-flex justify-content-end mt-4'>
                  <button className='btn btn-primary text-white rounded-5 f-14 px-4 p-2'
                    type="submit"
                    disabled={isLoading}
                  >
                    Salvar Informações
                    {isLoading && <span className="spinner-border spinner-border-sm text-light ms-2" role="status" aria-hidden="true"></span>}
                  </button>
                </div>
              </form>

              <ChangePasswordForm userId={user.id} isLoading={isLoading} />

            </div>

          </div>
        </section>

      </main>
    </>
  );
};

export default MyAccount;
