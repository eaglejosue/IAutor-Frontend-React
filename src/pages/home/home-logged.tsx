import { useState, useEffect } from 'react';

import Sidebar from '../../components/nav/sidebar.component';
import NavUserOptions from '../../components/nav/nav-user-options.component';

import horizontalImgs from '../../assets/horizontal-imgs';
import './home-logged.scss'
import { AuthenticatedUserModel } from '../../common/models/authenticated.model';
import { rectangle_home_right_admin } from '../../assets/img';
import { homelogged } from '../../assets/svg';
import { Button } from 'react-bootstrap';

const HomeLogged = () => {
  const [imgRandomSrc, setImgRandomSrc] = useState('1');
  const user = AuthenticatedUserModel.fromLocalStorage();

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 16);// Gera um número entre 0 e 15
    setImgRandomSrc(horizontalImgs[randomIndex]);
    console.log(user?.firstname+ ' '+ user?.lastname)
  }, []);

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Sidebar navItem="home" />
      <section className="flex-grow-1">
        <header className="bg-white border-bottom p-3">
          <div className="row align-items-center justify-content-beetwen">
            <div className="col-auto fw-bold f-18 pe-0">IAutor /</div>
            <div className="col-auto f-18 ps-1">Home</div>
            <div className="col">
              <NavUserOptions />
            </div>
          </div>
        </header>

        <main className="main">
          <div className="container-fluid">
            <div className="row m-5">
              <div className="col-4">
                <strong>
                  <h3>Bem vindo, {user?.firstname + " " + user?.lastname}</h3>
                </strong>
                <p>Comece criando uma primeira história.</p>
              </div>
              <div className="col-8 rectangle-right-admin p-4">
                  <img
                    className="img-fluid mb-2"
                    src={homelogged}
                    alt="button home logged"
                  ></img>
                  <p>
                    <strong>Faça uma Degustação</strong>
                  </p>
                  <p>
                    Relembre e escreva um lindo livro de memórias e <br></br>
                    momentos, Experimente!
                  </p>
                  <Button
                    variant=" btn-custom-gray-2"
                    className=" rounded-5  f-14  p-3"
                  >
                    <strong>Começar</strong>
                  </Button>
                </div>
             
            </div>

            <div className='row '>
              <div className='col-12'>

              

                    <div className="row  home-explore m-5 bg-white p-5 border rounded">
                            <div className='col-12 mb-4'><h4><strong>Explore o IAutor</strong></h4></div>
                        
                            <div className='col-5 explore-left p-5'>
                                <span><strong>Saiba mais sobre o IAutor</strong></span>
                                <p className='mt-2'>
                                Conheça nossa história, valores <br></br>e propósitos.</p>
                                <Button
                                variant=" btn-secondary"
                                className=" rounded-5  f-14  p-3"
                              >
                                <strong>Clique aqui</strong>
                              </Button> 
                            </div>
                            <div className='col-2 '></div>
                            <div className='col-5 explore-right p-5 '>
                                <span><strong>FAQ</strong></span>
                                <p className='mt-2'>
                                Encontre respostas rápidas para<br></br> suas dúvidas mais comuns.</p>
                                <Button
                                variant=" btn-secondary"
                                className=" rounded-5  f-14  p-3"
                              >
                                <strong>Clique aqui</strong>
                              </Button> 
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
