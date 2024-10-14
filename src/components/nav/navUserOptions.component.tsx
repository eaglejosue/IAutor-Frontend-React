import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

import { AuthenticatedUserModel } from '../../common/models/authenticated.model';
import { EnumUserTypes } from '../../common/enums/status.enum';
import paths from '../../routes/paths';
import UserSvg from '../../assets/svg/user.svg';
import UserWhiteSvg from '../../assets/svg/user-white.svg';
import useScreenSize from '../../hooks/useScreenSize';

export interface Props {
  userNameColor?: string
}

const NavUserOptions = ({userNameColor = 'black'}: Props) => {
  const navigate = useNavigate();
  const { isExtraSmallScreen, isSmallScreen } = useScreenSize();
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
    <Dropdown>
      <Dropdown.Toggle className='bg-transparent border-0 p-0' style={{ color: userNameColor }}>
        <img src={userNameColor === 'black' ? UserSvg : UserWhiteSvg} style={{ marginRight: '5px', marginBottom: '3px' }} />
        {user && (user.name.length > 15 && (isExtraSmallScreen || isSmallScreen) ? user.firstname : user.name)}
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

        {(user?.type === EnumUserTypes.Admin || user?.type === EnumUserTypes.Operator) &&
          <>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => navigate(paths.TERMS)}>Termos</Dropdown.Item>
          </>
        }

        {(user?.type === EnumUserTypes.Admin || user?.type === EnumUserTypes.Influencer || user?.type === EnumUserTypes.Agent) &&
          <>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => navigate(paths.INCOMES)}>Faturamento</Dropdown.Item>
          </>
        }

        {user?.type === EnumUserTypes.Admin &&
          <>
            <Dropdown.Item onClick={() => navigate(paths.USERS)}>Usuários</Dropdown.Item>
          </>
        }

        <Dropdown.Divider />
        <Dropdown.Item onClick={() => logout()}>Sair</Dropdown.Item>

      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavUserOptions;
