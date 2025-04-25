"use client";

import React, { useEffect, useState } from "react";
import {
  getProducts,
  getCategories,
  addProduct,
  deleteProduct,
  editProduct,
} from "../Function";
import Image from "next/image";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    image: "",
    price: "",
    sale: true,
    categoryId: "",
    like: false,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getProducts().then(setProducts);
    getCategories().then(setCategories);
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const productData = {
      ...form,
      sale: true,
      like: false,
    };

    try {
      if (isEditing && currentId) {
        await editProduct(currentId, productData);
      } else {
        await addProduct(productData);
      }
      resetForm();
      loadData();
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      image: "",
      price: "",
      sale: true,
      categoryId: "",
      like: false,
    });
    setShowModal(false);
    setIsEditing(false);
    setCurrentId(null);
  };

  const handleEdit = (item) => {
    setForm(item);
    setCurrentId(item.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      loadData();
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Products</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add Product
        </button>
      </div>

      <div className="table-responsive" style={{ maxHeight: "400px", overflowY: "auto" }}>
        <table className="table table-striped table-bordered align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={50}
                    height={50}
                    style={{ objectFit: "cover" }}
                  />
                </td>
                <td>{item.price}</td>
                <td>{item.categoryId}</td>
                <td>
                  <button className="btn btn-sm btn-danger me-2" onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                  <button className="btn btn-sm btn-warning" onClick={() => handleEdit(item)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal d-block" style={{ background: "#00000080" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isEditing ? "Edit Product" : "Add Product"}</h5>
                <button type="button" className="btn-close" onClick={resetForm}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  name="name"
                  className="form-control mb-2"
                  placeholder="Product Name"
                  value={form.name}
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  name="price"
                  className="form-control mb-2"
                  placeholder="Price"
                  value={form.price}
                  onChange={handleInputChange}
                />
                <input
                  type="file"
                  accept="image/*"
                  className="form-control mb-2"
                  onChange={handleImageUpload}
                />
                <select
                  className="form-select mb-2"
                  name="categoryId"
                  value={form.categoryId}
                  onChange={handleInputChange}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Close
                </button>
                <button type="button" className="btn btn-success" onClick={handleSubmit}>
                  {isEditing ? "Update Product" : "Save Product"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
