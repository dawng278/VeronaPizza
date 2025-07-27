// frontend/src/components/Home/RecommendationSection.jsx
import React from 'react';
import Button from '../common/Button.jsx';
import PizzaCard from '../Pizza/PizzaCard.jsx';

// THAY ĐỔI CÁC DÒNG NÀY:
import cheesePizza from '../../assets/images/thumbnails/cheese-pizza.png';
import pepperoniPizza from '../../assets/images/thumbnails/pepperoni-pizza.png';
import superSupreme from '../../assets/images/thumbnails/super-supreme.png';

const recommendations = [
    {
        id: 'rec1',
        name: 'Cheese Lover Pizza',
        size: '12 inch',
        price: 199000,
        image: cheesePizza, // <--- SỬ DỤNG BIẾN ĐÃ IMPORT
        badge: 'NEW',
    },
    {
        id: 'rec2',
        name: 'Pepperoni Perfection',
        size: '9 inch',
        price: 173000,
        image: pepperoniPizza, // <--- SỬ DỤNG BIẾN ĐÃ IMPORT
    },
    {
        id: 'rec3',
        name: 'Super Supreme',
        size: '12 inch',
        price: 225000,
        image: superSupreme, // <--- SỬ DỤNG BIẾN ĐÃ IMPORT
        badge: '-50%',
    },
];

const RecommendationSection = () => {
    return (
        <section className=" py-16 md:py-24 text-center">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-4">SIGNATURE TODAY</h2>
                <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                    Khám phá những món đặc trưng ngon nhất của chúng tôi, được lựa chọn kỹ càng mỗi ngày.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {recommendations.map((pizza) => (
                        <PizzaCard key={pizza.id} pizza={pizza} />
                    ))}
                </div>

                <Button variant="dark-outline" onClick={() => console.log('See More clicked')}>
                    SEE MORE
                </Button>
            </div>
        </section>
    );
};

export default RecommendationSection;