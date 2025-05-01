import React, { useEffect } from "react";
import { useFilterContext } from "./FilterContext";
import { useState } from "react";
import { FaBars, FaHamburger } from "react-icons/fa";
import { SiAxios } from "react-icons/si";
import axios from "axios";
import BookCard from "./BookCard";

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilterContext();
  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
      (currentPage - 1) * itemsPerPage
    }`;
    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    }

    axios
      .get(url)
      .then((response) => {
        setProducts(response.data.products);
        console.log(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [currentPage, keyword]);


  const getFilteredProducts = () => { 
    let filteredProducts = products;
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );

           
    }

    if (minPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      );
    }
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } 
    if (filter === "cheap") {
      filteredProducts = filteredProducts.sort(
        (a, b) => a.price - b.price
      );
    }
    if (filter === "Expensive") {
      filteredProducts = filteredProducts.sort(
        (a, b) => b.price - a.price
      );
    }
    if (filter === "Popular") {
      filteredProducts = filteredProducts.sort(
        (a, b) => b.rating - a.rating
      );
    }
    return filteredProducts;

  }

  const filteredProducts = getFilteredProducts();
  console.log(filteredProducts)

  const toggleDropdown = () => { 
    setDropdownOpen(!dropdownOpen);
  }

  const totalProducts = 100;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  }

  return (
    <section className="xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] mr-[10rem] xs:w-[20rem] p-5">
      <div className="mb-5">
        <div className="flex flex-col justify-between sm:flex-row items-center">
          <div className="relative mb-5 mt-5 ">
            <button
              onClick={toggleDropdown}
              className="border px-4 py-2 rounded-full flex items-center"
            >
              <FaBars
                className={`mr-2 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-90" : ""
                }`}
              />
              {filter === "all"
                ? "Filter"
                : filter.charAt(0).toLocaleLowerCase() + filter.slice(1)}
            </button>

            {dropdownOpen && (
              <div className="absolute bg-white bordre border-gray-300 rounded shadow mt-2 w-full duration-200 sm:w-40">
                <button
                  onClick={() => {
                    setFilter("cheap");
                    setDropdownOpen(false);
                  }}
                  className="block px-4 py-2 text-left hover:bg-gray-200 w-full"
                >
                  Cheap
                </button>
                <button
                  onClick={() => {
                    setFilter("Expensive");
                    setDropdownOpen(false);
                  }}
                  className="block px-4 py-2 text-left hover:bg-gray-200 w-full"
                >
                  Expensive
                </button>
                <button
                  onClick={() => {
                    setFilter("Popular");
                    setDropdownOpen(false);
                  }}
                  className="block px-4 py-2 text-left hover:bg-gray-200 w-full"
                >
                  Popular
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:gird-cols-4 gap-5">
        {filteredProducts.map((product) => (
          <BookCard
            key={product.id}
            title={product.title}
            image={product.thumbnail}
            id={product.id}
            price={product.price}
          />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="border bg-black text-white px-4 py-2 rounded cursor-pointer hover:bg-white hover:text-black flex "
        >
          Previous
        </button>
{/* 
        <div className="flex items-center mt-2 sm:mt-0">
          <span className="text-gray-700 mr-2">
            Page {currentPage} of {totalPages}
          </span>
   
        </div> */}

        <div className="flex flex-wrap justify-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={` px-3 py-1 rounded-full  cursor-pointer ${
                currentPage === index + 1 ? "bg-black text-white" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>





        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="border  bg-black text-white px-4 py-2 rounded cursor-pointer hover:bg-white hover:text-black flex "
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default MainContent;
