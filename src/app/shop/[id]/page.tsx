"use client";

import { supabase } from "@/app/supbaseClient";
import Image from "next/image";
import Plant from "@/app/images/flower.jpg";
import Link from "next/link";
import {
  FaRegHeart,
  FaFacebookF,
  FaPlus,
  FaTwitter,
  FaInstagram,
  FaMinus,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

interface Product {
  id: string;
  name: string;
  price: string;
  sale: boolean;
  category: string;
  description: string;
  image: string;
  like: boolean;
}

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [like, setLike] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

        if (error || !data) {
          setError("Mahsulot topilmadi.");
        } else {
          setProduct(data);
          setLike(data.like);
        }
      } catch (err) {
        console.error(err);
        setError("Xatolik yuz berdi: ");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleLike = async () => {
    const newLike = !like;
    setLike(newLike);

    const { error } = await supabase
      .from("products")
      .update({ like: newLike })
      .eq("id", id);

    if (error) {
      console.error("Like yangilashda xatolik:", error);
    }
  };

  const handleQuantity = (param: "minus" | "plus") => {
    if (param === "minus" && quantity >= 2) {
      setQuantity(quantity - 1);
    }
    if (param === "plus") {
      setQuantity(quantity + 1);
    }
  };

  const addCard = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token) {
      router.push("/login");
      return;
    }

    const { error } = await supabase.from("adding").insert([
      {
        userId: userId,
        product_id: id,
        quantity: quantity,
      },
    ]);

    if (error) {
      console.error("Error adding to cart:", error.message);
    } else {
      router.push(`/shop/${id}/ShoppingCard/${id}`);
    }
  };

  const buyNow = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token) {
      router.push("/login");
      return;
    }

    const { error } = await supabase.from("card").insert([
      {
        userId: userId,
        product_id: id,
        quantity: quantity,
      },
    ]);

    if (error) {
      console.error("Error adding to cart:", error.message);
    } else {
      router.push(`/card`);
    }
  };

  if (loading) return <div className="p-6 text-gray-600">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 mx-auto max-w-6xl mb-5">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <Link href="/" className="btn m-3 fw-bold">
          Home
        </Link>
        /
        <Link href="/" className="btn m-3 fw-bold">
          Shop
        </Link>
      </div>

      {/* Main Section */}
      <div className="flex flex-col items-center md:flex-row md:items-start gap-10">
        {/* Image and Like */}
        <div className="relative">
          <Image
            src={product?.image || Plant}
            alt={product?.name || "Product Image"}
            width={300}
            height={300}
            className="rounded-xl border shadow-md object-cover"
          />
          {/* Mobile Like Icon */}
          <button
            className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md md:hidden"
            onClick={handleLike}
          >
            {like ? <FaRegHeart className="text-red-500" /> : <FaRegHeart />}
          </button>
        </div>

        {/* Details */}
        <div className="max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {product?.name}
          </h1>
          <p className="text-green-600 font-semibold text-xl mb-2">
            ${product?.price}
          </p>
          <p className="text-gray-500 text-sm mb-3">
            This is a beautiful plant for your home and garden.
          </p>

          {/* Size Selector */}
          <div className="mb-4">
            <span className="font-semibold text-gray-700">Size:</span>
            <div className="flex gap-2 mt-2">
              {["S", "M", "XL"].map((size) => (
                <button
                  key={size}
                  className="btn btn-outline-success rounded-circle w-10 h-10 p-0"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <hr className="my-4" />

          {/* Description */}
          <p className="text-gray-600 mb-4">{product?.description}</p>

          {/* Mobile Category/Tags */}
          <div className="text-sm text-gray-700 mb-4 md:hidden">
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {product?.category || "Plants"}
            </p>
            <p>
              <span className="font-semibold">Tags:</span> Home, Garden, Plants
            </p>
          </div>

          {/* Quantity and Buttons */}
          <div className=" d-flex justify-content-center align-items-center gap-2">
            <div className="d-flex justify-content-around align-items-center gap-3 mb-4">
              <div className="d-flex align-items-center gap-3">
                <button
                  onClick={() => handleQuantity("minus")}
                  className="btn d-flex justify-content-center align-items-center btn-success rounded-circle w-10 h-10 p-0"
                >
                  <FaMinus />
                </button>
                <span className="fs-4">{quantity}</span>
                <button
                  onClick={() => handleQuantity("plus")}
                  className="btn d-flex justify-content-center align-items-center btn-success rounded-circle w-10 h-10 p-0"
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-4">
              <button onClick={addCard} className="btn btn-success p-2">
                Buy Now
              </button>
              <button onClick={buyNow} className="btn btn-outline-success p-2">
                Add to Cart
              </button>
              {/* Desktop Like Icon */}
              <button
                className="border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-100 transition hidden md:block"
                onClick={handleLike}
              >
                {like ? (
                  <FaRegHeart className="text-red-500" />
                ) : (
                  <FaRegHeart />
                )}
              </button>
            </div>
          </div>

          {/* Desktop Category/Tags */}
          <div className="text-sm text-gray-700 mb-2 hidden md:block">
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {product?.category || "Plants"}
            </p>
            <p>
              <span className="font-semibold">Tags:</span> Home, Garden, Plants
            </p>
          </div>

          {/* Share Icons */}
          <div className="flex items-center gap-3 mt-3">
            <span className="font-semibold text-gray-700">
              Share this picture:
            </span>
            <button className="btn d-flex justify-content-center align-items-center  btn-outline-primary rounded-circle w-10 h-10 p-0">
              <FaFacebookF />
            </button>
            <button className="btn d-flex justify-content-center align-items-center btn-outline-warning rounded-circle w-10 h-10 p-0">
              <FaTwitter />
            </button>
            <button className="btn  d-flex justify-content-center align-items-center btn-outline-danger rounded-circle w-10 h-10 p-0">
              <FaInstagram />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
