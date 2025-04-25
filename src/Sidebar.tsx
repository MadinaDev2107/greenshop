import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-100 p-4 ">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <Link
          href={"/admin/dashboard"}
          className="w-full block bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mb-2"
        >
          Dashboard
        </Link>
        <Link
          href={"/admin/products"}
          className="w-full block  bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mb-2"
        >
          Add Products
        </Link>
        <Link
          href={"/admin/category"}
          className="w-full block bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          Add Category
        </Link>
      </div>
  );
};

export default Sidebar;
