"use client";

import React, { useEffect, useState } from "react";
import { getCategories, getOrders, getProducts } from "../Function";
import { Product, Category, Order } from "../Function";
interface Stats {
  title: string;
  count: number;
}

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getProducts().then((res) => setProducts(res as Product[]));
    getCategories().then((res) => setCategories(res as Category[]));
    getOrders().then((res) => setOrders(res));
  }, []);

  const stats: Stats[] = [
    { title: "Categories", count: categories.length },
    { title: "Orders", count: orders.length },
    { title: "Products", count: products.length },
    { title: "Users", count: 8 },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
        Statistics
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center justify-center"
          >
            <h3 className="text-lg font-medium text-gray-600">{item.title}</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {item.count}x
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
