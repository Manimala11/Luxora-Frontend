import { useState, useEffect } from 'react';
import { Button } from 'antd';
import useFetch from '../../hooks/useFetch';
import AddProductModal from '../../components/admin/AddProductModal';
import EditProductModal from '../../components/admin/EditProductModal';
import api from '../../api/api';
import { toast } from 'react-toastify';
import { Popconfirm } from 'antd';

const ManageProducts = () => {
  const token = localStorage.getItem('token');
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const { data, loading, error } = useFetch('product/admin', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`product/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Product deleted successfully!');
      setProducts(products.filter((p) => p._id !== productId));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete product');
    }
  };

  useEffect(() => {
    if (data?.products) setProducts(data.products);
  }, [data]);

  return (
    <div>
      <div className='mt-4 d-block d-md-flex justify-content-between mx-4 mb-3'>
        <h4>Product Management</h4>
        <Button
          className='btn btn-primary shadow-sm'
          onClick={() => setOpenAdd(true)}>
          + Add Product
        </Button>
      </div>
      <AddProductModal
        open={openAdd}
        onclose={() => setOpenAdd(false)}
        onSuccess={(newProduct) => {
          setProducts([newProduct, ...products]);
          setOpenAdd(false);
        }}
      />

      <EditProductModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        product={selectedProduct}
        onSuccess={(updatedProduct) => {
          setProducts(
            products.map((p) =>
              p._id === updatedProduct._id ? updatedProduct : p
            )
          );
          setOpenEdit(false);
        }}
      />

      <div className='table-responsive overflow-x-auto'>
        <table className='table table-hover align-middle text-center'>
          <thead className='table-light'>
            <tr>
              <th>Images</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan='6' className='text-center text-primary'>
                  Loading...
                </td>
              </tr>
            )}
            {!loading && error && (
              <tr>
                <td colSpan='6' className='text-center text-danger'>
                  Failed to load products
                </td>
              </tr>
            )}
            {!loading && !error && products.length === 0 && (
              <tr>
                <td colSpan='6' className='text-danger text-center'>
                  No products found
                </td>
              </tr>
            )}
            {!loading &&
              !error &&
              products.length > 0 &&
              products.map((product) => (
                <tr key={product?._id}>
                  <td>
                    <img
                      src={product?.images?.[0]}
                      alt={product.title}
                      width={80}
                      height={80}
                    />
                  </td>
                  <td>{product?.title}</td>
                  <td>{product?.category}</td>
                  <td>₹{product?.price}</td>
                  <td>
                    {product.sizeStock?.length > 0
                      ? product.sizeStock.reduce(
                          (total, s) => total + s.stock,
                          0
                        )
                      : product.stock}
                  </td>
                  <td>
                    <Button
                      type='primary'
                      className=' m-2'
                      onClick={() => {
                        setSelectedProduct(product);
                        setOpenEdit(true);
                      }}>
                      <i className='fa-regular fa-pen-to-square'></i>
                    </Button>
                    {/* <Button className=' m-2 btn btn-light btn-outline-primary' onClick={()=>handleDelete(product._id)}>
                      <i className='fa-solid fa-trash fa-sm text-danger'></i>
                    </Button> */}
                    <Popconfirm
                      title='Are you sure you want to delete this product?'
                      onConfirm={() => handleDelete(product._id)}
                      okText='Yes'
                      cancelText='No'>
                      <Button type='danger' className=' m-2'>
                        <i className='fa-solid fa-trash fa-sm text-danger'></i>
                      </Button>
                    </Popconfirm>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
