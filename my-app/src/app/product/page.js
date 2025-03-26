// // // app/products/page.js
// // import Head from 'next/head';

// // async function fetchProducts() {
// //   const res = await fetch('https://fakestoreapi.com/products');
// //   const products = await res.json();
// //   return products;
// // }

// // export default async function Products() {
// //   const products = await fetchProducts(); // جلب البيانات من API

// //   return (
// //     <div>
// //       <Head>
// //         <title>Our Products</title>
// //         <meta name="description" content="Browse our products" />
// //       </Head>
// //       <h1>Our Products</h1>
// //       <ul>
// //         {products.map((product) => (
// //           <li key={product.id}>
// //             <a href={`/product/${product.id}`}>
// //               <h2>{product.name}</h2>
// //             </a>
// //             <p>{product.price}</p>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }
// // app/products/page.js
// import Head from 'next/head';

// async function fetchProducts() {
//   const res = await fetch('https://fakestoreapi.com/products');
//   const products = await res.json();
//   return products;
// }

// export default async function Products() {
//   const products = await fetchProducts(); // جلب البيانات من API

//   return (
//     <div>
//       <Head>
//         <title>Our Products</title>
//         <meta name="description" content="Browse our products" />
//       </Head>
//       <h1>Our Products</h1>
//       <ul>
//         {products.map((product) => (
//           <li key={product.id}>
//             <a href={`/product/${product.id}`}>
//               <h2>{product.title}</h2>
//             </a>
//             <p>{product.price}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Products() {
  const [products, setProducts] = useState([]);

  // جلب المنتجات من الـ API عند تحميل الصفحة
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6 text-center">Our Products</h1>
      
      {/* زر إضافة منتج جديد */}
      <div className="mb-4 text-right">
        <Link href="/products/add">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Add New Product
          </button>
        </Link>
      </div>

      {/* قائمة المنتجات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-bold mt-2">{product.price} $</p>

            {/* الأزرار "Edit" و "Delete" */}
            <div className="flex justify-between items-center mt-4">
              <Link href={`/products/edit/${product._id}`}>
                <button className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600">
                  Edit
                </button>
              </Link>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // وظيفة حذف المنتج
  async function handleDelete(id) {
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setProducts(products.filter(product => product._id !== id));
    } else {
      alert('Failed to delete product');
    }
  }
}
