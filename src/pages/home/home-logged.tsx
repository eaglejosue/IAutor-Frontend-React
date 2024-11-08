import { useState, useEffect } from 'react';

import Sidebar from '../../components/nav/sidebar.component';
import NavUserOptions from '../../components/nav/nav-user-options.component';

import horizontalImgs from '../../assets/horizontal-imgs';

const HomeLogged = () => {
  const [imgRandomSrc, setImgRandomSrc] = useState('1');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 16);// Gera um número entre 0 e 15
    setImgRandomSrc(horizontalImgs[randomIndex]);
  }, []);

  return (
    <div className='d-flex'
      style={{ height: '100vh' }}
    >
      <Sidebar navItem='home' />
      <section className='flex-grow-1'>

        <header className='bg-white border-bottom p-3'>
          <div className='row align-items-center justify-content-beetwen'>
            <div className='col-auto fw-bold f-18 pe-0'>
              IAutor /
            </div>
            <div className='col-auto f-18 ps-1'>
              Home
            </div>
            <div className='col'>
              <NavUserOptions />
            </div>
          </div>
        </header>

        <main className='main'>
          <div className='container-fluid'>
            <div className='row'>

              {/* Add */}

              {/* Img baixo */}
              <div className='col-12 col-xl-4 offset-xl-8'
                style={{ minHeight: '845px' }}
              >
                <div id='img-baixo' style={{ marginTop: '40vh' }}>

                  <div className='d-flex justify-content-center'>
                    <img src={imgRandomSrc} style={{ width: '380px', height: '250px', objectFit: 'cover', borderRadius: '5px'}}/>
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

            </div>
          </div>
        </main>

      </section>
    </div>
  );
};

export default HomeLogged;
