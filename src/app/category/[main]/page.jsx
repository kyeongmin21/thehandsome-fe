import ProductList from '@/components/product/ProductList';

const MainCategoryPage = async (props) => {
    const {main} = await props.params;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?main=${main}`,
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