import React from "react";

const  CoursePage = ()=> {
  return (
    <main className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-4xl space-y-8">
        {/* Header */}
        <header>
          <h1 className="text-3xl font-bold text-gray-900">
            Introduction to Programming
          </h1>
          <p className="text-gray-500">CS101 • Fall 2024</p>
        </header>

        {/* Course Description */}
        <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-2">Course Description</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            This course provides a comprehensive introduction to programming
            using Python. Topics include basic syntax, data structures, control
            flow, and object-oriented programming. Students will engage in
            hands-on projects to apply their knowledge and develop practical
            programming skills.
          </p>
        </section>

        {/* Lecturer Section */}
        <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex items-center space-x-4">
          <img
            src="https://randomuser.me/api/portraits/women/65.jpg"
            alt="Lecturer"
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium text-gray-900">Dr. Emily Carter</h3>
            <p className="text-sm text-gray-500">
              Office Hours: Mon & Wed 2–4 PM
            </p>
          </div>
        </section>

        {/* Assignments Table */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Assignments</h2>
          <div className="overflow-hidden border border-gray-200 rounded-xl shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left font-medium text-gray-700 px-6 py-3">
                    Assignment
                  </th>
                  <th className="text-left font-medium text-gray-700 px-6 py-3">
                    Due Date
                  </th>
                  <th className="text-left font-medium text-gray-700 px-6 py-3">
                    Status
                  </th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    Assignment 1: Basic Syntax
                  </td>
                  <td className="px-6 py-4 text-gray-600">Sep 15, 2024</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-medium">
                      Submitted
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 font-medium hover:underline">
                      View
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    Assignment 2: Data Structures
                  </td>
                  <td className="px-6 py-4 text-gray-600">Oct 10, 2024</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-yellow-100 text-yellow-700 px-3 py-1 text-xs font-medium">
                      Graded
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 font-medium hover:underline">
                      View Feedback
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    Assignment 3: Final Project
                  </td>
                  <td className="px-6 py-4 text-gray-600">Nov 20, 2024</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-red-100 text-red-700 px-3 py-1 text-xs font-medium">
                      Not Submitted
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                      Submit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
export default CoursePage