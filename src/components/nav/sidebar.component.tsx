import { useNavigate } from 'react-router-dom';

import paths from '../../routes/paths';
import Logo from '../../assets/img/favicon-32x32.png';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column bg-white border-end p-1"
      style={{ width: '4.5rem', height: '100vh' }}
    >
      <ul className="nav nav-pills flex-column align-items-center justify-content-center mb-auto">
        <li className="nav-item">
          <img src={Logo} alt="Logo" className="nav-link" />
        </li>
        <li>
          <a href="#" className="nav-link">
            <span className="material-symbols-outlined"
              style={{ fontSize: '32px', color: 'black' }}
            >
              cottage
            </span>
          </a>
        </li>
        <li className='bg-iautor'>
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