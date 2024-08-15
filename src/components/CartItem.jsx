import React from 'react';
import useCartStore from '../store/cartStore';
import Counter from './Counter';

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(0, item.quantity + change);
    updateQuantity(item.id, newQuantity);
  };

  // Function to truncate title
  const truncateTitle = (title, maxLength) => {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-center">
        <img src={item.image} alt={item.title} className="w-16 h-16 object-cover mr-4" />
        <div>
          <h3 className="text-sm font-medium text-gray-900">
            <span className="hidden sm:inline">{item.title}</span>
            <span className="sm:hidden">{truncateTitle(item.title, 20)}</span>
          </h3>
          <p className="text-sm text-gray-500">{item.color && `Color: ${item.color}`}</p>
          <p className="text-sm text-gray-500">{item.size && `, Size: ${item.size}`}</p>
        </div>
      </div>
      <div className="flex items-center">
        <Counter
          quantity={item.quantity}
          onIncrease={() => handleQuantityChange(1)}
          onDecrease={() => handleQuantityChange(-1)}
        />
        <button 
          onClick={() => removeItem(item.id)}
          className="ml-4 text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;