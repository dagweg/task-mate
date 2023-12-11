import { NextRequest, NextResponse } from "next/server";
import supabase from "@/app/config/supabaseClient";


export async function POST(request: NextRequest) {

    const body = await request.json();

    // const [data, error] = await supabase
    //     .from('User')
    //     .insert([
    //         { email: }
    //     ])

    return NextResponse.json(body)
}