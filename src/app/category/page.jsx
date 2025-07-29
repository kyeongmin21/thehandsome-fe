'use client';
import {useEffect, useState} from 'react';
import apiHelper from '@/api/apiHelper';

export default function CategoryPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        apiHelper.axios.get('mocks/product.json')
            .then((res) => setProducts(res))
            .catch((err) => console.error('Mock 데이터 로딩 실패:', err));
    }, []);

    return (
        <div>
            <h1>Mock 상품 목록</h1>
            <ul>
                {products.map((p) => (
                    <li key={p.id}>
                        {p.name} - {p.price.toLocaleString()}원
                    </li>
                ))}
            </ul>
        </div>
    );
}
