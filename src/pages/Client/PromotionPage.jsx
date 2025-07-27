import React from 'react';
import { format } from 'date-fns'; // Đảm bảo bạn đã cài đặt date-fns: npm install date-fns

const DUMMY_PROMOTIONS = [
    {
        _id: 'promo1',
        title: 'Giảm 20% Toàn Bộ Đơn Hàng!',
        description: 'Tận hưởng ưu đãi đặc biệt giảm 20% cho tất cả các sản phẩm trên menu. Áp dụng cho đơn hàng từ 200.000 VNĐ trở lên.',
        imageUrl: 'https://via.placeholder.com/400x250/FFD700/FFFFFF?text=20%25+OFF', // Thay bằng URL ảnh thật
        startDate: new Date('2025-07-20T00:00:00Z'),
        endDate: new Date('2025-08-31T23:59:59Z'),
        termsAndConditions: 'Không áp dụng đồng thời với các chương trình khuyến mãi khác. Chỉ áp dụng cho mua mang về hoặc giao hàng.',
        type: 'discount',
        discountPercentage: 20,
        isActive: true,
    },
    {
        _id: 'promo2',
        title: 'Mua 1 Tặng 1 Pizza Cỡ Vừa!',
        description: 'Mua một pizza cỡ vừa bất kỳ, tặng ngay một pizza cùng cỡ miễn phí. Áp dụng cho các loại pizza có giá trị tương đương hoặc thấp hơn.',
        imageUrl: 'https://via.placeholder.com/400x250/FFA500/FFFFFF?text=Buy+1+Get+1', // Thay bằng URL ảnh thật
        startDate: new Date('2025-07-25T00:00:00Z'),
        endDate: new Date('2025-08-15T23:59:59Z'),
        termsAndConditions: 'Chỉ áp dụng vào các ngày trong tuần (Thứ 2 - Thứ 6). Không áp dụng vào các ngày lễ.',
        type: 'free_item',
        discountPercentage: 0,
        isActive: true,
    },
    {
        _id: 'promo3',
        title: 'Miễn Phí Giao Hàng Cho Đơn Đầu Tiên',
        description: 'Đăng ký tài khoản mới và đặt đơn hàng đầu tiên để được miễn phí giao hàng. Áp dụng cho mọi khu vực trong bán kính 10km.',
        imageUrl: 'https://via.placeholder.com/400x250/32CD32/FFFFFF?text=Free+Delivery', // Thay bằng URL ảnh thật
        startDate: new Date('2025-07-01T00:00:00Z'),
        endDate: new Date('2025-09-30T23:59:59Z'),
        termsAndConditions: 'Chỉ áp dụng cho tài khoản mới. Giá trị đơn hàng tối thiểu 150.000 VNĐ.',
        type: 'event',
        discountPercentage: 0,
        isActive: true,
    },
    {
        _id: 'promo4',
        title: 'Ưu Đãi Đặc Biệt Tháng 8',
        description: 'Khám phá các combo pizza và nước uống với giá ưu đãi đặc biệt trong suốt tháng 8.',
        imageUrl: 'https://via.placeholder.com/400x250/87CEEB/FFFFFF?text=August+Special', // Thay bằng URL ảnh thật
        startDate: new Date('2025-08-01T00:00:00Z'),
        endDate: new Date('2025-08-31T23:59:59Z'),
        termsAndConditions: 'Xem chi tiết các combo tại trang menu.',
        type: 'discount',
        discountPercentage: 15,
        isActive: true,
    }
];

const PromotionPage = () => {
    // Lọc ra các khuyến mãi còn hiệu lực
    const activePromotions = DUMMY_PROMOTIONS.filter(
        (promo) => promo.isActive && new Date(promo.endDate) >= new Date()
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                Current Promotions
            </h1>

            {activePromotions.length === 0 ? (
                <p className="text-center text-gray-600 text-lg">
                    No active promotions at the moment. Please check back later!
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {activePromotions.map((promo) => (
                        <div
                            key={promo._id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform transform hover:scale-105"
                        >
                            <img
                                src={promo.imageUrl || '/images/default-promo.jpg'}
                                alt={promo.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6 flex-grow">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                                    {promo.title}
                                </h2>
                                <p className="text-gray-700 text-base mb-4">
                                    {promo.description}
                                </p>
                                {promo.discountPercentage > 0 && (
                                    <div className="inline-block bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full mb-4">
                                        {promo.discountPercentage}% OFF!
                                    </div>
                                )}
                                <div className="text-sm text-gray-600 mb-2">
                                    Valid from:{" "}
                                    {format(new Date(promo.startDate), "dd/MM/yyyy")}
                                </div>
                                <div className="text-sm text-gray-600 mb-4">
                                    Expires on:{" "}
                                    {format(new Date(promo.endDate), "dd/MM/yyyy")}
                                </div>
                                {promo.termsAndConditions &&
                                promo.termsAndConditions !==
                                "No specific terms and conditions apply." ? (
                                    <details className="text-sm text-gray-600 mt-4">
                                        <summary className="cursor-pointer text-blue-600 hover:underline">
                                            Terms & Conditions
                                        </summary>
                                        <p className="mt-2 text-gray-700">
                                            {promo.termsAndConditions}
                                        </p>
                                    </details>
                                ) : (
                                    <p className="text-sm text-gray-500 mt-4">
                                        No specific terms and conditions apply.
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PromotionPage;