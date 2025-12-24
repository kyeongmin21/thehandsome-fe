
export interface Wishlist {
    id: number;
    user_id: number;
    product_code: string;

    // 서버에서 같이 내려주는 상세 정보들 추가
    src: string;
    name: string;
    brand: string;
    price: string;
    created_at: string;
}

export interface MyWishedData {
    wishedMap: Record<string, boolean>;
    wishListItems: Wishlist[];
}


export interface WishedProduct {
    product_code: string;
    src: string;
    name: string;
    brand: string;
    price: string;
}

export interface WishedBrand {
    brand_code: string;
    brand_name: string;
}

export type TabType = 'heart' | 'brand';

