import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';

import useScreenSize from '../../hooks/useScreenSize';
import Logo from '../../assets/img/Logo.png';
import './footer.scss'
export interface FooterProps {
  showOnlyIcons?: boolean;
}

const Footer = (p: FooterProps) => {
  const { isExtraSmallScreen, isSmallScreen } = useScreenSize();

  return (
    <footer className='m-2'>
      {p.showOnlyIcons
        ?
        <div className='container'>
          <ul className="nav justify-content-center align-items-center"
            style={{ fontSize: 16, lineHeight: '18px' }}
          >
            <li>
              <p className="text-center f-14 mt-4">Copyright © 2024 IAutor | Todos os direitos reservados</p>
            </li>
            <li className='bg-primary d-flex justify-content-center align-items-center'
              style={{ width: '36px', height: '36px', borderRadius: '100%', marginRight: '15px', marginLeft: '15px' }}>
              <a href='#'>
                <FontAwesomeIcon icon={faFacebookF} style={{ color: 'white' }} />
              </a>
            </li>
            <li className='bg-primary d-flex justify-content-center align-items-center'
              style={{ width: '36px', height: '36px', borderRadius: '100%', marginRight: '15px' }}>
              <a href='#'>
                <FontAwesomeIcon icon={faInstagram} style={{ color: 'white' }} />
              </a>
            </li>
          </ul>
        </div>
        :
        <div className='container bg-white shadow rounded'>
          <div className='row mx-5'>
            
            <ul className="nav justify-content-center pt-5 ulResponsive"
              style={{ fontSize: 16, lineHeight: '18px' }}
            >
              <li className="nav-item pb-5" style={{ marginRight: '2rem' }}>
                <img src={Logo} alt="Logo" className='img-fluid'
                  height={isExtraSmallScreen || isSmallScreen ? "80" : "auto"}
                  style={{ cursor: 'default' }}
                />
              </li>
              <li className="nav-item" style={{ fontWeight: 700 }}>
                <a href="#history" className="nav-link px-4 text-body-primary">Home</a>
              </li>
              <li className="nav-item" style={{ fontWeight: 400 }}>
                <a href="#who" className="nav-link px-4 text-black">Sobre nós</a>
              </li>
              <li className="nav-item" style={{ fontWeight: 400 }}>
                <a href="#faq" className="nav-link px-4 text-black">FAQs</a>
              </li>
              <li className="nav-item" style={{ fontWeight: 400 }}>
                <a href="#testemonials" className="nav-link px-4 text-black">Depoimentos</a>
              </li>
              <li className="nav-item" style={{ fontWeight: 400 }}>
                <a href="#plans" className="nav-link px-4 text-black">Ver Planos</a>
              </li>
              <li className="nav-item" style={{ fontWeight: 400 }}>
                <a href="#contact" className="nav-link px-4 text-black">Fale Conosco</a>
              </li>

              
              <li className=' nav-item bg-primary d-flex justify-content-center align-items-center'
                style={{ width: '36px', height: '36px', borderRadius: '100%', marginRight: '15px', marginLeft: '5rem' }}>
                <a href='#'>
                  <FontAwesomeIcon icon={faFacebookF} style={{ color: 'white' }} />
                </a>
              </li>
              <li className=' nav-item bg-primary d-flex justify-content-center align-items-center'
                style={{ width: '36px', height: '36px', borderRadius: '100%', marginRight: '15px' }}>
                <a href='#'>
                  <FontAwesomeIcon icon={faInstagram} style={{ color: 'white' }} />
                </a>
              </li>
             
            </ul>




            <div className='border-bottom'></div>
            <p className="text-center f-14 mt-4 pb-4">Copyright © 2024 IAutor | Todos os direitos reservados.</p>
          </div>
        </div>
      }
      <div className='d-flex' style={{ minHeight: '90px' }}></div>
    </footer>
  );
}

export default Footer;
