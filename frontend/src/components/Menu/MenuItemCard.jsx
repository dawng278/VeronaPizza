// frontend/src/components/Menu/MenuItemCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../../contexts/CartContext'; // <--- Import useCart hook

// Constants for badge styles
const BADGE_STYLES = {
    NEW: 'bg-green-500 text-white',
    DISCOUNT: 'bg-red-500 text-white',
    DEFAULT: 'bg-blue-500 text-white', // For other badges
};

const MenuItemCard = React.memo(({ item }) => { // onAddToCart không còn cần thiết nếu dùng useCart
    const { addToCart, loading: cartLoading } = useCart(); // <--- Lấy addToCart và cartLoading từ context

    const getBadgeClasses = (badge) => {
        if (!badge) return '';
        if (badge === 'NEW') return BADGE_STYLES.NEW;
        if (badge.includes('%')) return BADGE_STYLES.DISCOUNT; // Check if it's a percentage discount
        return BADGE_STYLES.DEFAULT; // Fallback for other custom badges
    };

    const formattedPrice = `${(item.price / 1000).toFixed(0)}.000 đ`; // Format to XXX.000 VND

    // Xử lý khi người dùng click "Add to Cart"
    const handleAddToCartClick = () => {
        // Gọi hàm addToCart từ CartContext và truyền item vào
        addToCart(item);
    };

    return (
        <article
            className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 flex flex-col items-center p-4 pb-2"
            aria-labelledby={`item-name-${item.id}`}
            aria-describedby={`item-details-${item.id}`}
        >
            {item.badge && (
                <span
                    className={`absolute top-0 right-0 px-3 py-1 text-sm font-bold rounded-bl-lg ${getBadgeClasses(item.badge)}`}
                    aria-label={`Special offer: ${item.badge}`}
                >
                    {item.badge}
                </span>
            )}
            <div className="w-full flex justify-center mb-4">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-40 md:h-48 object-contain"
                    loading="lazy"
                />
            </div>
            <div className="w-full text-center flex-grow">
                <h3 id={`item-name-${item.id}`} className="text-xl font-bold text-gray-800 mb-1">
                    {item.name}
                </h3>
                {item.size && (
                    <p id={`item-details-${item.id}`} className="text-gray-600 text-sm mb-2">
                        {item.size}
                    </p>
                )}
                <p className="text-orange-500 text-2xl font-bold mb-4">
                    {formattedPrice}
                </p>
            </div>
            {/* Add to Cart button */}
            <button
                onClick={handleAddToCartClick}
                className="mt-auto bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-semibold text-sm w-full
                           transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500
                           disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={cartLoading} // Vô hiệu hóa nút nếu giỏ hàng đang xử lý
                aria-label={`Add ${item.name} to cart`}
            >
                {cartLoading ? 'Adding...' : 'Add to Cart'} {/* Hiển thị trạng thái loading */}
            </button>
        </article>
    );
});

MenuItemCard.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        size: PropTypes.string,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        badge: PropTypes.string,
        category: PropTypes.string.isRequired,
        section: PropTypes.string.isRequired,
    }).isRequired,
    // onAddToCart không còn cần thiết ở đây vì chúng ta dùng context trực tiếp
};

MenuItemCard.displayName = 'MenuItemCard';

export default MenuItemCard;