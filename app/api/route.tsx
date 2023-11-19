import { NextRequest, NextResponse } from "next/server";


export function POST(request: NextRequest) {
    return NextResponse.json({
        message: "it works fine!"
    }
    )
}