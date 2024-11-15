"use client";
import { useEffect, useState } from "react";
import Image from 'next/image';
import { useRouter } from "next/navigation";

export default function ProductList() {
  interface Product {
    _id: number;
    title: string;
    desc: string;
    tags: string[];
    images: string[];
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`http://localhost:3000/api/car?search=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setProducts(data.cars);
    };
    fetchProducts();
  }, [searchQuery]);

  return (
    <div className="flex flex-col items-center justify-start h-screen w-full">
      <h1 className="text-[60px] font-bold mt-20 self-start ml-20">Product List</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border border-black px-4 py-2 mt-5 rounded-md self-start ml-20 w-[50%]"
      />
      <div className="flex flex-col items-center justify-center w-[90%] pb-20">
        {products.length === 0 && <p className="mt-48">Create New Products</p>}
        {products.map((product) => (
          <div key={product._id} className="mt-10 w-full h-[150px] flex flex-row border shadow-lg rounded-[20px] overflow-hidden">
            <Image src={product.images[0] || 'https://images.pexels.com/photos/29355951/pexels-photo-29355951/free-photo-of-audi-sedan-parked-in-urban-setting-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} width={600} height={100} alt="product image" className="w-[20%]" />
            <div className="px-5 py-3 flex flex-col justify-between overflow-hidden w-full">
              <div className="height-1/2 overflow-hidden">
                <p className="font-bold text-[25px]">{product.title}</p>
                {product.desc.length > 250 ? <p>{product.desc.slice(0, 250)}...</p> : <p>{product.desc}</p>}
              </div>
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row gap-5">
                  {product.tags.map((tag) => (
                    <p key={tag} className="border border-black px-3 py-0.5 rounded-[30px] text-[14px]">{tag}</p>
                  ))}
                </div>
                <p className="border border-black px-3 rounded mb-1 cursor-pointer" onClick={() => router.push(`/product/${product._id}`)}>View</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
