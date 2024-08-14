import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import useCartStore from "../store/cartStore";

const Home = () => {
  const { products, isLoading, error, fetchProducts } = useCartStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      {!Array.isArray(products) || products.length === 0 ? (
        <p className="text-center py-4">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;