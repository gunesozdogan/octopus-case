import React from "react";

interface ProductImageProps {
  selectedImage: string;
  setSelectedImage: (image: string) => void;
  product: {
    title: string;
    images: string[];
  };
}

const ProductImage: React.FC<ProductImageProps> = ({
  selectedImage,
  setSelectedImage,
  product,
}) => {
  return (
    <div>
      <img
        src={selectedImage}
        alt={product.title}
        className="w-[471px] h-[587px] object-contain"
      />
      <div className="flex gap-2 mt-4 items-center justify-center">
        {product.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${product.title} - ${index + 1}`}
            className={`h-[100px] object-contain border cursor-pointer ${
              selectedImage === image ? "border-black" : "border-gray"
            }`}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImage;
