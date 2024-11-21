"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { Navbar } from "@/app/components/Navbar";
import { useParams } from "next/navigation";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
}

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const user = useSelector((state: RootState) => state.user.user);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    if (params.id) {
      fetch(`https://dummyjson.com/products/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setSelectedImage(data.images[0]);
        })
        .catch((err) => console.error("Failed to fetch product:", err));
    }
  }, [params.id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <Navbar user={user} />
      <div className="mx-[80px] my-[56px] flex gap-8">
        <div>
          <img
            src={selectedImage}
            alt={product.title}
            className="w-[400px] h-[400px] object-contain border rounded"
          />
          <div className="flex gap-2 mt-4">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title} - ${index + 1}`}
                className={`w-[80px] h-[80px] object-cover border rounded cursor-pointer ${
                  selectedImage === image
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-700 mt-4">{product.description}</p>
          <p className="text-xl font-semibold mt-4">${product.price}</p>
        </div>
      </div>
    </div>
  );
}
