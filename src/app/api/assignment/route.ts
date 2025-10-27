import { NextResponse } from "next/server";
import  prisma  from "@/app/lib/prisma";


export async function POST(req:Request){
    try {
        const body = await req.json();
        const { courseId, title, description, dueDate} = body
         console.log("📩 Request body:", body);
        
    if (!courseId || !title || !description || !dueDate) {
      return NextResponse.json(
        { error: "All fields (courseId, title, description, dueDate) are required" },
        { status: 400 }
      );
    }

    const assignment = await prisma.assignment.create({
         data: {
        courseId: Number(courseId),
        title,
        description,
        dueDate: new Date(new Date(dueDate).toISOString().split('T')[0]),

      },
      
      
    });

       return NextResponse.json(
      { message: "Assignment created successfully", assignment },
      { status: 201 }
    );
  } catch (error) {
       
    return NextResponse.json({ error: "Failed to create assignment" }, { status: 500 });
  }
}

// export async function GET(req:Request){
//   try {

//     const assignments = await prisma.assignment.findMany({
//       include:{
//         course:true
//       }
//     })
//     return NextResponse.json(assignments, {status: 200 })
    
//   } catch (error) {
//      return NextResponse.json({ error: "Failed to fetch assignment" }, { status: 500 });
//   }
// }




export async function GET(req: Request) {
  try {
    const assignments = await prisma.assignment.findMany({
      include: {
        course: true,
        submissions: {
          include: { student: true },
        },
      },
    });

    const result = assignments.map((assignment) => {
      if (assignment.submissions.length === 0) {
        // No one submitted yet → PENDING
        return {
          ...assignment,
          status: "PENDING",
          submissions: [],
        };
      }

      // If there are submissions, compute status for each
      const submissionsWithStatus = assignment.submissions.map((submission) => {
        const isLate =
          new Date(submission.submissionDate) > new Date(assignment.dueDate);
        const computedStatus = isLate ? "LATE" : "SUBMITTED";
        return { ...submission, computedStatus };
      });

      // If at least one submission exists, you can aggregate or just use the first
      const overallStatus = submissionsWithStatus.some(
        (s) => s.computedStatus === "LATE"
      )
        ? "LATE"
        : "SUBMITTED";

      return {
        ...assignment,
        status: overallStatus,
        submissions: submissionsWithStatus,
      };
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch assignments:", error);
    return NextResponse.json(
      { error: "Failed to fetch assignments" },
      { status: 500 }
    );
  }
}
