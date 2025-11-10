'use client';
import {useEffect, useState} from 'react';
import apiHelper from '@/utils/apiHelper';
import UiButton from "@/components/ui/UiButton";
import UiInput from "@/components/ui/UiInput";
import { productSchema } from "@/utils/validators/product.schema";


export default function CategoryPage() {
    const [products, setProducts] = useState();
    const [newProduct, setNewProduct] = useState({name: '', price: ''});

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

    const handleEdit = (id, newPrice) => {
        const productToEdit = products.find(product => product.id === id);
        if (!productToEdit) return;

        const updatedProduct = {...productToEdit, price: Number(newPrice)};
        apiHelper.axios.put(`http://localhost:3001/products/${id}`, updatedProduct)
            .then(() => {
                alert(`${id}번째를 수정하시겠습니까?`)
                fetchProducts()
            })
    }


    const handleAddProduct = () => {
        const result = productSchema.safeParse(newProduct);

        if (!result.success) {
            const issues = result.error.flatten().fieldErrors;
            const firstError = Object.values(issues).flat()[0];
            alert(firstError || '입력값을 확인해주세요.');
            return;
        }

        const validatedData = {
            ...result.data,
            price: Number(result.data.price),
        };

        apiHelper.axios.post(`http://localhost:3001/products`, validatedData)
            .then(() => {
                fetchProducts();
                setProducts({name: '', price: ''});
            })
    }


    const handlePriceChange = (id, price) => {
        setProducts(prev => prev.map(p => (p.id === id ? {...p, price} : p)))
    }

    const handleNewProductChange = (field, value) => {
        setNewProduct(prev => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Mock 상품 목록</h1>
            <div style={{marginBottom: '20px'}}>
                <h2>상품 등록</h2>
                <UiInput
                    type="text"
                    placeholder={'상품명'}
                    value={newProduct.name}
                    onChange={(e) => handleNewProductChange('name', e.target.value)}
                />
                <UiInput
                    type="number"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    placeholder={'가격'}
                    value={newProduct.price}
                    onChange={(e) => handleNewProductChange('price', e.target.value)}
                />원
                <UiButton btnText="등록" onClick={handleAddProduct}/>
            </div>
            <ul>
                {Array.isArray(products) && products.map((p) => (
                    <li key={p.id}>
                        <div>{p.name}</div>
                        <UiInput type="number"
                                 value={p.price ?? ''}
                                 onChange={(e) => handlePriceChange(p.id, e.target.value)}/>원

                        <UiButton btnText={'수정'}
                                  onClick={() => handleEdit(p.id, p.price)}/>
                        <UiButton btnText={'삭제'}
                                  onClick={() => handleDelete(p.id)}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}
