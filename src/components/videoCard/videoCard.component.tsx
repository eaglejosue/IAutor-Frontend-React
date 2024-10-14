import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faPlay } from '@fortawesome/free-solid-svg-icons';

import PlayCircle from '../../assets/img/home/play-circle.png';
import IAutor from '../../assets/img/IAutor.com.png';

export interface VideoCardProps {
  imgUrl: string;
  title: string;
  titleFontSize?: string;
  buttonText: string;
  enabled: boolean;
  onClick?: any;
  usePlayBtn?: boolean;
  isLoading?: boolean
}

function VideoCard(p: VideoCardProps) {
  return (
    p.isLoading ?
      <Card style={{ maxWidth: '304px', height: '236px', marginLeft: 'auto', marginRight: 'auto' }}>
        <div className='d-flex justify-content-center align-items-center' style={{ height: '100%', borderRadius: '9px' }}>
          <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="sr-only">Carregando...</span>
          </div>
        </div>
      </Card> :
      <Card style={{ maxWidth: '304px', height: '236px', marginLeft: 'auto', marginRight: 'auto', position: 'relative' }}>
        <div className='d-flex justify-content-center'>
          <img src={PlayCircle} style={{ position: 'absolute', zIndex: 1, top: '15%' }} />
          <img src={IAutor} style={{ position: 'absolute', zIndex: 1, top: '65%' }} />
        </div>

        {p.imgUrl ?
          (
            <Card.Img src={p.imgUrl}
              style={
                p.enabled ?
                  {
                    maxWidth: '304px',
                    height: '236px',
                    objectFit: 'cover',
                    borderRadius: '9px',
                    filter: 'blur(3px)'
                  } :
                  {
                    maxWidth: '304px',
                    height: '236px',
                    objectFit: 'cover',
                    borderRadius: '9px',
                    background: 'url(<path-to-image>) lightgray 50% / cover no-repeat',
                    mixBlendMode: 'luminosity',
                    filter: 'blur(3px)'
                  }
              }
            />
          ) :
          (
            <div id='bkg-img'
              style={{
                background: 'linear-gradient(150deg, #E0E0E0, #9795B5)',
                minHeight: '236px',
                width: "100%",
                alignItems: 'start',
                borderRadius: '9px'
              }}
            ></div>
          )
        }

        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '9px'
        }}></div>

        <div className='d-flex justify-content-center'>
          <p className='text-white mx-4'
            style={{
              position: 'absolute',
              zIndex: 2,
              top: '25%',
              textAlign: 'center',
              fontSize: p.titleFontSize ?? '16px'
            }}
          >{p.title}</p>
        </div>

        <div className='d-flex justify-content-center mx-5'>
          {!p.usePlayBtn
            ?
            p.enabled
              ?
              <button className='btn bg-IAutor text-white f-12 d-flex align-items-center'
                onClick={p.onClick}
                style={{ position: 'absolute', zIndex: 2, top: '78%' }}
              >
                <span className="material-symbols-outlined fs-5" style={{ marginRight: '5px' }}>
                  monetization_on
                </span>
                {p.buttonText}
              </button>
              :
              <button className='btn transparent-btn text-body-bg border f-12'
                disabled={true}
                onClick={p.onClick}
                style={{ position: 'absolute', zIndex: 2, top: '78%' }}
              >
                <FontAwesomeIcon icon={faLock} className='mx-2' />
                {p.buttonText}
              </button>
            :
            <button className='btn transparent-btn text-body-bg border f-12'
              onClick={p.onClick}
              style={{ position: 'absolute', zIndex: 2, top: '78%' }}
            >
              <FontAwesomeIcon icon={faPlay} className='mx-2' />
              {p.buttonText}
            </button>
          }
        </div>
      </Card>
  );
}

export default VideoCard;
