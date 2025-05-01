import React, { use } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useFilterContext } from "./FilterContext";

interface product {
  category: string;
}

interface FetchResponse {
  products: product[];
}

const SideBar = () => {

  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    keyword,
    setKeyword,
  } = useFilterContext();

  const [categories, setCategories] = useState<string[]>([]);

  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "Fashion",
    "trend",
    "shoes",
    "shirt",
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: FetchResponse = await response.json();
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        console.log(uniqueCategories);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);


  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setMinPrice(undefined);
    } else {
      setMinPrice(parseFloat(value));
    }
  };
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const value = e.target.value;
    if (value === "") {
      setMaxPrice(undefined);
    } else {
      setMaxPrice(parseFloat(value));
    }
  }

  const handleRadioChangeCategories = (category:string) => {
    setSelectedCategory(category);
  }

  const handleKeywordClick = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword("");
  };

  return (
    <div className="w-64 p-5 h-screen">
      <h1 className="text-2xl font-bold mb-10 mt-2">React Store</h1>
      <section>
        <input
          type="text"
          className="border rounded px-2 mb-2 py-2 w-full sm:mb-0"
          placeholder="Search Products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex justify-center items-center">
          <input
            type="number"
            className="border-1 rounded mr-2 px-5 py-3 mb-3 w-full"
            placeholder="Min"
            value={minPrice || ""}
            onChange={handleMinPriceChange}
            

          />
          <input
            type="number"
            className="border-1 rounded  px-5 py-3 mb-5 mt-2 w-full"
            placeholder="Max"
            value={maxPrice || ""}
            onChange={handleMaxPriceChange}
            

          />
        </div>

        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-2">
            Categories
          </h2>
        </div>
        <section>
        {categories.map((category, index) => (
          <label key={index} className="block mb-2 cursor-pointer">
            <input type="radio" name="category" className="mr-2 w-[16px] h-[16px] cursor-pointer" value={category} onChange={() => handleRadioChangeCategories(category)}
            checked={selectedCategory === category}
            />
            {category.toUpperCase()}
          </label>
          
          ))}
          
        </section>
        

        <div className="mb-5 mt-4">
          <h2 className="text-xl font-semibold mb-2">Keywords</h2>
          <div>
            {keywords.map((keyword, index) => (
              <button key={index} onClick={() => handleKeywordClick(keyword)} className="block px-4 py-2 w-full text-left shadow rounded hover:bg-gray-200 mb-2 cursor-pointer">
               
                {keyword.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleResetFilters} className="bg-black text-white px-4 py-2 rounded w-full mb-2 hover:bg-white hover:text-black hover:shadow-2 hover:shadow-black transition duration-300 ease-in-out cursor-pointer"> 
          Reset Filters
        </button>
      </section>
    </div>
  );
};

export default SideBar;
