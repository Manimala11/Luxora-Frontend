import Select from 'react-select';
import ConfirmOrderButton from './ConfirmOrderButton';
import { states } from './States';

const ShippinForm = ({form, errors, handleChange, handleSubmit, resetForm}) =>{
    return(
        <form className='form-control'>
             <h4 className='text-center mb-4'>Shipping Info</h4>
              <div className='my-2 '>
                <label htmlFor='name' className='form-label fw-bold'>
                  Full Name: <sup className='text-danger'>*</sup>
                </label>
                <input
                  type='text'
                  value={form.name}
                  className='p-2 w-75 ms-4 mt-2 me-5 rounded-2 border border-secondary'
                  id='name'
                  placeholder='Enter Your Name'
                  onChange={(e) => handleChange('name', e.target.value)}
                />
                {errors.name && (
                  <div>
                    <small className='text-danger'>{errors.name}</small>
                  </div>
                )}
              </div>

              <div className='my-2'>
                <label htmlFor='phonenumber' className='form-label fw-bold'>
                  Phone No: <sup className='text-danger'>*</sup>
                </label>
                <input
                  type='tel'
                  value={form.phone}
                  className='p-2 w-75 ms-4 mt-2 me-5 rounded-2 border border-secondary'
                  id='phonenumber'
                  pattern='[0-9]{10}'
                  title='Phone number must be 10 digits'
                  placeholder='Enter your phone number'
                  onChange={(e) => handleChange('phone', e.target.value)}
                />
                {errors.phone && (
                  <div>
                    <small className='text-danger'>{errors.phone}</small>
                  </div>
                )}
              </div>

              <div className='my-2'>
                <label htmlFor='email' className='form-label fw-bold'>
                  Email: <sup className='text-danger'>*</sup>
                </label>
                <input
                  type='email'
                  value={form.email}
                  className='p-2 w-75 ms-4 mt-2 me-5 rounded-2 border border-secondary'
                  id='email'
                  placeholder='example@gmail.com'
                  onChange={(e) => handleChange('email', e.target.value)}
                />
                {errors.email && (
                  <div>
                    <small className='text-danger'>{errors.email}</small>
                  </div>
                )}
              </div>

              <div className='my-2'>
                <label htmlFor='address' className='form-label fw-bold'>
                  Address: <sup className='text-danger'>*</sup>
                </label>
                <textarea
                  id='address'
                  value={form.address}
                  className='p-2 w-75 ms-4 mt-2 me-5 rounded-2 border border-secondary'
                  rows={3}
                  placeholder='Enter your address'
                  onChange={(e) =>
                    handleChange('address', e.target.value)
                  }></textarea>
                {errors.address && (
                  <div>
                    <small className='text-danger'>{errors.address}</small>
                  </div>
                )}
              </div>

              <div className='my-2'>
                <label htmlFor='states' className='form-label fw-bold'>
                  Select State <sup className='text-danger'>*</sup>
                </label>
                <Select
                  options={states}
                  placeholder='State'
                  value={
                    form.state
                      ? states.find((state) => state.value === form.state)
                      : null
                  }
                  className='w-75 ms-4'
                  onChange={(selectedOption) =>
                    handleChange('state', selectedOption.value || '')
                  }
                />
                {errors.state && (
                  <div>
                    <small className='text-danger'>{errors.state}</small>
                  </div>
                )}
              </div>

              <div className='row my-2 '>
                <div className='col-6'>
                  <label htmlFor='country' className='form-label fw-bold'>
                    Country:
                  </label>
                  <input
                    type='text'
                    id='country'
                    value='India'
                    disabled
                    className='p-2 w-75 ms-4 me-5 rounded-2 border border-secondary text-muted'
                  />
                </div>

                <div className='col-6'>
                  <label htmlFor='pincode' className='form-label fw-bold'>
                    Pincode: <sup className='text-danger'>*</sup>
                  </label>
                  <input
                    type='text'
                    value={form.pincode}
                    id='pincode'
                    className='form-control p-2 border border-secondary rounded-2'
                    placeholder='Enter Pincode'
                    onChange={(e) => handleChange('pincode', e.target.value)}
                  />
                  {errors.pincode && (
                    <div>
                      <small className='text-danger'>{errors.pincode}</small>
                    </div>
                  )}
                </div>
              </div>
              <div className='text-center my-4'>
                <ConfirmOrderButton onConfirm={()=>{
                  handleSubmit();
                  resetForm();
                }} />
                </div>
            </form>
    )
}

export default ShippinForm;