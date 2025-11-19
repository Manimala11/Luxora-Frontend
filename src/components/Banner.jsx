import BannerPic from '../assets/banner.jpg';
import { navigateToProducts } from '../utils/scrollUtils';
import { useNavigate, useLocation } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className='banner-container'>
      <img src={BannerPic} alt='Banner' className='img-fluid imagePosition' />

      <div className='imageInsideContent'>
        <h4>Elevate Your Style, Every Day</h4>

        <p>
          “Trendy outfits for <br /> every mood and moment."
        </p>

        <button
          className=' btn btn-primary fs-3 d-none  d-md-inline'
          onClick={() => navigateToProducts(navigate, location)}>
          SHOP NOW
        </button>
      </div>
    </div>
  );
};

export default Banner;
