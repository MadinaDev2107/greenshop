"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import Plant from "./images/flower.jpg";
import Link from "next/link";

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <section className="w-full bg-white py-10 px-4 text-[14px]">
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-10">
        {/* Text Block */}
        <div className="mt-5 text-sm sm:text-xs md:text-base text-left flex flex-col justify-start items-start">
          <p className="tracking-widest font-bold text-gray-900 uppercase">
            Welcome to Greenshop
          </p>
          <h1 className="w-full uppercase text-[10px] sm:text-xs md:text-l font-bold leading-tight text-gray-800">
            <span className="font-extrabold">
              let<span>&apos;</span>s make a <br />
            </span>
            <span className="font-extrabold">better </span>
            <span className="text-green-600 font-extrabold">planet</span>
          </h1>
          <p className="sm:w-[150px] md:w-[600px] mt-4 text-xs sm:text-sm md:text-base text-gray-600">
            {isMobile
              ? "We are an online plant shop offering a wide range"
              : "We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create a unique Urban Jungle. Order your favorite plants!"}
          </p>
          {isMobile ? (
            <Link
              style={{ width: "150px", height: "50px" }}
              href={"/shop"}
              className="text-success btn font-monospace"
            >
              <span>SHOP NOW</span>
              <span className="text-xl">→</span>
            </Link>
          ) : (
            <Link
              href={"/shop"}
              style={{ width: "150px", height: "50px" }}
              className="btn btn-success mt-3 d-flex justify-content-center align-items-center"
            >
              Shop now
            </Link>
          )}
        </div>

        {/* Image Block */}
        <div className="relative w-full md:w-1/2 flex justify-center mt-4 md:mt-0">
          <Image
            src={Plant}
            alt="Hero Plant"
            className="w-[250px] sm:w-[250px] md:w-[300px] lg:w-[400px] h-[150px] sm:h-[200px] md:h-auto"
          />
        </div>
      </div>
    </section>
  );
}
