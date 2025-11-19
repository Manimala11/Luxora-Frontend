import { Modal } from "antd";

const OrderSuccessModal = ({open, orderDetails, totalPrice, onclose})=>{
    return(
        <Modal
        open={open}
        footer={null}
        onCancel={onclose}
        centered>
        {orderDetails && (
          <div>
            <h4 className='mx-4 text-center'>
              <i
                className='fas fa-check-circle  animate__animated animate__bounceIn text-success'
                style={{ fontSize: '60px' }}></i>
            </h4>
            <h5 className='mx-4 text-center text-primary'>
              Order placed successfully{' '}
            </h5>
            <p>
              <b>Order ID: </b> {orderDetails._id}
            </p>
            <p>
              <b>Total Products:</b> {orderDetails.orderItems.length}
            </p>
            <p>
              <b>Total:</b> ₹{totalPrice}
            </p>
            <p className='h5 text-primary'>
              Your order has been placed successfully!
            </p>
          </div>
        )}
      </Modal>
    )
}

export default OrderSuccessModal;