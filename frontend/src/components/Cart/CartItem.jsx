// frontend/src/components/Cart/CartItem.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';

const CartItem = React.memo(({ item, formatCurrency, updateCartItemQuantity, removeFromCart, cartLoading }) => {
    return (
        <div className="flex items-center border-b pb-4 last:border-b-0 py-2">
            <div className="flex-shrink-0 w-20 h-20 mr-4 rounded-md overflow-hidden border border-gray-100">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600">{formatCurrency(item.price)}</p>
                <div className="flex items-center mt-2">
                    {/* Nút giảm số lượng */}
                    <button
                        onClick={() => updateCartItemQuantity(item.productId, item.quantity - 1)}
                        className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                        disabled={cartLoading || item.quantity <= 1}
                        aria-label={`Decrease quantity of ${item.name}`}
                    >
                        <FaMinus />
                    </button>
                    <span className="mx-3 text-lg font-medium" aria-live="polite" aria-atomic="true">{item.quantity}</span> {/* A11y: Live region for quantity */}
                    {/* Nút tăng số lượng */}
                    <button
                        onClick={() => updateCartItemQuantity(item.productId, item.quantity + 1)}
                        className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                        disabled={cartLoading}
                        aria-label={`Increase quantity of ${item.name}`}
                    >
                        <FaPlus />
                    </button>
                    {/* Nút xóa sản phẩm */}
                    <button
                        onClick={() => removeFromCart(item.productId)}
                        className="ml-auto text-red-500 hover:text-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
                        aria-label={`Remove ${item.name} from cart`}
                        disabled={cartLoading}
                    >
                        <FaTrash className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
});

CartItem.propTypes = {
    item: PropTypes.shape({
        productId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
    }).isRequired,
    formatCurrency: PropTypes.func.isRequired,
    updateCartItemQuantity: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    cartLoading: PropTypes.bool.isRequired,
};

CartItem.displayName = 'CartItem';

export default CartItem;