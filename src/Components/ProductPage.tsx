import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
import { useState } from "react";
import axios from "axios";

interface Product { 
  id: number
  title: string;
  description: string;
  images: string[];
  price: number;
  rating: number;

}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);


  useEffect(() => {
    if(id) {
     axios.get<Product>(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        navigate("/"); // Redirect to home page on error
      }
      );
    }
  }, [id])

  if (!product) {
    return <h1>
      Loading...
    </h1>
  }
  


  return <div className="p-5 w-[60%]">
    <button onClick={() => navigate(-1)} className="bg-black cursor-pointer text-white px-4 py-2 rounded mb-4">
      Back
    </button>


    <img src={product.images[0]} alt={product.title} className="w-[60%]  h-auto mb-5" />
    <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
    <p className="text-gray-700 mb-4 w-[70%]">{product.description}</p>
    <div className="flex ">
      <p className="mr-10">${product.price.toFixed(2)}</p>
      <p className="text-gray-500">Rating: {product.rating}</p>

    </div>
  </div>;
};

export default ProductPage;
