import  prisma  from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request:Request){
    try {

        const {name, email, sex, age, phoneNumber, password, role} = await request.json()
        if( !name || !email|| !password ||!sex ||!age ||!phoneNumber ||!role){
            return NextResponse.json({error: 'All fields are required'}, {status: 400})
        };
        const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    };

     const hashedPassword = await bcrypt.hash(password, 10);
        
      const newUser = await prisma.user.create({
      data: {
        name,
        email,
        sex,
        age,
        phoneNumber,
        password: hashedPassword,
        role,
      },
    });

    return NextResponse.json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }

}

// Fetch only students
export async function GET() {
  try {
    
    const students = await prisma.user.findMany({
      where: {
        role: "STUDENT",
      },
    });

    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}
