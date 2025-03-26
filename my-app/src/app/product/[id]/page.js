// app/product/[id]/page.js

import Head from 'next/head';

async function fetchProduct(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();
  return product;
}

export default async function ProductDetail({ params }) {
  const { id } = params;
  const product = await fetchProduct(id); 

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
}
