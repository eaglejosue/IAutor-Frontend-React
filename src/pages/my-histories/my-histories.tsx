import { useEffect } from 'react';

import Sidebar from '../../components/nav/sidebar.component';
import NavUserOptions from '../../components/nav/nav-user-options.component';

const MyHistories = () => {
  //

  useEffect(() => {
    //
  }, []);

  return (
    <div className="d-flex"
      style={{ height: '100vh' }}
    >
      <Sidebar />

      <div className="flex-grow-1">
        <NavUserOptions pageName='Criar História' />

        <main className='main bg-white'>
          <div className='row'>

            <div className='col-4 border-end'>
              a
            </div>

            <div className='col-4 border-end'>
              a
            </div>

            <div className='col-4'>
              a
            </div>

          </div>
        </main>
      </div>

    </div>
  );
};

export default MyHistories;
