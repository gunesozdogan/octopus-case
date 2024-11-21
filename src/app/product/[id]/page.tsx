"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { Navbar } from "@/app/components/Navbar";
import { useParams } from "next/navigation";
import ProductImage from "@/app/components/ProductImage";
import ProductDetails from "@/app/components/ProductDetails";
import ProductSummary from "@/app/components/ProductSummary";

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

  const onAddToCart = (productId: number, userId: number) => {
    fetch(`https://dummyjson.com/carts/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        merge: true,
        products: [
          {
            id: productId,
            quantity: 1,
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then(console.log)
      .catch((err) => console.error("Failed to add product to cart:", err));
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <Navbar user={user} />
      <div className="mx-[80px] my-[56px] flex gap-8">
        <ProductImage
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          product={product}
        />
        <ProductDetails
          title={product.title}
          description={product.description}
          price={product.price}
        />
      </div>
      <ProductSummary
        title={product.title}
        description={product.description}
        price={product.price}
        productId={product.id}
        onAddToCart={onAddToCart}
      />
    </div>
  );
}
