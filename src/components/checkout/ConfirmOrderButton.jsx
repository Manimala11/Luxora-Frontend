import { Popconfirm, Button } from 'antd';
import { toast } from 'react-toastify';

const confirmOrderButton = ({ onConfirm }) => {
  return (
    <Popconfirm
      title='Are you sure you want to place this order?'
      onConfirm={onConfirm}
      onCancel={() => {
        toast.info('Order cancelled');
      }}
      okText='Yes'
      cancelText='No'>
      <Button type='primary' className='px-4 py-2 fw-bold'>
        Place Order (Cash on Delivery)
      </Button>
    </Popconfirm>
  );
};

export default confirmOrderButton;