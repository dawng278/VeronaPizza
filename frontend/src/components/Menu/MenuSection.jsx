// frontend/src/components/Menu/MenuSection.jsx
import React from 'react';
import PropTypes from 'prop-types';
import MenuItemCard from './MenuItemCard';
import Button from '../Common/Button'; // Import Button component

const MenuSection = React.memo(({ sectionTitle, items, user, setShowAddProductModal }) => {
    // Group items by their section (e.g., "CHEESE VOLCANO", "SUPER TOPPING")
    const sections = items.reduce((acc, item) => {
        if (!acc[item.section]) {
            acc[item.section] = [];
        }
        acc[item.section].push(item);
        return acc;
    }, {});

    // Get ordered section titles to ensure consistent display
    const orderedSectionTitles = Object.keys(sections);

    return (
        <section className="py-8 md:py-12 px-4">
            {/* Nếu cần nút Add Product cho admin ở mỗi section */}
            {/* {user && user.role === 'admin' && (
        <div className="text-right mb-4">
          <Button onClick={() => setShowAddProductModal(true)} variant="primary">
            Add New Product
          </Button>
        </div>
      )} */}

            {orderedSectionTitles.map(section => (
                <div key={section} className="mb-12">
                    <h2 className="text-4xl font-extrabold text-orange-600 text-center uppercase mb-8 md:mb-12 border-b-2 border-orange-500 pb-4">
                        {section}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                        {sections[section].map((item) => (
                            <MenuItemCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
});

MenuSection.propTypes = {
    sectionTitle: PropTypes.string, // Có thể bỏ nếu sectionTitle được quản lý nội bộ
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            section: PropTypes.string.isRequired, // Đảm bảo có section để nhóm
            // ... các prop khác của item
        })
    ).isRequired,
    user: PropTypes.object, // User object for admin check
    setShowAddProductModal: PropTypes.func, // Function to open modal
};

MenuSection.displayName = 'MenuSection';

export default MenuSection;