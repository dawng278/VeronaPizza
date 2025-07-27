// frontend/src/pages/Client/MenuPage.jsx
import React, { useState, useMemo, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import useProducts from '../../hooks/useProducts.js';
import MenuSection from '../../components/Menu/MenuSection.jsx';
import CategoryFilter from '../../components/Menu/CategoryFilter.jsx';
import AddProductModal from '../Admin/AddProductModal.jsx';

const MenuPage = () => {
    // TẤT CẢ CÁC HOOKS PHẢI ĐƯỢC GỌI Ở ĐẦU COMPONENT
    const { user } = useAuth(); //
    const { products, loading, error, refetchProducts } = useProducts(); //

    const [selectedCategory, setSelectedCategory] = useState('all'); //
    const [showAddProductModal, setShowAddProductModal] = useState(false); //

    // Filter products based on selected category - useMemo
    const filteredProducts = useMemo(() => { //
        if (selectedCategory === 'all') {
            return products;
        }
        return products.filter(item => item.category === selectedCategory);
    }, [products, selectedCategory]);

    // Handle category selection - useCallback
    const handleSelectCategory = useCallback((categoryId) => { //
        setSelectedCategory(categoryId);
    }, []);

    // Handle successful product addition - useCallback
    const handleAddProductSuccess = useCallback((newProduct) => { //
        refetchProducts();
        setShowAddProductModal(false);
    }, [refetchProducts]);

    // Group filtered products by section - useMemo
    const productsBySection = useMemo(() => { //
        return filteredProducts.reduce((acc, item) => {
            if (!acc[item.section]) {
                acc[item.section] = [];
            }
            acc[item.section].push(item);
            return acc;
        }, {});
    }, [filteredProducts]);

    // BÂY GIỜ CÁC CÂU LỆNH RETURN CÓ ĐIỀU KIỆN ĐƯỢC ĐẶT SAU TẤT CẢ CÁC HOOKS
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen text-xl text-gray-700">
                Loading menu...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen text-xl text-red-600">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#F4EDD3]">
            <main className="flex-grow">
                <h1 className="text-center text-5xl font-extrabold text-orange-600 py-10 md:py-16 uppercase">
                    MENU
                </h1>

                <CategoryFilter
                    activeCategory={selectedCategory}
                    onSelectCategory={handleSelectCategory}
                />

                <section className="container mx-auto px-4 py-8">
                    {Object.keys(productsBySection).length > 0 ? (
                        Object.keys(productsBySection).map(sectionTitle => (
                            <MenuSection
                                key={sectionTitle}
                                sectionTitle={sectionTitle}
                                items={productsBySection[sectionTitle]}
                                user={user}
                                setShowAddProductModal={setShowAddProductModal}
                            />
                        ))
                    ) : (
                        <p className="text-center text-xl text-gray-500 py-10">No items found for this category.</p>
                    )}
                </section>
            </main>

            {user && user.role === 'admin' && showAddProductModal && (
                <AddProductModal
                    onClose={() => setShowAddProductModal(false)}
                    onProductAdded={handleAddProductSuccess}
                />
            )}
        </div>
    );
};

export default MenuPage;