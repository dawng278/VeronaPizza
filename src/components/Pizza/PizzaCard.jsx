// frontend/src/components/Pizza/PizzaCard.jsx
import React from 'react';
import PropTypes from 'prop-types';

// Constants for badge styles (improves readability and maintainability)
const BADGE_STYLES = {
    NEW: 'bg-green-500 text-white',
    DISCOUNT: 'bg-red-500 text-white', // Use 'DISCOUNT' for -50% to generalize
};

// Sử dụng React.memo để tối ưu hiệu suất nếu component này re-render thường xuyên
const PizzaCard = React.memo(({ pizza }) => {
    // Determine badge class dynamically based on badge content
    const getBadgeClasses = (badge) => {
        if (!badge) return '';
        if (badge === 'NEW') return BADGE_STYLES.NEW;
        if (badge.endsWith('%')) return BADGE_STYLES.DISCOUNT; // Check for discount percentage
        return 'bg-gray-500 text-white'; // Default or unknown badge
    };

    const formattedPrice = `${(pizza.price / 1000).toFixed(0)}.000 đ`; // Format price to XXX.000 VND

    return (
        // Sử dụng role="article" cho một item độc lập trong danh sách
        // Card background (bg-white) như trong ảnh
        <article className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                 aria-labelledby={`pizza-name-${pizza.id}`}
                 aria-describedby={`pizza-details-${pizza.id}`}>
            {pizza.badge && (
                <span
                    className={`absolute top-0 right-0 px-3 py-1 text-sm font-bold rounded-bl-lg ${getBadgeClasses(pizza.badge)}`}
                    aria-label={`Special offer: ${pizza.badge}`} // Aria-label cho badge
                >
                    {pizza.badge}
                </span>
            )}
            <div className="p-4 flex flex-col items-center"> {/* Căn giữa nội dung */}
                <img
                    src={pizza.image}
                    alt={pizza.name}
                    className="w-full h-48 object-contain mb-4"
                    loading="lazy" // Tối ưu hiệu suất tải ảnh
                />
                <h3 id={`pizza-name-${pizza.id}`} className="text-xl font-bold text-gray-800 mb-1 text-center">
                    {pizza.name}
                </h3>
                <p id={`pizza-details-${pizza.id}`} className="text-gray-600 text-sm mb-2 text-center">
                    {pizza.size}
                </p>
                <p className="text-orange-500 text-2xl font-bold">
                    {formattedPrice}
                </p>
            </div>
        </article>
    );
});

PizzaCard.propTypes = {
    pizza: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        size: PropTypes.string,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        badge: PropTypes.string, // badge is optional
    }).isRequired,
};

// Đặt displayName để dễ dàng debug với React DevTools
PizzaCard.displayName = 'PizzaCard';

export default PizzaCard;