export interface Brand {
    brand_code: string;
    brand_name: string;
}

export interface BrandGroup {
    brand_type: string;
    brands: Brand[];
}