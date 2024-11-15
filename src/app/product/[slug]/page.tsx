"use client"
import Slider from "@/components/slider";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Product = () => {
  const carId = useParams().slug; 
  
  const router = useRouter();
  interface Product {
    title: string;
    desc: string;
    images: string[];
  }

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`http://localhost:3000/api/car/${carId}`);
      const data = await res.json();
      setProduct(data.car);
    }
    fetchProduct();
  }, [carId]);



  const handleEdit = () => {
    router.push(`/product/${carId}/edit`);
  };  

  const  handleDelete = async () =>{
    await fetch(`http://localhost:3000/api/car/${carId}`, {
      method: "DELETE",
    });
    router.push('/productList')
  }

  return (
    <div className="h-screen w-full flex flex-row items-center justify-center">
      <div className="w-1/2 flex items-start justify-start h-full">
        <Slider images={product?.images || []} />
      </div>
      <div className="w-1/2 flex flex-col items-center justify-between px-10 h-[90%]">
        <div className="flex flex-col w-full items-start justify-start pt-16">
          <h1 className="font-bold text-[50px]">{product?.title}</h1>
          <p>{product?.desc}</p>
        </div>
        <div className="flex flex-row gap-5 w-full">
          <button className="w-1/2 bg-yellow-200 h-14 rounded-[10px]" onClick={handleEdit}>Edit</button>
          <button className="w-1/2 bg-red-300 h-14 rounded-[10px]" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Product;