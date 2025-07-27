// frontend/src/components/Menu/CategoryFilter.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { PRODUCT_CATEGORIES } from '../../utils/constants'; // Import từ constants

const CategoryFilter = React.memo(({ activeCategory, onSelectCategory }) => {
    return (
        <div className="flex flex-wrap justify-center gap-4 py-8 px-4 bg-orange-200 sticky top-16 z-40 shadow-sm"> {/* top-16/20 để sticky dưới header */}
            {PRODUCT_CATEGORIES.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onSelectCategory(category.id)}
                    className={`px-6 py-2 rounded-full font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2
            ${activeCategory === category.id
                        ? 'bg-orange-600 text-white shadow-md focus:ring-orange-600'
                        : 'bg-white text-gray-700 hover:bg-orange-500 hover:text-white focus:ring-orange-500'
                    }`}
                    aria-pressed={activeCategory === category.id} // A11y: indicates current selection
                    aria-label={`Show ${category.name} items`}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
});

CategoryFilter.propTypes = {
    activeCategory: PropTypes.string.isRequired,
    onSelectCategory: PropTypes.func.isRequired,
};

CategoryFilter.displayName = 'CategoryFilter';

export default CategoryFilter;