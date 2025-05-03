"use client";

import React, { useEffect, useState } from "react";
import {
  getCategories,
  addCategory,
  deleteCategory,
  editCategory,
} from "../Function";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "" });
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const handleInputChange = (e) => {
    setForm({ name: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      console.log("Yuborilayotgan ma'lumot:", form);
      if (isEditing && currentId) {
        await editCategory(currentId, form);
      } else {
        await addCategory(form);
      }
      resetForm();
      loadCategories();
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  const resetForm = () => {
    setForm({ name: "" });
    setShowModal(false);
    setIsEditing(false);
    setCurrentId(null);
  };

  const handleEdit = (item) => {
    setForm({ name: item.name });
    setCurrentId(item.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this category?")) {
      await deleteCategory(id);
      loadCategories();
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Categories</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add Category
        </button>
      </div>

      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, idx) => (
            <tr key={cat.id}>
              <td>{idx + 1}</td>
              <td>{cat.name}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(cat)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(cat.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal d-block" style={{ background: "#00000080" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isEditing ? "Edit Category" : "Add Category"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={resetForm}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  name="name"
                  className="form-control mb-2"
                  placeholder="Category Name"
                  value={form.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={resetForm}>
                  Close
                </button>
                <button className="btn btn-success" onClick={handleSubmit}>
                  {isEditing ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
