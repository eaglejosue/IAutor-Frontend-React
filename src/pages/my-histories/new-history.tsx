import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

import Sidebar from '../../components/nav/sidebar.component';
import NavUserOptions from '../../components/nav/nav-user-options.component';

import artificialInteligence from '../../assets/svg/artificial-inteligence.svg';

const NewHistory = () => {
  const [imgRandomSrc, setImgRandomSrc] = useState('1');

  const {
    register,
    setValue
  } = useForm();

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 21) + 1;// Gera um número entre 1 e 21
    const imageUrl = `/src/assets/img/random/${randomIndex}.jpg`;
    setImgRandomSrc(imageUrl);
  }, []);

  return (
    <div className='d-flex'
      style={{ height: '100vh' }}
    >
      <Sidebar navItem='book' />
      <section className='flex-grow-1'>

        <header className='bg-white border-bottom p-3'>
          <div className='container-fluid'>
            <div className='d-flex flex-wrap align-items-center justify-content-center'>

              {/* Nav título página */}
              <div className='col-md-4 f-18'>

                <div className='d-flex align-items-center'>
                  <div className='fw-bold'>
                    Criar História /
                  </div>
                  <div className='d-flex bg-primary align-items-center justify-content-center mx-2'
                    style={{ width: '16px', height: '16px', borderRadius: '100%' }}
                    >
                    <span className='material-symbols-outlined' style={{ fontSize: '10px', color: 'white' }}>edit</span>
                  </div>
                  {/* Add input de título para editar */}
                  <div className=''>
                    Título História
                  </div>
                </div>

              </div>

              {/* Nav center */}
              <div className='col-md ms-5'>
                <div className='row align-items-center'>
                  <div className='col-auto'>
                    <b className='bg-pink text-primary rounded-5 f-12 px-4 py-1'>
                      Criação
                    </b>
                  </div>
                  <div className='col-auto f-12'>
                    <FontAwesomeIcon icon={faChevronRight} style={{ color: '#7F7F8B' }} />
                  </div>
                  <div className='col-auto'>
                    <b className='bg-disabled text-icon rounded-5 f-12 px-4 py-1'>
                      Finalizar
                    </b>
                  </div>
                </div>
              </div>

              {/* Nav user */}
              <div className='col-md-5'>
                <div className='row align-items-center justify-content-end'>
                  <div className='col-auto'>
                    <a href='#' className='btn btn-outline-secondary rounded-5 f-12 px-4 py-2'
                      style={{ fontWeight: 'bold' }}
                    >
                      Livro Degustação | Tradicional
                    </a>
                  </div>
                  <div className='col-auto'>
                    <a href='#' className='btn bg-secondary text-white rounded-5 f-12 px-4 py-2'
                      style={{ fontWeight: 'bold' }}
                    >
                      Ver Planos
                    </a>
                  </div>
                  <NavUserOptions />
                </div>
              </div>

            </div>
          </div>
        </header>

        <main className='main bg-white'>
          <div className='container-fluid'>
            <div className='row'>

              {/* Capítulos */}
              <div className='col-md-3 border-end px-4'>

                <div className='d-flex align-items-center justify-content-between p-4'>
                  <b className='f-16'>Capítulos</b>
                  <div className='text-primary fw-bold rounded-5 f-10 px-4 py-1' style={{ border: '1px solid #db3737' }}>Capitulo 1</div>
                </div>

                {/* Capítulo 1 */}
                <div className='bg-iautor border-top border-bottom p-3'>
                  <div className='f-10'>Capítulo 1</div>
                  <b className='f-13'>Escreva seu Livro</b>
                  <div className='d-flex align-items-center text-icon f-10'>
                    <span className='material-symbols-outlined'
                      style={{ fontSize: '12px', color: '#db3737', marginRight: '3px' }}
                    >
                      quiz
                    </span>
                    3 Perguntas
                  </div>
                </div>

                {/* Img baixo */}
                <div id='img-baixo' style={{ marginTop: '30%' }}>

                  <div className='d-flex justify-content-center'>
                    <img src={imgRandomSrc} style={{ maxWidth: '413px', maxHeight: '300px', objectFit: 'cover', borderRadius: '9px' }} />
                  </div>
                  <div className='d-flex justify-content-center mt-2 p-2'>
                    <b className='f-16'>Uma História mais Completa</b>
                  </div>

                  <div className='d-flex text-center f-14 px-4'>
                    Formate a escrita, edite a capa e crie histórias com mais detalhes e momentos.
                  </div>

                  <div className='d-flex justify-content-center p-4'>
                    <a href='#' className='btn bg-secondary text-white rounded-5 f-12 px-4 py-2 w-50'
                      style={{ fontWeight: 'bold' }}
                    >
                      Ver Planos
                    </a>
                  </div>

                </div>

              </div>

              {/* Perguntas */}
              <div className='col-md border-end p-0'>

                <div className='d-flex align-items-center border-bottom p-4'>
                  <div className='d-flex bg-primary align-items-center justify-content-center'
                    style={{ width: '32px', height: '32px', borderRadius: '100%', marginRight: '15px' }}
                  >
                    <span className='material-symbols-outlined' style={{ fontSize: '16px', color: 'white' }}>quiz</span>
                  </div>
                  <div className='f-14'>
                    <b>Perguntas</b>
                    <div>Responda as perguntas abaixo para criar sua história</div>
                  </div>
                </div>

                {/* Contador de perguntas */}
                <div className='d-flex align-items-center justify-content-between px-5 pt-5'>
                  <div>
                    <div className='f-14'>Capitulo 1</div>
                    <b className='f-16'>Escreva seu Livro</b>
                  </div>
                  <div className='text-primary fw-bold rounded-5 f-10 px-4 py-1'
                    style={{ border: '1px solid #db3737' }}
                  >
                    Pergunta 1/3
                  </div>
                </div>

                <div className='d-flex align-items-center justify-content-between px-5 pt-4'>
                  <div>
                    <span className='text-primary'>1 - </span>Conte aqui as suas memórias.
                  </div>
                </div>

                {/* Área resposta */}
                <div className='d-flex px-5 pt-4'>
                  <TextareaAutosize
                    {...register('value')}
                    onChange={(e) => { setValue('value', e.target.value) }}
                    placeholder='Digite sua resposta aqui...'
                    style={{
                      width: '100%',
                      minHeight: '300px',
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #757575',
                    }}
                  />
                </div>

                {/* Limite caracter, temas e botão IA */}
                <div className='d-flex align-items-center justify-content-between px-5 py-4'>
                  <span className='text-muted'>0 / 1000</span>

                  <div className='d-flex justify-content-center'>
                    <div className='d-flex btn bg-pink text-primary align-items-center justify-content-center rounded-5 me-4'
                      style={{ width: '32px', height: '32px' }}
                    >
                      <span className='material-symbols-outlined' style={{ fontSize: '16px' }}>help</span>
                    </div>
                    <div className='d-flex btn bg-pink text-primary align-items-center justify-content-center rounded-5'
                      style={{ width: '68px', height: '32px' }}
                    >
                      <span className='material-symbols-outlined' style={{ fontSize: '16px' }}>mood</span>
                      <span className='material-symbols-outlined' style={{ fontSize: '16px' }}>keyboard_arrow_down</span>
                    </div>
                  </div>

                  <div className='d-flex btn bg-pink text-primary align-items-center justify-content-center rounded-5'
                    style={{ height: '32px' }}
                    onClick={() => {}}
                  >
                    <b className='f-12'>Texto sugerido pelo IAutor</b>
                    <img className='ps-1' src={artificialInteligence} />
                  </div>
                </div>

                {/* Botões navegação das perguntas */}
                <div className='d-flex align-items-center justify-content-between px-5 pt-3'>
                  <div className='d-flex btn bg-disabled text-icon align-items-center justify-content-center rounded-5 p-3'
                    style={{ height: '48px', minWidth: '140px' }}
                    onClick={() => {}}
                  >
                    <span className='material-symbols-outlined pe-2' style={{ fontSize: '24px' }}>arrow_left_alt</span>
                    <b className='f-16'>Voltar</b>
                  </div>

                  <div className='d-flex btn bg-disabled text-icon align-items-center justify-content-center rounded-5 p-3'
                    onClick={() => {}}
                  >
                    <span className='material-symbols-outlined' style={{ fontSize: '24px' }}>swipe_right</span>
                  </div>

                  <div className='d-flex btn bg-disabled text-icon align-items-center justify-content-center rounded-5 p-3'
                    style={{ height: '48px', minWidth: '140px' }}
                    onClick={() => {}}
                  >
                    <b className='f-16'>Salvar</b>
                    <span className='material-symbols-outlined ps-2' style={{ fontSize: '24px' }}>play_lesson</span>
                  </div>
                </div>

                <div className='d-flex text-icon justify-content-center f-14 pt-2'>Pular Pergunta</div>

              </div>

              {/* Preview */}
              <div className='col-md bg-iautor p-0'>

                <div className='d-flex bg-white justify-content-center p-4'
                  style={{ borderBottom: '3px solid #db3737' }}
                >
                  <div className='f-14'>Preview do Livro</div>
                </div>

                <div className='d-flex bg-white shadow rounded-3 align-items-center mx-5 my-4 p-4'>
                  <div className='d-flex f-14 px-5'>Ferramentas de Edição</div>
                  <div className='d-flex text-icon ps-4'>
                    {/* add icons */}
                    <span className='material-symbols-outlined px-2' style={{ fontSize: '24px' }}>add_photo_alternate</span>
                    <span className='material-symbols-outlined px-2' style={{ fontSize: '24px' }}>draw</span>
                    <span className='material-symbols-outlined px-2' style={{ fontSize: '24px', color: '#db3737' }}
                    >
                      auto_stories
                    </span>
                    <span className='material-symbols-outlined px-2' style={{ fontSize: '24px' }}>file_save</span>
                    <span className='material-symbols-outlined px-2 pe-4' style={{ fontSize: '24px' }}>featured_seasonal_and_gifts</span>
                  </div>
                </div>

                <div className='d-flex justify-content-center pb-4'>
                  <img src='/src/assets/img/preview-capa-livro.png' />
                </div>

              </div>

            </div>
          </div>
        </main>

      </section>
    </div>
  );
};

export default NewHistory;
