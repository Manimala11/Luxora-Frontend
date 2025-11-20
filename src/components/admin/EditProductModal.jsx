import { useState, useEffect } from 'react';
import { Modal, Input, InputNumber, Button } from 'antd';
import api from '../../api/api';
import { toast } from 'react-toastify';

const EditProductModal = ({ open, onClose, product, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: 1,
    stock: 1,
  });

  const [files, setFiles] = useState([]);
  const [sizeStockList, setSizeStockList] = useState([]);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        stock: product.stock,
      });
      if (product.sizeStock && product.sizeStock.length > 0) {
        setSizeStockList(product.sizeStock);
      } else {
        setSizeStockList([]);
      }
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const addSizeStock = () => {
    setSizeStockList([...sizeStockList, { size: '', stock: 0 }]);
  };

  const updateSizeStock = (index, field, value) => {
    const updated = [...sizeStockList];
    updated[index][field] = value;
    setSizeStockList(updated);
  };

  const removeSizeStock = (index) => {
    setSizeStockList(sizeStockList.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const fd = new FormData();
      for (let key in formData) {
        if (formData[key] !== undefined && formData[key] !== null) {
          fd.append(key, formData[key]);
        }
      }
      if (sizeStockList.length > 0) {
        fd.set('stock', '0');
        fd.append('sizeStock', JSON.stringify(sizeStockList));
      } else {
        fd.set('stock', formData.stock || '0');
      }

     Array.from(files).forEach(file => fd.append('images', file));

      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('You must be logged in to update a product');
        return;
      }
      const res = await api.patch(`/product/${product._id}`, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Product Updated successfully!');
      onSuccess(res.data.updatedProduct);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} title='Edit Product'>
      <label className='mb-2'>Title</label>
      <Input
        className='mb-2'
        name='title'
        value={formData.title}
        onChange={handleChange}
      />
      <label className='mb-2'>Description</label>
      <Input.TextArea
        name='description'
        className='mb-2'
        rows={3}
        value={formData.description}
        onChange={handleChange}
      />
      <label className='mb-2'>Category</label>
      <Input
        name='category'
        className='mb-2'
        value={formData.category}
        onChange={handleChange}
      />
      <label className='mb-2'>Price</label>
      <InputNumber
        min={1}
        className='w-100 mb-2'
        value={formData.price}
        onChange={(val) => setFormData({ ...formData, price: val })}
      />
      {/* <label className='mb-2'>Stock</label>
      <InputNumber
        min={1}
        className='w-100 mb-2'
        value={formData.stock}
        onChange={(val) => setFormData({ ...formData, stock: val })}
      /> */}
      <div className='border p-2 rounded mb-3'>
        <h4>Size-wise Stock</h4>
        {sizeStockList.map((item, index) => (
          <div key={index} className='d-flex gap-2 mb-2'>
            <Input
              placeholder='Size'
              value={item.size}
              onChange={(e) => updateSizeStock(index, 'size', e.target.value)}
            />

            <InputNumber
              min={0}
              value={item.stock}
              onChange={(value) => updateSizeStock(index, 'stock', value)}
            />

            <Button danger onClick={() => removeSizeStock(index)}>
              Remove
            </Button>
          </div>
        ))}

        <Button onClick={addSizeStock} type='dashed' block>
          + Add Size
        </Button>
      </div>
      {sizeStockList.length === 0 && (
        <>
          <label>Stock (Common)</label>
          <InputNumber
            min={1}
            className='w-100 mb-2'
            value={formData.stock}
            onChange={(val) => setFormData({ ...formData, stock: val })}
          />
        </>
      )}

      <label className='mb-2'>Upload New Images: </label>
      <input
        type='file'
        className='mb-2'
        multiple
        onChange={(e) => setFiles(e.target.files)}
        accept='image/*'
      />
      <Button
        type='primary'
        block
        loading={loading}
        className='mt-3'
        onClick={handleSubmit}>
        Update Product
      </Button>
    </Modal>
  );
};
export default EditProductModal;
