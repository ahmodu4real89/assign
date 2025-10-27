import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

// for admin
export async function DELETE(
  request: Request,
  context: { params: Promise<{ courseId: string }> }
) {
  try {
    
    const { courseId } = await context.params;
    const id = Number(courseId);

  
    if (isNaN(id) || id <= 0) {
      return NextResponse.json(
        { error: "Invalid course ID" },
        { status: 400 }
      );
    }

  
    const existingCourse = await prisma.course.findUnique({
      where: { id },
      include: { lecturer: true },
    });

    if (!existingCourse) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    // Delete the course
    await prisma.course.delete({ where: { id } });

    return NextResponse.json(
      { message: `Course '${existingCourse.courseName}' deleted successfully.` },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting course:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to delete course" },
      { status: 500 }
    );
  }
};


//fetch single course and all assignment under it
export async function GET(
  req: Request,
  context: { params: Promise<{ courseId: string }> }
) {
  const {courseId} = await context.params;
  const id = Number(courseId)

  try {
    const course = await prisma.course.findUnique({
      where: { id}, 
      include: {
        lecturer: true,
        assignments: true, 
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};




// For admin - update a course
export async function PUT(req: Request, context: { params: Promise<{ courseId: string }> }) {
  try {
    
    const { courseId } = await context.params;

    const id = Number(courseId);
    if (!id || isNaN(id)) {
      return NextResponse.json({ error: "Invalid course ID" }, { status: 400 });
    }

    const data = await req.json();

    // Now proceed with your update logic
    const updatedCourse = await prisma.course.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedCourse, { status: 200 });
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 });
  }
}
