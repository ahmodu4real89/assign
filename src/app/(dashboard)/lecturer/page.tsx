import CourseGrid from "@/app/components/CourseGrid";
import { UserSection } from "@/app/components/UserSection";
import { deadline } from "@/app/lib/types";
import Link from "next/link";



const LecturerDashboard = async () => {
 const baseUrl = process.env.VERCEL_URL? `https://${process.env.VERCEL_URL}`: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/assignment`, { cache: "no-store" })
    const deadlines:deadline[] = await response.json()
  
      if ( !deadlines) {
        throw new Error(
          `Failed to fetch:  students (${deadlines})`
        );
      }
  


  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
        <UserSection />

        {/* My Courses */}
        <section className="mb-10">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold mb-4">My Courses</h2>
            <Link href={"/lecturer/courses"}>
              <span className="text-blue-300">Sell all courses</span>
            </Link>
          </div>

          <CourseGrid apiEndpoint="/api/lecturer" limit={4} />
        </section>

        {/* Assignments to Grade */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Assignments to Grade</h2>
          <div className="bg-white rounded-sm shadow overflow-hidden">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="py-3 px-6 text-left">Assignment</th>
                  <th className="py-3 px-6 text-left">Course</th>
                  <th className="py-3 px-6 text-left">Due Date</th>
                  <th className="py-3 px-6 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {deadlines.map((item:deadline) => (
                  <tr key={item.id} className="border-t">
                    <td className="py-3 px-6">{item.title}</td>
                    <td className="py-3 px-6">{item.course.courseCode}</td>
                    <td className="py-3 px-6">
                          {new Date(item.dueDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-6 text-blue-600 font-medium hover:underline cursor-pointer">
                      <Link href={`/lecturer/assignments/${item.id}`}>Grade</Link>
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pending Extension Requests */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Pending Extension Requests</h2>
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="py-3 px-6 text-left">Student</th>
                  <th className="py-3 px-6 text-left">Assignment</th>
                  <th className="py-3 px-6 text-left">Course</th>
                  <th className="py-3 px-6 text-left">Requested Date</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    student: "Ethan Carter",
                    assignment: "Essay on Cognitive Development",
                    course: "PSY101",
                    date: "Oct 22, 2024",
                  },
                  {
                    student: "Olivia Bennett",
                    assignment: "Project Proposal",
                    course: "RES401",
                    date: "Nov 7, 2024",
                  },
                ].map((req) => (
                  <tr key={req.student} className="border-t">
                    <td className="py-3 px-6">{req.student}</td>
                    <td className="py-3 px-6">{req.assignment}</td>
                    <td className="py-3 px-6">{req.course}</td>
                    <td className="py-3 px-6">{req.date}</td>
                    <td className="py-3 px-6 space-x-2">
                      <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium">Approve</button>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs font-medium">Deny</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};
export default LecturerDashboard;
