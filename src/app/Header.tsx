"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  FaShoppingCart,
  FaSearch,
  FaHome,
  FaLeaf,
  FaBlog,
  FaShopify,
} from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "./images/Vector.png";

const Header = () => {
  const [mobileSearch, setMobileSearch] = useState(false);

  const mobileNavItems = [
    { name: "Home", href: "/", icon: <FaHome className="w-5 h-5 text-green-600" /> },
    { name: "Shop", href: "/shop", icon: <FaShopify className="w-5 h-5  text-green-600" /> },
    {
      name: "Plant Care",
      href: "/plant-care",
      icon: <FaLeaf className="w-5 h-5  text-green-600" />,
    },
    { name: "Blogs", href: "/blogs", icon: <FaBlog className="w-5 h-5  text-green-600" /> },
  ];

  return (
    <>
      <header className="px-4 md:px-6 py-4 border-b border-gray-200 bg-white z-50 relative">
        <div className="flex items-center justify-between">
          <div className="lg:flex hidden items-center gap-2">
            <Image src={Logo} alt="Plants" width={30} height={30} />
            <span className="text-green-600 font-extrabold text-xl">
              GREENSHOP
            </span>
          </div>

          {/* Mobile left (only logo or search input) */}
          <div className="lg:hidden flex-1">
            {mobileSearch ? (
              <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2 shadow-sm">
                <FaSearch className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Find your plants"
                  className="bg-gray-100 outline-none ml-3 w-full placeholder:text-gray-500 text-sm"
                />
                <button
                  className="ml-3 text-gray-600 font-bold"
                  onClick={() => setMobileSearch(false)}
                >
                  ✕
                </button>
              </div>
            ) : (
              <span className="text-green-600 font-extrabold text-xl">
                GREENSHOP
              </span>
            )}
          </div>

          {/* Desktop navigatsiya */}
          <nav className="hidden lg:flex gap-14 text-sm font-medium">
            {mobileNavItems.map((item, i) => (
              <a
                href={item.href}
                key={i}
                className="group transition duration-300 font-semibold"
              >
                <span className="text-black text-base border-b-2 border-transparent group-hover:border-green-500 group-hover:font-extrabold transition-all duration-300 pb-1 inline-block">
                  {item.name}
                </span>
              </a>
            ))}
          </nav>

          {/* Ikonkalar */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSearch(!mobileSearch)}
              className="lg:hidden"
            >
              <FaSearch className="w-5 h-5 text-gray-700" />
            </button>

            <Link
              href="/card"
              className="btn btn-success d-flex justify-content-center align-items-center gap-2"
            >
              <FaShoppingCart className="w-5 h-5 text-white" />
              <span className="hidden sm:inline">Cart</span>
            </Link>

            <Link
              href="/login"
              className="btn btn-success d-flex justify-content-center align-items-center gap-2"
            >
              <CiLogin className="w-5 h-5" />
              <span className="hidden sm:inline">Login</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobil pastki navigatsiya */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 flex justify-around items-center py-2 z-50">
        {mobileNavItems.map((item, i) => (
          <Link
            style={{ all: "unset" }}
            href={item.href}
            key={i}
            className="flex flex-col items-center text-xs text-gray-600 hover:text-green-600 transition"
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Header;
