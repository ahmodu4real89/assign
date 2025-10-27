import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";


// /app/api/submissions/route.ts
export async function POST(req: Request) {
  try {
    const { assignmentId, studentId, filePath } = await req.json();

    // Fetch assignment due date
    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
      select: { dueDate: true },
    });

    if (!assignment) {
      return NextResponse.json({ error: "Assignment not found" }, { status: 404 });
    }

    const now = new Date();
    const status = now > assignment.dueDate ? "LATE" : "SUBMITTED";

    // Create submission
    const submission = await prisma.submission.create({
      data: {
        assignmentId,
        studentId,
        filePath,
        
      },
    });

    return NextResponse.json(
      { message: "Submission uploaded successfully", submission },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting assignment:", error);
    return NextResponse.json(
      { error: "Failed to submit assignment" },
      { status: 500 }
    );
  }
}



export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const submissionId = parseInt(params.id);
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