import Spinners from '../../assets/svg/SvgSpinners180Ring.svg';

const PageLoading = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100vh' }}>
      <img src={Spinners} style={{ width: '50px', height: '50px' }} alt="Loading spinner" />
    </div>
  );
};
export default PageLoading;
