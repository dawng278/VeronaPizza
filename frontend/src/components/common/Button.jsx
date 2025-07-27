// frontend/src/components/Common/Button.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, className = '', onClick, variant = 'primary', ...props }) => {
    const baseClasses = 'px-6 py-3 rounded-full font-semibold transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2';
    let variantClasses = '';

    switch (variant) {
        case 'primary':
            variantClasses = 'bg-orange-500 hover:bg-orange-600 text-white shadow-md focus:ring-orange-500';
            break;
        case 'outline':
            variantClasses = 'border border-white hover:bg-white hover:text-orange-500 text-white focus:ring-white';
            break;
        case 'dark-outline': // New variant for dark background sections
            variantClasses = 'border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white shadow-md focus:ring-gray-800';
            break;
        case 'secondary':
            variantClasses = 'bg-gray-700 hover:bg-gray-600 text-white shadow-md focus:ring-gray-700';
            break;
        default:
            variantClasses = 'bg-orange-500 hover:bg-orange-600 text-white shadow-md focus:ring-orange-500';
    }

    return (
        <button
            className={`${baseClasses} ${variantClasses} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
    variant: PropTypes.oneOf(['primary', 'outline', 'secondary', 'dark-outline']),
};

export default Button;