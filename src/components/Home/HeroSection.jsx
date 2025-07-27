// frontend/src/components/Home/HeroSection.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Common/Button.jsx';
import pizzaHero from '../../assets/images/thumbnails/pizza-hero.png'; // Ảnh hero pizza

const HeroSection = () => {
    return (
        // THAY ĐỔI DÒNG NÀY: Loại bỏ gradient, thêm màu nền solid và điều chỉnh text color nếu cần
        <section className="relative text-white py-20 md:py-32 overflow-hidden"> {/* Background màu cam đồng nhất */}
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
                {/* Text Content */}
                <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 z-10">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 animate-fade-in-up">
                        VERONA PIZZA IS TRUE <span className="block text-red-700">ULTIMATE</span>
                    </h1>
                    <p className="text-lg md:text-xl mb-8 max-w-md mx-auto md:mx-0 animate-fade-in-up delay-200">
                        A new dish that directly hits your palate with a delightful taste of the original pizza and selected beverages. Order now and enjoy!
                    </p>
                    <Button onClick={() => console.log('Order Now clicked')} className="animate-fade-in-up delay-400">
                        ORDER NOW
                    </Button>
                </div>

                {/* Image */}
                <div className="md:w-1/2 flex justify-center relative z-0">
                    <img
                        src={pizzaHero}
                        alt="Delicious Verona Pizza"
                        className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-6xl transform -mr-16 md:-mr-24 lg:-mr-32 animate-slide-in-right"
                    />
                </div>
            </div>
        </section>
    );
};

HeroSection.propTypes = {
    // Không có props, nhưng vẫn có thể định nghĩa nếu sau này có
};

export default HeroSection;