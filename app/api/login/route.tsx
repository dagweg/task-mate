import { NextRequest, NextResponse } from "next/server";
import supabase from "@/app/config/supabaseClient";


export async function POST(request: NextRequest) {

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google"
    })

    if (error) {
        console.error('Error during Google OAuth sign-in:', error);
        return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
    }


    return NextResponse.json({
        test: 'valid',
        ...data
    });
}