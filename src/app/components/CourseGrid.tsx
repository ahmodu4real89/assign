"use client";

import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import Link from "next/link";
export interface CourseRes {
  id: number;
  courseName: string;
  courseCode?: string;
  image?: string;
  lecturer?: {
    name: string;
    email: string;
  };
}

export interface CourseWithImage extends CourseRes {
  image: string;
}

interface CourseGridProps {
  apiEndpoint: string;
  title?: string;
  limit?: number;
 linkPrefix?: string;
  onEdit?: (course: CourseRes) => void;
  onDelete?: (courseId: number) => void;
}

const randomImages = [
  "https://picsum.photos/300/200?random=1",
  "https://picsum.photos/300/200?random=2",
  "https://picsum.photos/300/200?random=3",
  "https://picsum.photos/300/200?random=4",
];

function getRandomImage(): string {
  return randomImages[Math.floor(Math.random() * randomImages.length)];
}

export default function CourseGrid({
  apiEndpoint,
  limit,
  linkPrefix,
  onEdit,
  onDelete,
}: CourseGridProps) {
  const { user } = useUser();
  const [courses, setCourses] = useState<CourseWithImage[]>([]);
  const [loading, setLoading] = useState(true);

  const finalEndpoint =
    user?.role === "LECTURER"
      ? `${apiEndpoint}?lecturerId=${user.id}${limit ? `&limit=${limit}` : ""}`
      : `${apiEndpoint}${limit ? `?limit=${limit}` : ""}`;

  useEffect(() => {
    if (user?.role === "LECTURER" && !user.id) return;
  if (!apiEndpoint) return;

    const fetchCourses = async () => {
      try {
        const res = await fetch(finalEndpoint);
        if (!res.ok) throw new Error("Failed to fetch courses");
        const data = await res.json();

        const withImages = data.map((c: CourseRes) => ({
          ...c,
          image: c.image || getRandomImage(),
        }));

        setCourses(withImages);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [finalEndpoint]);

  if (loading) return <p>Loading courses...</p>;

  return (
    <section className="p-4">
      {courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white shadow rounded-xl overflow-hidden hover:shadow-md transition"
            >
              <img
                src={course.image}
                alt={course.courseName}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">
                  {course.courseName}
                </h3>
                {course.courseCode && (
                  <p className="text-gray-500 text-sm">{course.courseCode}</p>
                )}
                {course.lecturer && (
                  <p className="text-gray-500 text-sm">
                    Lecturer: {course.lecturer.name}
                  </p>
                )}


                  {linkPrefix && (
                  <Link
                    href={`${linkPrefix}/${course.id}`}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition text-center mt-4"
                  >
                    View Course
                  </Link>
                )}

                {(onEdit || onDelete) && (
                  <div className="flex justify-between mt-3">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(course)}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(course.id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
