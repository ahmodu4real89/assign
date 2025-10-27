"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useUser } from "@/app/context/UserContext";

const LoginPage = () =>{
   const { setUser } = useUser();
  const router = useRouter();
   const searchParams = useSearchParams();
    const role = searchParams.get("role") || "STUDENT";



   const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

    const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role }), 
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (res.ok && data.user) {
         setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.user.role === "STUDENT") {
          router.push("/student");
        } else if (data.user.role === "LECTURER") {
          router.push("/lecturer");
        } else {
          router.push("/");
        }
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

 

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

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
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
                  value={formData.email}
              onChange={handleChange}
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
                  value={formData.password}
              onChange={handleChange}
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

             <button
            type="submit"
            disabled={loading}
            className="block w-full text-center bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            Don&apos;t have an account?{" "}
             <button
              
                 onClick={() => router.push(`/register?role=${role}`)}
                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                Sign up
              </button>
          </p>
        </div>
      </div>
    </main>
  );
}

export default LoginPage