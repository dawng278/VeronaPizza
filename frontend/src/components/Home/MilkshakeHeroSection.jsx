// frontend/src/components/Home/MilkshakeHeroSection.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Common/Button.jsx';
import milkshakeHeroImage from '../../assets/images/thumbnails/milkshake-hero.png'; // Đảm bảo đường dẫn đúng

const MilkshakeHeroSection = () => {
    return (
        // Nền màu cam đậm hơn hoặc màu đặc trưng cho phần milkshake
        <section className="relative  text-white py-20 md:py-32 overflow-hidden">
            <div className="container mx-auto flex flex-col md:flex-row-reverse items-center justify-between px-4">
                {/* Text Content (Right on Desktop, Bottom on Mobile) */}
                <div className="md:w-1/2 text-center md:text-right z-10"> {/* text-right cho desktop */}
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 animate-fade-in-up">
                        VERONA PIZZA IS TRUE <span className="block text-amber-800">CREAMY MILKSHAKE</span>
                    </h2>
                    <p className="text-lg md:text-xl mb-8 max-w-md mx-auto md:ml-auto md:mr-0 animate-fade-in-up delay-200"> {/* md:ml-auto md:mr-0 để căn phải text block */}
                        A new dish that directly hits your palate with a delightful taste of the original pizza and selected beverages. Order now and enjoy!
                    </p>
                    <Button onClick={() => console.log('Order Now clicked')} className="animate-fade-in-up delay-400">
                        ORDER NOW
                    </Button>
                </div>

                {/* Image (Left on Desktop, Top on Mobile) */}
                <div className="md:w-1/2 flex justify-center relative z-0 mb-10 md:mb-0">
                    <img
                        src={milkshakeHeroImage}
                        alt="Delicious Creamy Milkshake"
                        className="w-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-7xl transform ml-16 md:ml-24 lg:ml-32 "
                    />
                </div>


            </div>
        </section>
    );
};

MilkshakeHeroSection.propTypes = {
    // Không có props, nhưng vẫn có thể định nghĩa nếu sau này có
};

export default MilkshakeHeroSection;