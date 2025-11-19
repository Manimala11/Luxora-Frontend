import { scrollToTop } from '../../utils/scrollUtils';
const AdminFooter = () => {
  return (
    <div className='container-fluid bg-light'>
      <hr />
      <div className='row mt-3 p-2 d-flex mt-2'>
        <div className='col-md-6 text-center align-items-center'>
          <button
            className='border-0 bg-light text-primary fw-bold h1'
            onClick={scrollToTop}>
            Luxora
          </button>
          <p className='text-secondary text-center'>
            “Shop Smart, Live Better”
          </p>
          <h4 className='text-primary'>Reach out to us</h4>
          <ul className='mt-4 d-flex justify-content-center flex-wrap list-unstyled'>
            <li className='me-2'>
              <i className='fa-brands fa-instagram'></i>
            </li>
            <li className='me-2'>
              <i className='fa-brands fa-facebook'></i>
            </li>
            <li className='me-2'>
              <i className='fa-brands fa-youtube'></i>
            </li>
            <li className='me-2'>
              <i className='fa-brands fa-linkedin'></i>
            </li>
            <li className='me-2'>
              <i className='fa-brands fa-twitter'></i>
            </li>
          </ul>

          <p className='text-secondary'>
            Trusted by crores of Indians Cash on Delivery | Free Delivery
          </p>
        </div>
        
        <div className='col-md-6 fw-light mt-2'>
          <h4 className='pb-3 text-primary  text-center'>CONTACT US</h4>
          <div>Luxora Technologies Private Limited</div>
          <p>
            CIN: U62099KA2024PTC186568 3rd Floor, Wing-E, Helios Business
            Park,Kadubeesanahalli Village, Varthur Hobli, Outer Ring Road
            Bellandur, Bangalore, Bangalore South, Karnataka, India, 560103{' '}
            <br />
            E-mail address: query@luxora.com
          </p>
        </div>
      </div>
      <hr />
      <p className='text-secondary text-center '>
        &copy; 2025 Luxora.All Rights Reserved
      </p>
    </div>
  );
};

export default AdminFooter;
