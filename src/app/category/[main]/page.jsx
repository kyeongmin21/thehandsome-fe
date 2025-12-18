import ProductList from '@/components/product/ProductList';

const PAGE_SIZE = 8;

const MainCategoryPage = async ({params, searchParams}) => {
    const {main} = await params;
    const searchParam = await searchParams;
    const page = Number(searchParam.page ?? 1);

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?main=${main}&page=${page}&size=${PAGE_SIZE}`,
        {cache: "no-store"}
    );

    if (!res.ok) {
        throw new Error('상품목록을 불러오는데 실패했습니다.');
    }

    const products = await res.json();

    return (
        <div className='layout-custom'>
            <h2 className='mb-5'>{main} 전체 상품</h2>
            <ProductList initialProducts={products}/>
        </div>
    );
}

export default MainCategoryPage;