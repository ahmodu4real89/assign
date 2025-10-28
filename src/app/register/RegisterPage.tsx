"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { registerSchema } from "@/app/lib/validations";

const RegisterForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const roleParam = searchParams.get("role");
  const [role, setRole] = useState(roleParam || localStorage.getItem("role") || "STUDENT");

  useEffect(() => {
    if (roleParam) {
      setRole(roleParam);
      localStorage.setItem("role", roleParam);
    }
  }, [roleParam]);

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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = registerSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...validation.data, age: Number(formData.age) }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Account created successfully!");
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
        setTimeout(() => {
          router.push(`/login?role=${role}`);
        }, 1200);
      } else {
        toast.error(data.error || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-white">
            Create your {role.toLowerCase()} account
          </h2>
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

        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="space-y-4">
            {[
              { name: "name", placeholder: "Full Name", type: "text" },
              { name: "email", placeholder: "Email address", type: "email" },
              { name: "phoneNumber", placeholder: "Phone Number", type: "tel" },
              { name: "age", placeholder: "Age", type: "number" },
            ].map((field) => (
              <div key={field.name}>
                <input
                  {...field}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  className={`appearance-none rounded-lg relative block w-full px-3 py-3 border ${
                    errors[field.name]
                      ? "border-red-500"
                      : "border-slate-300 dark:border-slate-700"
                  } bg-gray-50 dark:bg-gray-900 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                />
                {errors[field.name] && (
                  <p className="mt-1 text-sm text-red-500">{errors[field.name]}</p>
                )}
              </div>
            ))}

            {/* Gender */}
            <div>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className={`appearance-none rounded-lg relative block w-full px-3 py-3 border ${
                  errors.sex ? "border-red-500" : "border-slate-300 dark:border-slate-700"
                } bg-gray-50 dark:bg-gray-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
              >
                <option value="">Select Gender</option>
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
              </select>
              {errors.sex && <p className="mt-1 text-sm text-red-500">{errors.sex}</p>}
            </div>

            {/* Password */}
            <div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`appearance-none rounded-lg relative block w-full px-3 py-3 border ${
                  errors.password ? "border-red-500" : "border-slate-300 dark:border-slate-700"
                } bg-gray-50 dark:bg-gray-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`appearance-none rounded-lg relative block w-full px-3 py-3 border ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-slate-300 dark:border-slate-700"
                } bg-gray-50 dark:bg-gray-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 text-sm font-bold rounded-lg text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default RegisterForm;
