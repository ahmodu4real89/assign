"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const RegisterForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const role = searchParams.get("role") || localStorage.getItem("role") || "STUDENT";

  useEffect(() => {
    if (role) localStorage.setItem("role", role);
  }, [role]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    age: "",
    sex: "",
    confirmPassword: "",
    role: role,
  });

    

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple password confirmation
    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const payload = {
    ...formData,
    age: Number(formData.age), 
  };
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ " + data.message);

        // Reset form
        setFormData({
          name: "",
          email: "",
          password: "",
          phoneNumber: "",
          age: "",
          sex: "",
          confirmPassword: "",
          role: role,
        });

        // Wait a bit, then redirect to login page
        setTimeout(() => {
          router.push(`/login?role=${role}`);
        }, 1500);
      } else {
        setMessage("❌ " + (data.error || "Registration failed."));
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Something went wrong during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-white">Create your {role.toLowerCase()} account</h2>
          <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              href={`/login?role=${role}`}
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              Login here
            </Link>
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" method="POST" onSubmit={handleSignup}>
          <div className="space-y-4">
            {/* Full Name */}
            <input
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-slate-300 dark:border-slate-700 bg-gray-50 dark:bg-gray-900 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />

            {/* Email */}
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-slate-300 dark:border-slate-700 bg-gray-50 dark:bg-gray-900 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />

            {/* Phone Numbeer */}
            <input
              name="phoneNumber"
              type="tel"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="PhoneNumber"
              className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-slate-300 dark:border-slate-700 bg-gray-50 dark:bg-gray-900 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />

            {/* Age */}
            <input
              name="age"
              type="number"
              required
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-slate-300 dark:border-slate-700 bg-gray-50 dark:bg-gray-900 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />

            <select
              name="sex"
              id="sex"
             value={formData.sex}
             onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
              className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-slate-300 dark:border-slate-700 bg-gray-50 dark:bg-gray-900 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="" disabled>Select Gender</option>
              <option value="MALE">MALE</option>
              <option value="FEMALE">FEMALE</option>
            </select>

            {/* Password */}
            <input
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-slate-300 dark:border-slate-700 bg-gray-50 dark:bg-gray-900 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />

            {/* Confirm Password */}
            <input
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-slate-300 dark:border-slate-700 bg-gray-50 dark:bg-gray-900 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white transition-colors ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {/* Message */}
          {message && (
            <p className={`text-center text-sm mt-2 ${message.startsWith("✅") ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </main>
  );
};

export default RegisterForm;
