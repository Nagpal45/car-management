"use client"
import { useEffect, useState } from "react";
import Image from 'next/image';

export default function ProductList() {
  interface Product {
    _id: number;
    title: string;
    desc: string;
    tags: string[];
    images: string[];
  }

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:3000/api/car');
      const data = await response.json();
      setProducts(data.cars);
      
    }
    fetchProducts();
  }, []);
  

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Product List</h1>
      <ul>
        {products?.map((product) => (
          <div key={product._id}>
            <li>{product.title}</li>
            <li>{product.desc}</li>
            {product.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
            <Image src={""} alt={product.title} width={200} height={200} />
          </div>
        ))}
      </ul>
    </div>

  )
}
