import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';

import { AuthenticatedUserModel } from '../../common/models/authenticated.model';
import { EnumUserTypes } from '../../common/enums/status.enum';
import paths from '../../routes/paths';

export interface Props {
  pageName?: string
}

const NavUserOptions = (p: Props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<AuthenticatedUserModel>();

  useEffect(() => {
    const user = AuthenticatedUserModel.fromLocalStorage();
    if (user && user.token?.length)
      setUser(user);
  }, []);

  const logout = () => {
    AuthenticatedUserModel.removeLocalStorage();
    navigate(paths.LOGIN);
  };

  return (
    <header className="bg-white border-bottom p-3">
      <div className="container-fluid">
        <div className='d-flex flex-wrap align-items-center justify-content-center'>

          <div className='col-md-4 fw-bold'>
            {p.pageName}
          </div>

          <div className='col-md'>
            <div className='row align-items-center'>
              <div className='col-auto'>
                <b className='bg-pink text-primary rounded-5 f-12 px-4 py-1'>
                  Criação
                </b>
              </div>
              <div className='col-auto f-12'>
                <FontAwesomeIcon icon={faChevronRight} style={{ color:'#7F7F8B' }} />
              </div>
              <div className='col-auto'>
                <b className='bg-disabled text-icon rounded-5 f-12 px-4 py-1'>
                  Finalizar
                </b>
              </div>
            </div>
          </div>

          <div className='col-md-5'>
            <div className='row justify-content-end'>
              <div className='col-auto'>
                <a href='#' className='btn btn-outline-secondary rounded-5 f-12 px-4 py-2'
                  style={{fontWeight:'bold'}}
                >
                  Livro Degustação | Tradicional
                </a>
              </div>
              <div className='col-auto'>
                <a href='#' className='btn bg-secondary text-white rounded-5 f-12 px-4 py-2'
                  style={{fontWeight:'bold'}}
                >
                  Ver Planos
                </a>
              </div>

              <Dropdown className='col-auto text-end'>
                <Dropdown.Toggle className='bg-transparent border-0 p-0' style={{ color: 'black' }}>
                  {user?.profileImgUrl
                    ?
                    <img src={user.profileImgUrl} alt={user.firstname}
                      className='rounded-circle me-1'
                      style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                    />
                    :
                    <a target='_blank' style={{ color: 'black' }}>
                      <FontAwesomeIcon icon={faUser} />
                    </a>
                  }

                </Dropdown.Toggle>

                <Dropdown.Menu style={{ minWidth: '200px', overflow: 'hidden', padding: '10px' }}>

                  <Dropdown.Item onClick={() => navigate(paths.MY_ACCOUNT)}>
                    Minha Conta
                    {user?.profileImgUrl &&
                      <div className='d-flex align-items-center my-3'>
                        <img src={user.profileImgUrl} alt={user.firstname} className="rounded-circle"
                          style={{ width: '45px', height: '45px', objectFit: 'cover' }}
                        />
                        <div className='d-flex flex-column' style={{ marginRight: 'auto', marginLeft: '8px' }}>
                          <label className='f-16 mb-0' style={{ fontWeight: '600' }}>{user.firstname}</label>
                          <label className='f-12 text-muted'>{user.email}</label>
                        </div>
                      </div>
                    }
                  </Dropdown.Item>

                  {user?.type === EnumUserTypes.Admin &&
                    <>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={() => navigate(paths.TERMS)}>Termos</Dropdown.Item>
                      <Dropdown.Item onClick={() => navigate(paths.USERS)}>Usuários</Dropdown.Item>
                      <Dropdown.Item onClick={() => navigate(paths.CHAPTERS)}>Capitulos</Dropdown.Item>
                      <Dropdown.Item onClick={() => navigate(paths.QUESTIONS)}>Perguntas</Dropdown.Item>
                    </>
                  }

                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => logout()}>Sair</Dropdown.Item>

                </Dropdown.Menu>
              </Dropdown>

            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default NavUserOptions;
