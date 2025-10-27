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

    //const now = new Date();
   // const status = now > assignment.dueDate ? "LATE" : "SUBMITTED";

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



