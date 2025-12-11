'use client'
import Image from 'next/image';
import {SlHeart} from "react-icons/sl";
import {FaHeart} from "react-icons/fa";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import useToggleWish from "@/hooks/queries/useToggleWish";
import useWishedProducts from "@/hooks/queries/useWishedProducts";


const ProductList = ({initialProducts}) => {
    const router = useRouter();
    const {data: session} = useSession();
    const {toggleWish} = useToggleWish();
    const {wishedMap} = useWishedProducts();

    const handleWishList = async (code) => {
        if (!session) {
            alert('로그인이 필요한 서비스 입니다.');
            router.push('/login');
            return;
        }
        toggleWish(code);
    };

    return (
        <div className="grid grid-cols-4 gap-6">
            {initialProducts.map((product) => (
                <div className='mb-10 relative' key={product.product_code}>
                    <div className="relative w-full aspect-[313/471]">
                        <Image
                            src={product.src}
                            alt={product.name}
                            fill
                            priority
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                            style={{objectFit: 'cover'}}
                        />
                    </div>

                    {wishedMap[product.product_code] ? (
                        <FaHeart
                            size={23}
                            className="heart-icon"
                            onClick={() => handleWishList(product.product_code)}
                        />
                    ) : (
                        <SlHeart
                            size={23}
                            className="heart-icon"
                            onClick={() => handleWishList(product.product_code)}
                        />
                    )}

                    <p className='mt-2 font-semibold'>{product.brand}</p>
                    <p className="mt-1">{product.name}</p>
                    <p className="mt-2 font-semibold">
                        {product.price.toLocaleString()}원
                    </p>
                </div>
            ))}
        </div>
    );
};

export default ProductList;