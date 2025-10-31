import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";


// /app/api/submissions/route.ts
// export async function POST(req: Request) {
//   try {
//     const { assignmentId, studentId, filePath} = await req.json();

//     // Fetch assignment due date
//     const assignment = await prisma.assignment.findUnique({
//       where: { id: assignmentId },
//       select: { dueDate: true },
//     });

//     if (!assignment) {
//       return NextResponse.json({ error: "Assignment not found" }, { status: 404 });
//     }

//     //const now = new Date();
//    // const status = now > assignment.dueDate ? "LATE" : "SUBMITTED";

//     // Create submission
//     const submission = await prisma.submission.create({
//       data: {
//         assignmentId,
//         studentId,
//         filePath,
        
//       },
//     });

//     return NextResponse.json(
//       { message: "Submission uploaded successfully", submission },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error submitting assignment:", error);
//     return NextResponse.json(
//       { error: "Failed to submit assignment" },
//       { status: 500 }
//     );
//   }
// }


export async function POST(req: Request) {
  try {
    const { assignmentId, studentId, filePath } = await req.json();

    // Fetch assignment due date
    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
      select: { dueDate: true },
    });

    if (!assignment) {
      return NextResponse.json(
        { error: "Assignment not found" },
        { status: 404 }
      );
    }

    // Determine status based on filePath and due date
    let status: "PENDING" | "SUBMITTED" | "LATE" = "PENDING";
    const now = new Date();

    if (filePath && filePath.trim() !== "") {
      status = now > assignment.dueDate ? "LATE" : "SUBMITTED";
    }

    // Create submission
    const submission = await prisma.submission.create({
      data: {
        assignmentId,
        studentId,
        filePath,
        status, 
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



//api/submissions?assignmentId=1
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const assignmentId = searchParams.get("assignmentId");

    if (!assignmentId) {
      return NextResponse.json(
        { error: "assignmentId query is required" },
        { status: 400 }
      );
    }

    const assignment = await prisma.assignment.findUnique({
      where: { id: Number(assignmentId) },
      include: {
        submissions: {
          include: {
            student: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!assignment) {
      return NextResponse.json(
        { error: "Assignment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(assignment, { status: 200 });
  } catch (error) {
    console.error("Error fetching assignment:", error);
    return NextResponse.json(
      { error: "Failed to fetch assignment" },
      { status: 500 }
    );
  }
}
