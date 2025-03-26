'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditProduct({ params }) {
  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`/api/products/${params.id}`);
      const data = await res.json();
      setProduct(data);
      setName(data.name);
      setPrice(data.price);
      setDescription(data.description);
    }
    fetchProduct();
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/products/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, price, description }),
    });

    if (res.ok) {
      alert('Product updated successfully!');
      router.push('/products');
    } else {
      alert('Failed to update product');
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
