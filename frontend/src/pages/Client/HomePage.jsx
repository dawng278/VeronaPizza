// frontend/src/pages/HomePage.jsx
import React from 'react';
import backgroundTexture from "../../assets/images/backgrounds/background.png";


// Import các components đã tạo
import HeroSection from '../../components/Home/HeroSection.jsx';
import MilkshakeHeroSection from '../../components/Home/MilkshakeHeroSection.jsx';
import RecommendationSection from '../../components/Home/RecommendationSection.jsx';


const HomePage = () => {
    return (
        <div
            className="w-full min-h-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundTexture})` }} // Áp dụng background texture cho toàn bộ trang
        >
            {/* Hero Section - Verona Pizza is True Ultimate */}
            <HeroSection />

            {/* Milkshake Hero Section - Verona Pizza is True Creamy Milkshake */}
            <MilkshakeHeroSection /> {/* <--- THÊM COMPONENT MỚI VÀO ĐÂY */}

            {/* Recommendation Section - Signature Today */}
            <RecommendationSection />

        </div>
    );
};

export default HomePage;