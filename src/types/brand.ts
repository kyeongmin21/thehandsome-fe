
// 개별 브랜드
export interface BrandItem {
    brand_code: string;
    brand_name: string;
}


// 헤더 브랜드 그룹
export interface BrandGroup {
    brand_type: string;
    brands: BrandItem[]
}


// 위시리스트용 데이터 (하트상태)
export interface MyBrandListData {
    wishedBrandMap: Record<string, boolean>;
    wishedBrandList: BrandItem[];
}