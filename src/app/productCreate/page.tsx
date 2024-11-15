"use client"
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const ProductCreate = () => {
  const [resources, setResources] = useState<CloudinaryUploadWidgetInfo[]>([]);
  const [cloudName, setCloudName] = useState<string | null>(null);
  const router = useRouter();

  // Check if we're on the client side
  useEffect(() => {
    const name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!name) {
      console.error('Missing env var NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME');
    } else {
      setCloudName(name);
      console.log(name);
    }
  }, []);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const inputs = Object.fromEntries(formData.entries());

    const response = await fetch('/api/car', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: inputs.title,
        desc: inputs.desc,
        tags: typeof inputs.tags === 'string' ? inputs.tags.split(',').map((tag) => tag.trim()) : [],
        images: resources.map((resource) => resource.secure_url),
      }),
    });
    if (response.ok) {
      router.push('/productList');
    } else {
      console.error('Failed to create product');
    }
  };

  if (!cloudName) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-3/4 flex items-center justify-center flex-col">
        <h1 className="mb-14 font-bold text-[40px]">Add New Product</h1>
        <form onSubmit={handleCreate} className="w-[80%] space-y-10">
          <div>
            <label htmlFor="title" className="block font-medium">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label htmlFor="desc" className="block font-medium">Description</label>
            <textarea
              id="desc"
              required
              name="desc"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label htmlFor="tags" className="block font-medium">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
          </div>
          <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-3 rounded w-full">Create Product</button>
        </form>
      </div>
      
      <div className="w-1/2 flex items-center justify-center bg-gray-200 h-screen overflow-hidden flex-col">
        <div className="flex flex-row flex-wrap h-content w-full items-center justify-center">
          {resources.map((resource, index) => (
            <Image key={index} src={resource.secure_url} alt="Uploaded Image" className="m-3" width={150} height={50}/>
          ))}
        </div>
        <CldUploadWidget
          uploadPreset="estate"
          // cloudName={cloudName} // Pass the cloudName explicitly
          onSuccess={(result) => {
            if (result.info && typeof result.info === 'object') {
              setResources((prevResources) => [...prevResources, result.info as CloudinaryUploadWidgetInfo]);
            }
          }}
          onQueuesEnd={(result, { widget }) => {
            widget.close();
          }}
        >
          {({ open }) => {
            function handleOnClick() {
              setResources([]); 
              open();
            }
            return <button onClick={handleOnClick} className="mt-4 bg-blue-500 text-white w-[50%] h-[7%] rounded">Upload Images</button>;
          }}
        </CldUploadWidget>
      </div>
    </div>
  );
};

export default ProductCreate;
