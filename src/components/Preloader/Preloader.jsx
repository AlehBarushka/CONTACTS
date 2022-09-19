import loader from '../../assets/loader.svg';

const Preloader = () => {
  return <img className='d-block m-auto' src={loader} alt='loader' style={{ width: '150px' }} />;
};

export default Preloader;
