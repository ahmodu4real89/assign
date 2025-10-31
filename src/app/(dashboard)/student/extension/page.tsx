"use client";
import React, { useState } from "react";

const RequestExtensionForm = () => {
  const [assignment, setAssignment] = useState("");
  const [reason, setReason] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      assignment,
      reason,
      newDeadline,
    });
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Request Assignment Extension
        </h1>
        <p className="text-gray-600 mb-6">
          Fill out the form below to request an extension for your assignment.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Assignment Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assignment
            </label>
            <select
              value={assignment}
              onChange={(e) => setAssignment(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select an assignment...</option>
              <option value="Assignment 1">Assignment 1</option>
              <option value="Assignment 2">Assignment 2</option>
              <option value="Assignment 3">Assignment 3</option>
            </select>
          </div>

          {/* Reason for Extension */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Extension
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please provide a clear and concise reason for your request."
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows={4}
              required
            ></textarea>
          </div>

          {/* Suggested New Deadline */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Suggested New Deadline
            </label>
            <input
              type="date"
              value={newDeadline}
              onChange={(e) => setNewDeadline(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestExtensionForm;
