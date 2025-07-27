// frontend/src/hooks/useProducts.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants'; // Import base URL
import { menuItems as staticMenuItems } from '../data/menuData'; // Import static data

const USE_STATIC_DATA = true; // Cấu hình ở đây hoặc truyền vào hook

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            if (USE_STATIC_DATA) {
                setProducts(staticMenuItems);
            } else {
                const res = await axios.get(`${API_BASE_URL}/products`);
                // Điều chỉnh lại nếu cấu trúc API khác (vd: res.data.data)
                setProducts(res.data.data || res.data);
            }
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Failed to load products. Please try again later.');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return { products, loading, error, refetchProducts: fetchProducts };
};

export default useProducts;