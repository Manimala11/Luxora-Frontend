const productSummary = ({ productList, totalPrice}) =>{
    return (
        <>
        <h4 className='text-center mb-4'>Product Summary</h4>
            <div className='card p-3'>
              {productList.map((product) => (
                <div
                  key={product?._id}
                  className='d-flex align-items-center border-bottom py-2'>
                  <img
                    src={product?.images[0]}
                    alt={product?.title}
                    width={70}
                    height={70}
                    className='rounded me-3'
                  />
                  <div className='flex-grow-1'>
                    <h6 className='fw-bold mb-1'>{product?.title}</h6>
                    {product?.selectedSize && (
                      <p className='mb-0 text-muted'>Size: {product.selectedSize}</p>
                    )}
                    <p className='mb-0 text-muted'>Qty: {product?.quantity}</p>
                  </div>
                  <div className='fw-bold'>
                    ₹{product?.price * product?.quantity}
                  </div>
                </div>
              ))}
              <p className='text-center mt-4'>
                <b>Total Price: </b>{' '}
                <span className='text-primary'>₹{totalPrice}</span>
              </p>
            </div>
        </>
    )
}
export default productSummary;