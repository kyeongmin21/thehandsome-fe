'use client'

import Image from 'next/image';
import {useCartStore} from '@/store/useCartStore';


const Cart = () => {
    const items = useCartStore((state) => state.items);

    console.log('장바구니 페이지 장바구니:', items);
    return (
        <div className='layout-custom'>
            <h2>장바구니 페이지</h2>
            {items.length === 0 ? (
                <p className='py-20 text-center text-gray-500'>장바구니에 담긴 상품이 없습니다.</p>
            ) : (
                <div className='flex flex-col gap-4 mt-10'>
                    {items.map((item) => (
                        <div key={item.product_code}
                             className='flex items-center border-b border-gray-200 pb-4 gap-4'>
                            <div className='relative w-24 h-32'>
                                <Image
                                    className='object-cover'
                                    src={item.src}
                                    alt={item.name}
                                    fill
                                />
                            </div>

                            <div className='flex-1'>
                                <p className='font-bold'>{item.brand}</p>
                                <p>{item.name}</p>
                                <p className='text-sm text-gray-600'>수량: {item.quantity}개</p>
                            </div>

                            <div className='text-right'>
                                <p className='font-bold'>{(item.price * item.quantity).toLocaleString()}원</p>
                            </div>
                        </div>
                    ))}

                    <div className='mt-3 text-right'>
                        <span className='text-xl'>총 합계: </span>
                        <span className='text-2xl font-bold text-red-500'>
                            {items.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0).toLocaleString()}원
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart;