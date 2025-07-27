// frontend/src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import { AuthProvider } from './contexts/AuthContext.jsx';
import { CartProvider } from './contexts/CartContext.jsx';

import Header from './components/Layout/Header.jsx';
import Footer from './components/Layout/Footer.jsx';
import HomePage from './pages/Client/HomePage.jsx';
import MenuPage from './pages/Client/MenuPage.jsx';
import CartOverlay from './components/Cart/CartOverlay.jsx';
import LoginForm from './components/Auth/LoginForm.jsx';
import RegisterForm from './components/Auth/RegisterForm.jsx';
import PromotionPage from './pages/Client/PromotionPage.jsx';
import LocationPage from './pages/Client/LocationPage.jsx';

function App() {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState('login');

    const [isCartModalOpen, setIsCartModalOpen] = useState(false); // <--- Đảm bảo state này tồn tại

    const handleAccountClick = () => {
        console.log("handleAccountClick called. Setting isAuthModalOpen to true.");
        setIsAuthModalOpen(true);
        setAuthMode('login');
    };

    const handleCartClick = () => { // <--- Đảm bảo hàm này được định nghĩa ở đây
        console.log("handleCartClick called. Setting isCartModalOpen to true.");
        setIsCartModalOpen(true);
    };

    const handleCloseAuthModal = () => {
        console.log("handleCloseAuthModal called. Setting isAuthModalOpen to false.");
        setIsAuthModalOpen(false);
    };

    const handleSwitchToRegister = () => {
        console.log("Switching to Register form.");
        setAuthMode('register');
    };

    const handleSwitchToLogin = () => {
        console.log("Switching to Login form.");
        setAuthMode('login');
    };

    const handleCloseCartOverlay = () => { // <--- Đảm bảo hàm này cũng tồn tại
        console.log("handleCloseCartOverlay called. Setting isCartModalOpen to false.");
        setIsCartModalOpen(false);
    };

    return (
        <Router>
            <AuthProvider>
                <CartProvider>
                    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
                        <Header onCartClick={handleCartClick} onAccountClick={handleAccountClick} />

                        <main className="flex-grow">
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/menu" element={<MenuPage />} />
                                <Route path="/promotion" element={<PromotionPage />} />
                                <Route path="/location" element={<LocationPage />} />
                            </Routes>
                        </main>

                        <Footer />

                        {/* Render CartOverlay có điều kiện */}
                        {isCartModalOpen && <CartOverlay onClose={handleCloseCartOverlay} />} {/* <--- Sử dụng handleCloseCartOverlay */}

                        {/* Render Auth Modals có điều kiện */}
                        {isAuthModalOpen && (
                            authMode === 'login' ? (
                                <LoginForm
                                    onClose={handleCloseAuthModal}
                                    onSwitchToRegister={handleSwitchToRegister}
                                />
                            ) : (
                                <RegisterForm
                                    onClose={handleCloseAuthModal}
                                    onSwitchToLogin={handleSwitchToLogin}
                                />
                            )
                        )}
                    </div>
                </CartProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;