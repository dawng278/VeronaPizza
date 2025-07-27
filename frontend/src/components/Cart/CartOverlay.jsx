// frontend/src/components/Cart/CartOverlay.jsx
import React, { useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM for createPortal
import PropTypes from 'prop-types'; // Import PropTypes
import { useCart } from '../../contexts/CartContext';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CartItem from './CartItem.jsx'; // Import CartItem component

const CartOverlay = ({ onClose }) => {
    const {
        cartItems,
        totalItems,
        totalPrice,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        loading: cartLoading
    } = useCart();

    const sidebarRef = useRef(null); // Ref cho sidebar để quản lý focus
    const prevActiveElement = useRef(null); // Lưu trữ phần tử được focus trước khi mở modal

    // Hàm định dạng tiền tệ (di chuyển ra ngoài nếu dùng nhiều nơi)
    const formatCurrency = useCallback((amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
        }).format(amount);
    }, []); // useCallback để tránh re-render không cần thiết

    // Effect để quản lý focus và cuộn trang khi modal mở/đóng
    useEffect(() => {
        if (sidebarRef.current) {
            prevActiveElement.current = document.activeElement; // Lưu phần tử đang được focus
            sidebarRef.current.focus(); // Đặt focus vào sidebar khi mở

            // Ngăn chặn cuộn trang chính
            document.body.style.overflow = 'hidden';
        }

        return () => {
            // Khôi phục cuộn trang và focus khi component unmount
            document.body.style.overflow = '';
            if (prevActiveElement.current) {
                prevActiveElement.current.focus();
            }
        };
    }, []);

    // Xử lý sự kiện Escape để đóng overlay
    const handleKeyDown = useCallback((event) => {
        if (event.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    // Sử dụng Portal để render overlay ra ngoài cây DOM
    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex justify-end animate-fade-in"
            onClick={onClose}
            role="dialog" // A11y: Đánh dấu là một dialog
            aria-modal="true" // A11y: Cho biết đây là một modal
            tabIndex="-1" // Cho phép focus vào overlay
            onKeyDown={handleKeyDown} // Bắt sự kiện keydown trên overlay
        >
            {/* Cart Sidebar */}
            <div
                ref={sidebarRef} // Gán ref
                className="relative bg-white w-full max-w-md h-full shadow-2xl overflow-y-auto
                           transform translate-x-0 transition-transform ease-out duration-300 animate-slide-in-right flex flex-col"
                onClick={(e) => e.stopPropagation()} // Ngăn chặn sự kiện click lan truyền
                tabIndex="0" // Cho phép sidebar được focus
                aria-label="Shopping Cart" // A11y: Label cho sidebar
            >
                {/* Header của Sidebar */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                    <h2 className="text-2xl font-bold text-gray-800">Your Cart ({totalItems})</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded-full p-1"
                        aria-label="Close cart"
                    >
                        <FaTimes className="w-6 h-6" />
                    </button>
                </div>

                {/* Danh sách sản phẩm trong giỏ hàng */}
                <div className="p-6 flex-grow">
                    {cartLoading ? (
                        <p className="text-center text-gray-600 mt-10 text-lg">Loading cart...</p>
                    ) : cartItems.length === 0 ? (
                        <p className="text-center text-gray-600 mt-10 text-lg">Your cart is empty.</p>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map(item => (
                                <CartItem
                                    key={item.productId}
                                    item={item}
                                    formatCurrency={formatCurrency}
                                    updateCartItemQuantity={updateCartItemQuantity}
                                    removeFromCart={removeFromCart}
                                    cartLoading={cartLoading}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Tóm tắt giỏ hàng và các nút hành động */}
                <div className="p-6 bg-white border-t border-gray-200 shadow-xl">
                    <div className="flex justify-between items-center text-xl font-bold mb-4">
                        <span>Total:</span>
                        <span className="text-[#B61E01]">{formatCurrency(totalPrice)}</span>
                    </div>
                    {cartItems.length > 0 && (
                        <div className="space-y-3">
                            <Link
                                to="/checkout"
                                onClick={onClose}
                                className="block w-full text-center bg-[#B61E01] text-white py-3 rounded-full font-semibold text-lg hover:bg-red-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={cartLoading}
                            >
                                Proceed to Checkout
                            </Link>
                            <button
                                onClick={clearCart}
                                className="w-full bg-gray-200 text-gray-700 py-3 rounded-full font-semibold text-lg hover:bg-gray-300 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={cartLoading}
                            >
                                Clear Cart
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.body // Render portal vào body
    );
};

CartOverlay.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default CartOverlay;