'use client';  

import Link from 'next/link';
import Head from 'next/head';

const products = [
  { id: 1, name: 'Product 1', price: '$10' },
  { id: 2, name: 'Product 2', price: '$20' },
  { id: 3, name: 'Product 3', price: '$30' },
];

export default function Products() {
  return (
    <div>
      <Head>
        <title>Products</title>
        <meta name="description" content="Browse our products" />
      </Head>
      <h1>Our Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/product/${product.id}`}>
              <h2>{product.name}</h2>
            </Link>
            <p>{product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
