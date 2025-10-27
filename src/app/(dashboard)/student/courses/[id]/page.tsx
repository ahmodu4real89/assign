"use client"
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";

interface Assignment {
  id: number;
  title: string;
  description: string;
  dueDate: string;
}

interface Lecturer {
  id: number;
  name: string;
  email: string;
}

interface CourseApiResponse {
  id: number;
  courseName: string;
  description: string;
  lecturer: Lecturer;
  assignments: Assignment[];
}

const  CoursePage = ()=> {
     const params = useParams()
  const id = Number(params.id); 
  const [course, setCourse] = useState<CourseApiResponse>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      try {
    
        const res = await fetch(`/api/course/${id}`);
        if (!res.ok) throw new Error("Failed to fetch course");
        const data = await res.json();
        console.log(data, 'dats')
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchCourse();
  },  [id]);

  if (loading) return <p>Loading course details...</p>;
  if (!course) return <p>Course not found</p>;

 return (
    <main className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-4xl space-y-8">
        {/* Header */}
        <header>
          <h1 className="text-3xl font-bold text-gray-900">{course.courseName}</h1>
          <p className="text-gray-500">Course ID: {course.id}</p>
        </header>

        {/* Course Description */}
        <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-2">Course Description</h2>
          <p className="text-gray-600 text-sm leading-relaxed">{course.description}</p>
        </section>

        {/* Lecturer Section */}
        <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex items-center space-x-4">
          <img
            src="https://randomuser.me/api/portraits/men/45.jpg"
            alt="Lecturer"
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium text-gray-900">{course.lecturer?.name}</h3>
            <p className="text-sm text-gray-500">{course.lecturer?.email}</p>
          </div>
        </section>

        {/* Assignments */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Assignments</h2>
          {course.assignments?.length === 0 ? (
            <p className="text-gray-500">No assignments available</p>
          ) : (
            <div className="overflow-hidden border border-gray-200 rounded-xl shadow-sm">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left font-medium text-gray-700 px-6 py-3">Title</th>
                    <th className="text-left font-medium text-gray-700 px-6 py-3">Description</th>
                    <th className="text-left font-medium text-gray-700 px-6 py-3">Due Date</th>
                    <th className="text-left font-medium text-gray-700 px-6 py-3">Status</th>
                    <th className="text-left font-medium text-gray-700 px-6 py-3">view</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {course.assignments?.map((a) => (
                    <tr key={a.id}>
                      <td className="px-6 py-4 font-medium text-gray-900">{a.title}</td>
                      <td className="px-6 py-4 text-gray-600">{a.description}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(a.dueDate).toLocaleDateString()}
                      </td>
                       <td >
                        <span className="rounded text-blue-600 bg-blue-300 text-sm p-2">
                           Submited
                        </span>
                       </td>
                        <td className=" text-blue-600">
                          <Link href={`/student/assignment/${a.id}`}>
                            View
                          </Link>
                          
                          </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );

}
export default CoursePage