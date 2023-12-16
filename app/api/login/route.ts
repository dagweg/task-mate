import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/prisma";


export async function POST(request: NextRequest) {

    const body = await request.json()

    const user = await db.user.findFirst({
        where: {
            email: body?.email,
        }
    }
    )

    // BASIC CHECKS below, will strengthen it later using zod
    if (!user?.email) {
        return NextResponse.json("No account, please create one!", { status: 400 })
    }

    if (user.password !== body.passWord) {
        return NextResponse.json("Password is incorrect", { status: 400 })
    }

    // YOU CAN SETUP SESSION HERE

    console.log(user)
    return NextResponse.json("Login Successful", { status: 200 })
    // const { data, error } = await supabase.auth.signInWithOAuth({
    //     provider: "google"
    // })

    // if (error) {
    //     console.error('Error during Google OAuth sign-in:', error);
    //     return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
    // }


    // return NextResponse.json({
    //     test: 'valid',
    //     ...data
    // });
}