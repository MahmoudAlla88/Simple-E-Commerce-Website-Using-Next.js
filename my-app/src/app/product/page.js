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
//               <h2>{product.name}</h2>
//             </a>
//             <p>{product.price}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
// app/products/page.js
import Head from 'next/head';

async function fetchProducts() {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();
  return products;
}

export default async function Products() {
  const products = await fetchProducts(); // جلب البيانات من API

  return (
    <div>
      <Head>
        <title>Our Products</title>
        <meta name="description" content="Browse our products" />
      </Head>
      <h1>Our Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <a href={`/product/${product.id}`}>
              <h2>{product.title}</h2>
            </a>
            <p>{product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
