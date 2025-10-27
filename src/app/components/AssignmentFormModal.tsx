"use client";

import { useEffect, useState } from "react";

interface AssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  lecturerId?: number;
  courseId?:number;
  onSuccess?: () => void;
  initialData?: {
    id?: number;
    title: string;
    description: string;
    dueDate?: string;
  };
}

export default function AssignmentFormModal({
  isOpen,
  onClose,
  lecturerId,
  courseId,
  onSuccess,
  initialData,
}: AssignmentModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    dueDate: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const isEditMode = !!initialData?.id;

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        dueDate: initialData.dueDate || "",
      });
    } else {
      setFormData({ title: "", dueDate: "", description: "" });
    }
  }, [initialData]);
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const method = isEditMode ? "PUT" : "POST";
    const url = isEditMode ? `/api/assignment/${initialData?.id}` : `/api/assignment`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, courseId }),
      });

      if (res.ok) {
        alert(isEditMode ? "✅ Course updated successfully!" : "✅ Course created successfully!");
        onClose();
        onSuccess?.();
      } else {
        alert("❌ Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">
          {isEditMode ? "Edit Assignment" : "Create New Assignment"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700">Due date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>


          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {loading ? (isEditMode ? "Updating..." : "Creating...") : isEditMode ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
