import { useState } from "react";
import Image from "next/image";

interface SliderProps {
  images: string[];
}

export default function Slider({ images }: SliderProps) {
  const [imageIndex, setImageIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      {imageIndex !== null && (
        <div className="absolute top-0 w-full h-screen left-0 bg-black bg-opacity-90 flex justify-between items-center z-50 overflow-hidden">
          <div
            className=""
            onClick={() =>
              setImageIndex((imageIndex - 1 + images.length) % images.length)
            }
          >
            <Image src="/arrow.png" alt="" width={80} height={80} />
          </div>
          <div className="h-[90%] object-cover flex justify-center items-center overflow-hidden">
            <Image src={images[imageIndex]} alt="" className='w-[90%]' width={2000} height={2000} />
          </div>
          <div
            className=""
            onClick={() => setImageIndex((imageIndex + 1) % images.length)}
          >
            <Image
              src="/arrow.png"
              alt=""
              className="rotate-180"
              width={80}
              height={80}
            />
          </div>
          <div className="absolute top-0 left-0 text-white font-bold text-[50px] ml-10 mt-2 cursor-pointer" onClick={() => setImageIndex(null)}>
            X
          </div>
        </div>
      )}
      <div className="rounded-[40px] overflow-hidden mt-20">
        {images.length > 0 ? (
          <Image
            src={images[0]}
            alt=""
            onClick={() => setImageIndex(0)}
            width={700}
            height={700}
          />
        ) : (
          <Image
            src="https://images.pexels.com/photos/29355951/pexels-photo-29355951/free-photo-of-audi-sedan-parked-in-urban-setting-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            width={700}
            height={700}
            alt=""
          />
        )}
      </div>
      {images.length > 1 && (
        <div className="flex flex-row mt-5 w-full justify-center overflow-hidden">
          {images.slice(1,4).map((image, index) => (
            <div className="relative" key={index}>
              <Image
                src={image}
                alt=""
                onClick={() => setImageIndex(index + 1)}
                width={300}
                height={300}
                className="w-[220px] h-[150px] m-2 rounded-[20px]"
              />
              {index === 2 && (
                <div
                  className="absolute top-2 right-2 w-[220px] h-[150px] bg-black bg-opacity-50 text-white flex justify-center items-center rounded-[20px] cursor-pointer"
                  onClick={() => setImageIndex(index + 1)}
                >
                  +{images.length - 3} more photos
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
