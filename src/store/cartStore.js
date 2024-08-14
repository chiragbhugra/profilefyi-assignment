import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import axios from 'axios'
import { toast } from 'react-toastify';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      products: [],
      isLoading: false,
      error: null,
      addItem: (product) => set((state) => {
        const existingItem = state.items.find(item => item.id === product.id)
        if (existingItem) {
          toast.info(`Increased ${product.title} quantity in cart`);
          return {
            items: state.items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          }
        } else {
          toast.success(`Added ${product.title} to cart`);
          return { items: [...state.items, { ...product, quantity: 1 }] }
        }
      }),
      removeItem: (productId) => set((state) => ({
        items: state.items.filter(item => item.id !== productId)
      })),
      updateQuantity: (productId, quantity) => set((state) => ({
        items: state.items.map(item =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item
        ).filter(item => item.quantity > 0)
      })),
      clearCart: () => set({ items: [] }),
      getCartCount: () => get().items.reduce((total, item) => total + item.quantity, 0),
      getCartTotal: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
      fetchProducts: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.get('https://fakestoreapi.com/products');
          if (Array.isArray(response.data)) {
            set({ 
              products: response.data,
              isLoading: false 
            });
          } else {
            throw new Error('Received data is not an array');
          }
        } catch (error) {
          console.error('Error fetching products:', error);
          let errorMessage = 'Failed to fetch products. Please try again.';
          if (error.response) {
            errorMessage += ` Status: ${error.response.status}`;
          } else if (error.request) {
            errorMessage += ' Network error. Please check your internet connection.';
          } else {
            errorMessage += ` ${error.message}`;
          }
          set({ error: errorMessage, isLoading: false, products: [] });
          toast.error(errorMessage);
        }
      },
    }),
    {
      name: 'cart-storage',
      getStorage: () => localStorage,
    }
  )
)

export default useCartStore