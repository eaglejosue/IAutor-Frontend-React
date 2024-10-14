import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Nav from '../../components/nav/nav.component';
import InputWithLabel from '../../components/inputWithLabel/inputWithLabel.component';
import useScreenSize from '../../hooks/useScreenSize';
import Spinners from '../../assets/svg/SvgSpinners180Ring.svg';

import paths from '../../routes/paths';

const Home = () => {
  // const navigate = useNavigate();
  // const { isExtraSmallScreen, isLargeScreen, isExtraLargeScreen } = useScreenSize();
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    //
  }, []);

  return (
    <>
      <Nav />

      <main className='main mb-6'
        style={{ minHeight: '367px' }}
      >

        {/* TODO */}

      </main>
    </>
  );
};

export default Home;
