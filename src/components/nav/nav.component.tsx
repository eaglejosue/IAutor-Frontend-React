import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import useScreenSize from '../../hooks/useScreenSize';
import paths from '../../routes/paths';
import Logo from '../../assets/img/Logo.png';
import UserWhiteSvg from '../../assets/svg/user-white.svg';

const Nav = () => {
  const navigate = useNavigate();
  const { isExtraSmallScreen, isSmallScreen } = useScreenSize();

  return (
    <header className='container'>
      <div className='row align-items-center'>
        <div className='col-md-auto'>
          <img src={Logo} alt="Logo" className="p-4"
            height={isExtraSmallScreen || isSmallScreen ? "80" : "auto"}
            onClick={() => navigate(paths.HOME)}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <div className='col-md'>
          <a href='#' className='btn btn-outline-secondary rounded-5 f-14 px-4 py-2'>
            Ver Planos
            <FontAwesomeIcon icon={faChevronRight} className='text-primary ms-2 pt-1' />
          </a>
        </div>
        <div className='col-md-auto text-end'>
          {isExtraSmallScreen || isSmallScreen ?
            <button className='btn bg-secondary text-white d-flex align-items-center'
              onClick={() => navigate(paths.LOGIN)}
            >
              <img src={UserWhiteSvg} style={{ height: '14px', width: '14px' }} />
            </button> :
            <>
              <button className='btn btn-outline-secondary rounded-5 f-14 px-4 py-2 me-3'
                onClick={() => navigate(paths.LOGIN)}
              >
                Login
              </button>
              <button className='btn bg-secondary text-white rounded-5 f-14 px-4 py-2'
                onClick={() => navigate(paths.NEW_HISTORY)}
              >
                Experimente Criar uma História
              </button>
            </>
          }
        </div>
      </div>
    </header>
  );
};

export default Nav;