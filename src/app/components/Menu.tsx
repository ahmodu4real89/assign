import React from "react";
import Image from "next/image";
import Link from "next/link";

const menuItem = [
  {
    icon: "/home.png",
    label: "Dashboard",
    href: "/lecturer", 
  },
  {
    icon: "/course.png",
    label: "Courses",
    href: "/lecturer/courses",
  },
  {
    icon: "/assignment.png",
    label: "Assignments",
    href: "/lecturer/assignments",
  },
  {
    icon: "/student.png",
    label: "Students",
    href: "/lecturer/students",
  },
];

const Menu = () => {
  return (
    <div className="mt-6 text-lg">
      {menuItem.map((item) => (
        <Link
          href={item.href}
          key={item.label}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
        >
          
          <span className="text-gray-700 font-medium">{item.label}</span>
        </Link>
      ))}
    </div>

     );
};

export default Menu;




