'use client'
import Image from 'next/image';
import {SlHeart} from 'react-icons/sl';
import {FaHeart} from 'react-icons/fa';
import {useSession} from 'next-auth/react';
import {useRouter, useSearchParams} from 'next/navigation';
import useToggleWish from '@/hooks/queries/useToggleWish';
import useWishedProducts from '@/hooks/queries/useWishedProducts';
import {ProductListProps} from '@/types/product';


const ProductList = ({initialProducts}: ProductListProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const totalPages = initialProducts.totalPages;

    const page = Number(searchParams.get('page') ??  1);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const {data: session} = useSession();
    const {toggleWish} = useToggleWish();
    const {wishedMap} = useWishedProducts();

    const handleWishList = async (code: string) => {
        if (!session) {
            alert('로그인이 필요한 서비스 입니다.');
            router.push('/login');
            return;
        }
        toggleWish(code);
    };

    const movePage = (nextPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', nextPage.toString());
        router.push(`?${params.toString()}`);
    };


    return (
        <>
            <div className='grid grid-cols-4 gap-6'>
                {initialProducts.items.map((product) => (
                    <div className='mb-10 relative' key={product.product_code}>
                        <div className='relative w-full aspect-[313/471]'>
                            <Image
                                src={product.src}
                                alt={product.name}
                                fill
                                priority
                                sizes='(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw'
                                style={{objectFit: 'cover'}}
                            />
                        </div>

                        {wishedMap[product.product_code] ? (
                            <FaHeart
                                size={23}
                                className='heart-icon'
                                onClick={() => handleWishList(product.product_code)}
                            />
                        ) : (
                            <SlHeart
                                size={23}
                                className='heart-icon'
                                onClick={() => handleWishList(product.product_code)}
                            />
                        )}

                        <p className='mt-2 font-semibold'>{product.brand}</p>
                        <p className='mt-1'>{product.name}</p>
                        <p className='mt-2 font-semibold'>
                            {product.price.toLocaleString()}원
                        </p>
                    </div>
                ))}
            </div>

            {/* 페이지네이션 */}
            <div className='flex justify-center gap-2 mt-10'>
                {page !== 1 && (
                    <button
                        className='cursor-pointer'
                        onClick={() => movePage(page - 1)}>이전</button>
                )}

                {pages.map((pageNum) => (
                    <button
                        key={pageNum}
                        onClick={() => movePage(pageNum)}
                        className={`px-3 transition-all cursor-pointer
                    ${pageNum === page
                            ? 'text-sm '
                            : 'text-sm text-gray-400 hover:text-black'
                        }`}
                    >
                        {pageNum}
                    </button>
                ))}
                {page < totalPages && (
                    <button
                        className='cursor-pointer'
                        onClick={() => movePage(page + 1)}>다음</button>
                )}
            </div>

        </>

    );
};

export default ProductList;