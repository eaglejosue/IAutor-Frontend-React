import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/img/favicon-32x32.png';
import paths from '../../routes/paths';

export interface Props {
  navItem?: string
}

const Sidebar = (p: Props) => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column bg-white border-end p-0"
      style={{ width: '4.2rem', height: '100vh' }}
    >
      <ul className="nav nav-pills flex-column align-items-center">

        <li className="nav-item mt-2 mb-4">
          <img src={Logo} alt="Logo" className="nav-link"
            onClick={() => navigate(paths.HOME)}
            style={{ cursor: 'pointer' }}
          />
        </li>

        <li className={p.navItem && p.navItem == 'home' ? 'bg-iautor' : ''}>
          <a href="#" className="nav-link">
            <span className="material-symbols-outlined"
              style={{ fontSize: '32px', color: 'black' }}
            >
              cottage
            </span>
          </a>
        </li>

        <li className={p?.navItem == 'book' ? 'bg-iautor' : ''}
          style={{ borderRight: '3px solid #db3737' }}
        >
          <a href="#" className="nav-link">
            <span className="material-symbols-outlined"
              style={{ fontSize: '32px', color: 'black' }}
            >
              book_2
            </span>
          </a>
        </li>

        <li>
          <a href="#" className="nav-link">
            <span className="material-symbols-outlined"
              style={{ fontSize: '32px', color: 'black' }}
            >
              shelves
            </span>
          </a>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;