import { useEffect, useState } from "react";
import { home1, home2, home3, home4, scroll } from '../../../assets/svg';
import verticalImgs from '../../../assets/vertical-imgs';
import { Card, Carousel } from "react-bootstrap";

interface CardHomeProps {
  title: string
  text: string
  icon: string;
  marginLeft: string
  marginRight: string
  marginTop: string
}

interface CardHomeMobileProps {
  title: string
  text: string
  icon: string;

}
const SectionHistory = () => {

  const CardHome = (props: CardHomeProps) => {
    return (
      <>
        <div className="div-home-card text-start p-3 z- position-relative"
          style={{ marginLeft: props.marginLeft, marginRight: props.marginRight, marginTop: props.marginTop }}>
          <img className="mb-3" alt="icon-home" src={props.icon} />
          <br/>
          <strong>{props.title}</strong>
          <p className="textCards">{props.text}</p>
        </div>
      </>
    );
  }

  const CardHomeMobile = (props: CardHomeMobileProps) => {
    return (
      <>
        <div className="div-home-card-mobile text-start p-3"
          >
          <img className="mb-3" alt="icon-home" src={props.icon} />
          <br/>
          <strong>{props.title}</strong>
          <p className="textCards">{props.text}</p>
        </div>
      </>
    );
  }

  const [imgRandomSrc, setImgRandomSrc] = useState('1');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 21) + 1;// Gera um número entre 1 e 21
    setImgRandomSrc(verticalImgs[randomIndex]);
  }, []);

  return (
    <>
      <div className="row mb-3">
        <div className="col-3"></div>
        <div className="col-lg-6 text-center ">
          <h1>
            <strong>Sua História vale a pena ser contada.</strong>
          </h1>
          <p className="f-18 mt-3">
            Relembre e escreva um lindo livro de memórias e momentos especiais!
          </p>
        </div>
        <div className="col-3"></div>
      </div>
      <div className="row mobileShowHome history-backgroud mb-5 pb-3 ">
        <div className="col-sm-12 text-center ">
          <a
            className="btn btn-secondary rounded-5 f-14 px-5 py-3  btn-lg"
            href="#plans"
          >
            <strong>Experimente Criar uma História</strong>
          </a>
        </div>
        <div className="col-sm-12 mb-2 ">
          <div className="row text-center">
            <div className="d-flex justify-content-center z-0 ">
              <img
                src={imgRandomSrc}
                className="history-ipad img-fluid z-0"
                style={{
                  width: "400px",
                  marginTop: "30px",
                  height: "550px",
                  objectFit: "cover",
                  borderRadius: "15px",
                  border: "solid",
                  borderWidth: "25px",
                }}
              />
            </div>
            <img
              src={scroll}
              alt="Scroll"
              className="img-scroll z-1"
              width={40}
              height={80}
            ></img>
          </div>
        </div>
        <div className="col-sm-12">
          <Carousel>
            <Carousel.Item>
            <CardHomeMobile
              icon={home1}
              title="Recorde-se"
              text="Relembre momentos importantes com as perguntas."
            />
            
            </Carousel.Item>
            <Carousel.Item>
            <CardHomeMobile
             icon={home2}
             title="Preserve momentos"
             text="Mantenha viva suas histórias escrevendo para outras gerações."
            />
            
            </Carousel.Item>
            <Carousel.Item>
            <CardHomeMobile
              icon={home3}
        
              title="Escreva histórias"
              text="IAutor possuí mais de 100 perguntas que vão te ajudar a contar as histórias."
            />
            
            </Carousel.Item>
            <Carousel.Item>
            <CardHomeMobile
              icon={home4}
           
              title="Pratique sua escrita"
              text="Melhore seu desempenho com a escrita e faça dele um hobby diário."
            />
             
            </Carousel.Item>
          </Carousel>
        </div>
      </div>

      <div className="history-backgroud desktopShowHome">
        <div className="row  mb-5 section-history-main  ">
          <div className="col-3 ">
            <CardHome
              icon={home1}
              marginLeft="-48px"
              marginRight="0px"
              marginTop="-349px"
              title="Recorde-se"
              text="Relembre momentos importantes com as perguntas."
            />
          </div>
          <div className="col-6 ">
            <div className="row text-center">
              <div className="d-flex justify-content-center z-0 ">
                <img
                  src={imgRandomSrc}
                  className="history-ipad img-fluid z-0"
                  style={{
                    width: "400px",
                    marginTop: "-20px",
                    height: "570px",
                    objectFit: "cover",
                    borderRadius: "15px",
                  }}
                />
              </div>
              <img
                src={scroll}
                alt="Scroll"
                className="img-scroll z-1"
                width={40}
                height={80}
              ></img>
            </div>
          </div>
          <div className="col-3">
            <CardHome
              icon={home2}
              marginLeft="-442px"
              marginRight="0px"
              marginTop="-349px"
              title="Preserve momentos"
              text="Mantenha viva suas histórias escrevendo para outras gerações."
            />
          </div>
          <div className="col-3">
            <CardHome
              icon={home3}
              marginLeft="-85px"
              marginRight="0px"
              marginTop="-709px"
              title="Escreva histórias"
              text="IAutor possuí mais de 100 perguntas que vão te ajudar a contar as histórias."
            />
          </div>
          <div className="col-6"></div>
          <div className="col-3">
            <CardHome
              icon={home4}
              marginLeft="-385px"
              marginRight="0px"
              marginTop="-709px"
              title="Pratique sua escrita"
              text="Melhore seu desempenho com a escrita e faça dele um hobby diário."
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SectionHistory