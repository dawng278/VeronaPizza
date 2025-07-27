// frontend/src/components/Admin/AddProductModal.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const AddProductModal = ({ onClose, onProductAdded }) => {
    const { token } = useAuth(); // Lấy token để gửi lên backend
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('combo'); // Mặc định category
    const [image, setImage] = useState(''); // Chỉ lưu tên file ảnh hoặc URL tạm thời
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Gửi token để xác thực
                }
            };
            const newProduct = { name, description, price: parseFloat(price), category, image }; // `image` có thể là tên file hoặc URL

            const res = await axios.post('http://localhost:5173/api/products', newProduct, config);
            onProductAdded(res.data.data); // Gọi callback khi thêm thành công
        } catch (err) {
            console.error('Error adding product:', err);
            setError(err.response?.data?.error || 'Failed to add product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center" onClick={onClose}>
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg relative" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold">
                    &times;
                </button>
                <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-1">Product Name</label>
                        <input
                            type="text"
                            id="name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-1">Description</label>
                        <textarea
                            id="description"
                            rows="3"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-gray-700 text-sm font-medium mb-1">Price ($)</label>
                        <input
                            type="number"
                            id="price"
                            step="0.01"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-gray-700 text-sm font-medium mb-1">Category</label>
                        <select
                            id="category"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="combo">Combo</option>
                            <option value="fried chicken">Fried Chicken</option>
                            <option value="burger">Burger</option>
                            <option value="snacks">Snacks</option>
                            <option value="desserts">Desserts</option>
                            <option value="drinks">Drinks</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-gray-700 text-sm font-medium mb-1">Image Filename (e.g., burger1.jpg)</label>
                        <input
                            type="text"
                            id="image"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="e.g., combo1.jpg"
                        />
                        <p className="text-xs text-gray-500 mt-1">Make sure the image file is in your public/images folder.</p>
                    </div>

                    {error && <p className="text-red-500 text-center">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-[#FF9800] hover:bg-[#E68A00] text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9800] transition duration-300"
                        disabled={loading}
                    >
                        {loading ? 'Adding...' : 'Add Product'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;