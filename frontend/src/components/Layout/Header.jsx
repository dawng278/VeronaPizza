// frontend/src/components/Layout/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext.jsx'; // <--- Import useCart hook

// Header nhận thêm prop onAccountClick để mở LoginForm/User Profile
const Header = ({ onCartClick, onAccountClick }) => {
    // Lấy totalItems từ CartContext
    const { totalItems } = useCart(); // <--- Lấy totalItems động từ context

    return (
        <header className="bg-[#212121] text-white py-4 px-6 md:px-10 flex justify-between items-center sticky top-0 z-50">
            {/* Logo */}
            <Link to="/" className="text-3xl font-extrabold flex items-center" aria-label="Verona Pizza Home">
                <span className="text-[#FFC107]">VERO</span>
                <span className="text-[#F44336]">NA</span>
                <span className="text-white ml-1">PIZZA</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8 text-lg font-medium">
                <Link to="/" className="text-[#bdbdbd] hover:text-[#FF9800] transition-colors duration-200 uppercase">HOME</Link>
                <Link to="/menu" className="text-[#bdbdbd] hover:text-[#FF9800] transition-colors duration-200 uppercase">MENU</Link>
                <Link to="/promotion" className="text-[#bdbdbd] hover:text-[#FF9800] transition-colors duration-200 uppercase">PROMOTION</Link>
                <Link to="/location" className="text-[#bdbdbd] hover:text-[#FF9800] transition-colors duration-200 uppercase">LOCATION</Link>
            </nav>

            {/* Right section: Account Icon, Cart Icon, Mobile Menu Button */}
            <div className="flex items-center space-x-4">
                {/* Account Icon (always visible, click to trigger account modal/page) */}
                <button
                    onClick={onAccountClick}
                    className="text-[#bdbdbd] hover:text-[#FF9800] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 rounded-full p-1"
                    aria-label="Account"
                >
                    <FaUser className="w-6 h-6" />
                </button>

                {/* Cart Icon */}
                <button
                    onClick={onCartClick}
                    className="relative text-[#bdbdbd] hover:text-[#FF9800] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 rounded-full p-1"
                    aria-label="View cart"
                >
                    <FaShoppingCart className="w-6 h-6" />
                    {totalItems > 0 && ( // Chỉ hiển thị badge nếu totalItems > 0
                        <span className="absolute -top-2 -right-2 bg-[#F44336] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {totalItems}
                        </span>
                    )}
                </button>

                {/* Mobile menu button (giữ nguyên để responsiveness) */}
                <button className="md:hidden text-[#bdbdbd] hover:text-[#FF9800] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 rounded-full p-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
            </div>
        </header>
    );
};

Header.propTypes = {
    onCartClick: PropTypes.func.isRequired,
    onAccountClick: PropTypes.func.isRequired,
};

export default Header;