const PageLoading = () => {
  return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: '100%', borderRadius: '9px' }}>
      <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
        <span className="sr-only">Carregando...</span>
      </div>
    </div>
  );
};
export default PageLoading;
