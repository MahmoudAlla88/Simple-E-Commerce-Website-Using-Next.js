import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Welcome to Our E-Commerce Store</title>
        <meta name="description" content="Your one-stop shop for great products" />
      </Head>
      <h1>Welcome to Our E-Commerce Store</h1>
      <nav>
        <ul>
          <li><Link href="/product">Products</Link></li>
          <li><Link href="/about">About Us</Link></li>

        </ul>
      </nav>
    </div>
  );
}
