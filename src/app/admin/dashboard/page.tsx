"use client";

import React, { useEffect, useState } from "react";
import { getCategories,  getOrders, getProducts } from "../Function";

const Dashboard = () => {
  const [Products, setProducts] = useState([]);
  const [Category, setCategories] = useState([]);
  const [Orders, setOrders] = useState([]);

  useEffect(() => {
    getProducts().then((Res) => setProducts(Res));
    getCategories().then((Res) => setCategories(Res));
    getOrders().then((Res) => setOrders(Res));
  }, []);

  const stats = [
    { title: "Categories", count: Category.length },
    { title: "Orders", count: Orders.length },
    { title: "Products", count: Products.length },
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
