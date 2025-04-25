"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "./images/Vector.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSearchBar = () => {
    setMobileSearch(!mobileSearch);
    setMenuOpen(false);
  };

  return (
    <header className="px-4 md:px-6 py-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="lg:flex hidden items-center gap-2">
            <Image src={Logo} alt="Plants" width={30} height={30} />
            <span className="text-green-600 font-extrabold text-xl">
              GREENSHOP
            </span>
          </div>

          {/* Mobil holatda search */}
          <div className="lg:hidden w-full">
            {mobileSearch ? (
              <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2 w-full shadow-sm">
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
        </div>

        <nav className="hidden lg:flex gap-14 text-sm font-medium">
          {[
            { name: "Home", href: "/" },
            { name: "Shop", href: "/shop" },
            { name: "Plant Care", href: "/plant-care" },
            { name: "Blogs", href: "/blogs" },
          ].map((item, i) => (
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

        {/* Desktop icons */}
        <div className="hidden lg:flex items-center gap-4">
          <FaSearch className="w-5 h-5 cursor-pointer text-gray-700 hover:text-green-600 transition" />
          <Link
            href="/card"
            className="btn btn-success d-flex justify-content-center align-items-center gap-2"
          >
            <FaShoppingCart className="w-5 h-5 text-white" />
            <span className="hidden sm:inline">Card </span>
          </Link>

          <Link
            href="/login"
            className="btn btn-success d-flex justify-content-center align-items-center gap-2"
          >
            <CiLogin className="w-5 h-5" />
            <span className="hidden sm:inline">Login</span>
          </Link>
        </div>

        {/* Mobil ikonlar */}
        <div className="lg:hidden flex items-center gap-4">
          <button onClick={toggleSearchBar}>
            <FaSearch className="w-5 h-5 text-gray-700" />
          </button>
          <button onClick={toggleMobileMenu}>
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && !mobileSearch && (
        <div className="lg:hidden mt-4 flex flex-col gap-4 text-sm font-semibold">
          {[
            { name: "Home", href: "/" },
            { name: "Shop", href: "/shop" },
            { name: "Plant Care", href: "/plant-care" },
            { name: "Blogs", href: "/blogs" },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="text-black border-b border-gray-300 pb-2 transition hover:text-green-600"
            >
              {item.name}
            </a>
          ))}
          <div className="flex items-center gap-4 mt-2">
            <Link
              href="/card"
              className="flex items-center gap-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded transition"
            >
              <FaShoppingCart className="w-5 h-5 text-white" />
              Cart
            </Link>

            <Link
              href="/login"
              className="flex items-center gap-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded transition"
            >
              <CiLogin className="w-5 h-5" />
              <span>Login</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
