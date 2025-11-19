import { useState , useContext} from 'react';
import { UserContext } from '../../context/UserContext';
import api from '../../api/api';
import { toast } from 'react-toastify';
import { Button, Form, Input, Modal, InputNumber } from 'antd';

const AddProductModal = ({ open, onclose, onSuccess }) => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();
     
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('category', values.category);
      formData.append('price', values.price.toString());
      formData.append('stock', values.stock.toString());
      formData.append('createdBy', user._id);

      const tagsArray = values.tags.split(',').map((tag) => tag.trim());
      formData.append('tags', JSON.stringify(tagsArray));

      const sizeArray = values.size.split(',').map((tag) => tag.trim());
      formData.append('size', JSON.stringify(sizeArray));


      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
      }

      const token = localStorage.getItem('token');

      const res = await api.post('product', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Product created successfully!');
      form.resetFields();
      setFiles([]);
      onSuccess(res?.data.product);
    } catch (err) {
      toast.error(err.response?.data?.message || 'failed to create product');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal title='Add New Product' open={open} onCancel={onclose} footer={null}>
      <Form layout='vertical' onFinish={handleSubmit}>
        <Form.Item
          label='Title'
          name='title'
          rules={[{ required: true, message: 'Title is required' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label='Description'
          name='description'
          rules={[{ required: true, message: 'Description is required' }]}>
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          label='Category'
          name='category'
          rules={[{ required: true, message: 'Category is required' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label='Tags'
          name='tags'
          rules={[{ required: true, message: 'Please add at least one tag' }]}>
          <Input placeholder='Enter tags separated by commas' />
        </Form.Item>

        <Form.Item
          label='Size'
          name='size'
          rules={[{ required: true, message: 'Please add at least one size' }]}>
          <Input placeholder='Enter sizes separated by commas' />
        </Form.Item>

        <Form.Item label='Price' name='price' rules={[{ required: true }]}>
          <InputNumber className='w-100' min={1} />
        </Form.Item>

        <Form.Item
          label='Stock'
          name='stock'
          rules={[{ required: true, message: 'Price is required' , type: 'number', min: 1, message: 'Price must be at least 1'}]  }
         >
          <InputNumber className='w-100' min={1} />
        </Form.Item>

        <Form.Item
          label='Images'
          required
          rules={[{ required: true, message: 'Please upload images' }]}>
          <input
            type='file'
            multiple
            onChange={(e) => setFiles(e.target.files)}
            accept='image/*'
          />
        </Form.Item>

        <Button type='primary' htmlType='submit' block loading={loading}>
          Create Product
        </Button>
      </Form>
    </Modal>
  );
};

export default AddProductModal;
