
const AssignmentGradingPage = ()=> {

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gray-50 font-display">
      <div className="flex h-full grow flex-col">
        
        {/* Main Content */}
        <main className="flex flex-1 flex-col p-4 md:flex-row md:gap-6 md:p-6 lg:p-8">
          {/* Left Section */}
          <div className="flex-1">
            {/* Breadcrumbs */}
            <nav className="mb-6 flex items-center text-sm font-medium text-dark/60">
              <a className="hover:text-primary dark:hover:text-primary" href="#">
                Courses
              </a>
              <span className="mx-2">/</span>
              <a className="hover:text-primary dark:hover:text-primary" href="#">
                Intro to Programming
              </a>
              <span className="mx-2">/</span>
              <span className="text-background-dark dark:text-background-light">
                Assignment 1
              </span>
            </nav>

            {/* Title */}
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-background-dark dark:text-background-light">
                  Assignment 1: Introduction to Python
                </h1>
                <p className="mt-1 text-sm text-background-dark/60 dark:text-background-light/60">
                  Due: Oct 15, 2024, 11:59 PM
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 border-b border-gray-300 dark:border-background-light/10">
              <div className="flex gap-2">
               
                <a
                  href="#"
                  className="border-b-2 border-primary px-3 py-2.5 text-sm font-semibold text-primary"
                >
                  Grading
                </a>
               
              </div>
            </div>

            {/* Table */}
            <div className="mb-4 overflow-x-auto rounded-lg border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase text-background-dark/60 dark:text-background-light/60">
                  <tr>
                    <th className="px-6 py-3">Student Name</th>
                    <th className="px-6 py-3">Submission Date</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300 dark:divide-background-light/10 text-background-dark dark:text-background-light">
                  {[
                    ["Ethan Harper", "Oct 14, 2024, 10:23 PM", "Submitted", "A"],
                    ["Olivia Bennett", "Oct 15, 2024, 11:55 PM", "Submitted", "B+"],
                    ["Noah Carter", "Oct 15, 2024, 11:59 PM", "Submitted", "A-"],
                    ["Ava Morgan", "Oct 16, 2024, 12:05 AM", "Late", "B"],
                    ["Liam Foster", "Oct 16, 2024, 12:10 AM", "Late", "C+"],
                  ].map(([name, date, status, grade]) => (
                    <tr
                      key={name}
                      className="hover:bg-background-dark/5 dark:hover:bg-background-light/5"
                    >
                      <td className="px-6 py-4 font-medium">{name}</td>
                      <td className="px-6 py-4 text-background-dark/80 dark:text-background-light/80">
                        {date}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs text-blue-800 font-medium ${
                            status === "Late"
                              ? "bg-red-500/10 text-red-500"
                              : "bg-blue-100 text-primary"
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-background-dark/80 dark:text-background-light/80">
                        {grade}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <nav className="flex items-center justify-center gap-2 text-sm text-background-dark dark:text-background-light">
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-primary/10"
              >
                <span className="material-symbols-outlined text-base">
                  chevron_left
                </span>
              </a>
              <a className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                1
              </a>
              <a className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-primary/10">
                2
              </a>
              <span className="flex h-8 w-8 items-center justify-center">...</span>
              <a className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-primary/10">
                5
              </a>
              <a className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-primary/10">
                <span className="material-symbols-outlined text-base">
                  chevron_right
                </span>
              </a>
            </nav>
          </div>

          {/* Right Sidebar */}
          <div className="w-full max-w-md rounded-lg border border-gray-300 p-6 md:w-96">
            <h2 className="mb-6 text-xl font-bold">
              Grading Details
            </h2>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="student"
                  className="mb-2 block text-sm font-medium"
                >
                  Student
                </label>
                <select
                  id="student"
                  className="block w-full rounded border px-3 py-2 text-background-dark focus:border-primary focus:ring-primary dark:border-background-light/20 dark:bg-background-dark/50 dark:text-background-light"
                >
                  <option>Ethan Harper</option>
                  <option>Olivia Bennett</option>
                  <option>Noah Carter</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="grade"
                  className="mb-2 block text-sm font-medium text-background-dark/80 dark:text-background-light/80"
                >
                  Grade
                </label>
                <select
                  id="grade"
                  className="block w-full rounded border border-gray-300bg-background-light px-3 py-2 text-background-dark focus:border-primary focus:ring-primary t"
                >
                  <option>A</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option selected>B</option>
                  <option>B-</option>
                  <option>C+</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="feedback"
                  className="mb-2 block text-sm font-medium text-background-dark/80 dark:text-background-light/80"
                >
                  Feedback
                </label>
                <textarea
                  id="feedback"
                  rows={4}
                  placeholder="Provide detailed feedback..."
                  className="block w-full rounded border border-gray-300bg-background-light px-3 py-2 text-background-dark focus:border-primary focus:ring-primary dark:border-background-light/20 dark:bg-background-dark/50 dark:text-background-light"
                ></textarea>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  type="submit"
                  className="w-full rounded bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  Save Grade
                </button>
                <button
                  type="button"
                  className="w-full rounded border border-gray-300bg-background-light px-4 py-2.5 text-sm font-semibold text-background-dark shadow-sm hover:bg-background-dark/5 dark:border-background-light/20 dark:bg-background-dark dark:text-background-light dark:hover:bg-background-light/5"
                >
                  View Submission
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
export default AssignmentGradingPage