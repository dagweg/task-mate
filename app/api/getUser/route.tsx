import { NextRequest, NextResponse } from "next/server";
import supabase from "@/app/config/supabaseClient";


export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { data, error } = await supabase.auth.getUser(body.accessToken)

        if (data) {
            const user = data.user?.user_metadata
            return NextResponse.json({
                ...user
            }, { status: 200 })
        } else {
            throw new Error(error?.message)
        }
    } catch (error) {
        console.error('ErRoR!!!:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
