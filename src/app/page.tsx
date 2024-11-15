import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-row items-center justify-center h-screen">
      <div className="flex items-center justify-center h-screen w-1/2 overflow-hidden">
        <Image src="https://images.pexels.com/photos/28986947/pexels-photo-28986947/free-photo-of-classic-car-collection-exhibition-in-poland.jpeg" alt="" width={1000} height={1000} className="h-[150%] w-full"/>
      </div>
      <div className="flex flex-col items-start justify-center h-screen w-1/2 pl-[7%]">
        <h1 className="text-[80px] font-bold leading-[1.3] mt-10">Manage Your Cars Seamlessly</h1>
        <p className="text-[60px] w-[70%] mt-10 leading-[1.3]">All Things Car, All in One Place.</p>
        <Link href="/productList" className="w-[50%] h-[60px] bg-blue-500 rounded-[30px] mt-14 font-bold text-white flex items-center justify-center"><button>Start Managing</button></Link>
      </div>
    </div>
  );
}
