import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import Logos from "./images/Vector.png";
import Logo from "./images/image 17.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white mt-10 border-t relative">
      {/* Top info */}
      <div
        style={{ height: "100px" }}
        className="hidden md:flex bg-green-100 py-6 px-4 md:px-16 flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-700"
      >
        <div className="lg:flex hidden items-center gap-2">
          <Image src={Logos} alt="Plants" width={30} height={30} />
          <span className="text-green-500 font-extrabold text-xl">
            GREENSHOP
          </span>
        </div>
        <div className="flex items-center gap-2">
          📍 70 West Buckingham Ave. Farmingdale, NY 11735
        </div>
        <div className="flex items-center gap-2">📧 contact@greenshop.com</div>
        <div className="flex items-center gap-2">📞 +88 01911 717 490</div>
      </div>

      {/* Main Footer */}
      <div className="hidden md:flex justify-evenly items-start mt-3 px-6">
        {/* Column 1 */}
        <div>
          <h4 className="font-semibold text-base mb-3">My Account</h4>
          <ul className="space-y-2">
            <li className="mt-2">My Account</li>
            <li className="mt-2">Our stores</li>
            <li className="mt-2">Contact us</li>
            <li className="mt-2">Career</li>
            <li className="mt-2">Specials</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="font-semibold text-base mb-3">Help & Guide</h4>
          <ul className="space-y-2">
            <li className="mt-2">Help Center</li>
            <li className="mt-2">How to Buy</li>
            <li className="mt-2">Shipping & Delivery</li>
            <li className="mt-2">Product Policy</li>
            <li className="mt-2">How to Return</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="font-semibold text-base mb-3">Categories</h4>
          <ul className="space-y-2">
            <li className="mt-2">House Plants</li>
            <li className="mt-2">Potter Plants</li>
            <li className="mt-2">Seeds</li>
            <li className="mt-2">Small Plants</li>
            <li className="mt-2">Accessories</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div>
            <h4 className="font-semibold text-base mb-3">Social Media</h4>
            <div className="flex items-center gap-3 mt-3">
              <span className="p-2 bg-green-50 rounded-md text-green-600">
                <FaFacebookF />
              </span>
              <span className="p-2 bg-green-50 rounded-md text-green-600">
                <FaInstagram />
              </span>
              <span className="p-2 bg-green-50 rounded-md text-green-600">
                <FaTwitter />
              </span>
              <span className="p-2 bg-green-50 rounded-md text-green-600">
                <FaLinkedinIn />
              </span>
              <span className="p-2 bg-green-50 rounded-md text-green-600">
                <FaYoutube />
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-base mb-3">We accept</h4>
            <div className="flex gap-4 text-2xl text-blue-600 mb-2">
              <Image
                src={Logo}
                alt="PayPal"
                width={250}
                height={30}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="hidden md:block text-center text-xs text-gray-500 py-4 border-t">
        © 2021 GreenShop. All Rights Reserved.
      </div>

      {/* Floating Bottom Navigation for Mobile */}
    </footer>
  );
}
