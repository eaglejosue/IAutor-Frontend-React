import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import './videoCardProfile.component.scss';

interface VideoCardPerfilProps {
  title: string;
  description: string;
  durationTime?: string;
  dateTimeRelease: string;
  price: string;
  urlImgBackground: string;
  btnDisabled?: boolean;
  isLoading?: boolean;
  onClickPay: () => void;
}

const VideoCardPerfil = (p: VideoCardPerfilProps) => {
  if (p.isLoading) {
    return (
      <div id='bkg-img' style={{
        backgroundColor: '#AD00FF',
        minHeight: '450px',
        width: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '9px'
      }}>
        <div className="spinner-border text-body-bg" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="sr-only">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div id='bkg-img' style={{ position: 'relative', borderRadius: '9px', minHeight: '450px', width: '100%' }}>
      <div style={{
        backgroundImage: p.urlImgBackground ? `url(${p.urlImgBackground})` : undefined,
        backgroundColor: p.urlImgBackground ? undefined : '#AD00FF',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        borderRadius: '9px',
        minHeight: '450px',
        width: "100%"
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '9px'
        }}></div>

        <div className='text-white mx-5 py-5' style={{ position: 'relative', zIndex: 1 }}>
          <button className='btn transparent-btn text-body-bg border px-3 my-3 disabled' style={{ cursor: 'default' }}>
            Toda a Verdade sobre
          </button>

          <h3 className='fw-bold f-30 mb-0'>{p.title}</h3>
          <p className='my-3 mt-0 mb-4'>{p.description}</p>

          {p.durationTime && 
            <div>
              <FontAwesomeIcon icon={faStopwatch} /> {p.durationTime} de Duração
            </div>
          }

          <div className='fw-bold mt-1'>
            <FontAwesomeIcon icon={faCalendarCheck}/> Data e Horário da Verdade: {p.dateTimeRelease}
          </div>

          <div className='d-flex justify-content-start mt-5'>
            <button
              className='btn btn-body-bg text-primary p-3 d-flex align-items-center'
              disabled={p.btnDisabled || p.isLoading}
              onClick={p.onClickPay}
            >
              <span className="material-symbols-outlined fs-5" style={{ marginRight: '5px' }}>
                monetization_on
              </span>
              <span className='fw-bold'>Pague {p.price} Pela Verdade</span>
              {p.isLoading &&
                <span className="spinner-border spinner-border-sm text-light ms-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCardPerfil;
