'use client';  // تأكد من أن هذا السطر في أول الملف لتحويل المكون إلى مكون عميل

import { useParams } from 'next/navigation';  // استيراد useParams من next/navigation
import { useEffect, useState } from 'react';
import Head from 'next/head';

const ProductDetail = () => {
  const { id } = useParams();  // استخدام useParams للحصول على المعلمة id من الرابط
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      const products = [
        { id: '1', name: 'Product 1', price: '$10', description: 'Description for Product 1' },
        { id: '2', name: 'Product 2', price: '$20', description: 'Description for Product 2' },
        { id: '3', name: 'Product 3', price: '$30', description: 'Description for Product 3' },
      ];
      const selectedProduct = products.find((prod) => prod.id === id);  // البحث عن المنتج بناءً على id
      setProduct(selectedProduct);
    }
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;  // إذا لم يتم العثور على المنتج، عرض صفحة تحميل
  }

  return (
    <div>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={product.description} />
      </Head>
      <h1>{product.name}</h1>
      <p>{product.price}</p>
      <p>{product.description}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;
