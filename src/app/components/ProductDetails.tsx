import { CheckIcon } from "./CheckIcon";

interface ProductDetailsProps {
  title: string;
  description: string;
  price: number;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  title,
  description,
  price,
}) => {
  return (
    <div>
      <div className="flex gap-[10px] flex-col">
        <h1 className="text-[40px] font-poppins font-bold">{title}</h1>
        <p className="text-[#888888] font-poppins text-[20px]">{description}</p>
      </div>
      <div className="flex flex-col my-[56px]">
        <h2 className="font-bold text-[16px] font-poppins mb-[9px]">
          Renk Seç:
        </h2>
        <div className="flex gap-8">
          <div className="flex items-center w-[145px] h-[45px] border-0.5 border-[#C0C0C0] pl-[20px] gap-[8px] cursor-pointer">
            <div
              className="w-[20px] h-[20px] rounded-full bg-gray-400 border-gray-500"
              title="Silver"
            ></div>
            <span className="text-[#C0C0C0]">Silver</span>
          </div>
          <div className="flex items-center w-[145px] h-[45px] shadow-custom pl-[20px] gap-[8px] cursor-pointer">
            <div
              className="w-[20px] h-[20px] rounded-full bg-black border border-gray-500 flex items-center justify-center"
              title="Black"
            ></div>
            <span className="">Black</span>
            <CheckIcon />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-[20px] w-[398px]">
        <div className="w-[189px] h-[100px] p-[10px] shadow-custom cursor-pointer">
          <div className="flex gap-[20px]">
            <h3 className="font-poppins font-semibold text-[14px] text-[#000000]">
              Ürün Özellik 1
            </h3>
            <CheckIcon />
          </div>
          <span className="text-[#1E1E21] font-poppins text-[14px]">
            Lorem ipsum dolor sit amet
          </span>
        </div>
        <div className="border border-[#C0C0C0] w-[189px] h-[100px] p-[10px] cursor-pointer">
          <h3 className="font-poppins font-semibold text-[14px] text-[#8D8D8D]">
            Ürün Özellik 1
          </h3>
          <span className="text-[#C0C0C0] font-poppins text-[14px]">
            Lorem ipsum dolor sit amet
          </span>
        </div>
        <div className="border border-[#C0C0C0] w-[189px] h-[100px] p-[10px] cursor-pointer">
          <h3 className="font-poppins font-semibold text-[14px] text-[#8D8D8D]">
            Ürün Özellik 1
          </h3>
          <span className="text-[#C0C0C0] font-poppins text-[14px]">
            Lorem ipsum dolor sit amet
          </span>
        </div>
        <div className="border border-[#C0C0C0] w-[189px] h-[100px] p-[10px] cursor-pointer">
          <h3 className="font-poppins font-semibold text-[14px] text-[#8D8D8D]">
            Ürün Özellik 1
          </h3>
          <span className="text-[#C0C0C0] font-poppins text-[14px]">
            Lorem ipsum dolor sit amet
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
