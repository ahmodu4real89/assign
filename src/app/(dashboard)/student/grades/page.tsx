"use client";
import React from "react";

const GradesPage = ()=> {
  const grades = [
    {
      assignment: "Essay on Modern Literature",
      course: "English 101",
      grade: "A",
      color: "green",
      feedback: "Excellent work, insightful analysis.",
    },
    {
      assignment: "Midterm Exam",
      course: "Mathematics 202",
      grade: "B+",
      color: "yellow",
      feedback: "Good effort, review calculus concepts.",
    },
    {
      assignment: "Lab Report 3",
      course: "Chemistry 105",
      grade: "A-",
      color: "green",
      feedback: "Well-structured report, minor errors.",
    },
    {
      assignment: "Presentation on Climate Change",
      course: "Environmental Science 301",
      grade: "A",
      color: "green",
      feedback: "Outstanding presentation, engaging and informative.",
    },
    {
      assignment: "Final Project",
      course: "Computer Science 401",
      grade: "B",
      color: "yellow",
      feedback: "Solid project, consider code optimization.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50  text-slate-800 ">
    

      {/* Main */}
      <main className="flex-grow container mx-auto px-4 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Grades
            </h2>
            <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
              View your grades for all courses and assignments.
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
            <table className="w-full text-sm text-left text-slate-600 dark:text-slate-400">
              <thead className="text-xs uppercase bg-slate-100 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Assignment
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 font-medium hidden sm:table-cell"
                  >
                    Course
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 font-medium text-center"
                  >
                    Grade
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 font-medium hidden md:table-cell"
                  >
                    Feedback
                  </th>
                </tr>
              </thead>
              <tbody>
                {grades.map((g, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap"
                    >
                      <div className="font-bold">{g.assignment}</div>
                      <div className="font-normal text-slate-500 dark:text-slate-400 sm:hidden mt-1">
                        {g.course}
                      </div>
                    </th>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      {g.course}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${g.color}-100 text-${g.color}-800 dark:bg-${g.color}-900 dark:text-${g.color}-300`}
                      >
                        {g.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      {g.feedback}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

    </div>
  );
}
export default GradesPage