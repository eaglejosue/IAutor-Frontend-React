import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';

interface PerfilCardProps {
  img: string;
  name: string;
  socialUserName: string;
  twitter?: string;
  instagram?: string;
  tiktok?: string;
  memberSince?: string;
  loadingStates: {
    img: boolean;
    name: boolean;
    socialUserName: boolean;
    social: boolean;
    memberSince: boolean;
  };
}

const PerfilCard = (p: PerfilCardProps) => {
  return (
    <div className="card text-center p-4 border-0" style={{ top: "-12%" }}>
      <div className="card-img-top mx-auto d-block" style={{
        width: '110px',
        height: '110px',
        backgroundImage: `url(${!p.loadingStates.img && p.img})`,
        backgroundSize: p.loadingStates.img ? '35%' : 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundColor: '#F2F1FA',
        borderWidth: '3px',
        borderColor: '#f0f0f0',
        borderRadius: '50%'
      }}>
        {p.loadingStates.img && <div className="spinner-border text-primary " role="status">
          <span className="sr-only">Carregando...</span>
        </div>}
      </div>
      <div className="card-body">
        <h1 className="card-title">{p.loadingStates.name ? <div className="spinner-border text-icon " role="status"></div> : p.name}</h1>
        <p className="card-text text-muted mb-2 f-22">{p.loadingStates.socialUserName ? <div className="spinner-border text-icon spinner-small" role="status"></div> : p.socialUserName}</p>
        {(p.twitter || p.instagram || p.tiktok) &&
          <>
            <p className="text-muted mt-5">Redes Sociais</p>
            <div className="d-flex justify-content-center align-items-center mb-2">
              {p.twitter &&
                <a href={p.twitter} target="_blank" rel="noopener noreferrer" className="btn btn-light rounded-3 shadow-sm mx-2 bg-bgIcon">
                  {p.loadingStates.social ? <div className="spinner-border text-icon spinner-small" role="status"></div> : <FontAwesomeIcon icon={faTwitter} className='text-icon' />}
                </a>
              }
              {p.instagram &&
                <a href={p.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-light rounded-3 shadow-sm mx-2 bg-bgIcon">
                  {p.loadingStates.social ? <div className="spinner-border text-icon spinner-small" role="status"></div> : <FontAwesomeIcon icon={faInstagram} className='text-icon' />}
                </a>
              }
              {p.tiktok &&
                <a href={p.tiktok} target="_blank" rel="noopener noreferrer" className="btn btn-light rounded-3 shadow-sm mx-2 bg-bgIcon">
                  {p.loadingStates.social ? <div className="spinner-border text-icon spinner-small" role="status"></div> : <FontAwesomeIcon icon={faTiktok} className='text-icon' />}
                </a>
              }
            </div>
          </>
        }
        <p className="text-muted mt-5 mb-0 fw-bold f-14">MEMBRO DESDE: {p.loadingStates.memberSince ? <div className="spinner-border text-icon spinner-small" role="status"></div> : p.memberSince}</p>
      </div>
    </div>
  );
};

export default PerfilCard;
