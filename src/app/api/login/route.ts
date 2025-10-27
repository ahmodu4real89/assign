import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export async function POST(req: Request) {

    try {
        const body = await req.json();

        if (!body) {
            return NextResponse.json({ error: "Missing request body" }, { status: 400 });
        }

        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email }
        })
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        };

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return NextResponse.json({ error: 'Email or Password not correct' }, { status: 401 })
        }

        return NextResponse.json({
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {

        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }


}

