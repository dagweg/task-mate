import { NextRequest, NextResponse } from "next/server";

// Deprecate local login API: guide clients to use NextAuth Credentials via signIn("credentials")
export async function POST(_request: NextRequest) {
  return NextResponse.json(
    {
      error:
        "Deprecated endpoint. Use NextAuth credentials: signIn('credentials', { email, password })",
    },
    { status: 410 }
  );
}
