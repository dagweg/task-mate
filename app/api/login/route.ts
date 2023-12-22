import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/prisma";
import { Cookies } from 'react-cookie';


export async function POST(request: NextRequest) {

    try{
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
        return NextResponse.json({ message: "Login Successful", userId: user.id }, { status: 200 }) 
    }
    catch(e){
        console.log(e)
        return NextResponse.json("An error has occured!",{status:500});
    }
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