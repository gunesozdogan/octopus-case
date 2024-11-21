import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

interface ProductSummaryProps {
  title: string;
  description: string;
  price: number;
  onAddToCart: (productId: number, userId: number) => void;
  productId: number;
}

const ProductSummary: React.FC<ProductSummaryProps> = ({
  title,
  description,
  price,
  onAddToCart,
  productId,
}) => {
  const userId = useSelector((state: RootState) => state.user.user.id);

  return (
    <div className="flex h-[100px] border-0.5 border-[#C1C1C1] w-screen">
      <div className="font-bold font-poppins text-[22px] px-[38px] py-[33px] w-[214px] flex-shrink-0 border-r border-r-[#c1c1c1]">
        Sipariş Özeti
      </div>
      <div className="px-[32px] py-[26px] flex items-center flex-1">
        <div>
          <h2 className="font-bold font-poppins text-[18px]">{title}</h2>
          <p className="truncate text-[#888888] text-[16px] font-poppins w-[560px]">
            {description}
          </p>
        </div>
        <div className="flex items-center gap-[16px] flex-1 justify-end">
          <span className="font-medium text-[34px] font-poppins">${price}</span>
          <button
            onClick={() => onAddToCart(productId, userId)}
            className="w-[150px] h-[44px] bg-[#00B500] text-white text-[14px] rounded-lg font-medium"
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSummary;
