import supabase from "@/app/config/supabaseClient";
import { NextResponse, NextRequest } from "next/server";


export async function POST(request: NextRequest) {
    const { data, error } = await supabase
        .from('projects')
        .select()

    if (error) {
        console.log(error)
        return NextResponse.json(error, { status: 500 })
    }

    return NextResponse.json(data, { status: 200 })
}