
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";


export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  
  const {id} = await context.params;
    const lecturerId = Number(id);
  try {
    const submissions = await prisma.submission.findMany({
      where: {
        assignment: {
          course: {
            lecturerId, 
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

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  
  const {id} = await context.params;
    const lecturerId = Number(id);
  const { grade, feedback } = await req.json();

  try {
    const updated = await prisma.submission.update({
      where: {id: lecturerId},
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


export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const id = context.params
    const submissionId = Number(id)
    const body = await req.json();
    const { grade, feedback } = body;

    if (isNaN(submissionId) || grade === undefined) {
      return NextResponse.json(
        { error: "submissionId and grade are required" },
        { status: 400 }
      );
    }

    const submission = await prisma.submission.update({
      where: { id: submissionId },
      data: {
        grade,
        feedback,
    
      },
    });

    return NextResponse.json(
      { message: "Submission graded successfully", submission },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error grading submission:", error);
    return NextResponse.json(
      { error: "Failed to grade submission" },
      { status: 500 }
    );
  }
}