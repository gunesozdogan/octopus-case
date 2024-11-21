import { useState, useEffect } from "react";
import { SearchIcon } from "./SearchIcon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setSearchQuery } from "../store/searchSlice";
import { setCategory } from "../store/categorySlice";

export const Filter: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAll, setShowAll] = useState<boolean>(false);

  const selectedCategory = useSelector(
    (state: RootState) => state.categories.selectedCategory
  );
  const searchQuery = useSelector((state: RootState) => state.search.query);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    fetch("https://dummyjson.com/products/category-list")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, []);

  const categoriesToShow = showAll ? categories : categories.slice(0, 6);

  const handleToggleCategory = (category: string) => {
    if (selectedCategory === category) {
      dispatch(setCategory(null));
    } else {
      dispatch(setCategory(category));
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  return (
    <div className="flex flex-col gap-[16px] w-[255px]">
      <div className="relative">
        <div className="absolute left-[16px] top-1/2 transform -translate-y-1/2 w-[20px] h-[20px] flex items-center justify-center">
          <SearchIcon />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Quick Search"
          className="border border-[#E2E8F0] rounded-lg w-[256px] h-[44px] pl-[44px] pr-[16px] py-[12px]"
        />
      </div>
      <div>
        <div className="h-[36px] border-b-5 border-black">
          <h2 className="font-poppins font-bold text-[18px]">Kategoriler</h2>
        </div>
      </div>

      <div className="flex flex-col gap-[16px]">
        {loading ? (
          <p>Loading...</p>
        ) : categories.length === 0 ? (
          <p>No categories available</p>
        ) : (
          categoriesToShow.map((category, index) => (
            <div key={index} className="flex items-center gap-[10px] h-[21px]">
              <input
                type="checkbox"
                checked={selectedCategory === category}
                onChange={() => handleToggleCategory(category)}
                className="w-[17px] h-[17px]"
              />
              <span className="capitalize text-[14px] font-poppins">
                {category}
              </span>
            </div>
          ))
        )}
      </div>

      {categories.length > 6 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="h-[44px] bg-[#F1F5F9] text-[#1E293B] rounded-lg text-[14px] font-medium mt-[8px]"
        >
          Show More
        </button>
      )}
      {showAll && (
        <button
          onClick={() => setShowAll(false)}
          className="h-[44px] bg-[#F1F5F9] text-[#1E293B] rounded-lg text-[14px] font-medium mt-[8px]"
        >
          Show Less
        </button>
      )}

      <button className="h-[44px] bg-[#1E293B] rounded-lg text-white font-inter text-[14px] font-medium mt-[16px]">
        Filtrele
      </button>
    </div>
  );
};
