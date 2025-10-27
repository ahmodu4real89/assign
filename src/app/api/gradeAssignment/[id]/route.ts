
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";


export async function GET(req: Request, context: { params: Promise<{ lecturerId: string }> }) {
  
  const {lecturerId} = await context.params;
    const id = Number(lecturerId);
  try {
    const submissions = await prisma.submission.findMany({
      where: {
        assignment: {
          course: {
            id, 
          },
        },
      },
      include: {
        student: {
          select: { id: true, name: true, email: true },
        },
        assignment: {
          select: { id: true, title: true, course: true },
        },
      },
    });

    return NextResponse.json(submissions);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching submissions" }, { status: 500 });
  }
};



// PATCH /api/submissions/:id/grade

export async function PATCH(req: Request, context: { params: Promise<{ lecturerId: string }> }) {
  
  const {lecturerId} = await context.params;
    const id = Number(lecturerId);
  const { grade, feedback } = await req.json();

  try {
    const updated = await prisma.submission.update({
      where: { id },
      data: {
        grade,
        feedback,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error grading submission" }, { status: 500 });
  }
}
