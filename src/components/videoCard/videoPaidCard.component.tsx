import { useEffect, useState } from 'react';

import useScreenSize from '../../hooks/useScreenSize';
import PlayCircle from '../../assets/img/home/play-circle.png';
import { handleMoneyChange } from "../../components/forms/customInput/masks";

export interface VideoPaidProps {
  imgUrl: string;
  paidDateTime?: string;
  duration: string;
  title: string;
  price: number;
  isWatched: boolean;
  releaseDate: string;
  userCanWatch: boolean;
  handleVideoClick: () => void;
}

const VideoPaid = (p: VideoPaidProps) => {
  const { isExtraSmallScreen, isSmallScreen, isMediumScreen } = useScreenSize();
  const lessThan900Screen = (isExtraSmallScreen || isSmallScreen || isMediumScreen);
  const [videoPrice, setVideoPrice] = useState('');

  useEffect(() => {
    setVideoPrice(handleMoneyChange(p.price));
  }, []);

  return (
    <div className="bg-body border-0 rounded my-2 shadow-sm p-4">
      <div className="row">
        <div className="col-sm-12 col-md-3 col-lg-2">
          <div className='d-flex justify-content-center position-relative'>
            <img className='mt-4 position-absolute' src={PlayCircle} style={{ zIndex: 1 }} />
            <img src={p.imgUrl} alt="Vídeo" className="img-fluid rounded"
              style={
                p.isWatched ?
                  {
                    filter: 'blur(3px)',
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                  } :
                  {
                    filter: 'blur(3px)',
                    background: 'url(<path-to-image>) lightgray 50% / cover no-repeat',
                    mixBlendMode: 'luminosity',
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                  }
              }
            />
          </div>
        </div>

        <div className="col-sm-12 col-md-8 col-lg-5">
          <div className="card-body m-4">
            <div className="d-flex flex-column flex-md-row mb-2" style={{ display: 'flex', justifyContent: 'start', margin: '0px', padding: '0px' }}>
              <div className="f-12 d-flex" >
                <span className="material-symbols-outlined fs-6">event</span>
                <span className="mx-1">Data e Horário da Compra: {p.paidDateTime}</span>
              </div>
              <div className="f-12 d-flex mx-2">
                <span className="material-symbols-outlined fs-6">timer</span>
                <span className='mx-1'>Duração: {p.duration}</span>
              </div>

            </div>

            <div className="fw-bold">
              {p.title}
            </div>
            <div className="mt-2 fw-bold text-primary f-14 m-0 p-0">
              Total Pago {videoPrice}
            </div>
          </div>
        </div>

        <div className={`col-sm-12 col-md-12 col-lg-5 d-flex justify-content-center ${lessThan900Screen ? '' : 'py-5'}`}>
          {p.userCanWatch ?
            <div className='d-flex'>
              <button className="btn bg-IAutor text-white p-3"
                onClick={p.handleVideoClick}
              >
                Assista agora a Verdade Completa
              </button>
            </div> :
            <div className="d-flex align-items-center fw-bold">
              <span className="material-symbols-outlined fs-3">lock</span>
              Aguarde até {p.releaseDate} para assistir
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default VideoPaid;

