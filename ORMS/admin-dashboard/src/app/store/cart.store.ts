import { create } from "zustand";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],

  addToCart: (item) =>
    set((state) => ({
      cart: [...state.cart, item],
    })),

  clearCart: () =>
    set({
      cart: [],
    }),
}));