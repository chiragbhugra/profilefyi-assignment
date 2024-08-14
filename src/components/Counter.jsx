import React from 'react';


const Counter = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <div className="flex items-center justify-between w-24 mx-auto bg-gray-100 rounded-full overflow-hidden border border-gray-300">
      <button 
        onClick={onDecrease}
        className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span className="text-sm font-semibold text-gray-700" aria-label={`Quantity: ${quantity}`}>
        {quantity}
      </span>
      <button 
        onClick={onIncrease}
        className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
};

export default Counter;