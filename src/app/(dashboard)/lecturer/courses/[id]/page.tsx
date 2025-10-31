"use client"
import AssignmentFormModal from "@/app/components/AssignmentFormModal";
import { useUser } from "@/app/context/UserContext";
import { useParams } from "next/navigation";
import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import Link from "next/link";
import { Assignment, CourseRes } from "@/app/lib/types";





const  CoursePage = ()=> {
  const {user}= useUser()
     const params = useParams()
  const id = Number(params.id); 
  const [course, setCourse] = useState<CourseRes>();
  const [loading, setLoading] = useState(true);
    const [editCourse, setEditCourse] = useState<Assignment | null>(null);
  const [showModal, setShowModal] = useState(false);
   

   const handleEdit = (assignment: Assignment) => {
    setEditCourse(assignment);
    setShowModal(true);
  };


  
    const handleDelete = async (id: number) => {
      if (!confirm("Are you sure you want to delete this course?")) return;
  
      try {
        const res = await fetch(`/api/assignment/${id}`, { method: "DELETE" });
        if (res.ok) {
          toast.success("Course deleted successfully!")
          handleRefresh();
        } else {
    
          toast.error("Failed to delete course")
        }
      } catch (error) {
        console.error("Delete error:", error);
      }
    };

    const fetchCourse = useCallback(async () => {
    try {
      const res = await fetch(`/api/course/${id}`);
      if (!res.ok) throw new Error("Failed to fetch course");
      const data = await res.json();
      setCourse(data);
    } catch (error) {
      console.error("Error fetching course:", error);
    } finally {
      setLoading(false);
    }
  }, [id]); // only depends on id

  const handleRefresh = () => {
    fetchCourse();
  };

  useEffect(() => {
    if (id) fetchCourse();
  }, [id, fetchCourse]); 

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
          <Image
           width={300}
      height={300}
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

        <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">All Assignment</h2>

        {user?.role === "LECTURER" && (
          <button
            onClick={() => {
              setEditCourse(null);
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Create Assignment
          </button>
        )}
      </div>
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
                    <th className="text-left font-medium text-gray-700 px-6 py-3">view</th>
                    <th className="text-left font-medium text-gray-700 px-6 py-3">Action</th>
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
                    
                        <td className=" text-blue-600 flex  gap-4 mt-4 font-semibold">
                          <button onClick={()=>handleEdit(a)} >
                            Edit
                          </button>

                           <button onClick={()=>handleDelete(a.id)} className="text-red-400">
                            Delete
                          </button>
                          
                          </td>

                          <td className="px-6 py-4 text-gray-600">
                            <Link href={`/lecturer/assignments/${a.id}`}>
                            Grade
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
      

      <AssignmentFormModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              courseId={id}
              onDelete={handleDelete}
              initialData={editCourse || undefined}
              onSuccess={() => {
                handleRefresh();
                setShowModal(false);
                setEditCourse(null);
              }}
            />
    </main>
  );

}
export default CoursePage