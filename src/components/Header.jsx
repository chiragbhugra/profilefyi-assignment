import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import useCartStore from "../store/cartStore";
import Cart from "./Cart";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef(null);
  const { items } = useCartStore();

  const cartCount = useMemo(() => items.reduce((total, item) => total + item.quantity, 0), [items]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md transition-shadow duration-300">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to= "/" >
          <img src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/46190b63764575.5abb892616e9e.jpg" 
          alt="Logo" 
          className="w-14 h-14 rounded-full mr-2 cursor-pointer" />
          
          </Link>
        </div>
        {/* <nav>
          <ul className="flex space-x-6">
            <li><Link to="/" className="text-secondary hover:text-primary transition-colors duration-300">Home</Link></li>
            <li><Link to="/about" className="text-secondary hover:text-primary transition-colors duration-300">About</Link></li>
            <li><Link to="/contact" className="text-secondary hover:text-primary transition-colors duration-300">Contact</Link></li>
          </ul>
        </nav> */}
        <div className="relative" ref={cartRef}>
          <button 
            onClick={handleCartToggle}
            className="text-2xl text-secondary hover:text-primary focus:outline-none transition-colors duration-300"
            aria-label="Toggle cart"
          >
            <FaShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          {isCartOpen && (
            <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50 max-h-[80vh] overflow-hidden">
              <Cart setIsCartOpen={setIsCartOpen} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;