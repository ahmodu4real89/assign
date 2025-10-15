import Link from "next/link";



 const LecturerDashboard = ()=> {
  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-gray-600 mb-8">Welcome back, Dr. Harper</p>

        {/* My Courses */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">My Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Introduction to Psychology',
                code: 'PSY101 - Fall 2024',
                image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
              },
              {
                title: 'Advanced Statistics',
                code: 'STA302 - Fall 2024',
                image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3c',
              },
              {
                title: 'Research Methods',
                code: 'RES401 - Fall 2024',
                image: 'https://images.unsplash.com/photo-1554774853-b414d2a2b4f4',
              },
            ].map((course) => (
              <div
                key={course.title}
                className="bg-white shadow rounded-xl overflow-hidden hover:shadow-md transition"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800">{course.title}</h3>
                  <p className="text-gray-500 text-sm">{course.code}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Assignments to Grade */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Assignments to Grade</h2>
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="py-3 px-6 text-left">Assignment</th>
                  <th className="py-3 px-6 text-left">Course</th>
                  <th className="py-3 px-6 text-left">Due Date</th>
                  <th className="py-3 px-6 text-left">Submissions</th>
                  <th className="py-3 px-6 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: 'Essay on Cognitive Development',
                    course: 'PSY101',
                    due: 'Oct 20, 2024',
                    submissions: '25/30',
                  },
                  {
                    name: 'Project Proposal',
                    course: 'RES401',
                    due: 'Nov 5, 2024',
                    submissions: '18/20',
                  },
                  {
                    name: 'Final Exam',
                    course: 'STA302',
                    due: 'Dec 15, 2024',
                    submissions: '22/25',
                  },
                ].map((item) => (
                  <tr key={item.name} className="border-t">
                    <td className="py-3 px-6">{item.name}</td>
                    <td className="py-3 px-6">{item.course}</td>
                    <td className="py-3 px-6">{item.due}</td>
                    <td className="py-3 px-6">{item.submissions}</td>
                    <td className="py-3 px-6 text-blue-600 font-medium hover:underline cursor-pointer">
                      <Link href={'/lecturer/assignments'}>
                       Grade
                      </Link>
                     
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
                    student: 'Ethan Carter',
                    assignment: 'Essay on Cognitive Development',
                    course: 'PSY101',
                    date: 'Oct 22, 2024',
                  },
                  {
                    student: 'Olivia Bennett',
                    assignment: 'Project Proposal',
                    course: 'RES401',
                    date: 'Nov 7, 2024',
                  },
                ].map((req) => (
                  <tr key={req.student} className="border-t">
                    <td className="py-3 px-6">{req.student}</td>
                    <td className="py-3 px-6">{req.assignment}</td>
                    <td className="py-3 px-6">{req.course}</td>
                    <td className="py-3 px-6">{req.date}</td>
                    <td className="py-3 px-6 space-x-2">
                      <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium">
                        Approve
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs font-medium">
                        Deny
                      </button>
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
}
export default  LecturerDashboard