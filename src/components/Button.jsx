import React from "react";

const Button = ({ onClick, className, children, ariaLabel, variant = "primary", size = "medium" }) => {
  const baseClasses = "px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ease-in-out";
  
  const variantClasses = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400",
    outline: "bg-transparent border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 active:bg-indigo-100",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
  };

  const sizeClasses = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button 
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;