"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "../supbaseClient";

interface Product {
  id: string;
  product: {
    name: string;
    price: string;
    image: string;
  };
  quantity: number;
}

const Card = () => {
  const [cardItems, setCardItems] = useState<Product[]>([]);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchCartItems();
    }
  }, [userId]); // 🔁 Faqat userId o'zgarganda fetch chaqiriladi

  async function fetchCartItems() {
    setLoading(true);

    const { data: addings, error: addingError } = await supabase
      .from("card")
      .select("*")
      .eq("userId", userId);

    if (addingError) {
      console.error("Error fetching cart items:", addingError);
      setLoading(false);
      return;
    }

    const itemsWithProducts = await Promise.all(
      addings.map(async (item) => {
        const { data: product, error: productError } = await supabase
          .from("products")
          .select("name, price, image, id")
          .eq("id", item.product_id)
          .single();

        if (productError) {
          console.error("Product fetch error:", productError);
        }

        return { ...item, product };
      })
    );

    setCardItems(itemsWithProducts);
    setLoading(false);
  }

  const handleRemove = async (card_id: string) => {
    const { error } = await supabase.from("card").delete().eq("id", card_id);
    if (error) {
      console.error("Delete error:", error);
    } else {
      fetchCartItems();
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center sm:text-left">
        Your Cart
      </h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : cardItems.length === 0 ? (
        <p className="text-green-600 text-center">No products in cart 🛒</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow p-4 border hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="w-full h-40 relative mb-3 rounded-lg overflow-hidden">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <h2 className="text-base sm:text-lg font-semibold mb-1">
                  {item.product.name}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base mb-1">
                  ${item.product.price}
                </p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="mt-4 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition"
              >
                Remove from cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;

     
