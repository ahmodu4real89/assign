"use client"
import CourseGrid from "@/app/components/CourseGrid";
import { UserSection } from "@/app/components/UserSection";

const StudentDashboard=  ()=> {

//         const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";
  
//      const [coursesRes, assignmentsRes] = await Promise.all([
//     fetch(`${baseUrl}/api/course?limit=4`, { cache: "no-store" }),
//     fetch(`${baseUrl}/api/assignment`, { cache: "no-store" }),
//   ]);

//     if (!coursesRes.ok || !assignmentsRes.ok) {
//       throw new Error(
//         `Failed to fetch: courses (${coursesRes.status}) or students (${assignmentsRes.status})`
//       );
//     }

//   const [courses, assignments] = await Promise.all([
//     coursesRes.json(),
//     assignmentsRes.json(),
//   ]);
// console.log(courses, assignments)



  const deadlines = [
    {
      assignment: "Programming Assignment 1",
      course: "Introduction to Programming",
      date: "Oct 15, 2024",
      status: "In Progress",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      assignment: "Calculus Quiz 2",
      course: "Calculus I",
      date: "Oct 18, 2024",
      status: "Not Started",
      color: "bg-red-100 text-red-800",
    },
    {
      assignment: "Linear Algebra Project",
      course: "Linear Algebra",
      date: "Oct 22, 2024",
      status: "Not Started",
      color: "bg-red-100 text-red-800",
    },
  ];

  const submissions = [
    {
      assignment: "Programming Assignment 1",
      course: "Introduction to Programming",
      date: "Oct 10, 2024",
      grade: "A",
    },
    {
      assignment: "Calculus Quiz 1",
      course: "Calculus I",
      date: "Oct 5, 2024",
      grade: "B+",
    },
    {
      assignment: "Linear Algebra Quiz 1",
      course: "Linear Algebra",
      date: "Sep 28, 2024",
      grade: "A-",
    },
  ];

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          {/* <p className="text-gray-600 mt-1">Welcome back, {user?.name || "Student"}</p> */}
          <UserSection />
        </header>

        {/* My Courses */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">My Courses</h2>
         <CourseGrid
          apiEndpoint="/api/course"
          limit={4}  
        />
        </section>

          

        {/* Upcoming Deadlines & Recent Submissions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Deadlines */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Upcoming Deadlines
            </h2>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Assignment</th>
                    <th className="px-6 py-3">Course</th>
                    <th className="px-6 py-3">Due Date</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {deadlines.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {item.assignment}
                      </td>
                      <td className="px-6 py-4">{item.course}</td>
                      <td className="px-6 py-4">{item.date}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${item.color}`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Recent Submissions */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Recent Submissions
            </h2>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Assignment</th>
                    <th className="px-6 py-3">Course</th>
                    <th className="px-6 py-3">Submitted</th>
                    <th className="px-6 py-3">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {item.assignment}
                      </td>
                      <td className="px-6 py-4">{item.course}</td>
                      <td className="px-6 py-4">{item.date}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          {item.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </main>
  );

}
   
export default StudentDashboard