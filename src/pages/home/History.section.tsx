import { useEffect, useState } from "react";
import {home1,home2,home3,home4, scroll} from '../../assets/svg';


const SectionHistory =() =>{

    interface CardHomeProps{
      title:string
      text:string
      icon:string;
      marginLeft:string
      marginRight:string
      marginTop:string
    }
    const CardHome =(props:CardHomeProps)=>{
      return (
        <>
          <div className="div-home-card text-start p-4 z-4 position-relative" 
              style={{marginLeft:props.marginLeft,marginRight:props.marginRight,marginTop:props.marginTop}}>
            <img className="mb-3" alt="icon-home" src={props.icon} /><br></br>
            <strong>{props.title}</strong>
            <p className="">{props.text}</p>
          </div>
        </>
      );
    }


    const [imgRandomSrc, setImgRandomSrc] = useState('1');

    useEffect(() => {
      const randomIndex = Math.floor(Math.random() * 21) + 1;// Gera um número entre 1 e 21
      const imageUrl = `/src/assets/img/random/${randomIndex}.jpg`;
      setImgRandomSrc(imageUrl);
    }, []);
    
    return (
      <>
        <div className="row mb-5">
          <div className="col-3"></div>
          <div className="col-6 text-center ">
            <h1 className="f-50 mb-0"><strong>Sua História vale a pena ser contada.</strong></h1>
            <p className="f-18 mt-3"> Relembre e escreva um lindo livro de memórias<br></br> e momentos
            especiais!</p>
          </div>
          <div className="col-3"></div>
        </div>

        <div className="history-backgroud">
          <div className="row  mb-5 section-history-main  ">
            <div className="col-3 "><CardHome icon={home1} title="Recorde-se" 
            text="Relembre momentos importantes com as perguntas." marginLeft="-48px" marginRight="0px" marginTop="-349px" /> </div>
            <div className="col-6 ">
              <div className="row text-center">
                <div className="d-flex justify-content-center z-0 ">
                  <img
                    src={imgRandomSrc}
                    className="history-ipad img-fluid z-0"
                    style={{
                      width: "400px",
                      marginTop:"-20px",
                      height: "571px",
                      objectFit: "cover",
                      borderRadius: "15px",
                      
                    }}
                  />
                </div>
                <img src={scroll} alt="Scroll" className="img-scroll z-1" width={40} height={80}></img>
              </div>
            </div>
            <div className="col-3"><CardHome icon={home2} marginLeft="-442px" marginRight="0px" marginTop="-349px" title="Preserve momentos" 
            text="Mantenha viva suas histórias escrevendo para outras gerações." /> </div>       

            <div className="col-3"><CardHome icon={home3} marginLeft="-85px" marginRight="0px" marginTop="-709px" title="Escreva histórias" 
            text="O IAutor possuí mais de 100 perguntas que vai te ajudar a contar as histórias." /></div>        
            <div className="col-6"></div>        
            <div className="col-3"><CardHome icon={home4} marginLeft="-385px" marginRight="0px" marginTop="-709px" title="Pratique sua escrita" 
            text="Melhore seu desempenho com a escrita e faça dele um hobby diário." /></div>        
          </div>
        </div>
      </>
    );
}

export default SectionHistory