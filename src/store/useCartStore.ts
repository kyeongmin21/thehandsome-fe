import {create} from 'zustand/react';
import {persist} from 'zustand/middleware';

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

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: [],
            addItem: (product: CartItem) => set((state) => {
                const isExist = state.items.find((item) => item.product_code === product.product_code);

                if (isExist) {
                    return {
                        items: state.items.map((item) =>
                            item.product_code === product.product_code
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        )
                    };
                }

                return { items: [...state.items, { ...product, quantity: 1 }] };
            }),
        }),
        {
            name: 'cart-storage', // 로컬 스토리지에 저장될 이름
        }
    )
);