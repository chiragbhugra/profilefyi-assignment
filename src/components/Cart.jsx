import React from 'react';
import useCartStore from '../store/cartStore';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import Button from './Button';

const Cart = ({ setIsCartOpen }) => {
  const { items, getCartTotal, clearCart } = useCartStore();

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
  };

  return (
    <div className="bg-white shadow-xl rounded-lg p-4 max-w-md mx-auto max-h-[80vh] flex flex-col" role="dialog" aria-label="Shopping Cart">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {items.length === 0 ? (
        <p className="text-center py-4">Your cart is empty.</p>
      ) : (
        <>
          <div className="flex-grow overflow-y-auto mb-4">
            {items.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <Button 
              onClick={clearCart}
              variant="danger"
              className="mt-4 w-full"
              ariaLabel="Clear Cart"
            >
              Clear Cart
            </Button>
            <Link to="/checkout">
              <Button 
                onClick={handleProceedToCheckout}
                variant="primary"
                className="mt-2 w-full"
                ariaLabel="Proceed to Checkout"
              >
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;