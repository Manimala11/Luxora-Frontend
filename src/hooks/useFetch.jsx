import { useEffect, useState } from 'react';
import api from '../api/api';

const useFetch = (url, config) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    const fetchProduct = async () => {
      try {
        const res = await api.get(url, config);
        setData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 300);
      }
    };
    fetchProduct();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
