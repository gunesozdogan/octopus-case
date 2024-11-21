import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Link from "next/link";

const renderRatingBar = (rating: number) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <div className="flex gap-[4px] width-[117px]">
      {Array.from({ length: fullStars }, (_, index) => (
        <span key={`full-${index}`} className="text-2xl text-black">
          ★
        </span>
      ))}

      {Array.from({ length: emptyStars }, (_, index) => (
        <span key={`empty-${index}`} className="text-2xl text-black-300">
          ☆
        </span>
      ))}
    </div>
  );
};

export const Products = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [commonProducts, setCommonProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const searchQuery = useSelector((state: RootState) => state.search.query);
  const selectedCategory = useSelector(
    (state: RootState) => state.categories.selectedCategory
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const searchUrl =
      "https://dummyjson.com/products/search?q=" +
      encodeURIComponent(searchQuery) +
      "&limit=0";
    const categoryUrl =
      "https://dummyjson.com/products/" +
      (selectedCategory ? "category/" + selectedCategory : "") +
      "?limit=0";

    Promise.all([fetch(searchUrl), fetch(categoryUrl)])
      .then(([searchRes, categoryRes]) =>
        Promise.all([searchRes.json(), categoryRes.json()])
      )
      .then(([searchData, categoryData]) => {
        const searchProducts = searchData.products || [];
        const categoryProducts = categoryData.products || [];

        const commonProducts = searchProducts.filter((product: any) =>
          categoryProducts.some(
            (categoryProduct: any) => categoryProduct.id === product.id
          )
        );
        setCommonProducts(commonProducts);
        setTotalProducts(commonProducts.length);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Error fetching products");
        setLoading(false);
      });
  }, [searchQuery, selectedCategory, currentPage]);

  const productsPerPage = 9;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = commonProducts.slice(startIndex, endIndex);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const maxVisiblePages = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  const pagesToShow = pageNumbers.slice(startPage - 1, endPage);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex-1">
      {loading && <p>Loading products...</p>}
      {error && <p>{error}</p>}

      <h2 className="text-[20px] font-poppins font-bold mb-[16px]">{`${totalProducts} ürün listeleniyor`}</h2>
      <div className="grid grid-cols-3 gap-[32px]">
        {totalProducts === 0 && !loading && !error && <p>No products found</p>}

        {currentProducts.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} passHref>
            <div className="product-item w-full flex-col gap-[4px] flex">
              <div className="w-full h-[175px] relative flex-col mb-[12px]">
                <img
                  src={product.thumbnail}
                  alt="product-image"
                  loading="lazy"
                  className="w-full h-[175px] object-contain"
                />
              </div>
              <h3 className="text-[16px] font-poppins h-[48px] flex-shrink-0">
                {product.title}
              </h3>
              <span className="text-[16px] font-poppins text-[#626262]">
                {product.brand}
              </span>
              <p className="text-[16px] font-poppins font-bold">
                ${product.price}
              </p>
              <div className="flex flex-col">
                {renderRatingBar(product.rating)}
              </div>
              <button className="w-[90%] bg-[#00B500] rounded-lg text-[white] text-[14px] font-medium font-inter h-[44px] mt-[12px] flex-shrink-0">
                Sepete Ekle
              </button>
            </div>
          </Link>
        ))}
      </div>
      <div className="pagination flex justify-center mt-6">
        <button
          onClick={goToPrevPage}
          className="px-4 py-2 mx-1 rounded-lg"
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {pagesToShow.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => goToPage(pageNumber)}
            className={`px-4 py-2 mx-1 rounded-lg ${
              currentPage === pageNumber
                ? "bg-customGreen text-white"
                : "bg-gray-200"
            }`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={goToNextPage}
          className="px-4 py-2 mx-1 rounded-lg"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};
