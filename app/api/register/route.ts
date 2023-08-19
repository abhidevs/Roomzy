import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import prismaDb from "@/app/libs/prismaDb";

export async function POST(request: Request) {
    const body = await request.json();
    const { email, name, password } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismaDb.user.create({
        data: {
            email,
            name,
            hashedPassword,
        },
    });

    // Do not send hashedPassword in api response
    const { hashedPassword: passwordHash, ...userInfo } = user;

    return NextResponse.json(userInfo, { status: 201 });
}
