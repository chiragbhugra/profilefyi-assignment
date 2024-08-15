import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import Button from './Button';
import Counter from './Counter';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { items, getCartTotal, updateQuantity, removeItem } = useCartStore();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const calculations = useMemo(() => {
    const subtotal = getCartTotal() || 0;
    let discount = 0;
    let tax = subtotal * 0.10; // 10% tax
    let shipping = subtotal > 100 ? 0 : 10; // Free shipping for orders over $100, otherwise $10
    let total = subtotal + tax + shipping;

    if (appliedCoupon) {
      discount = subtotal * 0.1; // 10% discount
      total = total - discount;
    }

    return {
      subtotal,
      discount,
      tax,
      shipping,
      total
    };
  }, [items, getCartTotal, appliedCoupon]);

  const applyCoupon = () => {
    console.log('applyCoupon called', couponCode);
    if (couponCode.toLowerCase() === 'discount10') {
      setAppliedCoupon({ code: couponCode, value: 0.1 });
      toast.success('Coupon applied successfully!');
    } else {
      setAppliedCoupon(null);
      toast.error('Invalid coupon code.');
    }
    setCouponCode(''); // Clear the input field after applying
  };

  const handleQuantityChange = (itemId, change) => {
    const item = items.find(i => i.id === itemId);
    if (item) {
      const newQuantity = Math.max(0, item.quantity + change);
      updateQuantity(itemId, newQuantity);
    }
  };

  // Function to truncate title
  const truncateTitle = (title, maxLength) => {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">Your Cart is Empty</h1>
        <p className="mb-8 text-gray-600">Click the button below to navigate to the shopping page.</p>
        <Link to="/">
          <Button variant="primary" ariaLabel="Go to Shopping Page">
            Go to Shopping Page
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-800">Shopping Bag</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">{items.length} items in your bag</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="hidden sm:table-header-group">
                  <tr className="border-b">
                    <th className="text-left py-2 text-gray-600">Product</th>
                    <th className="text-right py-2 text-gray-600">Price</th>
                    <th className="text-center py-2 text-gray-600">Quantity</th>
                    <th className="text-right py-2 text-gray-600">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item.id} className="border-b sm:border-none">
                      <td className="py-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center">
                          <img src={item.image} alt={item.title} className="w-16 h-16 object-cover mr-0 sm:mr-4 mb-2 sm:mb-0 rounded-md" />
                          <div>
                            <h3 className="font-medium text-gray-800">
                              <span className="hidden sm:inline">{item.title}</span>
                              <span className="sm:hidden">{truncateTitle(item.title, 20)}</span>
                            </h3>
                            <p className="text-sm text-gray-500">Color: {item.color || 'N/A'}</p>
                            <p className="text-sm text-gray-500">Size: {item.size || 'N/A'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-right py-4 text-gray-700">${item.price.toFixed(2)}</td>
                      <td className="text-center py-4">
                        <div className="flex items-center justify-center">
                          <Counter
                            quantity={item.quantity}
                            onIncrease={() => handleQuantityChange(item.id, 1)}
                            onDecrease={() => handleQuantityChange(item.id, -1)}
                          />
                        </div>
                      </td>
                      <td className="text-right py-4 font-medium text-indigo-600">${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Coupon Code</h2>
            <p className="text-sm text-gray-500 mb-4">Enter your coupon code if you have one</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter coupon code"
              />
                <Button onClick={applyCoupon} variant="primary">Apply</Button>
              </div>
              <p className=" text-sm text-gray-400">discount10</p>
          </div>
          <div className="bg-indigo-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Cart Total</h2>
            <div className="flex justify-between mb-2 text-gray-600">
              <span>Cart Subtotal</span>
              <span>${calculations.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2 text-gray-600">
              <span>Shipping</span>
              {calculations.shipping === 0 ? (
                <span className="text-green-600">Free</span>
              ) : (
                <span>${calculations.shipping.toFixed(2)}</span>
              )}
            </div>
            <div className="flex justify-between mb-2 text-gray-600">
              <span>Tax (10%)</span>
              <span>${calculations.tax.toFixed(2)}</span>
            </div>
            {appliedCoupon && (
              <div className="flex justify-between mb-2 text-green-600">
                <span>Discount (10%)</span>
                <span>-${calculations.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t border-gray-200 text-gray-800">
              <span>Cart Total</span>
              <span>${calculations.total.toFixed(2)}</span>
            </div>
            {calculations.subtotal <= 100 && (
              <p className="text-sm text-indigo-600 mt-2">
                Add ${(100 - calculations.subtotal).toFixed(2)} more to your cart for free shipping!
              </p>
            )}
            <Button variant="primary" className="w-full mt-4">Proceed to Checkout</Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <div className="bg-indigo-100 p-3 rounded-full mr-4">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Free Shipping</h3>
            <p className="text-sm text-gray-500">When you spend $50+</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <div className="bg-indigo-100 p-3 rounded-full mr-4">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-3.28a1 1 0 01-.948-.684l-1.498-4.493a1 1 0 01.502-1.21l2.257-1.13a11.042 11.042 0 00-5.516-5.516l-1.13 2.257a1 1 0 01-.502.502l-4.493-1.498a1 1 0 01-.684-.949V5z" /></svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Call Us Anytime</h3>
            <p className="text-sm text-gray-500">+34 555 5555</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <div className="bg-indigo-100 p-3 rounded-full mr-4">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L5 20l-.02-.18C4.668 15.457 6 13.06 6 10.206V8a5 5 0 10 1 0 10h8a5 5 0 110-10V6a6 6 0 116 6z" /></svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Chat With Us</h3>
            <p className="text-sm text-gray-500">We offer 24-hour chat support</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <div className="bg-indigo-100 p-3 rounded-full mr-4">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10h6m-6-4l6 6m2-6l4-4m5 12l3 3m6-3l4-4m4 5v-1a1 1 0 011 1h-1m-5-4a1 1 0 011-1m5 4c1 1.657L18.828 22m-5-4a1 1 0 011-1m5 4c1.657 0L24 22m-6-3H9z" /></svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Gift Cards</h3>
            <p className="text-sm text-gray-500">For your loved one, in any amount</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;