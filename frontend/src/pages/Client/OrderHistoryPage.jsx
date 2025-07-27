// frontend/src/pages/Client/OrderHistoryPage.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import * as orderApi from '../../api/orderApi.js'; // Đảm bảo bạn đã có file này và nó đúng

const OrderHistoryPage = () => {
    const { isAuthenticated, user, token } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!isAuthenticated || !token) {
                setLoading(false);
                setError('Please log in to view your order history.');
                return;
            }

            try {
                setLoading(true);
                setError(null);

                // --- PHẦN GỌI API THỰC TẾ (UNCOMMENT KHI ĐÃ CÓ BACKEND) ---
                // const data = await orderApi.fetchUserOrders(token);
                // setOrders(data);
                // --- KẾT THÚC PHẦN GỌI API ---

                // --- DỮ LIỆU MOCK DÀNH CHO PHÁT TRIỂN (HÃY XÓA NÓ KHI CÓ API THẬT) ---
                const mockOrders = [
                    {
                        _id: 'ORDER001',
                        date: '2025-07-20T10:00:00Z',
                        totalAmount: 250000,
                        status: 'Completed',
                        items: [
                            { name: 'Phở Bò Đặc Biệt', quantity: 2, price: 60000 },
                            { name: 'Trà Đá', quantity: 1, price: 10000 },
                        ],
                    },
                    {
                        _id: 'ORDER002',
                        date: '2025-07-22T14:30:00Z',
                        totalAmount: 120000,
                        status: 'Processing',
                        items: [
                            { name: 'Bún Chả', quantity: 1, price: 50000 },
                            { name: 'Nước Ngọt', quantity: 2, price: 15000 },
                        ],
                    },
                    {
                        _id: 'ORDER003',
                        date: '2025-07-25T14:30:00Z',
                        totalAmount: 350000,
                        status: 'Pending',
                        items: [
                            { name: 'Cơm Tấm Sườn Bì Chả', quantity: 2, price: 80000 },
                            { name: 'Chè Đậu Xanh', quantity: 2, price: 25000 },
                        ],
                    },
                ];
                setOrders(mockOrders);
                // --- KẾT THÚC DỮ LIỆU MOCK ---

            } catch (err) {
                console.error('Failed to fetch order history:', err);
                setError('Failed to load order history. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [isAuthenticated, token]); // Re-run effect if auth state or token changes

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    if (!isAuthenticated) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Order History</h1>
                <p className="text-lg text-gray-600">Please <Link to="/login" className="text-[#B61E01] hover:underline">log in</Link> to view your order history.</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Order History</h1>
                <p className="text-lg text-gray-600">Loading your orders...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Order History</h1>
                <p className="text-lg text-red-500">{error}</p>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Order History</h1>
                <p className="text-lg text-gray-600">You haven't placed any orders yet.</p>
                <Link to="/menu" className="mt-6 inline-block bg-[#FF9800] text-white py-2 px-6 rounded-full hover:bg-[#E08F00] transition-colors">Start Ordering</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center text-[#B61E01] mb-8">Your Order History</h1>
            <div className="space-y-6">
                {orders.map((order) => (
                    <div key={order._id} className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                        <div className="flex justify-between items-center mb-4 border-b pb-4">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">Order ID: {order._id}</h2>
                                <p className="text-gray-600 text-sm">Placed on: {formatDate(order.date)}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                    order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : // Thêm trạng thái Pending
                                            'bg-gray-100 text-gray-800'
                            }`}>
                                {order.status}
                            </span>
                        </div>
                        <div className="space-y-3 mb-4">
                            {order.items.map((item, index) => (
                                <div key={index} className="flex justify-between text-gray-700 text-base">
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>{formatCurrency(item.quantity * item.price)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t">
                            <span className="text-lg font-bold text-gray-800">Total:</span>
                            <span className="text-xl font-extrabold text-[#B61E01]">{formatCurrency(order.totalAmount)}</span>
                        </div>
                        <div className="mt-4 text-right">
                            <Link
                                to={`/orders/${order._id}`} // Link to ReceiptDetailPage
                                className="text-[#FF9800] hover:underline font-medium"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistoryPage; // Đảm bảo dòng này TỒN TẠI VÀ CHÍNH XÁC