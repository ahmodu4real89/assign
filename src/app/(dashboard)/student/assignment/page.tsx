"use client"
import Link from "next/link";
import { useEffect, useState } from "react";

interface Assignment {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: string
}

const  StudentAssignmentPage=()=> {
 
 const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchAssignments() {
      try {
        const res = await fetch("/api/assignment", { cache: "no-store" });

        if (!res.ok) {
          throw new Error(`Failed to fetch assignments: ${res.statusText}`);
        }

        const data = await res.json();
        setAssignments(data);
      } catch (err) {
        console.log("Error fetching assignments:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAssignments();
  }, []);

  if (loading) return <p className="text-gray-500">Loading assignments...</p>;
  

  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">Assignments</h2>

      {assignments.length === 0 ? (
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
                <th className="text-left font-medium text-gray-700 px-6 py-3">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {assignments.map((a: Assignment) => (
                <tr key={a.id}>
                  <td className="px-6 py-4 font-medium text-gray-900">{a.title}</td>
                  <td className="px-6 py-4 text-gray-600">{a.description}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(a.dueDate).toLocaleDateString()}
                  </td>
                  <td >
                    <span className="px-2 py-2 text-blue-600 bg-blue-100 rounded">
                      {a.status}
                    </span>
                   
                    </td>
                  <td className="px-6 py-4 text-blue-600">
                    <Link href={`/student/assignment/${a.id}`}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
export default StudentAssignmentPage