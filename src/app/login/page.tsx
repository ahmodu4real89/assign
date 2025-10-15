import Link from "next/link";

const LoginPage = () =>{
  return (
    <main className="flex flex-1 items-center justify-center py-12 sm:px-6 lg:px-8 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white dark:bg-gray-800 p-8 shadow-lg dark:shadow-2xl">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Log in to manage your assignments.
          </p>
        </div>

        <form className="mt-8 space-y-6" method="POST">
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label className="sr-only" htmlFor="email-address">
                Email or Username
              </label>
              <input
                className="relative block w-full appearance-none rounded-t-lg border border-gray-300 dark:border-gray-600 bg-transparent px-3 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                id="email-address"
                name="email"
                placeholder="Email or Username"
                required
                type="text"
              />
            </div>

            <div>
              <label className="sr-only" htmlFor="password">
                Password
              </label>
              <input
                className="relative block w-full appearance-none rounded-b-lg border border-gray-300 dark:border-gray-600 bg-transparent px-3 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                id="password"
                name="password"
                placeholder="Password"
                required
                type="password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a
                className="font-medium text-primary hover:text-primary/80"
                href="#"
              >
                Forgot your password?
              </a>
            </div>
          </div>

           <Link
              href="/student"
              className="block w-full text-center bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all duration-300"
            >
              Log-in
            </Link>
        </form>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            Don&apos;t have an account?{" "}
             <Link
                href="/register"
                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                Sign up
              </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default LoginPage