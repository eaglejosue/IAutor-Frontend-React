import { useEffect, useState } from 'react';

import Nav from '../../components/nav/nav.component';

const Home = () => {
  const [imgRandomSrc, setImgRandomSrc] = useState('1');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 21) + 1;// Gera um número entre 1 e 21
    const imageUrl = `../src/assets/img/random/${randomIndex}.jpg`;
    setImgRandomSrc(imageUrl);
  }, []);

  return (
    <>
      <Nav />

      <main className='main'>

        <section className='container my-3'>
          <div className='row text-center'>

            <h1 className='f-50 mb-0'>Sua História vale a pena ser contada.</h1>

            <div className='f-18 mt-3'>Relembre e escreva um lindo livro de memórias e momentos especiais!</div>

            <div className='d-flex justify-content-center mt-3'>
              <img src={imgRandomSrc} style={{ maxWidth: '600px', maxHeight: '380px', objectFit: 'cover', borderRadius: '9px' }} />
            </div>

          </div>
        </section>

      </main>
    </>
  );
};

export default Home;
