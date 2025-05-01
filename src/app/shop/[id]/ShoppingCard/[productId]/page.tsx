"use client";
import { supabase } from "@/app/supbaseClient";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

interface Product {
  id: number;
  product: {
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
}
const Shopping = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);
  if (userId) {
    fetchCartItems();
  }

  async function fetchCartItems() {
    const { data: addings, error: addingError } = await supabase
      .from("adding")
      .select("*")
      .eq("userId", userId);

    if (addingError) {
      console.error("Error fetching cart items:", addingError);
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

        return {
          ...item,
          product,
        };
      })
    );

    setCartItems(itemsWithProducts);
  }

  const handleQuantityChange = async (
    itemId: number,
    currentQty: number,
    action: string
  ) => {
    const updatedQty =
      action === "increase" ? currentQty + 1 : Math.max(1, currentQty - 1);

    const { error } = await supabase
      .from("adding")
      .update({ quantity: updatedQty })
      .eq("id", itemId);

    if (error) {
      console.error("Failed to update quantity:", error);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: updatedQty } : item
      )
    );
  };

  const delProduct = async (itemId: number) => {
    const { error } = await supabase.from("adding").delete().eq("id", itemId);
    if (error) {
      console.error("Failed to delete item:", error);
      return;
    }
    fetchCartItems();
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      return sum + (item.product?.price || 0) * (item.quantity || 0);
    }, 0);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-center mb-6">Cart</h2>

      <div className=" mb-2 space-y-4 md:hidden">
        {cartItems.map((item) => {
          const product = item.product;
          const quantity = item.quantity;

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl mb-2 p-4 shadow flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={product?.image || "/placeholder.png"}
                  alt={product?.name || "Product Image"}
                  width={60}
                  height={60}
                  className="rounded-xl object-cover"
                />
                <div>
                  <p className="font-semibold">{product?.name}</p>
                  <p className="text-sm text-gray-500">Size: M</p>
                  <p className="text-green-600 font-bold text-lg">
                    ${product?.price}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  <button
                    className="bg-gray-200 p-2 rounded-full"
                    onClick={() =>
                      handleQuantityChange(item.id, quantity, "decrease")
                    }
                  >
                    <FaMinus size={12} />
                  </button>
                  <span className="text-lg font-medium">{quantity}</span>
                  <button
                    className="bg-gray-200 p-2 rounded-full"
                    onClick={() =>
                      handleQuantityChange(item.id, quantity, "increase")
                    }
                  >
                    <FaPlus size={12} />
                  </button>
                </div>
                <button
                  onClick={() => delProduct(item.id)}
                  className="text-red-500"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop View: Table + Checkout side-by-side */}
      <div className="mb-10 md:mb-0 md:flex md:gap-6 md:items-start">
        {/* Cart Table */}
        <div className="hidden md:block w-2/3">
          <table className="w-full table-auto border text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Price</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Total</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                const product = item.product;
                const quantity = item.quantity;

                return (
                  <tr key={item.id} className="border-t">
                    <td className="p-3 flex items-center gap-3">
                      <Image
                        src={product?.image || "/placeholder.png"}
                        alt={product?.name || "Product Image"}
                        width={50}
                        height={50}
                        className="rounded object-cover"
                      />
                      <span>{product?.name}</span>
                    </td>
                    <td className="p-3">${product?.price}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <button
                          className="bg-gray-200 px-2 py-1 rounded"
                          onClick={() =>
                            handleQuantityChange(item.id, quantity, "decrease")
                          }
                        >
                          <FaMinus size={12} />
                        </button>
                        <span>{quantity}</span>
                        <button
                          className="bg-gray-200 px-2 py-1 rounded"
                          onClick={() =>
                            handleQuantityChange(item.id, quantity, "increase")
                          }
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>
                    </td>
                    <td className="p-3">
                      ${(product?.price * quantity).toFixed(2)}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => delProduct(item.id)}
                        className="text-red-500"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Checkout Box */}
        <div className="w-full mb-10 md:mb-0 md:w-1/3 mt-6 md:mt-0">
          <div className="bg-white p-4 rounded-2xl shadow-md space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Shipping</span>
              <span>$16.00</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${(calculateTotal() + 16).toFixed(2)}</span>
            </div>

            <Link
              href="/Checkout"
              className=" mb-10 block mt-4 bg-green-600 text-white text-center py-3 rounded-xl font-semibold"
            >
              Proceed To Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shopping;
