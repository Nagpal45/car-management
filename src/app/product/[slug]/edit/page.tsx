"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import Image from "next/image";

const ProductEdit = () => {
  const { slug } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState({
    title: "",
    desc: "",
    tags: "",
    images: [] as string[],
  });
  const [resources, setResources] = useState<string[]>([]);

  useEffect(() => {
    // Fetch the product details when the page loads
    const fetchProduct = async () => {
      const res = await fetch(`http://localhost:3000/api/car/${slug}`);
      const data = await res.json();
      setProduct({
        ...data.car,
        tags: data.car.tags?.join(", "), // Convert tags array to a comma-separated string
      });
      setResources(data.car.images || []);
    };
    fetchProduct();
  }, [slug]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const inputs = Object.fromEntries(formData.entries());

    const response = await fetch(`/api/car/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: inputs.title,
        desc: inputs.desc,
        tags:
          typeof inputs.tags === "string"
            ? inputs.tags.split(",").map((tag) => tag.trim())
            : [],
        images: resources, 
      }),
    });

    if (response.ok) {
      router.push(`/product/${slug}`);
    } else {
      console.error("Failed to update product");
    }
  };

  return (
    <div className="w-full h-screen flex items-start justify-center pt-16">
      <div className="w-3/4 flex flex-col items-center justify-start py-10">
        <h1 className="mb-14 font-bold text-[40px]">Edit Product</h1>
        <form onSubmit={handleUpdate} className="w-[80%] space-y-10">
          <div>
            <label htmlFor="title" className="block font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={product.title}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
              required
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label htmlFor="desc" className="block font-medium">
              Description
            </label>
            <textarea
              id="desc"
              name="desc"
              value={product.desc}
              onChange={(e) =>
                setProduct({ ...product, desc: e.target.value })
              }
              required
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label htmlFor="tags" className="block font-medium">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={product.tags}
              onChange={(e) =>
                setProduct({ ...product, tags: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label className="block font-medium mb-10">Images</label>
            <div className="flex flex-row flex-wrap items-center gap-4">
              {resources.map((url, index) => (
                <div key={index} className="relative">
                  <Image
                    src={url}
                    alt={`Uploaded Image ${index + 1}`}
                    width={100}
                    height={100}
                    className="rounded"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setResources((prev) =>
                        prev.filter((_, i) => i !== index)
                      )
                    }
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 text-sm"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
          <CldUploadWidget
            uploadPreset="estate"
            onSuccess={(result) => {
              if (result.info && typeof result.info === "object") {
                setResources((prevResources) => [
                  ...prevResources,
                  (result.info as CloudinaryUploadWidgetInfo).secure_url,
                ]);
              }
            }}
            onQueuesEnd={(result, { widget }) => {
              widget.close();
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="mt-4 bg-blue-500 text-white w-[50%]  h-12 rounded"
              >
                Upload More Images
              </button>
            )}
          </CldUploadWidget>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-3 rounded w-full"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductEdit;