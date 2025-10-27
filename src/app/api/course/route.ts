import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";


export async function POST(req: Request) {
    
    try {

        const body = await req.json()

        const { courseName, courseCode, description, lecturerId } = body

        if (!courseName || !description || !lecturerId) {
            return NextResponse.json(
                { error: "courseName , description and lecturerId are required" },
                { status: 400 }
            );
        };

        const lecturer = await prisma.user.findUnique({
            where: { id: Number(lecturerId) },
        });
        console.log(lecturer)

        if (!lecturer) {
            return NextResponse.json(
                { error: `Lecturer with ID ${lecturerId} not found` },
                { status: 404 }
            );
        }

        const course = await prisma.course.create({
            data: {
                courseName,
                courseCode,
                description,
                lecturerId: Number(lecturerId),
            },
        });

        return NextResponse.json(
            { message: "Course created successfully", course },
            { status: 201 }
        );
    } catch (error) {

        return NextResponse.json(
            { error: "Failed to create course" },
            { status: 500 }
        );
    }
}

//student
export async function GET(req:Request){
    try {
        
         const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? Number(limitParam) : undefined;     
       const course = await prisma.course.findMany({

            include: {
                lecturer: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },

         take: limit,
             orderBy: { createdAt: "desc" },
        })
        return NextResponse.json(course, {status: 200})
    } catch (error) {
        
        return NextResponse.json(
            { error:  "Failed to fetch course" },
            { status: 500 }
        );
        
    }
}