import { Steps } from 'antd';
import { useLocation } from 'react-router-dom';
const { Step } = Steps;

const ProgressForOrder = () => {
  const location = useLocation();

  let current = 0;
  if (location.pathname === '/addToCart') current = 0;
  else if (location.pathname === '/checkout') current = 1;

  return (
    <div className='d-flex justify-content-center my-4 d-none d-sm-flex'>
      <div className='text-center w-25'>
        <Steps current={current} size="small" direction="horizontal" >
          <Step title='Cart' />
          <Step title='Checkout' />
        </Steps>
      </div>
    </div>
  );
};

export default ProgressForOrder;
