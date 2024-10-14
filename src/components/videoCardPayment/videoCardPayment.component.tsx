import { Card } from 'react-bootstrap';

import PlayCircle from '../../assets/img/home/play-circle.png';
import IAutor from '../../assets/img/IAutor.com.png';
import Spinners from '../../assets/svg/SvgSpinners180Ring.svg';

export interface VideoCardPaymentProps {
  imgUrl: string;
  imgClass?: string;
  title: string;
  description: string;
  showDescription?: boolean;
  showSubscription?: boolean;
  duration?: string;
  dateTimeRelease: string;
  price: string;
  isLoading: boolean;
}

const VideoCardPayment = (p: VideoCardPaymentProps) => {
  return (
    <Card className='mt-0 position-relative' style={{ overflow: 'hidden' }}>
      {p.isLoading ?
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <img src={Spinners} style={{ width: '50px', height: '50px' }} alt="Loading spinner" />
        </div> :
        <>
          <div className='position-relative'>
            <Card.Img
              className={p.imgClass?.length ? p.imgClass : ''}
              src={p.imgUrl}
              style={{ maxHeight: '250px' }}
            />
            <div className="overlay position-absolute top-0 start-0 w-100 h-100" style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}></div>
          </div>

          <div className='position-absolute w-100 h-100' style={{ left: '26%' }}>
            <img src={PlayCircle} style={{ width: '45%' }} />
            <br></br>
            <img src={IAutor} style={{ width: '50%' }} />
          </div>

          <Card.Body className='px-4'>
            <button className='btn transparent-btn text-secondary fw-bold  my-2 disabled' style={{ cursor: 'default' }}>
              Toda a Verdade sobre
            </button>
            <Card.Title className='fw-bold'>{p.title}</Card.Title>
            {p.showDescription && <Card.Text className='f-15'>{p.description}</Card.Text>}
            {p.showDescription && <Card.Text className='f-10 d-flex justify-content-start align-items-center'>
              <span className="material-symbols-outlined fs-5">timer</span>
              {p.duration?.length && <span className='mx-1'> {p.duration} de Duração</span>}
            </Card.Text>
            }
            {p.showDescription && <Card.Text className='f-10 d-flex justify-content-start align-items-center fw-bold'>
              <span className="material-symbols-outlined fs-5">
                calendar_today
              </span>
              <span className='mx-1'> Data e Horário da Verdade: {p.dateTimeRelease}</span>
            </Card.Text>}
            <Card.Text className='fw-bold text-primary f-25 pb-3'>Valor Total {p.price}</Card.Text>
          </Card.Body>
        </>
      }
    </Card>
  );
}

export default VideoCardPayment;
