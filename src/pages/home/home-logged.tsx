import { useState, useEffect } from 'react';

import Sidebar from '../../components/nav/sidebar.component';
import NavUserOptions from '../../components/nav/nav-user-options.component';

const HomeLogged = () => {
  const [imgRandomSrc, setImgRandomSrc] = useState('1');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 21) + 1;// Gera um número entre 1 e 21
    setImgRandomSrc(`/src/assets/img/random/${randomIndex}.jpg`);
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

        <main className='main bg-white'>
          <div className='container-fluid'>
            <div className='row'>



            </div>
          </div>
        </main>

      </section>
    </div>
  );
};

export default HomeLogged;
