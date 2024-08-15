import React from "react";
import useCartStore from "../store/cartStore";
import Button from "./Button";
import Counter from "./Counter";

const ProductCard = ({ product }) => {
  const { addItem, updateQuantity, items } = useCartStore();
  const cartItem = items.find(item => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    addItem(product);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(0, quantity + change);
    updateQuantity(product.id, newQuantity);
  };

  return (
    <div className="flex flex-col h-full border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-white">
      <div className="relative pt-[100%] overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.title}
          className="absolute inset-0 w-full h-full object-contain p-4 bg-white"
        />
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
            {product.title}
          </h3>
          <p className="text-xl font-bold text-primary mb-4">
            ${(product.price || 0).toFixed(2)}
          </p>
        </div>
        {quantity === 0 ? (
          <div className="flex justify-center">
            <Button 
              onClick={handleAddToCart}
              variant="primary"
              ariaLabel={`Add ${product.title} to cart`}
            >
              Add to Cart
            </Button>
          </div>
        ) : (
          <Counter
            quantity={quantity}
            onIncrease={() => handleQuantityChange(1)}
            onDecrease={() => handleQuantityChange(-1)}
          />
        )}
      </div>
    </div>
  );
};

export default ProductCard;