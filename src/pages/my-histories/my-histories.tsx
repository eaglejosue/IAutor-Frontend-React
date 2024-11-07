import { useEffect } from 'react';

import Sidebar from '../../components/nav/sidebar.component';
import NavUserOptions from '../../components/nav/nav-user-options.component';

const NewHistory = () => {

  useEffect(() => {
  }, []);

  return (
    <div className='d-flex'
      style={{ height: '100vh' }}
    >
      <Sidebar navItem='my-histories' />
      <div className='flex-grow-1'>

        <header className='bg-white border-bottom p-3'>
          <div className='d-flex flex-wrap align-items-center justify-content-center'>

            {/* Nav título página */}
            <div className='col fw-bold f-18'>
              Minhas Histórias
            </div>

            {/* Nav user */}
            <div className='col-md-6'>
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
        </header>

        <main className='main bg-white'>
          <div className='container-fluid'>
            <div className='row'>

              {/*  */}

            </div>
          </div>
        </main>

      </div>
    </div>
  );
};

export default NewHistory;
