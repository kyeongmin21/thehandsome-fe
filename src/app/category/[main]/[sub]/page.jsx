import ProductList from '@/components/product/ProductList';

const SubCategoryPage = async (props) => {
    const {main, sub} = await props.params;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?main=${main}&sub=${sub}`,
        {cache: "no-store"}
    );

    if (!res.ok) {
        throw new Error('상품목록을 불러오는데 실패했습니다.');
    }

    const products = await res.json();

    return (
        <div className='layout-custom'>
            <h2 className='mb-5'>{main} - {sub} 상품 목록</h2>
            <ProductList initialProducts={products}/>
        </div>
    );
}

export default SubCategoryPage;