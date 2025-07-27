// frontend/src/contexts/CartContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Tạo CartContext
const CartContext = createContext();

// Custom hook để sử dụng CartContext
export const useCart = () => {
    return useContext(CartContext);
};

// CartProvider component
export const CartProvider = ({ children }) => {
    // Lấy giỏ hàng từ LocalStorage khi khởi tạo
    const [cartItems, setCartItems] = useState(() => {
        try {
            const storedCartItems = localStorage.getItem('cartItems');
            return storedCartItems ? JSON.parse(storedCartItems) : [];
        } catch (error) {
            console.error("Failed to parse cart items from localStorage", error);
            return [];
        }
    });
    const [loading, setLoading] = useState(false); // Trạng thái loading cho các thao tác giỏ hàng
    const [error, setError] = useState(null); // Trạng thái lỗi

    // Cập nhật LocalStorage mỗi khi cartItems thay đổi
    useEffect(() => {
        try {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        } catch (error) {
            console.error("Failed to save cart items to localStorage", error);
        }
    }, [cartItems]);

    // Hàm thêm sản phẩm vào giỏ hàng
    const addToCart = useCallback((product) => {
        setLoading(true);
        setError(null);
        try {
            setCartItems(prevItems => {
                const existingItemIndex = prevItems.findIndex(item => item.productId === product.id);

                if (existingItemIndex > -1) {
                    // Sản phẩm đã có trong giỏ hàng, tăng số lượng
                    const updatedItems = [...prevItems];
                    updatedItems[existingItemIndex] = {
                        ...updatedItems[existingItemIndex],
                        quantity: updatedItems[existingItemIndex].quantity + 1,
                    };
                    return updatedItems;
                } else {
                    // Sản phẩm chưa có, thêm mới với số lượng 1
                    return [...prevItems, {
                        productId: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image, // Đảm bảo bạn có trường image trong product
                        quantity: 1,
                    }];
                }
            });
            setLoading(false);
        } catch (err) {
            console.error("Error adding to cart:", err);
            setError("Failed to add product to cart.");
            setLoading(false);
        }
    }, []);

    // Hàm cập nhật số lượng sản phẩm trong giỏ hàng
    const updateCartItemQuantity = useCallback((productId, newQuantity) => {
        setLoading(true);
        setError(null);
        try {
            setCartItems(prevItems => {
                if (newQuantity <= 0) {
                    // Nếu số lượng <= 0, xóa sản phẩm khỏi giỏ hàng
                    return prevItems.filter(item => item.productId !== productId);
                } else {
                    // Cập nhật số lượng
                    return prevItems.map(item =>
                        item.productId === productId
                            ? { ...item, quantity: newQuantity }
                            : item
                    );
                }
            });
            setLoading(false);
        } catch (err) {
            console.error("Error updating cart quantity:", err);
            setError("Failed to update product quantity.");
            setLoading(false);
        }
    }, []);

    // Hàm xóa sản phẩm khỏi giỏ hàng
    const removeFromCart = useCallback((productId) => {
        setLoading(true);
        setError(null);
        try {
            setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
            setLoading(false);
        } catch (err) {
            console.error("Error removing from cart:", err);
            setError("Failed to remove product from cart.");
            setLoading(false);
        }
    }, []);

    // Hàm xóa toàn bộ giỏ hàng
    const clearCart = useCallback(() => {
        setLoading(true);
        setError(null);
        try {
            setCartItems([]);
            setLoading(false);
        } catch (err) {
            console.error("Error clearing cart:", err);
            setError("Failed to clear cart.");
            setLoading(false);
        }
    }, []);

    // Tính tổng số lượng sản phẩm
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    // Tính tổng giá tiền
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const contextValue = {
        cartItems,
        totalItems,
        totalPrice,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        loading,
        error,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};