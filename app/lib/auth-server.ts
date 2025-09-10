import { jwtVerify } from "jose";

export async function verifyAppToken(authHeader?: string) {
  if (!authHeader) return null;
  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token) return null;
  try {
    const secret = new TextEncoder().encode(
      process.env.APP_JWT_SECRET || process.env.NEXTAUTH_SECRET || "dev-secret"
    );
    const { payload } = await jwtVerify(token, secret);
    return payload as { sub?: string; email?: string } | null;
  } catch {
    return null;
  }
}
