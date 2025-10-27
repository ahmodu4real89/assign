import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get("limit");
    const lecturerIdParam = searchParams.get("lecturerId");

    if (!lecturerIdParam) {
      return NextResponse.json(
        { error: "Lecturer ID is required" },
        { status: 400 }
      );
    }

    const lecturerId = Number(lecturerIdParam);
    const limit = limitParam ? Number(limitParam) : undefined;

    if (isNaN(lecturerId) || lecturerId <= 0) {
      return NextResponse.json(
        { error: "Invalid Lecturer ID" },
        { status: 400 }
      );
    }

    const courses = await prisma.course.findMany({
        where: lecturerId ? { lecturerId } : {},
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
    });

    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error("Error fetching courses:", error);

    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
