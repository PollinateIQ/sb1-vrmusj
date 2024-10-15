import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Header from './components/Header'
import LandingPage from './pages/LandingPage'
import MenuPage from './pages/MenuPage'
import OrderPage from './pages/OrderPage'
import PaymentPage from './pages/PaymentPage'
import OrderHistoryPage from './pages/OrderHistoryPage'
import ProfilePage from './pages/ProfilePage'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import ForgotPasswordForm from './components/ForgotPasswordForm'
import AdminApp from './admin/AdminApp'
import ProtectedRoute from './components/ProtectedRoute'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { FavoritesProvider } from './context/FavoritesContext'
import SplashScreen from './components/SplashScreen'
import LoadingSpinner from './components/LoadingSpinner'

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
      setIsLoading(false);
    }, 3000); // Show splash screen for 3 seconds

    return () => clearTimeout(splashTimer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <div className="flex flex-col min-h-screen">
              <Routes>
                <Route path="/admin/*" element={<AdminApp />} />
                <Route
                  path="/*"
                  element={
                    <>
                      <Header />
                      <main className="flex-grow pb-16 md:pb-0">
                        <Routes>
                          <Route path="/" element={<LandingPage />} />
                          <Route path="/menu" element={<MenuPage />} />
                          <Route path="/order/:orderId" element={<OrderPage />} />
                          <Route path="/payment" element={<PaymentPage />} />
                          <Route path="/order-history" element={
                            <ProtectedRoute>
                              <OrderHistoryPage />
                            </ProtectedRoute>
                          } />
                          <Route path="/profile" element={
                            <ProtectedRoute>
                              <ProfilePage />
                            </ProtectedRoute>
                          } />
                          <Route path="/login" element={<LoginForm />} />
                          <Route path="/signup" element={<SignupForm />} />
                          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
                        </Routes>
                      </main>
                    </>
                  }
                />
              </Routes>
            </div>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;