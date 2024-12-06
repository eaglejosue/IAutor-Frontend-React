import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import useScreenSize from '../../hooks/useScreenSize';
import useUserLogged from '../../hooks/useUserLogged';
import paths from '../../routes/paths';
import Logo from '../../assets/img/Logo.png';
import UserWhiteSvg from '../../assets/svg/user-white.svg';
import NavUserOptions from './nav-user-options.component';

const Nav = () => {
  const navigate = useNavigate();
  const { isExtraSmallScreen, isSmallScreen } = useScreenSize();
  const userIsLogged = useUserLogged();

  return (
    <header className='d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3   '>
      <div className='col-md-auto mb-2 mb-md-0'>
        <img src={Logo} alt="Logo" className="p-4"
          height={isExtraSmallScreen || isSmallScreen ? "80" : "auto"}
          onClick={() => navigate(userIsLogged ? paths.HOME : paths.HOME_LOGGED)}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <div className='col-md'>
        <a href='#plans' className='btn btn-outline-secondary rounded-5 f-14 px-4 py-2'>
          Ver Pacotes
          <FontAwesomeIcon icon={faChevronRight} className='text-primary ms-2 pt-1' />
        </a>
      </div>
      <div className='col-md-auto text-end'>
        {userIsLogged ?
          <NavUserOptions /> :
          <>
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
                  onClick={() => navigate(paths.LOGIN)}
                >
                  Experimente Criar uma História
                </button>
              </>
            }</>
        }
      </div>
    </header>
  );
};

export default Nav;