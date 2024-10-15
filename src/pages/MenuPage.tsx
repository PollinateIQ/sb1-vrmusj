import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { menuData } from '../data/menuData';
import MenuCategory from '../components/MenuCategory';
import ShoppingCart from '../components/ShoppingCart';
import MenuFilter from '../components/MenuFilter';
import FloatingActionButton from '../components/FloatingActionButton';
import { Clock, ShoppingBag } from 'lucide-react';

const MenuPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();

  const categories = useMemo(() => {
    return ['all', ...new Set(menuData.map((category) => category.name))];
  }, []);

  const filteredMenu = useMemo(() => {
    if (activeCategory === 'all') {
      return menuData;
    }
    return menuData.filter((category) => category.name === activeCategory);
  }, [activeCategory]);

  // Mock order ID for demonstration
  const mockOrderId = '123456';

  // Mock last order for demonstration
  const mockLastOrder = {
    id: '789012',
    date: '2023-05-15',
    total: 32.50,
  };

  const handleTakeOut = () => {
    // In a real app, you'd probably want to navigate to a page where the user can modify their previous order
    navigate(`/menu?reorder=${mockLastOrder.id}`);
  };

  return (
    <div className="relative min-h-screen pb-20">
      <motion.div
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Our Menu</h1>
        <MenuFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/3 pr-0 md:pr-4">
            {filteredMenu.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <MenuCategory category={category} />
              </motion.div>
            ))}
          </div>
          <div className="w-full md:w-1/3 mt-8 md:mt-0">
            <ShoppingCart />
            <Link
              to={`/order/${mockOrderId}`}
              className="block mt-4 bg-green-500 text-white text-center py-2 px-4 rounded hover:bg-green-600 transition duration-300 flex items-center justify-center"
            >
              <Clock className="mr-2" />
              View Current Order
            </Link>
            <motion.div
              className="mt-4 bg-white rounded-lg shadow-md p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-2">Last Order</h3>
              <p className="text-gray-600 mb-2">Order #{mockLastOrder.id}</p>
              <p className="text-gray-600 mb-2">Date: {mockLastOrder.date}</p>
              <p className="text-gray-600 mb-4">Total: ${mockLastOrder.total.toFixed(2)}</p>
              <button
                onClick={handleTakeOut}
                className="w-full bg-blue-500 text-white text-center py-2 px-4 rounded hover:bg-blue-600 transition duration-300 flex items-center justify-center"
              >
                <ShoppingBag className="mr-2" />
                Take Out
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <FloatingActionButton
        currentOrderId={mockOrderId}
        lastOrderId={mockLastOrder.id}
        onTakeOut={handleTakeOut}
      />
    </div>
  );
};

export default MenuPage;