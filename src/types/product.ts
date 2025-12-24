
// 상품 단건에 대한 타입 정의
export interface Product {
    product_code: string;
    name: string;
    brand: string;
    price: number;
    src: string;
}


export interface ProductListProps {
    initialProducts: {
        items: Product[];
        totalPages: number;
    }
}

