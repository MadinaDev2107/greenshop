"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { supabase } from "./supbaseClient";
import Plant from "./images/flower.jpg";
import { useRouter } from "next/navigation";

// Define the product and category types
interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  sale: boolean;
  categoryId: number;
}

export default function PlantShop() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  useEffect(() => {
    getCategory();
    getProducts();
  }, []);

  async function getCategory() {
    const { data, error } = await supabase.from("category").select("*");
    if (error) {
      console.error("Error fetching categories:", error);
      return;
    }
    setCategories(data || []);
  }

  async function getProducts() {
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      console.error("Error fetching products:", error);
      return;
    }
    setProducts(data || []);
  }
  const handleProductClick = (productId: number) => {
    router.push(`/shop/${productId}`);
  };

  const filteredProducts = activeCategory
    ? products.filter((product) => product.categoryId === activeCategory)
    : products;

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="p-4 mt-5">
      <div className="md:hidden mb-6 overflow-x-auto whitespace-nowrap space-x-4 flex">
        {categories.map((cat) => {
          const categoryProducts = products.filter(
            (product) => product.categoryId === cat.id
          );
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setCurrentPage(1);
              }}
              className={`px-4 py-2  mb-2 text-sm border rounded-full whitespace-nowrap ${
                activeCategory === cat.id
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {cat.name} ({categoryProducts.length})
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-12 gap-6">
        <aside className="col-span-12 md:col-span-3 space-y-6 hidden md:block">
          <div>
            <h2 className="text-lg font-semibold mb-3">Categories</h2>
            <ul className="space-y-2">
              {categories.map((cat) => {
                const categoryProducts = products.filter(
                  (product) => product.categoryId === cat.id
                );
                return (
                  <li
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setCurrentPage(1);
                    }}
                    className={`flex items-center m-3 justify-between text-sm text-gray-700 cursor-pointer 
                    ${
                      activeCategory === cat.id
                        ? "text-green-600 bg-green-100"
                        : "hover:text-green-600"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-gray-400">
                      ({categoryProducts.length})
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

         

          <div className="bg-green-100 p-4 rounded-xl text-center mt-3">
            <h3 className="text-green-800 text-lg font-bold">Super Sale</h3>
            <p className="text-green-600 text-sm">UP TO 75% OFF</p>
          </div>
        </aside>

        <main className="col-span-12 md:col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPageProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="relative rounded-xl border border-gray-200 shadow hover:shadow-md transition"
              >
                {product.sale && (
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                    -20%
                  </span>
                )}
                <Image
                  width={200}
                  height={200}
                  src={product.image || Plant}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <h4 className="font-semibold text-lg mb-1">{product.name}</h4>
                  <p className="text-green-600 font-bold">{product.price}$</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-4 py-2 rounded border text-sm mt-2 ${
                    pageNum === currentPage
                      ? "bg-black text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              )
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
