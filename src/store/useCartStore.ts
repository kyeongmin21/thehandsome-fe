import {create} from "zustand/react";


interface CartItem {
    product_code: string;
    name: string;
    price: number;
    src: string;
    brand: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addItem: (product: CartItem) => void;
}

export const useCartStore = create<CartState>((set) => ({
    items: [],
    addItem: (product: CartItem) => set((state) => {
        const isExist = state.items.find((item) => item.product_code === product.product_code);

        if (isExist) {
            return {
                items: state.items.map((item) =>
                item.product_code === product.product_code
                ? {...item, quantity: item.quantity + 1}
                : item)
            }
        }

        return { items: [...state.items, { ...product, quantity: 1 }] };
    })
}))
export default class useCounterStore {
}