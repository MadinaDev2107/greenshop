"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "../supbaseClient";
import Logo from "../images/image 17.png";
import "bootstrap/dist/css/bootstrap.min.css";

interface User {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  street: string;
  apartment: string;
  state: string;
  zipCode: string;
  email: string;
  phone: string;
  notes: string;
}

interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  product: {
    name: string;
    price: number;
    image: string;
    id: number;
  };
  userId: string;
}

const Checkout: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    street: "",
    apartment: "",
    state: "",
    zipCode: "",
    email: "",
    phone: "",
    notes: "",
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) setUserId(storedUserId);
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

        if (productError) console.error("Product fetch error:", productError);

        return { ...item, product };
      })
    );

    setCartItems(itemsWithProducts);
  }

  const calculateTotal = (): number => {
    return cartItems.reduce((sum, item) => {
      return sum + (item.product?.price || 0) * (item.quantity || 0);
    }, 0);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handlePlaceOrder = async () => {
    if (!paymentMethod) return alert("Please select a payment method.");
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "country",
      "city",
      "street",
      "state",
      "zipCode",
    ];
    const incomplete = requiredFields.some((f) => !user[f as keyof User]);
    if (incomplete) return alert("Please fill in all required fields.");

    const tovar = cartItems.map((item) => ({
      product_id: item.product.id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const order = {
      ...user,
      userId,
      paymentMethod,
      products: tovar,
      totalPrice: calculateTotal(),
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("orders").insert([order]);
    if (error) {
      console.error("Order placement failed:", error);
      alert("Something went wrong while placing the order.");
    } else {
      setShowModal(true);
    }
  };

  const okay = () => {
    setUser({
      firstName: "",
      lastName: "",
      country: "",
      city: "",
      street: "",
      apartment: "",
      state: "",
      zipCode: "",
      email: "",
      phone: "",
      notes: "",
    });
    setPaymentMethod("");
    setCartItems([]);
    setShowModal(false);
  };

  return (
    <div className="p-4 mb-5">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <Link href="/" className="mr-2 font-bold">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/" className="mx-2">
          Shop
        </Link>{" "}
        / <span className="ml-2">Checkout</span>
      </div>

      {/* Main Grid */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Billing Address */}
        <div className="bg-gray-100 p-6 rounded shadow w-full lg:w-1/2">
          <h3 className="mb-4 font-bold text-lg">Billing Address</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="firstName"
              placeholder="First Name *"
              value={user.firstName}
              onChange={handleChange}
              className="form-control"
              required
            />
            <input
              name="lastName"
              placeholder="Last Name *"
              value={user.lastName}
              onChange={handleChange}
              className="form-control"
              required
            />
            <select
              name="country"
              value={user.country}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select Country *</option>
              <option>Uzbekistan</option>
              <option>USA</option>
              <option>UK</option>
              <option>Germany</option>
            </select>
            <input
              name="city"
              placeholder="City *"
              value={user.city}
              onChange={handleChange}
              className="form-control"
              required
            />
            <input
              name="street"
              placeholder="Street Address *"
              value={user.street}
              onChange={handleChange}
              className="form-control"
              required
            />
            <input
              name="apartment"
              placeholder="Apartment"
              value={user.apartment}
              onChange={handleChange}
              className="form-control"
            />
            <select
              name="state"
              value={user.state}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select State *</option>
              <option>Tashkent</option>
              <option>Samarkand</option>
              <option>Fergana</option>
              <option>Andijan</option>
            </select>
            <input
              name="zipCode"
              placeholder="Zip Code *"
              value={user.zipCode}
              onChange={handleChange}
              className="form-control"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address *"
              value={user.email}
              onChange={handleChange}
              className="form-control"
              required
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone Number *"
              value={user.phone}
              onChange={handleChange}
              className="form-control"
              required
            />
            <textarea
              name="notes"
              placeholder="Order Notes (Optional)"
              value={user.notes}
              onChange={handleChange}
              className="form-control md:col-span-2"
              rows={3}
            ></textarea>
          </form>
        </div>

        {/* Orders & Payment */}
        <div className="bg-gray-100 p-6 rounded shadow w-full lg:w-1/2 mb-10">
          <h5 className="font-bold text-lg mb-4">Orders</h5>
          <div className="flex justify-between border-b pb-2 font-semibold p-2">
            <span>Products</span>
            <span>Subtotal</span>
          </div>

          {/* Mahsulotlar ro'yxati */}
          <ul className="divide-y mt-2 max-h-64 overflow-y-auto">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="py-3 flex items-center justify-between"
              >
                <div className="flex gap-3 items-center">
                  <Image
                    src={item.product?.image || "/placeholder.png"}
                    alt="Product"
                    width={50}
                    height={50}
                    className="rounded border"
                  />
                  <div>
                    <div className="font-medium">{item.product?.name}</div>
                    <div className="text-gray-500 text-sm">
                      SKU: {item.userId}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">x {item.quantity}</div>
                  <div className="text-green-600 font-bold">
                    ${(item.product?.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-between mt-4 font-bold text-lg">
            <span>Total:</span>
            <span className="text-green-600">
              ${calculateTotal().toFixed(2)}
            </span>
          </div>

          {/* Payment Method */}
          <div className="mt-6">
            <h4 className="font-bold mb-3">Payment Method</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={handleChangePayment}
                />
                <Image src={Logo} alt="Paypal" width={200} height={30} />
              </label>
              <label className="flex items-center gap-2 m-2">
                <input
                  type="radio"
                  value="bankTransfer"
                  checked={paymentMethod === "bankTransfer"}
                  onChange={handleChangePayment}
                />
                Docer Bank transfer
              </label>
              <label className="flex items-center gap-2 m-2">
                <input
                  type="radio"
                  value="cashOnDelivery"
                  checked={paymentMethod === "cashOnDelivery"}
                  onChange={handleChangePayment}
                />
                Cash on Delivery
              </label>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className=" w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded"
          >
            Place Order
          </button>

          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded shadow w-11/12 max-w-md">
                <h3 className="text-xl font-bold mb-4">Order Confirmation</h3>
                <p className="mb-4">Your order has been placed successfully!</p>
                <button
                  onClick={okay}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
