'use client';
import {useEffect, useState} from 'react';
import apiHelper from '@/api/apiHelper';
import UiButton from "@/components/ui/UiButton";

export default function CategoryPage() {
    const [products, setProducts] = useState([]);

    const fetchProducts = () => {
        apiHelper.axios.get('http://localhost:3001/products')
            .then((res) => {
                console.log('res', res);
                setProducts(res)
            })
            .catch((err) => console.error(err));
    }

    const handleDelete = (id) => {
        apiHelper.axios.delete(`http://localhost:3001/products/${id}`)
        .then(() => {
            fetchProducts()
            console.log(`${id}번째 삭제 성공`)
        })
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Mock 상품 목록</h1>
            <ul>
                {products && products.map((p) => (
                    <li key={p.id}>
                        {p.name} - {p.price.toLocaleString()}원
                        <UiButton btnText={'삭제'} onClick={() => handleDelete(p.id)}></UiButton>
                    </li>
                ))}
            </ul>
        </div>
    );
}
